import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal, TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getAdeudoEmpresa } from '../../services/padrones.js';

import fonts from '../../utils/fonts';

const BusquedaAvanzadaVehiculo = ({ cargos, onSearch }) => {
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
  };

  const handleSearch = async () => {
    setIsOpen(false);
    onSearch(form);
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
              <Text style={styles.label}>Número de Placa</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('numero_de_placa', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Numero de Placa" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Tipo de Vehículo</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('tipo_de_vehiculo', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Tipo de Vehículo" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Clase de Vehículo</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('clase_de_vehiculo', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Clase de Vehículo" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Servicio</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('servicio', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Servicio" />
              </View>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Estatus del Vehículo</Text>
              <View style={styles.textInputContainer}>
                <TextInput onChangeText={(text) => handleChange('estatus_del_vehiculo', text)} color="black" placeholderTextColor="#919191" style={styles.textInputStyle} placeholder="Estatus del Vehículo" />
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

export default BusquedaAvanzadaVehiculo;

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
