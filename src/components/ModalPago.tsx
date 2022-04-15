import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal, TextInput,
} from 'react-native';

import fonts from '../utils/fonts';

const ModalPago = ({ cargos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metodo, setMetodo] = useState();
  const [importe, setImporte] = useState(0.00);

  useEffect(() => {
    console.log('cargoossss');
    console.log(cargos);
  }, []);

  const handleImporteTotal = () => {
    let total = 0;
    (cargos) ? cargos.map((cargo) => total += cargo.importe) : total = 0.00;
    console.log(`total${total}`);
    return total;
  };

  const handleCambio = () => {
    const total = handleImporteTotal();
    let cambio = importe - total;
    (cambio < 0) && (cambio = 0);
    return cambio.toFixed(2);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => { (isOpen === false) ? setIsOpen(true) : null; }}>
        <View style={styles.buttonPrint}>
          <Text style={styles.text}>Realizar Pago</Text>
        </View>

      </TouchableWithoutFeedback>
      <Modal
        visible={isOpen}
        transparent
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.modalBack}>
          <View style={styles.modal}>
            <View>
              <Text style={styles.text}>
                Total a Pagar $
                {' '}
                {handleImporteTotal()}
              </Text>
            </View>

            <View style={styles.line} />
            <View style={styles.payInfo}>
              <Text style={styles.text}>
                Pagar $
                {' '}
                {importe}
              </Text>
              <Text style={styles.text}>
                Cambio $
                {' '}
                {handleCambio()}
              </Text>
              <Text style={styles.text}>Corte sin cerrar</Text>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Metodo</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => setMetodo(text)} color="black" placeholderTextColor="#9d9898" style={styles.textInputStyle} placeholder="Buscar..." />
              </View>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Importe</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => setImporte(text)} keyboardType="numeric" placeholderTextColor="#9d9898" style={styles.textInputStyle} placeholder="Buscar..." />
              </View>
            </View>
            <View style={styles.line} />
            {/* <Text style={styles.label}>Id: 1</Text>
            <Text style={styles.label}>Clave Ciudadana</Text>
            <Text style={styles.label}>Nombre Completo: Carlos Iturrios</Text> */}
            <TouchableWithoutFeedback>
              <View style={styles.buttonPrint}>
                <Text style={styles.text}>Imprimir Opinión de Obligaciones</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.buttonPrint}>
                <Text style={styles.text}>Imprimir Situación</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <View style={styles.buttonPrint}>
                <Text style={styles.text}>Cerrar</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>

      </Modal>
    </>
  );
};

export default ModalPago;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '',
  },
  modalBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  modal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
  },
  line: {
    height: 1,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'gray',
  },
  payInfo: {
    margin: 5,
    backgroundColor: '#f0e4e4',
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 10,

  },
  textInputContainer: {
    marginVertical: 0,
    width: 336,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyle: {
    height: '100%',
    marginLeft: 14,
    fontSize: 13,
  },
  label: {
    color: 'black',
    fontFamily: fonts.light,
    marginLeft: 17,

  },
  inputView: {
    marginVertical: 10,
    textAlign: 'left',
  },
  buttonPrint: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
});
