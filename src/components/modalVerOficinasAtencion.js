import React, { useState, useContext } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';

import { ubicacionOficinaContext } from '../helpers/Context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import colors from '../utils/colors';

const WIDTH = Dimensions.get('window').width;

const ModalVerOficinasAtencion = props => {

  const [oficinasAte, setOficinasAte] = useState(props.data)
  const [nombrOficina, setNombreOficina] = useState(null);
  const [ubicacion, setUbicacion] = useState("Desconocida");
  const [coords, setCoords] = useState(null);
  const {selectedCoords, setSelectedCoords} = useContext(ubicacionOficinaContext)
  const [shouldRender, setShouldRender] = useState(false);

  const apihandler=()=>{
    try{
      console.log(props.coords)
      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+props.coords+'.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ')
      .then(response => {
        if (response.data.features[0] != undefined){
          const posts = response.data.features[0].place_name;
          setUbicacion(posts);
          console.log(posts);
        }

        
      });
    }catch(error){
      console.log(error)
    }
  }

  const renderItem = (item) => {
    return(
      <View>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.collapsibleText}>{item.descripcion}</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
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
          <Text style={styles.titleText}></Text>
            <Text style={styles.titleText}>Ver Oficinas</Text>
            <TouchableOpacity onPress={props.onTouchOutside}>
              <MaterialCommunityIcons style={{ marginRight: 15 }} size={30} name="arrow-left" color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

          <Text style={{
            fontWeight: '500',
            marginLeft: 15,
            fontSize: 22,
            alignSelf: 'center',
            marginVertical: 10,
            color: 'black',
          }}
          >
            Oficinas Disponibles
          </Text>

          <FlatList
            data={props.data}
            renderItem={({ item, index }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />

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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

  },
  titleText: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 15,
    color: 'black'
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
  content: {
    width: WIDTH,
    height: 50,
    marginBottom:10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth:2,
    borderBottomWidth:2,
    borderColor:'#79142A',
  },
  collapsibleText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    fontSize: 0.05 * WIDTH,
    color: 'black',
    textAlign:'center'
  },
});

export default ModalVerOficinasAtencion;
