
import React, { Component} from 'react';
import { StyleSheet, View, TextInput,FlatList,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';

const dataList = [
  {
    isBlank: false,
    color: '#404040',
    name: 'Referendos Vehiculares',
    iconname: 'car-alt',
    enableEntypo: true,
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Nomina',
    iconname: 'file-invoice-dollar',
    enableEntypo: true,
    navegacion: 'solicitud',
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Prediales',
    iconname: 'file-signature',
    enableEntypo: true,
    navegacion: 'solicitud',
  },
]

const numColumns = 3;

class Pagos extends Component {

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

  goBack = () => {
    this.props.navigation.goBack();
  }

  _renderItem = ({ item, index }) => (

    <TouchableWithoutFeedback onPress={() => this.props.navigation.push(item.navegacion)}>
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

        <Header style={styles.header} item="Pagos" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />

        <View style={styles.textInputContainer}>
            <TextInput color={'black'} placeholderTextColor={'#C4C4C4'} style={styles.textInputStyle} placeholder='Buscar...'/>
        </View>
        
        <View style={{ flex: 1, marginHorizontal: '2%' }}>

          <FlatList
            data={this.formatData(dataList, numColumns)}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          />

        </View>

        <Footer 
          back={this.goBack}
          showBack={true} 
          style={styles.footer} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',

  },

  menuContainer: {
    marginVertical: '6%',
  },
  textInputContainer: {
    marginVertical:15,
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

export default Pagos;
