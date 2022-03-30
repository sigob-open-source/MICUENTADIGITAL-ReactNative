import {Modal, Dimensions, TouchableWithoutFeedback,StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import React from 'react';
import Header from '../Header';

const deviceHeight = Dimensions.get("window").height

export class ComentarioModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            textLength:0
        }
        this.maxLength = 250;

    }

    onChangeText(text){
        this.setState({
            textLength: text.length
        })
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
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
                <View style={{
                    flex:1,
 
                    }}> 
                        <Header style={styles.header}item="Trámites" imgnotif={require("../../../assets/imagenes/notificationGet_icon.png")} img={require("../../../assets/imagenes/header_logo.png")}/>
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={{
                            backgroundColor:'#EDF2F5',
                            width:'100%',
                            height:'100%',
                            
                        }}>
                        {this.renderTitle()}

                        <TextInput onChangeText={this.onChangeText.bind(this)} maxLength={250} style={{paddingHorizontal:'5%'}} multiline={true}></TextInput>
                        <View style={{width:'95%',height:1, backgroundColor:'black', alignSelf:'center'}}></View>
                        <Text style={{textAlign:'right', paddingHorizontal:'5%'}}>{this.state.textLength}/250</Text>
                        <View style={styles.sendRequestGeneralContainer}>
                            <View style={styles.sendRequestStyle}>
                                     <View style={styles.sendRequestContainer}>
                                        <Text style={{color:'black',fontSize:20, fontWeight:'500'}}>Subir Comentario</Text>
                                    </View>
                                </View>
                        </View>

                    </View>
                </View>
                    
            </Modal>
        );
    }
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
        marginTop:'120%'
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
})