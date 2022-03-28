import React, {Component, useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ButtonRequest from '../components/SolicitudComponents/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Peticiones = () =>{
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <Header style={styles.header} 
                item="Peticiones" 
                imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} 
                img={require("../../assets/imagenes/header_logo.png")}/>

                <ButtonRequest texto='Pagos' showArrow={true} iconName='keyboard-arrow-right'/>
                <ButtonRequest texto='Directorio de Funcionarios' showArrow={true} iconName='keyboard-arrow-right'/>
                <ButtonRequest texto='Oficinas de Atención' showArrow={true} iconName='keyboard-arrow-right'/>
            </View>

            <Footer style={styles.footer}/>

        </View>
        
    );
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height:64,
        width: '100%',
        backgroundColor:'#79142A',
        justifyContent:'center',
        alignItems:'center',
        borderBottomEndRadius:15,
        borderBottomLeftRadius:15,
        padding:20,
        marginBottom:14,
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

export default Peticiones;