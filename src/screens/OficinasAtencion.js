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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import ConnectionCheck from '../components/internetChecker';
import axios from 'axios';
import { getOficinas } from '../services/api';
import { getTramites } from '../services/api';
import { ubicacionOficinaContext } from '../helpers/Context';

import Header from '../components/Header';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Footer from '../components/Footer';
import ModalOficinasAtencion from '../components/modalOficinasAtencion';
import ModalVerOficinasAtencion from '../components/modalVerOficinasAtencion';

//AcessToken para poder utilizar las funcionalidades de MapBox.
MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo

//Obtiene las dimensiones del dispositivo actual.
const deviceHeight = Dimensions.get("window").height
const WIDTH = Dimensions.get('window').width;

const OficinasAtencion = props =>{

  const [collapsed,setCollapsed] = useState(true);
  const [coords, setCoords] = useState([0,0]);//Indica a que coordenadas debe moverse la camara.
  const [oficinas, setOficinas] = useState(null)//Todas las oficinas se guardan aquí.
  const [filteredOficinas, setFilteredOficinas] = useState(null)//Se usa para filtrar oficinas desde el cuadro de busqueda.
  const [renderPoints, setRenderPoints] = useState(false)//Determina si deben de renderizarse los puntos donde se encuentran las oficinas.
  const [id, setId] = useState(null)//ID de la oficina de atención.
  const [desc, setDesc] = useState(null)//Descripción de la oficina de atención.
  const [selectedCoords, setSelectedCoords] = useState(null)//Son las coordenadas para determinar la dirección de la oficina desde el api de mapbox, dentro del primer modal.
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);//Determina si el teclado está abierto o no.
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [open, setOpen] = useState(false)//Determina si debe de abrirse el modal de la oficina seleccionada.
  const [open2, setOpen2] = useState(false)//Determina si debe de abrirse el modal que muestra todas las oficinas.
  const [userInitialCoords, setUserInitialCoords] = useState(null);//Las coordenadas iniciales del usuario.
  const [route, setRoute] = useState(null);//Ruta generada apartir del api de Mapbox, desde tu posición actual hasta la de la oficina.
  const [zoomLevel, setZoomLevel] = useState(12);//Nivel de Zoom del mapa.
  const [encargado, setEncargado] = useState(null);//Persona encargada de la oficina de atención.
  const [concepto, setConcepto] = useState(null); //Concepto de la ofincina de atención seleccionada.

  //Esta llamada al api de mapbox es la que genera la ruta entre tu posición y la posición de la oficina de atención.
  const apihandler=()=>{
    try{
      axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${userInitialCoords[0]},${userInitialCoords[1]};${selectedCoords[0]},${selectedCoords[1]}?geometries=geojson&overview=full&alternatives=true&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ`)
      .then(response => {
          const posts = response.data
          setCoords(userInitialCoords);
          setRoute(posts);
          setZoomLevel(4);
          setOpen(false);
      });
    }catch(error){
      console.log(error)
    }
  }

  //Muestra las oficinas encontradas desde el cuadro de busqueda.
  const toggleExpanded = () => {
    if (oficinas != null){
      setNumberOfElements(filteredOficinas.length)
      setCollapsed(collapsed => !collapsed)
    }
  };

  //Función para arbir el modal de todas las oficinas.
  const onShowPopup2 = (data) => {
    setOpen2(true);
  };

  //Función para cerrar el modal con la info de la oficina
  const onClosePopup = () => {
    setOpen(false);
  };

  //Navegar a la pantalla anterior (Función del footer)
  const goBack = () => {
    props.navigation.goBack();
  }

  //Obtiene todas las oficinas
  const getData = async () =>{
    const response = await getOficinas();
    setOficinas(response);
    setFilteredOficinas(response);
    setRenderPoints(true);
  }

  //Obtiene oficinas desde el endpoint de trámites
  const getDataTramites = async () => {
    const response = await getTramites(1);
    for(let i=0;i<response.length;i++){
      setOficinas(oficinas => [...oficinas, response[i].departamentos]);
    }
    
  }

  //Función para abrir el modal que muestra toda la información sobre la oficina seleccionada.
  const goToOficina = async (id, lat, long, desc, encargado, concept) =>{
    const location = await lat;
    setId(id);
    setSelectedCoords([lat,long]);
    setDesc(desc);
    setOpen(true);
    setCoords([lat,long]);
    setConcepto(concept);
    setEncargado(encargado);
  }

  //Obtiene la dirección del usuario 
  const GetLocation = () => {
    getData();
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude,position.coords.latitude])
        setUserInitialCoords([position.coords.longitude,position.coords.latitude])
        //setLongitude([position.coords.longitude])
        //setLatitude([position.coords.latitude])
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  //Función para renderizar Oficinas en el cuadro de busqueda
  const renderItem = (item) => {
    if (item.direccion != null){
      return(
        <TouchableOpacity activeOpacity={.5} onPressIn={()=> goToOficina(
          item.id, 
          item.direccion.longitud, 
          item.direccion.latitud, 
          item.descripcion,
          item.jefe_de_cajeros.first_name+' '+item.jefe_de_cajeros.last_name+' '+item.jefe_de_cajeros.second_last_name,
          item.conceptos_de_ingreso,
        )}>
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

  //Crea los recuadros de las 3 primeras oficinas en el database. Si hay menos de 3 se crearán solo las que haya disponibles, ya sean dos, una o ninguna
  const createOficinaMasUsada = () =>{
    if (oficinas != null) {
      var offices = oficinas.slice(0, 3); //Corta la variable para mostrar solo 3 resultados.
      return offices.map((item, index) => (
        
        item.direccion == null ? (
          null
        ) :
          <TouchableOpacity key={index} onPress={()=> goToOficina(
            item.id, 
            item.direccion.longitud, 
            item.direccion.latitud, 
            item.descripcion,
            item.jefe_de_cajeros.first_name+' '+item.jefe_de_cajeros.last_name+' '+item.jefe_de_cajeros.second_last_name,
            item.conceptos_de_ingreso,
          )}>
            <View style={styles.SearchButtons}>
              <Text style={styles.textStyle}>Oficina {item.id}</Text> 
            </View>
          </TouchableOpacity>
      ));
    }    
  }

  //Crea la oficina en sí en el mapa, utilizando sus coordenadas para saber en que parte del mapa se deben de crear.
  const createOficina = () => {
    if (oficinas != null) {
      var offices = oficinas;
      return offices.map((item, index) => (
        item.direccion == null ? (
          null
        ) :
        <TouchableOpacity key={index} onPress={()=>goToOficina(
          item.id, 
          item.direccion.longitud, 
          item.direccion.latitud, 
          item.descripcion,
          item.jefe_de_cajeros.first_name+' '+item.jefe_de_cajeros.last_name+' '+item.jefe_de_cajeros.second_last_name,
          item.conceptos_de_ingreso,
        )}>
          <MapBoxGL.MarkerView
            anchor={{ x: 0.5, y: 0.9 }}
            coordinate={[item.direccion.longitud,item.direccion.latitud]}
            >
            <Fontisto style={{alignSelf:'flex-end',}}size={50} name='map-marker-alt' color={'#79142A'} />
          </MapBoxGL.MarkerView>
        </TouchableOpacity>
      ));
    }    
  };

  //Se ejecuta al entrar a la pantalla
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
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };    
  }, [selectedCoords]);

  return(
    <View style={{flex:1,}}> 
    <ConnectionCheck/>
      <Header style={styles.header}item="Oficinas de atención" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
     
      <ubicacionOficinaContext.Provider value={{selectedCoords,setSelectedCoords}}>
        <ModalOficinasAtencion
          open={open}
          onTouchOutside={onClosePopup}      
          id={id}
          coords={selectedCoords}
          desc={desc}
          createRoute={apihandler}
          encargado={encargado}
          concepto={concepto}
        />
      </ubicacionOficinaContext.Provider>


      <ModalVerOficinasAtencion
          open={open2}
          data={oficinas}
          onTouchOutside={()=>setOpen2(false)}      
          id={id}
          coords={selectedCoords}
          desc={desc}
          createRoute={apihandler}
          encargado={encargado}
          concepto={concepto}
          openModal={()=>goToOficina}
        />

      <View style={{flex:1}}> 
        <View style={{position:'absolute',flex:1,height:deviceHeight,width:'100%',borderRadius:90}}>

          <MapboxGL.MapView
            localizeLabels={true}
            styleURL={MapBoxGL.StyleURL.Street}
            zoomLevel={17}
            followUserLocation={true}
            style={{flex:1}}>
            <MapboxGL.UserLocation visible={true} />

            {
              route != null ?(
                <MapboxGL.ShapeSource id="routeSource" shape={route.routes[0].geometry}>
                  <MapboxGL.LineLayer id="routeFill" style={{lineColor: "#ff8109", lineWidth: 3.2, lineCap: MapboxGL.LineJoin.Round, lineOpacity: 1.84}} />
                </MapboxGL.ShapeSource>
              ) : null
            }

            <MapBoxGL.Camera
              centerCoordinate={coords}
              zoomLevel={zoomLevel}
              animationMode={'flyTo'}
              animationDuration={500}>              
            </MapBoxGL.Camera>

            {
              renderPoints ? (
                createOficina()
              ) : null
            }

          </MapboxGL.MapView>

        </View>
      </View>
      <TouchableOpacity onPress={onShowPopup2}>
          <View style={styles.iconAvanzadoContainer}>
            <Text style={{color:'white', fontWeight:'600', textAlign:'center'}}>
              Ver oficinas
            </Text>
          </View>
        </TouchableOpacity>
      <Footer 
        back={goBack}
        showBack={true} 
        style={styles.footer} />
      
      <View style={styles.textInputStyle}>
        <View style={{flexDirection:'row'}}>

        <TextInput 
          onChangeText={(text)=> searchOficina(text)} 
          onPressIn={()=> toggleExpanded()} 
          placeholderTextColor={'#C4C4C4'} 
          style={{paddingLeft:14}}
          placeholder='Buscar Oficinas...'
        >
        </TextInput>
        </View>
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
    width: 336,
    borderRadius:5,
    marginTop:8,
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
  },
  iconAvanzadoContainer: {
    backgroundColor: '#79142A',
    height: 46,
    width: 336,
    alignSelf:'center',
    marginBottom:20,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius:5,
    marginTop:10,
  },
})

export default OficinasAtencion;
