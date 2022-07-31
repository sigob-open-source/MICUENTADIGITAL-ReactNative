import React, { useState, useContext } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { ubicacionOficinaContext } from '../helpers/Context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import colors from '../utils/colors';

const ModalOficinasAtencion = props => {

  const [nombrOficina, setNombreOficina] = useState(null);
  const [ubicacion, setUbicacion] = useState("Desconocida");
  const [coords, setCoords] = useState(null);
  const {selectedCoords, setSelectedCoords} = useContext(ubicacionOficinaContext)
  const [shouldRender, setShouldRender] = useState(false);

  const apihandler=()=>{
    try{

      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+props.coords+'.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ')
      .then(response => {
        if (response.data.features[0] != undefined){
          const posts = response.data.features[0].place_name;
          setUbicacion(posts);

        }

        
      });
    }catch(error){
      console.log(error)
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

  const show = async () => {
    const coordinates = await props.coords

    if (coordinates != [null,null]){
      apihandler(coordinates);
      setShouldRender(true);
    }else{
      setShouldRender(false);
    }
    
  };

  return (
    <Modal
      transparent
      animationType="fade"
      onShow={apihandler}
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
            <Text style={styles.titleText}>Detalles de oficina</Text>
            <TouchableOpacity onPress={props.onTouchOutside}>
              <MaterialCommunityIcons style={{ marginRight: 15 }} size={30} name="arrow-left" color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

          <Text style={{
            fontWeight: '500',
            marginLeft: 15,
            fontSize: 22,
            alignSelf: 'flex-start',
            marginVertical: 10,
            color: 'black',
          }}
          >
            Oficina de atención {props.id}
          </Text>
          <ScrollView>
            <Text style={styles.textStyle}>
              Oficina: {props.desc}
            </Text>

            <Text style={styles.textStyle}>
              Responsable: {props.encargado}
            </Text>

            <Text style={styles.textStyle}>
              Horarios de atención: No disponibles.
            </Text>

            <Text style={styles.textStyle}>
              Concepto de Ingreso: Desconocido
            </Text>
            {
              props.concepto != null ? (
                props.concepto.map((item,index)=>(
                  <Text key={index} style={[styles.textStyle,{paddingLeft:15}]}>
                    -{item.descripcion}
                  </Text>
                ))
              ) : null
            }

            {
              selectedCoords == null ?(
                <Text style={styles.textStyle}>
                  Ubicación: Desconocida
                </Text>
              ) :
                <Text style={styles.textStyle}>
                  Ubicación: {ubicacion}
                </Text> 
            }
          </ScrollView>

          {
            selectedCoords != null ? (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={props.createRoute}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}> Generar ruta </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : 
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={props.createRoute}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyleUnavailable}> Dirección desconocida. No es posible generar ruta. </Text>
                  </View>
                </TouchableOpacity>
              </View>
          }


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
  whiteSquareContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 300,
    height: 400,
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
    marginLeft: 15,
    fontSize: 15,
    alignSelf: 'flex-start',
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
  buttonsContainer: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center', 
  }, 
  buttonStyle: {
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:25,
    justifyContent:'center',
    alignItems:'center',
    width:145,
    height:40,
    backgroundColor: colors.secundario,
    borderRadius:5,
  },  
  buttonTextStyle: {
    color:'white',
    fontWeight: '500',
  },
  buttonTextStyleUnavailable: {
    color:'black',
    textAlign:'center',
    fontWeight: '500',
  },
  buttonStyle: {
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:25,
    justifyContent:'center',
    alignItems:'center',
    width:255,
    height:40,
    backgroundColor: "transparent",
    borderRadius:5,
  }
});

export default ModalOficinasAtencion;
