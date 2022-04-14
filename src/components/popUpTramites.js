import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native' 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class PopUpTramites extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      nombreTramite: null,
      descTramite: null,
      nombreDepartamento: null,
      requisitos: 'Sin requisitos'
    }
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

  show = () => {
    this.setState({
      show: true, 
      nombreTramite:this.props.nombreTramite,
      descTramite:this.props.descTramite,
      nombreDepartamento:this.props.nombreDepartamento,
      requisitos:this.props.requisitos
    })
  }

  close = () => {
    this.setState({show: false})
  }

  render(){
    let {show} = this.state
    const {onTouchOutside} = this.props
    return(
      <Modal
      transparent={true} 
      animationType={'fade'}
      visible={show}
      onRequestClose={this.close} >
        <View style={{
          flex:1,
          backgroundColor:'#000000AA', 
          justifyContent:'center',
          alignItems:'center'
          }}>

          {this.renderOutsideTouchable(onTouchOutside)}

          <View style={styles.whiteSquareContainer}>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',}}>
              <Text style={styles.titleText}>Requisitos del trámite</Text>
              <TouchableOpacity onPress={()=> this.close()}>
                <MaterialCommunityIcons style={{marginRight:15}}size={30} name='arrow-left' color={'black'} />
              </TouchableOpacity>
            </View>

          <View style={{width:'100%',backgroundColor:'black',height:1}}></View>

            <Text style={{
              fontWeight:'500',
              marginLeft:15,
              fontSize:22,
              alignSelf:'flex-start',
              marginVertical:10,
              color:'black'
            }}>{this.state.nombreTramite}</Text>

            <Text style={styles.textStyle}>Descripción: {this.state.descTramite}</Text>
            <Text style={styles.textStyle}>Departamentos:</Text>
            <Text style={styles.textStyle2}>Nombre: {this.state.nombreDepartamento}</Text>
            <Text style={styles.textStyle}>Requisitos: Sin requisitos.</Text>
          </View>

        </View>


      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    opacity:0.5
  },
  whiteSquareContainer:{
    position:'absolute',
    zIndex:10,
    width:300,
    height:300,
    backgroundColor:'white',
    borderRadius:10
  },
  titleText:{
    fontWeight:'500',
    fontSize:18,
    marginLeft:15,
    alignSelf:'flex-start',
    marginVertical:15,
    color:'black'
  },
  textStyle:{
    marginVertical:5,
    fontWeight:'500',
    marginLeft:15,
    fontSize:15,
    alignSelf:'flex-start',
    color:'black'
  },
  textStyle2:{
    marginVertical:5,
    fontWeight:'500',
    marginLeft:25,
    fontSize:15,
    alignSelf:'flex-start',
    color:'black'
  }
})

export default PopUpTramites;
