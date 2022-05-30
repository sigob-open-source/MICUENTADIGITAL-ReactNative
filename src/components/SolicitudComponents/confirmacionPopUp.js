import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableWithoutFeedback, TouchableOpacity, ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfirmacionPopUp = props => {

  const [nombreSolicitud, setNombreSolicitud] = useState(null);
  const [comentario, setComentario] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  useEffect(() => {
    setNombreSolicitud(props.nombreSolicitud);
    setComentario(props.comentario);
    setUbicacion(props.ubicacion);
  }, [props.open]);

    return (
      <Modal
        transparent
        animationType="fade"
        visible={props.open}
        onRequestClose={props.close}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >

          {renderOutsideTouchable(props.onTouchOutside)}
          
          <View style={styles.whiteSquareContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.titleText}>Detalles de la solicitud</Text>
              <TouchableOpacity onPress={props.close}>
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
            <ScrollView>
            <Text style={styles.textStyle}>
              Motivo de la solicitud:
              {nombreSolicitud}
            </Text>
            <Text style={styles.textStyle}>
              Comentario: 
              {' '+comentario}
            </Text>
            <Text style={styles.textStyle}>
              Ubicación:
              {ubicacion}
            </Text>

            <View style={styles.sendRequestGeneralContainer}>
              <TouchableOpacity onPress={props.confirmacion}>
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
            </ScrollView>
          </View>

        </View>

      </Modal>
    );
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
    paddingHorizontal:15,
    fontWeight: '500',
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
    marginVertical: 14,
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
