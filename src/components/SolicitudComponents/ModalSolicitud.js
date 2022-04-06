import {Modal, TouchableWithoutFeedback,StyleSheet, View, Text, ScrollView} from 'react-native';
import React from 'react';

import Footer from '../Footer';
import SolicitudCard from './solicitudComponent';
import ButtonRequest from './Button';
import { getTiposDeSolicitudes } from '../../services/api';
import { create } from 'react-test-renderer';

class ModalSolicitud extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      motivos: [],
      renderCard: false
    }
  }

  show = () => {
    this.getData()
    this.setState({show: true})
  }

  getData = async () => {
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
    this.state.motivos = tipos
      for(let i = 0; i < this.state.motivos.length ;i++)
      {
        console.log(this.state.motivos[i].descripcion)
      }
    if (this.state.motivos.length > 0){
      this.setState({
        renderCard:true
      })
    }


  };

  createCard = () => {
    return this.state.motivos.map((item)=>{
      return(
        <SolicitudCard key={item.key} iconName='chart-box-outline' sampleSolicitud={item.descripcion}/>
      )
    })
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
    const isRequestListed = this.state.motivos;
    let {show} = this.state
    const {onTouchOutside, title} = this.props
    return(
      <Modal 
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}>

        <View style={{
          flex:1,
          backgroundColor:'#000000AA', 
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View style={{
            backgroundColor:'white',
            width:'100%',
            height:'100%'}}>
            <ScrollView>
              {this.renderTitle()}
              {
                this.state.renderCard ? (
                  this.createCard()
                ):null
              }
            </ScrollView>
          </View>
        </View>

        <Footer 
          back={this.close}
          showBack={true} 
          style={styles.footer}/>
      </Modal>
  
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
})

export default ModalSolicitud;
