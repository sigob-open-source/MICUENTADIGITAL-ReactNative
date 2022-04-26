import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class ConfirmacionPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nombreSolicitud: null,
      comentario: null,
      ubicacion: null,
    };
  }

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  show = () => {
    this.setState({
      show: true,
      nombreSolicitud: this.props.nombreSolicitud,
      comentario: this.props.comentario,
      ubicacion: this.props.ubicacion,
    });
  };

  close = () => {
    this.setState({ show: false });
  };

  render() {
    const { show } = this.state;
    const { onTouchOutside } = this.props;
    return (
      <Modal
        transparent
        animationType="fade"
        visible={show}
        onRequestClose={this.close}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >

          {this.renderOutsideTouchable(onTouchOutside)}

          <View style={styles.whiteSquareContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.titleText}>Detalles de la solicitud</Text>
              <TouchableOpacity onPress={() => this.close()}>
                <MaterialCommunityIcons style={{ marginRight: 15 }} size={30} name="arrow-left" color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

            <Text style={{
              fontWeight: '500',
              marginLeft: 15,
              fontSize: 22,
              alignSelf: 'flex-start',
              marginVertical: 10,
              color: 'black',
            }}
            >
              ¿Es la información correcta?
            </Text>

            <Text style={styles.textStyle}>
              Motivo de la solicitud:
              {this.state.nombreSolicitud}
            </Text>
            <Text style={styles.textStyle}>
              Comentario:
              {this.state.comentario}
            </Text>
            <Text style={styles.textStyle}>
              Ubicación:
              {this.state.ubicacion}
            </Text>

            <View style={styles.sendRequestGeneralContainer}>
              <TouchableOpacity onPress={this.props.confirmacion}>
                <View style={styles.sendRequestStyle}>

                  <View style={styles.sendRequestContainer}>
                    <Text style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '500',
                    }}
                    >
                      Confirmar
                    </Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  whiteSquareContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: 'black',
  },
  textStyle: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 15,
    fontSize: 15,
    alignSelf: 'flex-start',
    color: 'black',
  },
  textStyle2: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 15,
    alignSelf: 'flex-start',
    color: 'black',
  },
  sendRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRequestGeneralContainer: {

  },
  sendRequestStyle: {
    width: 222,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: '#4EDE7F',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
});

export default ConfirmacionPopUp;
