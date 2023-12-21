/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/Header';

const Diseno = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Header item="Aviso Privacidad" />

      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>AVISO DE PRIVACIDAD INTEGRAL</Text>
        </View>

        <Text style={styles.aviso}>
          El Municipio de Juárez, por conducto de la Tesorería Municipal, mediante
          las direcciones que la conforman ubicada en la oficina central de la
          Unidad Administrativa "Benito Juárez" con domicilio en Av. Francisco
          Villa # 950, Colonia Centro en esta ciudad de Ciudad Juárez, Chihuahua;
          da a conocer a los usuarios el siguiente aviso de privacidad integral,
          la información aquí descrita es cumplimiento del artículo 67, de la Ley
          de Protección de Datos Personales del Estado de Chihuahua.
          {'\n'}
          {'\n'}
          La finalidad para la cual serán recabados sus datos personales es para
          las siguientes finalidades que son necesarias dentro de las actividades
          de “La Tesorería Municipal"
          {'\n'}
          {'\n'}
          Trámites administrativos, como pueden ser relativos a recursos
          financieros, patrimoniales o fiscales Confirmar su identidad, para la
          elaboración de recibos y facturas por los ingresos y pagos realizados
          para demostrar ante las autoridades fiscalizadoras que el pago
          correspondiente, se efectuó al beneficiario o en su caso a la persona
          acreditada para recibir el cheque, dicha información será digitalizada y
          enviada al Archivo Municipal como soporte de pólizas. Cumplir con los
          requerimientos legales que le son aplicables. Elaboración de los
          informes estadísticos que solicitan los órganos de fiscalización. Los
          datos personales recabados serán protegidos y tratados en la base de
          datos Sybase, el cual tiene su fundamento en el Código Municipal para el
          Estado de Chihuahua artículo 64 Fracción II, IV,IX y XIII.
          {'\n'}
          {'\n'}
          Para llevar a cabo las finalidades descritas en el presente aviso de
          privacidad y dependiendo específicamente del trámite a realizar, se
          utilizan de manera enunciativa mas no limitativa, los siguientes datos
          personales:
          {'\n'}
          {'\n'}
          Datos de identificación: como nombre, número de cuenta bancaria e
          interbancaria, estado civil, firma autógrafa y electrónica, registro
          federal de contribuyente (RFC), Clave Única de Registro de Población
          (CURP), numero de seguridad social, nacionalidad, fecha de nacimiento,
          datos contenidos en acta de nacimiento. Datos de Contacto: como
          domicilio, números telefónicos fijos o celulares o correos electrónicos
          de índole particular entre otros. Datos Académicos: como calificaciones
          cuantitativas, cualitativas, promedios y observaciones a las
          calificaciones, evaluaciones y las opiniones vertidas en ellas. Datos
          Patrimoniales, Financieros y Fiscales.
          {'\n'}
          {'\n'}
          Además " La Tesorería" podrá utilizar para las finalidades descritas
          anteriormente los siguientes datos personales considerados como
          sensibles, que requieren especial atención:
          {'\n'}
          {'\n'}
          Datos respecto de su estado o condición da salud física o mental. Datos
          sobre afiliación sindical. U otros.
          {'\n'}
          {'\n'}
          El titular de los datos podrá ejercer sus Derechos de Acceso,
          Rectificación, Cancelación, Oposición y Portabilidad de Datos
          Personales, así como negativa al tratamiento y tratamiento de sus datos,
          ante la Unidad de Transparencia con domicilio en Francisco Villa 950
          Norte Col. Centro, Área de Sótano ala sur de la Unidad Administrativa
          “Lic. Benito Juárez”, teléfono 7370000 Extensión 70532, 70451 y 70453,
          correo electrónico unidadtransparencia@juarez.gob.mx, o por medio de la
          Plataforma Nacional de Transparencia
          http://www.plataformadetransparencia.org.mx.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: RFPercentage(0.05),
    fontWeight: 'bold',
    color: '#6d0c2e',
    marginTop: 70,
  },
  menuContainer: {
    backgroundColor: '#F1F1F1',
    height: '65%',
    width: '90%',
  },
  header: {
    flexDirection: 'row',

    backgroundColor: '#F1F1F1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
    marginTop: -30,
    marginBottom: 20,
  },
  tituloHeader: {
    color: '#6d0c2e',
    fontSize: RFPercentage(0.05),
    fontWeight: '900',
    paddingLeft: 45,
  },
  aviso: {
    fontSize: RFPercentage(0.04),
    fontWeight: '500',
  },
  boton: {
    backgroundColor: '#6d0c2e',
    padding: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 7,
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 40,
  },
  textoBtn: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default Diseno;
