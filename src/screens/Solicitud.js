import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ModalSolicitud } from '../components/SolicitudComponents/ModalSolicitud';
import { ComentarioModal } from '../components/SolicitudComponents/ComentariosModal';
import { MapaModal } from '../components/SolicitudComponents/MapaModal';

import CardSolicitud from '../components/SolicitudComponents/CardSolicitud';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ButtonRequest from '../components/SolicitudComponents/Button';


const Solicitud = props =>{
        let popupRef = React.createRef()
        let popupRef2 = React.createRef()
        let popupRef3 = React.createRef()
        const onShowPopup = () => {
            popupRef.show()
        }
        const onClosePopup = () => {
            popupRef.close()
        }

        const onShowCommentPopup = () => {
            popupRef2.show()
        }
        const onCloseCommentPopup = () => {
            popupRef2.close()
        }

        const onShowMapPopup = () => {
            popupRef3.show()
        }
        const onCloseMapPopup = () => {
            popupRef3.close()
        }
 
        return(
            <View style={styles.container}>
                <ModalSolicitud
                    title='Elegir Razón'
                    ref={(target) => popupRef = target}
                    onTouchOutside={onClosePopup}                           
                 />
                <Header style={styles.header}item="Trámites" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
                <ComentarioModal
                    title='Escribe tu comentario'
                    ref={(target) => popupRef2 = target}
                    onTouchOutside={onClosePopup}                   
                 />

                <MapaModal
                    ref={(target) => popupRef3 = target}
                    onTouchOutside={onClosePopup}                   
                 />
                    <ScrollView contentContainerStyle={{padding:10,paddingHorizontal:0}}>
                        <View style={{flex:1, marginTop:9,marginHorizontal:'2%'}}>

                                <TouchableOpacity  onPress={onShowPopup}>
                                    <ButtonRequest texto='Motivo de Solicitud' showArrow={true}/>
                                </TouchableOpacity>

                                <CardSolicitud></CardSolicitud>

                                <TouchableOpacity  onPress={onShowCommentPopup}>
                                    <ButtonRequest texto='Cambiar Comentario' />
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={onShowMapPopup}>
                                    <ButtonRequest texto='Cambiar Dirección' />
                                </TouchableOpacity>

                            <View style={styles.sendRequestGeneralContainer}>
                                <View style={styles.sendRequestStyle}>
                                        <View style={styles.sendRequestContainer}>
                                            <Text style={{color:'black',fontSize:20, fontWeight:'500'}}>Enviar Solicitud</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                    </ScrollView>
                <Footer style={styles.footer}/>

            </View>
        );
    }
    


const styles = StyleSheet.create({
    container:{
       // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
        backgroundColor:'#EDF2F5',
       
    },
    content:{
        marginVertical:5,
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
        marginTop:'25%'
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
    optionCard:{
        width:333,
        height:60,
        justifyContent:'center',
        alignSelf:'center',
        marginTop:7,
        borderRadius:5,
        backgroundColor:'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowRadius: 7,
        shadowOpacity: 0.09,
        elevation: 5,
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
})

export default Solicitud;