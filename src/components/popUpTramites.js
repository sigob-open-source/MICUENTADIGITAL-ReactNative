import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native' 

class PopUpTramites extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: true,
      nombreTramite: null,
      descTramite: null,
      nombreDepartamento: null,
      requisitos: 'Sin requisitos'
    }
  }

  componentDidMount(){
    console.log('aaaaa')
  }

  show = () => {
    this.setState({show: true})
  }

  close = () => {
    this.setState({show: false})
  }

  render(){
    return(
      <Modal 
      animationType={'fade'}
      visible={this.state.show}
      onRequestClose={this.close} >

        <View style={styles.container}>
  
        </View>

      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  }
})

export default PopUpTramites;
