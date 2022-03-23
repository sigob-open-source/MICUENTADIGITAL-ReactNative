import {Modal, Dimensions, TouchableWithoutFeedback,StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const deviceHeight = Dimensions.get("window").height

export class BottomPopUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false
        }
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
                    color:'#182E44',
                    fontSize:20,
                    fontWeight:'500',
                    margin:15,
                    textAlign:'center'
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
                    backgroundColor:'#000000AA', 
                    justifyContent:'flex-end',
                    }}>

                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={{
                            backgroundColor:'white',
                            width:'100%',
                            borderTopRightRadius:10,
                            borderTopLeftRadius:10,
    
                            maxHeight:deviceHeight*0.4
                        }}>
                            {this.renderTitle()}
                            <TouchableOpacity>
                                <View style={styles.optionCard}>
                                    <View style={styles.collapsibleContent}>
                                        <MaterialCommunityIcons size={40} name='image-frame' color={'black'} />
                                        <Text style={styles.collapsibleText}>Galería</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <View style={styles.optionCard}>
                                    <View style={styles.collapsibleContent}>
                                        <MaterialCommunityIcons size={40} name='camera-outline' color={'black'} />
                                        <Text style={styles.collapsibleText}>Cámara</Text>
                                    </View>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    optionCard:{
        width:'100%',
        height:60,
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
    }
})