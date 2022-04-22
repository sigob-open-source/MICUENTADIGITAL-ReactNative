import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Modal, TextInput, FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getAdeudoEmpresa } from '../../services/padrones.js';

import fonts from '../../utils/fonts';

const ModalOpciones = ({ data, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [metodo, setMetodo] = useState();
  const [importe, setImporte] = useState(0.00);
  const [opciones, setOpciones] = useState([
    {
      name: 'Único',
      value: 1
    },
    {
      name: 'Matriz',
      value: 2
    },
    {
      name: 'Sucursal',
      value: 3
    },
    {
      name: 'Bodega',
      value: 4
    },
  ]);

  useEffect(() => {

  }, []);


  const handleOption = (name, value) => {
    setIsOpen(false);
    onSelect(name);
  }

  const _renderItem = ({item, index}) => {
    return(
      <TouchableWithoutFeedback  onPress={handleOption(item.name, item.value)}>
        <View style={styles.buttonOption}>
     <Text style={styles.textOption}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
    
  }



  return (
    <>
      <Modal
        visible={isOpen}
        transparent
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.modalBack}>
          <View style={styles.modal}>
            <Text style={styles.textHeader}>Opciones</Text>
            <View style={styles.line} />
             <FlatList
                  data={opciones}
                  renderItem={_renderItem}
                  keyExtractor={(item, index) => index.toString()}
            />
            <TouchableWithoutFeedback onPress={() => {setIsOpen(false)}}>
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

export default ModalOpciones;

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
  button: {
    backgroundColor: '',
  },
  modalBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  modal: {
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    borderRadius: 10,
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
  buttonOption: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width * 0.85,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 2,
    paddingVertical: 5,
  },
  textOption: {
    color: 'black',
    padding: 5,
    fontFamily: fonts.bold,
    textAlign: 'center',
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
