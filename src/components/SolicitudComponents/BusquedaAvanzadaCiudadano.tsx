import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal, TextInput, ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getAdeudoCiudadano } from '../../services/padrones.js';
import fonts from '../../utils/fonts';

type FormData = {
  claveCiudadana: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  correo: string,
  numeroCelular: string,
  curp: string,
  rfc: string,
};

const BusquedaAvanzadaCiudadano = ({ cargos, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metodo, setMetodo] = useState();
  const [importe, setImporte] = useState(0.00);
  const [form, setForm] = useState({});

  useEffect(() => {

  }, []);

  const handleChange = (name, text) => {
    setForm({
      ...form,
      [name]: text,
    });
    console.log('sucede');
  };

  const handleSearch = () => {
    onSearch(form);
    setIsOpen(false);
  };

  const onSubmit = (data: FormData) => {
    Alert.alert('data', JSON.stringify(data));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => { (isOpen === false) ? setIsOpen(true) : null; }}>
        <View style={styles.iconAvanzadoContainer}>
          <Icon
            name="tasks"
            size={30}
            color="white"
          />
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
            <Text style={styles.textHeader}>Busqueda Avanzada</Text>
            <View style={styles.line} />
            <View style={styles.textInput}>
              <Text style={styles.label}>Nombre </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('first_name', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Nombre" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Clave Ciudadana </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('clave_ciudadana', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Clave Ciudadana" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Apellido Paterno </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('last_name', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Apellido Paterno" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Apellido Materno </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('second_last_name', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Apellido Materno" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Correo </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('email', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Correo" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>No. Celular </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('numero_de_celular', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="No. Celular" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>CURP </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('CURP', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="CURP" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>RFC </Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('RFC', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="RFC" />
              </View>
            </View>
            <TouchableWithoutFeedback onPress={handleSearch}>
              <View style={styles.buttonPrint}>

                <Text style={styles.text}>Buscar</Text>

              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>

      </Modal>
    </>
  );
};

export default BusquedaAvanzadaCiudadano;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'center',

  },
  textHeader: {
    color: 'black',
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  line: {
    borderColor: 'gray',
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
    borderColor: '#a3a3a3',

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
    backgroundColor: '#79142A',
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 10,
    paddingVertical: 10,
  },
  textInput: {
    marginTop: 5,
  },
  iconAvanzadoContainer: {
    backgroundColor: '#79142A',
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
