
import React, {Component, useState} from 'react';
import { StyleSheet, View, TextInput,Platform, StatusBar,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';

//test comment
const Test = () =>(
    <View style={styles.container}>
        <Header style={styles.header}item="Pagos" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>

        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInputStyle} placeholder='Buscar...'/>
        </View>

        <View style={styles.menuContainer}>
            <Square nombreItem='Refrendos vehiculares' img={require("../../assets/imagenes/refrendos_icono.png")}/>
            <Square nombreItem='Nomina' img={require("../../assets/imagenes/nomina_icono.png")}/>
            <Square nombreItem='Prediales' img={require("../../assets/imagenes/prediales_icono.png")}/>
        </View>
        <Footer style={styles.footer}/>
    </View>
);


const styles = StyleSheet.create({
    container:{
       // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
        backgroundColor:'#EDF2F5',
    },
    menuContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingHorizontal:19,
        paddingVertical:21,
    },
    textInputContainer:{
        marginTop:21,
        width:336,
        height:46,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowRadius: 7,
        shadowOpacity: 0.09,
        elevation: 5,
    },
    textInputStyle:{
        height:'100%',
        marginLeft:14,
        fontSize:13
    },
    iconContainer:{
        width: 39,
        height: 30,
        margin: 5,
    },
    header:{
        flexDirection:'row',
        height:64,
        width: '100%',
        backgroundColor:'#79142A',
        justifyContent:'center',
        alignItems:'center',
        borderBottomEndRadius:15,
        borderBottomLeftRadius:15,
        padding:20
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

export default Test;