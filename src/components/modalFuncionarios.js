import React, { useState } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';

const ModalFuncionario = props => {

  const [genero, setGenero] = useState(null);
  const [estadoCivil, setEstadoCivil] = useState(null);
  const [observaciones, setObservaciones] = useState(null);
  const [puesto, setPuesto] = useState(null);

  const setGender = () => {
    console.log(props.foto);
    if (props.observaciones == null || props.obesrvaciones == ''){
      setObservaciones('Sin observaciones');
    }else{
      setObservaciones(props.observaciones);
    }

    if (props.puesto == null || puesto == ''){
      setPuesto('Desconocido');
    }

    switch(props.genero){
      case 1: setGenero('Masculino'); break;
      case 2: setGenero('Femenino'); break;
    }

    switch(props.estado){
      case 1: setEstadoCivil('Casado'); break;
      case 2: setEstadoCivil('Divorciado'); break;
      case 3: setEstadoCivil('No aplica'); break;
      case 4: setEstadoCivil('Se ignora'); break;
      case 5: setEstadoCivil('Separado'); break;
      case 6: setEstadoCivil('Soltero'); break;
      case 7: setEstadoCivil('Unión Libre'); break;
      case 8: 
      if (props.genero == 1){
        setEstadoCivil('Viudo');
      }
      else{
        setEstadoCivil('Viuda');
      } 
      break;
    }
  }

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  const llamar = async () =>{
    await Linking.openURL(`tel:+52${props.telefono}`)
    //await Linking.openURL("tel:+526531361101");
  }

  const mandarCorreo = async () =>{
    await Linking.openURL(`mailto:${props.correo}`)
  }

  return (
    <Modal
      transparent
      animationType="fade"
      onShow={setGender}
      visible={props.open}
      onRequestClose={props.onTouchOutside}
    >
      <View style={{
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >

        {renderOutsideTouchable(props.onTouchOutside)}

        <View style={styles.whiteSquareContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.titleText}>Datos del funcionario</Text>
            <TouchableOpacity onPress={props.onTouchOutside}>
              <MaterialCommunityIcons style={{ marginRight: 15 }} size={30} name="arrow-left" color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

            <ScrollView>
              {
                props.foto === undefined ? (
                  <Image
                    style={{width:100, height:100, alignSelf:'center',marginTop:20, borderRadius:400, marginBottom:10}}
                    resizeMode='cover'
                    source={require('../../assets/imagenes/blog-ph.jpg')}
                  />
                ) :
                  <Image
                    style={{width:100, height:100, alignSelf:'center',marginTop:20, borderRadius:400, marginBottom:10}}
                    resizeMode='cover'
                    source={{uri:props.foto}}
                  />
              }

              <View>
                <Text style={styles.textStyle}>
                  Nombre: { props.nombre+' '+props.apellidoPaterno+' '+props.apellidoMaterno }
                </Text> 

                <Text style={styles.textStyle}>
                  Lada: { props.lada }
                </Text> 

                <Text style={styles.textStyle}>
                  Número: { props.numero }
                </Text> 

                <Text style={styles.textStyle}>
                  CURP: { props.curp }
                </Text> 

                <Text style={styles.textStyle}>
                  RFC: { props.rfc }
                </Text> 

                <Text style={styles.textStyle}>
                  Observaciones: { observaciones }
                </Text> 

                <Text style={styles.textStyle}>
                  Puesto: { puesto }
                </Text> 

                <Text style={styles.textStyle}>
                  Género: { genero }
                </Text> 

                <Text style={styles.textStyle}>
                  Estado del Funcionario: { props.estadoFunc }
                </Text> 

                <Text style={styles.textStyle}>
                  Estado Civil: { estadoCivil }
                </Text> 
              </View>

            </ScrollView>

            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={()=>mandarCorreo()}>
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Enviar correo</Text>
                  <MaterialCommunityIcons size={30} name="email" color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>llamar()}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Llamar</Text>
                    <MaterialCommunityIcons size={30} name="phone" color="white" />
                </View>
              </TouchableOpacity>

            </View>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonsContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center', 
  },  
  buttonStyle: {
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:20,
    justifyContent:'center',
    alignItems:'center',
    width:125,
    height:40,
    backgroundColor: colors.secundario,
    borderRadius:5,
  },  
  buttonTextStyle: {
    color:'white',
    fontWeight: '500',
  },
  whiteSquareContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 300,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: 'black',
  },
  textStyle: {
    marginVertical: 5,
    fontWeight: '500',
    fontSize: 15,
    alignSelf:'center',
    color: 'black',
  },
  textStyle2: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 15,
    alignSelf: 'flex-start',
    color: 'black',
  },
  sendRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRequestGeneralContainer: {

  },
  sendRequestStyle: {
    width: 222,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#4EDE7F',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
});

export default ModalFuncionario;
