import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomPopUp } from './BottomPopUp';

const CardSolicitud = props => {
    let popupRef = React.createRef()
    const onShowPopup = () => {
        popupRef.show()
    }
    const onClosePopup = () => {
        popupRef.close()
    }
    const [shouldShow, setShouldShow] = useState(false);

    return(
        <View>
            <View style={{...styles.squareStyle,...props.style}}>
                <TouchableOpacity
                 onPress={onShowPopup}
                >
                <View style={{flex:1, backgroundColor:'transparent'}}>
                    <View style={styles.agregarImagen}>
                        <MaterialCommunityIcons size={60} name='image-outline' color={'gray'}/>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={{flex:1, flexDirection:'column',backgroundColor:'transparent'}}>
                    <View style={{flex:1, backgroundColor:'transparent'}}></View>
                    <View style={{flex:1, backgroundColor:'transparent', justifyContent:'center'}}>
                        <Text style={styles.textStyle}>Agregar imagen {"\n"}de evidencia</Text>
                    </View>
                    <View style={{flex:1, backgroundColor:'transparent'}}>
                        <Text style={styles.changeImageText}></Text>
                    </View>
                </View>
            </View>
            {/* Sección de comentario de usuario y ubicación de la solicitud */}
            <View>
                {
                    shouldShow ?(
                        <><View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <Icon size={40} name='person-circle-outline' color={'black'} />
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.TitleBottom}>Comentario de usuario</Text>
                                <Text style={styles.userComment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temport.</Text>

                            </View>

                        </View><View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                <MaterialCommunityIcons size={40} name='map-marker-outline' color={'black'} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={styles.TitleBottom}>Av. Ferrocaril y Salvador Cabrales</Text>
                                    <Text style={styles.verLocacionMapa}>Ver locación en el mapa.</Text>

                                </View>
                            </View></>
                    ) : null
                }
                <View style={styles.linea}></View>
            </View>
            <BottomPopUp
                title='Elegir imagen'
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
            />
        </View>

        
    );
} 

const styles = StyleSheet.create({
    agregarImagen:{
        flex:1,
        width:161,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E3E3E3'
    },  
    squareStyle:{
        marginTop:'3%',
        borderRadius:5,
        width: 333,
        height: 161,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignSelf:'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowRadius: 7,
        shadowOpacity: 0.09,
        elevation: 5,
        marginHorizontal:12
    },
    TitleBottom:{
        color:'black',
        marginLeft:'3%',
        fontSize:15
    },  
    userComment:{
        color:'#515151',
        marginLeft:'3%',
        fontSize:15
    },  
    textStyle:{
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'600'
    },
    changeImageText:{
        justifyContent:'center',
        alignSelf:'center',
        color:'#0097B8',
        fontWeight:'600',
        textDecorationLine:'underline'
     },
     verLocacionMapa:{
        marginLeft:'3%',
        justifyContent:'center',
        color:'#0097B8',
        fontWeight:'600',
        textDecorationLine:'underline'
     },
    imageStyle:{
        width:'100%',
        height:161,
        borderBottomLeftRadius:5,
        borderTopLeftRadius:5
    },
    linea:{
        alignSelf:'center',
        marginTop:'6%',
        width:336,
        height:2,
        backgroundColor:'#C8CCD0'
    },  
    squareStyleBlank:{
        borderRadius:5,
        width: 104,
        height: 95,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:12
    },
    iconContainer:{
        margin: 5,
    }
})

export default CardSolicitud;