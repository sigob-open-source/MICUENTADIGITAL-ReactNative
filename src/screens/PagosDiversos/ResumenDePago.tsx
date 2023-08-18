/* eslint-disable @typescript-eslint/no-non-null-assertion */
// External dependencies
import React, { useMemo, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Internal dependencies
import moment from 'moment';
import ReactNativeNetPay from 'react-native-netpay';
import Button from '../../components/Button';
import ConceptosDePago, {
  ConceptoDePago,
} from '../../components/ConceptosDePago';
import { generarTicket, generateRecibo } from '../../services/recaudacion/recibo';

import Header from '../../components/HeaderV2';
import InformacionDePadron from '../../components/InformacionDePadron';
import { RootStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store-v2/hooks';
import { ReferenciasPagoNetpayPublic } from '../../services/recaudacion/pago.types';
import { generarReferenciaDePagoNetpayPublic } from '../../services/recaudacion/pago';
import useTotal from '../../hooks/useTotal';
import getExpiryDate from '../../utils/get-expiry-date';
import PDFViewer from '../../components/PDFViewer';
import { useNotification } from '../../components/DropDownAlertProvider';
import { createCharge } from '../../services/netpay';

// Types & Interfaces
type NavigationProps = NativeStackScreenProps<
RootStackParamList,
'busquedaPadron'
>;

type ResumenDePagoScreenProps = NavigationProps;

/**
 * Pantalla de resumen de pago empleada
 * en pagos diversos.
 *
 * En esta pantalla el usuario puede ver
 * la información de su padron y los cargos
 * generados para así poder imprimir su
 * orden de pago.
 */
const ResumenDePagoScreen = ({ navigation }: ResumenDePagoScreenProps) => {
  const [
    referenciaDePago,
    setReferenciaDePago,
  ] = useState<null | ReferenciasPagoNetpayPublic>(null);

  const [loadingPagoEnLinea, setLoadingPagoEnLinea] = useState(false);
  const [loadingOrdenDePago, setLoadingOrdenDePago] = useState(false);
  const [pdfViewerIsOpen, setPdfViewerIsOpen] = useState(false);

  const pagosDiversosRepo = useAppSelector((state) => state.pagosDiversos);
  const tipoDePadron = pagosDiversosRepo.tipoDePadron!;
  const padron = pagosDiversosRepo.padron!;
  const { cargos } = pagosDiversosRepo;
  const notify = useNotification();

  const conceptosDePago = useMemo(() => {
    // Funcion llamada al dar al boton realizar pago
    ReactNativeNetPay.init('pk_netpay_RZWqFZTckZHhIaTBzogznLReu', { testMode: true });
    // ReactNativeNetPay.init('pk_netpay_DBmockYZopdDnTdhYhGJCDXfe', { testMode: false });

    const output: ConceptoDePago[] = [];

    for (let i = 0; i < cargos.length; i += 1) {
      const group = cargos[i];

      output.push({
        id: group[0].id,
        description: group[0].descripcion,
        total: group[0].importe,
      });

      for (let j = 0; j < group[1].cargos_hijos.length; j += 1) {
        output.push({
          id: group[1].cargos_hijos[j].id,
          description: group[1].cargos_hijos[j].descripcion,
          total: group[1].cargos_hijos[j].importe,
        });
      }
    }

    return output;
  }, [cargos]);

  const importes = useMemo(
    () => conceptosDePago.map((item) => item.total),
    [conceptosDePago],
  );

  const { roundedTotal } = useTotal({ importes });

  const paymentMethodHandler = async (cta: 'orden' | 'netpay') => {
    const setLoading = cta === 'orden' ? setLoadingOrdenDePago : setLoadingPagoEnLinea;
    setLoading(true);

    const descripcion = conceptosDePago.length === 1
      && conceptosDePago[0].description.length <= 250
      ? conceptosDePago[0].description
      : tipoDePadron.descripcion;

    const cargoIds = conceptosDePago.map((e) => e.id);

    if (referenciaDePago === null) {
      const response = await generarReferenciaDePagoNetpayPublic(
        {
          amount: roundedTotal,
          currency: 'MXN',
          description: descripcion,
          expiryDate: getExpiryDate(tipoDePadron.id),
          paymentMethod: 'cash',
          billing: {
            canal_de_pago: 3,
            cargos: cargoIds,
            padron_id: padron.id,
            tipo_de_padron: tipoDePadron.id,
            importe: roundedTotal,
            fecha: moment().format('DD-MM-YYYY'),
            merchantReferenceCode: null,
            ciudadano: null,
          },
        },
        { entidad: 1 },
      );

      if (response) {
        setReferenciaDePago(response);
      }
    }

    if (cta === 'netpay') {
      const cardToken = await ReactNativeNetPay.openCheckout(false);

      const response = await generarReferenciaDePagoNetpayPublic(
        {
          amount: roundedTotal,
          currency: 'MXN',
          description: descripcion,
          expiryDate: getExpiryDate(tipoDePadron.id),
          paymentMethod: 'cash',
          billing: {
            canal_de_pago: 3,
            cargos: cargoIds,
            padron_id: padron.id,
            tipo_de_padron: tipoDePadron.id,
            importe: roundedTotal,
            fecha: moment().format('DD-MM-YYYY'),
            merchantReferenceCode: null,
            ciudadano: null,
          },
        },
        { entidad: 1 },
      );

      if (response) {
        const responsecard = await createCharge(roundedTotal, cardToken, response.folio_netpay);

        const { success, result } = await generateRecibo({
          es_netpay_custom: true,
          canal_de_pago: 3,
          folio: response.folio_netpay,
          response: responsecard,
        }, { entidad: 1 });

        if (success) {
          const { success: successTicket, result: resultTicket } = await generarTicket({
            entidad_id: 1,
            recibos_id: [result.id],
            tramite_en_proceso: false,
          }, { entidad: 1 });

          let base64 = result.data;

          if (successTicket) {
            base64 = resultTicket.data;
          }

          notify({
            type: 'success',
            title: '¡Éxito!',
            message: 'Pago exitoso',
          });

          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'menuInicio',
              },
              {
                name: 'pdfViewer',
                params: {
                  reciboB64: `data:application/pdf;base64,${base64}`,
                },
              },
            ],
          });
        } else {
          notify({
            type: 'error',
            title: 'Error',
            message: 'No logramos guardar su pago, favor de reportar en ventanilla',
          });
        }
      }
    }

    if (cta === 'orden') {
      setPdfViewerIsOpen(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Header title="Pagos Diversos" />

      <ScrollView contentContainerStyle={styles.content}>
        <SafeAreaView>
          <InformacionDePadron tipoDePadron={tipoDePadron} padron={padron} />

          <ConceptosDePago conceptos={conceptosDePago} style={styles.item} />

          <Button
            loading={loadingPagoEnLinea}
            disabled={loadingOrdenDePago}
            text="Pagar en línea"
            iconName="arrow-circle-right"
            style={styles.item}
            onPress={() => paymentMethodHandler('netpay')}
          />

          <Button
            loading={loadingOrdenDePago}
            disabled={loadingPagoEnLinea}
            text="Generar orden de pago"
            iconName="download"
            style={styles.item}
            onPress={() => paymentMethodHandler('orden')}
          />
        </SafeAreaView>
      </ScrollView>

      {
      Boolean(referenciaDePago) && (
        <PDFViewer
          visible={pdfViewerIsOpen}
          onClose={() => setPdfViewerIsOpen(false)}
          base64={referenciaDePago!.data}
        />
      )
    }
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    marginTop: 18,
  },
});

export default ResumenDePagoScreen;
