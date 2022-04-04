import {PermissionsAndroid, Modal, StyleSheet, View, Text, Alert} from 'react-native';
import MapBoxGL from '@react-native-mapbox-gl/maps';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Geolocation from '@react-native-community/geolocation';

import React from 'react';
import Header from '../Header';
import MapboxGL from '@react-native-mapbox-gl/maps';

import Footer from '../Footer'

MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo

Geolocation.getCurrentPosition(info => console.log(info));

export class MapaModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        show: false,
        textLength:0,
        coords: [0,0]
    }
    this.maxLength = 250;
  }

  onChangeText(text){
    this.setState({
      textLength: text.length
    })
  }
  
  componentDidMount(){
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
    
        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

          this.state.coords = [currentLongitude,currentLatitude]

       }, (error) => Alert(error.message), { 
         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
       }
    );
  }

  close = () => {
    this.setState({show: false})
  }

  show = () => {
    this.setState({show: true})
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
    const {onTouchOutside, title} = this.props
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
            img={require("../../../assets/imagenes/header_logo.png")} />

          <View style={styles.sendRequestGeneralContainer}>
            <View style={styles.sendRequestStyle}>
              <View style={styles.sendRequestContainer}>
                <Text style={{color:'black',fontSize:20, fontWeight:'500'}}>Seleccionar Locación</Text>
              </View>
            </View>
          </View>
          
          <View style={{flex:1,height:'100%',width:'100%',borderRadius:90}}>

            <MapboxGL.MapView
              logoEnabled={false}
              localizeLabels={true}
              styleURL={MapBoxGL.StyleURL.Street}
              zoomLevel={17}
              style={{flex:1}}>
              
              <MapBoxGL.Camera
                centerCoordinate={this.state.coords}
                zoomLevel={17}
                animationMode={'flyTo'}
                animationDuration={0}>                  
              </MapBoxGL.Camera>

              <MapBoxGL.MarkerView
                //solo una coordinada de reemplazo en lo que se añade la funcionalidad para añadir marcadores con un onPress dell mapView
                coordinate={this.state.coords}>
                <Fontisto style={{alignSelf:'flex-end',}}size={60} name='map-marker-alt' color={'#79142A'} />
              </MapBoxGL.MarkerView>

            </MapboxGL.MapView>
    
          </View>

        </View>

        <Footer 
          back={this.close}
          showBack={true} 
          style={styles.footer} />
          
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