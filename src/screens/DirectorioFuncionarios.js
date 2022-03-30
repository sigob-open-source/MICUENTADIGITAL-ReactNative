import React from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

const DirectorioFunc = () =>{
    return(

        <View style={{flex:1,height:'100%'}}>

            <View style={{flex:1, alignItems:'center', }}>

                <Header style={styles.header} 
                item="Peticiones" 
                imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} 
                img={require("../../assets/imagenes/header_logo.png")}/>
                
                <Text style={{color:'black',fontSize:20,fontWeight:'700'}}> Funcionario </Text>

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInputStyle} placeholder='Dependencia/Oficina.*'/>
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInputStyle} placeholder='Busqueda de texto.'/>
                </View>

            </View>

            <TouchableOpacity>

                <View style={styles.searchButton}>
                    <Text style={styles.buttonText}>Buscar Funcionario</Text>
                </View>

            </TouchableOpacity>

            <Footer style={styles.footer}/>

        </View>
    );
}

const styles = StyleSheet.create({
    searchButton:{
        width:336,
        height:46,
        borderRadius:5,
        backgroundColor:'#79142A',
        alignSelf:'center',
        marginBottom:23,
        justifyContent:'center'
    },
    buttonText:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'600'
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
})

export default DirectorioFunc;
