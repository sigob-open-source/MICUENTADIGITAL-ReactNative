
import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';

import CardSolicitud from '../components/CardSolicitud';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/CardPagos';

const SECTIONS = [
    {
      title: 'Solicitud',
      content: 'Lorem ipsum...',
      icono:'chart-box-outline'
    },

  ];

class Solicitud extends Component{
    state = {
        activeSections: [],
      };
    
      _renderSectionTitle = (section) => {
        return (
          <View style={styles.content}>

          </View>
        );
      };
    
      _renderHeader = (section) => {
        return (
          <View style={styles.optionCard}>
            <View style={styles.collapsibleContent}>
                <MaterialCommunityIcons size={40} name={section.icono} color={'black'} />
                <Text style={styles.collapsibleText}>{section.title}</Text>
                <View style={{flex:1, marginRight:'5%'}}>
                    <MaterialIcons style={{alignSelf:'flex-end',}}size={40} name='keyboard-arrow-down' color={'black'} />
                </View>
            </View>
          </View>
        );
      };
    
      _renderContent = (section) => {
        return (
          <View style={styles.content}>
            <CardSolicitud/>
          </View>
        );
      };
    
      _updateSections = (activeSections) => {
        this.setState({ activeSections });
      };

    render() {

        return(
            <View style={styles.container}>
                <Header style={styles.header}item="Trámites" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
                    <ScrollView contentContainerStyle={{padding:10}}>
                        <View style={{flex:1, marginTop:9,marginHorizontal:'2%'}}>
                            <Accordion
                                sections={SECTIONS}
                                activeSections={this.state.activeSections}
                                renderSectionTitle={this._renderSectionTitle}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                                onChange={this._updateSections}
                                underlayColor={'transparent'}
                                expandMultiple={true}
                            />
                            <TouchableOpacity backface>
                                <View style={styles.optionCard}>
                                    <View style={styles.collapsibleContent}>
                                        <MaterialCommunityIcons size={40} name='chart-box-outline' color={'black'} />
                                        <Text style={styles.collapsibleText}>Cambiar Comentario</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.optionCard}>
                                    <View style={styles.collapsibleContent}>
                                        <MaterialCommunityIcons size={40} name='chart-box-outline' color={'black'} />
                                        <Text style={styles.collapsibleText}>Cambiar Dirección</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sendRequestGeneralContainer}>
                                <View style={styles.sendRequestStyle}>
                                        <View style={styles.sendRequestContainer}>
                                            <Text style={{color:'black',fontSize:20, fontWeight:'500'}}>Enviar Solicitud</Text>
                                        </View>
                                    </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                <Footer style={styles.footer}/>
            </View>
        );
    }
    
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
        marginTop:'55%'
    },  
    optionCard:{
        width:333,
        height:80,
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
    sendRequestStyle:{
        width:333,
        height:80,
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