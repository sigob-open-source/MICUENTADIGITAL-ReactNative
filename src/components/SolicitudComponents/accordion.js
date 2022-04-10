import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTiposDeSolicitudes } from '../../services/api';
import MotivoPopUp from './selectorMotivoModal';

const WIDTH = Dimensions.get('window').width;

export default class AccordionView extends React.Component {
  constructor(props){
    super(props)
    this.popupRef = React.createRef();
    this.state={
      collapsed: true,
      motivos: null, //Datos obtenidos del api
      children: null, //Motivos de la subcategoría
      motivo: null,
    }
  }
  //Modal para mostrar los motivos a seleccionar en las subcategorías (si es que tienen, si no mandar alerta)
  onShowPopup = (children,motivo) => {
    if (children.length > 0){
      this.setState({
        children:children,
        motivo:motivo,
      },this.popupRef.show)
    }
    else{
      Alert.alert('Alerta', 'Esta categoría no tiene motivos disponibles.')
    }
  };
  //Cierra el modal que muestra los motivos
  onClosePopup = () => {
    this.popupRef.close();
  };

  //Obtiene datos del api para así obtener los diferentes tipos de categorías, motivos etc
  getData = async () => {
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
    this.state.motivos=tipos
  };

  //Muestra las subcategorías disponibles 
  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  //Manda los datos a ModalSolicitud.js para despues mandarlos de vuelta a Solicitud.js
  close = (entidad,motivo,descripcion) =>{
    this.props.close(
      entidad,
      motivo,
      descripcion
    )
  }

  renderItem = () => {
    this.getData()

    if (this.state.motivos != null){
      //Si no pongo el -1 por alguna razón me da el id del tipo de solicitud siguiente
      return this.state.motivos[this.props.parentId-1].children.map((item, index)=>{
        return(
          <View key={index}>
            {/*<TouchableOpacity onPress={()=>this.close(
              1,
              item.children,
              this.state.motivos[this.props.parentId-1].descripcion,
              item.descripcion
            )
            }>*/}

            {/*Al presionar una subcategoría entonces esta ejecuta la función de mostrar el modal para elegir el motivo para dicha subcategoría, en caso de que haya motivos.*/}
            <TouchableOpacity onPress={()=>this.onShowPopup(
              item.children,
              this.props.motivo
            )}>
              <View style={styles.content}>
                <MaterialCommunityIcons size={40} name={this.props.iconName}color={'black'} />
                <Text style={styles.collapsibleText}>{item.descripcion}</Text>
                </View>
              <View style={{width:'100%',height:1,backgroundColor:'#b8b8b8'}}></View>
            </TouchableOpacity>
          </View>
        )
      })    
    }
  
    }

  render() {
    return (
      <View style={styles.container}>
        <MotivoPopUp
          ref={(target) => this.popupRef = target}
          onTouchOutside={this.onClosePopup} 
          title={'Motivo'}
          listaMotivos={this.state.children} 
          motivo={this.props.motivo}
          close={this.close} 
        />
        <ScrollView contentContainerStyle={{marginBottom:10 }}>
          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <MaterialCommunityIcons size={40} name={this.props.iconName}color={'black'} />
              <Text style={styles.headerText}>{this.props.titleText}</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed}>
          {/* Renderica todos los tipos de solicitudes con sus subcategorías */}
          {this.renderItem()}

          </Collapsible>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color:'black',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    height:45,
    alignSelf:'center',
    backgroundColor:'#e6e6e6',
  },
  headerText: {
    fontWeight:'500',
    marginLeft:'3%',
    fontSize:20,
    color:'black',
  },
  content: {
    height:50,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white'
  },
  contentContainerStyle:{
    width:'100%',
    backgroundColor:'#e6e6e6',
  },
  collapsibleText:{
    flexShrink: 1,
    flex:1,
    flexWrap:'wrap',
    fontWeight:'500',
    marginLeft:'1.5%',
    fontSize:0.05*WIDTH,
    color:'black',
  },
});