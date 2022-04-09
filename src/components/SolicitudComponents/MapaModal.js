import {
  PermissionsAndroid, 
  Modal, 
  StyleSheet, 
  View, 
  Text, 
  Alert, 
  TouchableWithoutFeedback} from 'react-native';

import MapBoxGL from '@react-native-mapbox-gl/maps';
import axios from "axios";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import { NetInfo } from '@react-native-community/netinfo';

import React from 'react';
import Header from '../Header';
import MapboxGL from '@react-native-mapbox-gl/maps';

import Footer from '../Footer'

MapBoxGL.requestAndroidLocationPermissions()
MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo



export class MapaModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        show: false,
        lat: 0,
        long:0,
        coords: [0, 0],
        street:null
    }
  }

  changeCoordinates = (feature) =>{
    this.setState({
      coords: feature.geometry.coordinates,
    },this.apihandler)

  }

  apihandler=()=>{
    try{
      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+this.state.coords+'.json?language=es&type=address&access_token=pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ')
      .then(response => {
        const posts = response.data.features[0].place_name;
        this.setState({
          street:posts
        })
      })
    }catch(error){
      console.log(error)
    }

  }

  GetLocation() {
    
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          coords: [position.coords.longitude, position.coords.latitude],
          lat:position.coords.latitude,
          long:position.coords.longitude
        },this.apihandler)
        
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  close = () => {
    this.setState({show: false})
  }

  show = () => {
    if (this.state.lat == 0 && this.state.long == 0){
      this.GetLocation()
    }
    
    this.setState({show: true})
  }

  _handleSendLocation(){
    console.log(this.state.street)
    if (this.state.street != null){
      this.props.mapToParent(this.state.street,this.state.lat,this.state.long)
    }
    this.close()
  }

  renderOutsideTouchable(onTouch){
    const view = <View style={{flex:1, width:'100%'}}/>
    if (!onTouch) return view

    return(

      <TouchableWithoutFeedback onPress={onTouch} style={{flex:1,width:'100%'}}>
        {view}
      </TouchableWithoutFeedback>

    )
  }

  renderTitle = () => 
  {
    const {title} = this.props
    return(
      <View>
        <Text style={{
          color:'#8F8F8F',
          fontSize:16,
          margin:15,
        }}>
        {title}
        </Text>
      </View>
    );
  }
    
  render(){
    let {show} = this.state
    return(
      <Modal 
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >

        <View style={{flex:1,}}> 
          <Header 
            style={styles.header}
            item="Trámites" 
            imgnotif={require("../../../assets/imagenes/notificationGet_icon.png")} 
            img={require("../../../assets/imagenes/header_logo.png")} 
          />

          <TouchableWithoutFeedback>
            <View style={styles.streetName}>
              <Text>{this.state.street}</Text>
            </View>
          </TouchableWithoutFeedback>
 
          <TouchableWithoutFeedback onPress={()=> this._handleSendLocation()} >
          <View style={styles.sendRequestGeneralContainer}>
            <View style={styles.sendRequestStyle}>
              <View style={styles.sendRequestContainer}>
                <Text style={{
                  color:'black',
                  fontSize:20, 
                  fontWeight:'500'
                }}>Seleccionar Locación</Text>
              </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
          <View style={{
            flex:1,
            height:'100%',
            width:'100%',
            borderRadius:90}}
          >

            <MapboxGL.MapView
              logoEnabled={false}
              localizeLabels={true}
              onPress={(feature)=> this.changeCoordinates(feature)}
              styleURL={MapBoxGL.StyleURL.Street}
              zoomLevel={17}
              style={{flex:1}}
            >
              
              <MapBoxGL.Camera
                centerCoordinate={this.state.coords}
                zoomLevel={17}
                animationMode={'flyTo'}
                animationDuration={0}
              ></MapBoxGL.Camera>

              <MapBoxGL.MarkerView
                anchor={{ x: 0.5, y: 0.9 }}
                coordinate={this.state.coords}>
                <Fontisto style={{alignSelf:'flex-end'}}size={50} name='map-marker-alt' color={'#79142A'} />
              </MapBoxGL.MarkerView>

            </MapboxGL.MapView>
    
          </View>

        </View>

        <Footer 
          back={this.close}
          showBack={true} 
          style={styles.footer} 
        />
          
      </Modal>
    );
  }
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
  streetName:{
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginTop:'25%',
    zIndex:10,
    position:'absolute',
    width:336,
    height:30,
    borderRadius:5,
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height:3},
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },  
  optionCard:{
    width:'100%',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:7,
    backgroundColor:'#e6e6e6',
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
    marginTop:'155%',
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
})