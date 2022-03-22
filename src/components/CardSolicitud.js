import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CardSolicitud = props => {

    return(
        <View>
            <View style={{...styles.squareStyle,...props.style}}>
                <View style={{flex:1, backgroundColor:'transparent'}}>
                    <Image style={styles.imageStyle} source={require('../../assets/imagenes/blog-ph.jpg')}/>
                </View>
                <View style={{flex:1, flexDirection:'column',backgroundColor:'transparent'}}>
                    <View style={{flex:1, backgroundColor:'transparent'}}></View>
                    <View style={{flex:1, backgroundColor:'transparent', justifyContent:'center'}}>
                        <Text style={styles.textStyle}>image.png</Text>
                    </View>
                    <View style={{flex:1, backgroundColor:'transparent'}}>
                        <Text style={styles.changeImageText}>Cambiar Imagen...</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',marginTop:'5%'}}>
                <Icon size={40} name='person-circle-outline' color={'black'} />
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text style={styles.TitleBottom}>Comentario de usuario</Text>
                    <Text style={styles.userComment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temport.</Text>
                    
                </View>
                
            </View>
            <View style={{flexDirection:'row',marginTop:'5%'}}>
                <MaterialCommunityIcons size={40} name='map-marker-outline' color={'black'} />
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text style={styles.TitleBottom}>Av. Ferrocaril y Salvador Cabrales</Text>
                    <Text style={styles.verLocacionMapa}>Ver locación en el mapa.</Text>
                    
                </View>
                
            </View>
            <View style={styles.linea}></View>
        </View>

        
    );
} 

const styles = StyleSheet.create({
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