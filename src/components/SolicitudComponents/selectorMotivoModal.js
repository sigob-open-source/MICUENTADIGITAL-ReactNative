import {
  Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { getTiposDeSolicitudes } from '../../services/api';

const deviceHeight = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const MotivoPopUp = (props) => {
  const [lista, setLista] = useState([]);
  const [motivos, setMotivos] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [entidad, setEntidad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    getData();
    return () => {
      abortController.abort();
      setMotivos({});
      setEntidad({});
      setLista({});
      setLoading({});
    };
  }, []);
  // obtiene la lista de los motivos desde accordion.js para así poder mostrarlos dentro del modal
  const show = async () => {

  };

  const getData = async () => {
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
    setMotivos(tipos);
    setEntidad(id);
    const list = props.listaMotivos;
    setLista(list);
    if (lista != null) {
      setLoading(false);
    }
  };

  const sendData = (entidad, motivo, descripcion) => {
    props.close(entidad, motivo, descripcion);
  };

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  const renderTitle = () => (
    <View>
      <Text style={{
        color: '#182E44',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
      }}
      >
        {props.title}
      </Text>
    </View>
  );

  const renderMotivos = () =>
  // recorrer la lista para renderizar los motivos disponibles
    lista.map((item, index) => (
      <View key={index}>
        <ScrollView>
          <TouchableOpacity onPress={() => sendData(
            entidad,
            item.id,
            `${props.motivo} / ${item.descripcion}`,
          )}
          >
            <View style={styles.content}>
              <MaterialCommunityIcons size={40} name={props.iconName} color="black" />
              <Text style={styles.collapsibleText}>{item.descripcion}</Text>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#b8b8b8' }} />
            <View style={styles.whiteSpace} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    ));
  return (

    <Modal
      animationType="fade"
      transparent
      visible={props.open}
      onRequestClose={props.onTouchOutside}
    >

      <View style={{
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end',
      }}
      >

        {renderOutsideTouchable(props.onTouchOutside)}

        <View style={{
          backgroundColor: 'white',
          width: '100%',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          maxHeight: deviceHeight * 0.4,
        }}
        >

          {renderTitle()}

          {
              !loading ? (
                renderMotivos()
              ) : null
            }

        </View>
      </View>
    </Modal>

  );
};

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
  whiteSpace: {
    height: 50,
    width: '100%',
  },
});

export default MotivoPopUp;
