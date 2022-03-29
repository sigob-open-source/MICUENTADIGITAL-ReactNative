import {PermissionsAndroid, Dimensions, StyleSheet, View, Text, TextInput,ScrollView} from 'react-native';
import MapBoxGL from '@react-native-mapbox-gl/maps';
import Fontisto from 'react-native-vector-icons/Fontisto';

import React from 'react';
import Header from '../components/Header';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Footer from '../components/Footer';

MapBoxGL.setAccessToken("pk.eyJ1IjoiYWRyaWFuMTYiLCJhIjoiY2wxNm5vbmh2MGRwbDNkbXpwOHJha243ayJ9.Ehsp5mf9G81ttc9alVaTDQ")
MapBoxGL.geo

const deviceHeight = Dimensions.get("window").height

const OficinasAtencion = () =>{

    componentDidMount = () =>{
        PermissionsAndroid.requestMultiple(
                   [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
                   {
                       title: 'Give Location Permission',
                   message: 'App needs location permission to find your position.'
               }
           )
   }


    renderTitle = () => {
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
    
    return(
        <View style={{flex:1,}}> 
            <Header style={styles.header}item="Oficinas de atención" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>

            <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={{position:'absolute',flex:1,height:deviceHeight,width:'100%',borderRadius:90}}>

                <MapboxGL.MapView
                onPress={(feature)=>console.log('Coords:', feature.geometry.coordinates)}
                localizeLabels={true}
                styleURL={MapBoxGL.StyleURL.Street}
                zoomLevel={17}
                followUserLocation={true}
                style={{flex:1}}>
                    <MapBoxGL.Camera
                        zoomLevel={17}
                        followUserLocation={true}
                        animationMode={'flyTo'}
                        animationDuration={0}>
                                                
                    </MapBoxGL.Camera>
                    <MapBoxGL.MarkerView
                        //solo una coordenada de reemplazo en lo que se añade la funcionalidad para añadir marcadores con un onPress dell mapView
                        coordinate={[-114.73939380952801, 32.440140135692374]}>
                        <Fontisto style={{alignSelf:'flex-end',}}size={60} name='map-marker-alt' color={'#79142A'} />
                    </MapBoxGL.MarkerView>
                </MapboxGL.MapView>

            </View>
            <View style={{flex:1}}></View>
            
            <Footer style={styles.footer}/>
            
            
            <View style={styles.textInputStyle}>
                <TextInput style={{paddingLeft:14}}placeholder='Buscar Oficinas...'/>
                <View style={styles.buttonRowsStyle}>

                    <View style={styles.SearchButtons}>
                        <Text>Oficina 1</Text>
                    </View>
                    <View style={styles.SearchButtons}>
                        <Text>Oficina 2</Text>
                    </View>
                    <View style={styles.SearchButtons}>
                        <Text>Oficina 3</Text>
                    </View>

                </View>
                
            </View>      
            </ScrollView>
        </View>
    );
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
