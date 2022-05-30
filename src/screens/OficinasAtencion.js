import {
  StyleSheet, 
  View, 
  Text, 
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import MapBoxGL from '@react-native-mapbox-gl/maps';
import useKeyboard from '../utils/keyboardListener';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import { getOficinas } from '../services/api';
import { ubicacionOficinaContext } from '../helpers/Context';

import Header from '../components/Header';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Footer from '../components/Footer';
import ModalOficinasAtencion from '../components/modalOficinasAtencion';

MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo

const deviceHeight = Dimensions.get("window").height
const WIDTH = Dimensions.get('window').width;

const OficinasAtencion = props =>{
  let popupRef = React.createRef();

  const [street, setStreet] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [coords, setCoords] = useState([0,0]);
  const [isLoading, setIsLoading] = useState([false]);
  const [oficinas, setOficinas] = useState(null)
  const [filteredOficinas, setFilteredOficinas] = useState(null)
  const [renderPoints, setRenderPoints] = useState(false)
  const [id, setId] = useState(null)
  const [desc, setDesc] = useState(null)
  const [selectedCoords, setSelectedCoords] = useState(null)
  const [collapsed, setCollapsed] = useState(true)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)

  const toggleExpanded = () => {
    if (oficinas != null){
      setNumberOfElements(filteredOficinas.length)
      setCollapsed(collapsed => !collapsed)
    }
  };

  const onShowPopup = async (id, lat, long, desc) => {
    const location = await lat
    setId(id)
    setSelectedCoords([lat,long])
    setDesc(desc)
    setOpen(true);
  };

  const onClosePopup = () => {
    setOpen(false);
  };

  const goBack = () => {
    props.navigation.goBack();
  }

  const getData = async () =>{
    const response = await getOficinas()
    setOficinas(response)
    setFilteredOficinas(response)
    setRenderPoints(true)
  }

  const goToOficina = (id, lat, long, desc) =>{
    onShowPopup(id, lat, long, desc)
    setCoords([lat,long])
  }

  const GetLocation = () => {
    getData()
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude,position.coords.latitude])
        setLongitude([position.coords.longitude])
        setLatitude([position.coords.latitude])
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  const renderItem = (item) => {
    if (item.direccion != null){
      return(
        <TouchableOpacity activeOpacity={.5} onPressIn={()=> goToOficina(item.id, item.direccion.longitud, item.direccion.latitud, item.descripcion)}>
          <View style={styles.content}>
            <Text style={styles.collapsibleText}>{item.descripcion}</Text>
          </View>
        </TouchableOpacity>
      );
    }

  }

  // Buscar un tramite en especifico filtrando dependiendo de lo que se devuelva en el campo de texto
  const searchOficina = (oficinaToSearch) => {
    if (oficinas != null) {
        const filteredOficces = oficinas.filter((item) => {
          return item.descripcion.toLowerCase().includes(oficinaToSearch.toLowerCase())
        });
        setFilteredOficinas(filteredOficces)
    }
  }

  const createOficinaMasUsada = () =>{
    if (oficinas != null) {
      var offices = oficinas.slice(0, 3);
      return offices.map((item, index) => (
        
        item.direccion === null ? (
          null
        ) :
          <TouchableOpacity key={index} onPress={()=> goToOficina(item.id, item.direccion.longitud, item.direccion.latitud, item.descripcion)}>
            <View style={styles.SearchButtons}>
              <Text style={styles.textStyle}>Oficina {item.id}</Text>
            </View>
          </TouchableOpacity>
      ));
    }    
  }

  const createOficina = () => {
    if (oficinas != null) {
      return oficinas.map((item, index) => (

        item.direccion === null ? (
          null
        ) :

        <TouchableOpacity key={index} onPress={()=>onShowPopup(item.id, item.direccion.longitud, item.direccion.latitud, item.descripcion)}>
          <MapBoxGL.MarkerView
            anchor={{ x: 0.5, y: 0.9 }}
            coordinate={[item.direccion.longitud, item.direccion.latitud]}>
            <Fontisto style={{alignSelf:'flex-end',}}size={50} name='map-marker-alt' color={'#79142A'} />
          </MapBoxGL.MarkerView>
        </TouchableOpacity>
      ));
    }
  };
  useEffect(() => {
    if (renderPoints){
      setOpen(true);
    }
    if (!renderPoints){
      GetLocation()
    }
    
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };    
  }, [selectedCoords]);

  return(
    <View style={{flex:1,}}> 
      <Header style={styles.header}item="Oficinas de atención" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
     
      <ubicacionOficinaContext.Provider value={{selectedCoords,setSelectedCoords}}>
        <ModalOficinasAtencion
          open={open}
          onTouchOutside={onClosePopup}      
          id={id}
          coords={selectedCoords}
          desc={desc}
        />
      </ubicacionOficinaContext.Provider>

      <View style={{flex:1}}> 
        <View style={{position:'absolute',flex:1,height:deviceHeight,width:'100%',borderRadius:90}}>

          <MapboxGL.MapView
            localizeLabels={true}
            styleURL={MapBoxGL.StyleURL.Street}
            zoomLevel={17}
            followUserLocation={true}
            style={{flex:1}}>

            <MapBoxGL.Camera
              centerCoordinate={coords}
              zoomLevel={12}
              animationMode={'flyTo'}
              animationDuration={0}>              
            </MapBoxGL.Camera>

            {
              renderPoints ? (
                createOficina()
              ) : null
            }

          </MapboxGL.MapView>

        </View>
      </View>
            
      <Footer 
        back={goBack}
        showBack={true} 
        style={styles.footer} />
      
      <View style={styles.textInputStyle}>

        <TextInput 
          onChangeText={(text)=> searchOficina(text)} 
          onPressIn={()=> toggleExpanded()} 
          placeholderTextColor={'#C4C4C4'} 
          style={{paddingLeft:14}}
          placeholder='Buscar Oficinas...'
        >
        </TextInput>

        {
          isKeyboardVisible ?(
            
            <View style={{height:numberOfElements*50}}>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={filteredOficinas}
                renderItem={({ item, index }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>     
          ) :
            <View style={styles.buttonRowsStyle}>

            {
              renderPoints ? (
                createOficinaMasUsada()
              ) : null
            }
    
            </View>
        }
      </View>            
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    width: 333,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  collapsibleText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    marginLeft: '1.5%',
    fontSize: 0.05 * WIDTH,
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
  footer:{
    flexDirection:'row',
    height:64,
    width: '100%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
  optionCard:{
    width:'100%',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:7,
    backgroundColor:'#e6e6e6',
  },
  textStyle:{
      color:'black'
  },  
  collapsibleContent:{
    marginLeft:'5%',
    flexDirection:'row',
    alignItems:'center',
  },
  collapsibleText:{
    fontWeight:'500',
    marginLeft:'10%',
    fontSize:20,
    color:'black',
  },
  sendRequestContainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  sendRequestGeneralContainer:{
    marginTop:'165%',
    zIndex:10,
    position:'absolute',
    backgroundColor:'transparent',
    flex:0.2,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
  },
  sendRequestStyle:{
    width:333,
    height:60,
    justifyContent:'center',
    alignSelf:'center',
    marginTop:7,
    borderRadius:5,
    backgroundColor:'#4EDE7F',
    shadowColor: 'black',
    shadowOffset: {width: 0, height:3},
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyle:{
    marginTop:'25%',
    alignSelf:'center',
    position:'absolute',
    zindex:10,
    width:336,
    height:45,
    borderRadius:5,
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height:3},
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginHorizontal:12
  },
  buttonRowsStyle:{
    flexDirection:'row',     
    justifyContent:'center'
  },
  SearchButtons:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:12,
    marginHorizontal:10,
    width:91,
    height:23,
    borderRadius:3,
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height:3},
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  }
})

export default OficinasAtencion;
