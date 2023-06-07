// External dependencies
import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';

// Internal dependencies
import { PadronProps } from '../services/catalogos/padrones.types';
import { CiudadanoCajaProps } from '../services/cuentaunicasir/ciudadano-types';
import { EmpresaCajaProps } from '../services/cuentaunicasir/empresa-types';
import { ContribuyenteCajaProps } from '../services/empresas/contribuyentes-caja-public-types';
import { PADRONES_PAGOS_DIVERSOS } from '../utils/constants';
import Card from './Card';
import Separator from './Separator';
import LADAS from '../dataset/ladas.json';

// Types & Interfaces
interface InformacionDePadronProps {
  tipoDePadron: PadronProps;
  padron: CiudadanoCajaProps | EmpresaCajaProps | ContribuyenteCajaProps;
}

interface ItemProps {
  name: string;
  value: string | number;
}

const InformacionDePadron = ({ tipoDePadron, padron }: InformacionDePadronProps) => {
  const items = useMemo(() => {
    let fields: ItemProps[] = [
      {
        name: 'Tipo:',
        value: tipoDePadron.descripcion,
      },
    ];

    if (tipoDePadron?.id === PADRONES_PAGOS_DIVERSOS.CIUDADANO) {
      const typedPadron = padron as CiudadanoCajaProps;

      let telefono = 'Sin Registrar';
      if (typedPadron.lada && typedPadron.numero_de_celular) {
        const ladaObj = LADAS.find((x) => x.id === typedPadron.lada);
        const ladaStr = ladaObj?.lada ?? '';
        telefono = `${ladaStr} ${typedPadron.numero_de_celular}`;
      }

      fields = fields.concat([
        {
          name: 'Clave Ciudadana:',
          value: typedPadron.clave_ciudadana,
        },
        {
          name: 'Nombre Completo:',
          value: typedPadron.nombre_completo,
        },
        {
          name: 'Correo Electrónico:',
          value: typedPadron.email ?? 'Sin Registrar',
        },
        {
          name: 'Teléfono:',
          value: telefono,
        },
      ]);
    } else if (tipoDePadron?.id === PADRONES_PAGOS_DIVERSOS.EMPRESA) {
      const typedPadron = padron as EmpresaCajaProps;
      let telefono = 'Sin Registrar';
      if (typedPadron.ciudadano.lada && typedPadron.ciudadano.numero_de_celular) {
        const ladaObj = LADAS.find((x) => x.id === typedPadron.lada_celular);
        const ladaStr = ladaObj?.lada ?? '';
        telefono = `${ladaStr} ${typedPadron.ciudadano.numero_de_celular}`;
      }

      fields = fields.concat([
        {
          name: 'Clave:',
          value: typedPadron.clave,
        },
        {
          name: 'Nombre Comercial:',
          value: typedPadron.nombre_comercial,
        },
        {
          name: 'Correo Electrónico:',
          value: typedPadron.correo_electronico ?? 'Sin Registrar',
        },
        {
          name: 'Teléfono:',
          value: telefono,
        },
      ]);
    } else if (tipoDePadron?.id === PADRONES_PAGOS_DIVERSOS.CONTRIBUYENTE) {
      const typedPadron = padron as ContribuyenteCajaProps;

      let telefono = 'Sin Registrar';
      if (typedPadron.lada_celular && typedPadron.telefono_celular) {
        const ladaObj = LADAS.find((x) => x.id === typedPadron.lada_celular);
        const ladaStr = ladaObj?.lada ?? '';
        telefono = `${ladaStr} ${typedPadron.telefono_celular}`;
      }

      fields = fields.concat([
        {
          name: 'Clave:',
          value: typedPadron.clave,
        },
        {
          name: 'Razón Social:',
          value: typedPadron.razon_social ?? 'Sin Razón Social',
        },
        {
          name: 'Correo Electrónico:',
          value: typedPadron.correo_electronico ?? 'Sin registrar',
        },
        {
          name: 'Telefono:',
          value: telefono,
        },
      ]);
    }

    return fields;
  }, [tipoDePadron, padron]);

  console.log(padron);

  return (
    <Card>
      <Text style={styles.cardTitle}>
        Información de padrón
      </Text>
      <Separator topGap={8} />

      {
        items.map((item, key) => (
          <React.Fragment key={key.toString()}>
            <Text style={styles.field}>
              {item.name}
            </Text>
            <Text style={styles.value}>
              {item.value}
            </Text>
          </React.Fragment>
        ))
      }

    </Card>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    color: '#364046',
    fontWeight: '700',
    fontSize: 14,
  },
  field: {
    fontSize: 14,
    color: '#818181',
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#010101',
    fontWeight: '700',
  },
});

export default InformacionDePadron;
