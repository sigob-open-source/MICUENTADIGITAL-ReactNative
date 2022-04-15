
import React, { Component} from 'react';
import {PermissionsAndroid, StyleSheet, View, FlatList, Dimensions, TouchableWithoutFeedback, Alert,} from 'react-native';


import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';

const dataList = [
  {
    isBlank: false,
    color: '#404040',
    name: 'Pagos',
    iconname: 'wallet',
    enableEntypo: true,
    navegacion: 'pagos',

    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Trámites',
    iconname: 'folder-open',
    enableEntypo: false,
    navegacion: 'tramites',
    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Solicitudes',
    iconname: 'file-text',
    enableEntypo: false,
    navegacion: 'solicitudSelect',
    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Directorio',
    iconname: 'book',
    enableEntypo: true,
    navegacion: 'dirfuncionario',

    necesitaLogin: false

  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Peticiones',
    iconname: 'tasks',
    enableEntypo: true,
    navegacion: 'peticiones',
    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Oficinas de Atención',
    iconname: 'school',
    enableEntypo: true,
    navegacion: 'oficinaAtencion',
    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Facturación',
    iconname: 'id-card-alt',
    enableEntypo: true,
    necesitaLogin: false
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Otra\nNormatividad',
    iconname: 'file-text',
    enableEntypo: false,
    necesitaLogin: false
  },
];
// recordatorio para remover la propiedad de enableEntypo
const dataListSecond = [
  {
    isBlank: false,
    color: '#767778',
    name: 'Mis Adeudos',
    iconname: 'chart-bar',
    enableEntypo: true,
    necesitaLogin: true
  },
  {
    isBlank: false,
    color: '#767778',
    name: 'Mis Citas',
    iconname: 'calendar-alt',
    enableEntypo: true,
    necesitaLogin: true
  },
  {
    isBlank: false,
    color: '#767778',
    name: 'Mis Trámites',
    iconname: 'folder-open',
    enableEntypo: false,
    necesitaLogin: true
  },
  {
    isBlank: false,
    color: '#767778',
    name: 'Mi Portafolio',
    iconname: 'folder',
    enableEntypo: true,
    necesitaLogin: true
  },
  {
    isBlank: false,
    color: '#767778',
    name: 'Mi buzón',
    iconname: 'envelope',
    enableEntypo: true,
    necesitaLogin: true
  },

];

const numColumns = 3;

const WIDTH = Dimensions.get('window').width;

class MenuInicio extends Component {

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - (totalRows * numColumns);

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({
        name: 'nada', iconname: 'question', enableEntypo: false, isBlank: true,
      });
      totalLastRow++;
    }
    return dataList;
  };

  navigateToScreen = (item) =>{
    if (item.navegacion != null){
      if (!this.state.hasSwitchedView){
        this.setState({
          hasSwitchedView:true
        },this.props.navigation.push(item.navegacion))
        setTimeout(() => {
          this.state.hasSwitchedView=false
        },1000);
      }
    }else{
      if (item.necesitaLogin){
        Alert.alert('Aviso','Necesita iniciar sesión para tener acceso a esta opción.')
      }else{
        Alert.alert('Aviso','Se está realizando mantenimiento a esta función, favor de intentarlo más tarde.')
      }
    }
  }

  _renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => this.navigateToScreen(item)}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Square
          col={item.color}
          isBlank={item.isBlank}
          style={styles.menuContainer}
          enableEntypo={item.enableEntypo}
          nombreItem={item.name}
          iconName={item.iconname}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} item="Inicio" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
        <View style={{ flex: 1, marginHorizontal: '2%' }}>
          <FlatList
            data={this.formatData(dataList, numColumns)}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        </View>
        <View style={styles.separator} />
        <View style={{ marginHorizontal: '2%' }}>
          <FlatList
            style={{ marginBottom: '6%' }}
            data={this.formatData(dataListSecond, numColumns)}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />
        </View>
        <Footer style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',

  },
  separator: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 336,
    height: 1,
    marginBottom: '2%',
    backgroundColor: '#DCE1E5',
  },
  mainContainer: {
    flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuContainer: {
    marginVertical: '6%',
  },

  textInputContainer: {
    marginTop: 21,
    width: 336,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyle: {
    height: '100%',
    marginLeft: 14,
    fontSize: 13,
  },
  iconContainer: {
    width: 39,
    height: 30,
    margin: 5,
  },
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
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
});

export default MenuInicio;
