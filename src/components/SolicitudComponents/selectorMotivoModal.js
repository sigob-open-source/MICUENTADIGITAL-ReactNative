import {
  Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTiposDeSolicitudes } from '../../services/api';

const deviceHeight = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class MotivoPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      lista: [],
      motivos: null,
      descripcion: null,
      entidad: null,
    };
  }

  // obtiene la lista de los motivos desde accordion.js para así poder mostrarlos dentro del modal
  show = async () => {
    const lista = await this.props.listaMotivos;
    this.getData();
    this.setState({ show: true, lista });
  };

  getData = async () => {
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
    this.state.motivos = tipos;
    this.state.entidad = id;
  };

  close = () => {
    this.setState({ show: false });
  };

  sendData = (entidad, motivo, descripcion) => {
    this.props.close(entidad, motivo, descripcion);
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View>
        <Text style={{
          color: '#182E44',
          fontSize: 20,
          fontWeight: '500',
          textAlign: 'center',
        }}
        >
          {title}
        </Text>
      </View>
    );
  };

  renderMotivos = () => {
    if (this.state.show) {
      // recorrer la lista para renderizar los motivos disponibles
      return this.state.lista.map((item, index) => (
        <View key={index}>
          <ScrollView>
            <TouchableOpacity onPress={() => this.sendData(
              this.state.entidad,
              item.id,
              `${this.props.motivo} / ${item.descripcion}`,
            )}
            >
              <View style={styles.content}>
                <MaterialCommunityIcons size={40} name={this.props.iconName} color="black" />
                <Text style={styles.collapsibleText}>{item.descripcion}</Text>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#b8b8b8' }} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      ));
    }
  };

  render() {
    const { show } = this.state;
    const { onTouchOutside } = this.props;
    return (

      <Modal
        animationType="fade"
        transparent
        visible={show}
        onRequestClose={this.close}
      >

        <View style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}
        >

          {this.renderOutsideTouchable(onTouchOutside)}

          <View style={{
            backgroundColor: 'white',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            maxHeight: deviceHeight * 0.4,
          }}
          >

            {this.renderTitle()}

            {
              this.state.lista.length > 0 ? (
                this.renderMotivos()
              ) : null
            }

          </View>
        </View>
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  optionCard: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
  },
  content: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    width: '100%',
    backgroundColor: '#e6e6e6',
  },
  collapsibleText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    marginLeft: '1.5%',
    fontSize: 0.05 * WIDTH,
    color: 'black',
  },
});

export default MotivoPopUp;
