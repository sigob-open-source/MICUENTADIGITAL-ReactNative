import React, { useState, useContext } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
} from 'react-native';

import { ubicacionOficinaContext } from '../helpers/Context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const ModalOficinasAtencion = props => {

  const [nombrOficina, setNombreOficina] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [coords, setCoords] = useState(null);
  const {selectedCoords, setSelectedCoords} = useContext(ubicacionOficinaContext)

  const apihandler=()=>{
    try{
      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+props.coords+'.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ')
      .then(response => {
        const posts = response.data.features[0].place_name;
        console.log(posts)
        setUbicacion(posts)
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
    console.log("test oppen")
    apihandler(coordinates);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      onShow={apihandler}
      visible={props.open}
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

          <Text style={styles.textStyle}>
            Oficina: {props.desc}
          </Text>

          {
            selectedCoords == null ?(
              <Text style={styles.textStyle}>
                Ubicación: Cargando...
              </Text>
            ) :
              <Text style={styles.textStyle}>
                Ubicación: {ubicacion}
              </Text> 
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
    height: 300,
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
});

export default ModalOficinasAtencion;
