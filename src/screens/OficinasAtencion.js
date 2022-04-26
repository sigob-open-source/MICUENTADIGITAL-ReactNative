import {
  StyleSheet, 
  View, 
  Text, 
  Dimensions,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import React, {useState, useRef ,useEffect} from 'react';

import MapBoxGL from '@react-native-mapbox-gl/maps';
import axios from "axios";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';

import Header from '../components/Header';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Footer from '../components/Footer';

MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo

const deviceHeight = Dimensions.get("window").height

const OficinasAtencion = props =>{

  const translation = useRef(new Animated.Value(0)).current;
  const translation2 = useRef(new Animated.Value(0)).current;

  const [street, setStreet] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [coords, setCoords] = useState([0,0]);
  const [isLoading, setIsLoading] = useState([false]);
  const [oficinaAtencion1, setOficinaAtencion1] = useState([-114.73939380952801, 32.440140135692374])
  const [oficinaAtencion2, setOficinaAtencion2] = useState([-114.76148149851659, 32.43726940246955])
  const [oficinaAtencion3, setOficinaAtencion3] = useState([-114.75967905407789, 32.4570431663667])

  const goBack = () => {
    props.navigation.goBack();
  }

  const apihandler=()=>{
    try{
      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+coords+'.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ')
      .then(response => {
        const posts = response.data.features[0].place_name;
        setStreet(posts)
      })
    }catch(error){
      console.log(error)
    }
  }

  const goToOficina = (oficina) =>{
    getData()
    setCoords(oficina)
  }

  const GetLocation = () => {
    
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude,position.coords.latitude])
        setLongitude([position.coords.longitude])
        setLatitude([position.coords.latitude])
        
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  useEffect(() => {
    GetLocation()
  }, []);

  return(
    <View style={{flex:1,}}> 
      <Header style={styles.header}item="Oficinas de atención" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
      <View style={{flex:1}}> 
        <View style={{position:'absolute',flex:1,height:deviceHeight,width:'100%',borderRadius:90}}>

          <MapboxGL.MapView
            onPress={(feature)=>console.log('Coords:', feature.geometry.coordinates)}
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

            <MapBoxGL.MarkerView
              anchor={{ x: 0.5, y: 0.9 }}
              coordinate={oficinaAtencion1}>
              <Fontisto style={{alignSelf:'flex-end',}}size={50} name='map-marker-alt' color={'#79142A'} />
            </MapBoxGL.MarkerView>

            <MapBoxGL.MarkerView
              anchor={{ x: 0.5, y: 0.9 }}
              coordinate={oficinaAtencion2}>
              <Fontisto style={{alignSelf:'flex-end',}}size={50} name='map-marker-alt' color={'#79142A'} />
            </MapBoxGL.MarkerView>

            <MapBoxGL.MarkerView
              anchor={{ x: 0.5, y: 0.9 }}
              coordinate={oficinaAtencion3}>
              <Fontisto style={{alignSelf:'flex-end',}}size={50} name='map-marker-alt' color={'#79142A'} />
            </MapBoxGL.MarkerView>

          </MapboxGL.MapView>

        </View>
      </View>
            
      <Footer 
        back={goBack}
        showBack={true} 
        style={styles.footer} />

      <View style={styles.textInputStyle}>

        <TextInput  placeholderTextColor={'#C4C4C4'} style={{paddingLeft:14}}placeholder='Buscar Oficinas...'/>
        <View style={styles.buttonRowsStyle}>

        <TouchableOpacity onPress={()=> goToOficina(oficinaAtencion1)}>
          <View style={styles.SearchButtons}>
            <Text style={styles.textStyle}>Oficina 1</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> goToOficina(oficinaAtencion2)}>
          <View style={styles.SearchButtons}>
            <Text style={styles.textStyle}>Oficina 2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> goToOficina(oficinaAtencion3)}>
          <View style={styles.SearchButtons}>
            <Text style={styles.textStyle}>Oficina 3</Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    zIndex:10,
    position:'absolute',
    flexDirection:'row',
    height:64,
    width: '100%',
    backgroundColor:'#79142A',
    justifyContent:'center',
    alignItems:'center',
    borderBottomEndRadius:15,
    borderBottomLeftRadius:15,
    padding:20,
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
