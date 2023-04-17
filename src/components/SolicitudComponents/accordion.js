import React, { Component, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getTiposDeSolicitudes } from '../../services/api';
import MotivoPopUp from './selectorMotivoModal';

const WIDTH = Dimensions.get('window').width;

const AccordionView = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [motivos, setMotivos] = useState(null);
  const [children, setChildren] = useState(null);
  const [motivo, setMotivo] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gotData, setGotData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    dataGet();
    return () => {
      abortController.abort();
    };
  }, []);

  // Modal para mostrar los motivos a seleccionar en las subcategorías (si es que tienen, si no mandar alerta)
  const onShowPopup = async (children, motivo) => {
    const abortController = new AbortController();
    const child = await children;
    if (children.length > 0) {
      setChildren(child);
      setMotivo(motivo);
      if (motivos && children != null) {
        setOpen(true);
      }
    } else {
      Alert.alert('Alerta', 'Esta categoría no tiene motivos disponibles.');
    }
    return () => {
      abortController.abort();
    };
  };

  // Cierra el modal que muestra los motivos
  const onClosePopup = () => {
    setOpen(false);
  };

  // Obtiene datos del api para así obtener los diferentes tipos de categorías, motivos etc
  const getData = async () => {
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
    setMotivos(tipos);
  };

  // Muestra las subcategorías disponibles
  const toggleExpanded = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  // Manda los datos a ModalSolicitud.js para despues mandarlos de vuelta a Solicitud.js
  const close = (entidad, motivo, descripcion) => {
    props.close(
      entidad,
      motivo,
      descripcion,
    );
  };

  const dataGet = () => {
    if (!gotData) {
      getData();
      setGotData(true);
      props.renderCard;
      setLoading(false);
    }
  };

  const renderItem = () => {
    if (motivos != null) {
      // Si no pongo el -1 por alguna razón me da el id del tipo de solicitud siguiente
      return motivos[props.parentId - 1].children.map((item, index) => (
        <View key={index}>
          {/* <TouchableOpacity onPress={()=>this.close(
              1,
              item.children,
              this.state.motivos[this.props.parentId-1].descripcion,
              item.descripcion
            )
            }> */}

          {/* Al presionar una subcategoría entonces esta ejecuta la función de mostrar el modal para elegir el motivo para dicha subcategoría, en caso de que haya motivos. */}
          <TouchableOpacity onPress={() => onShowPopup(
            item.children,
            props.motivo,
          )}
          >
            <View style={styles.content}>
              <MaterialCommunityIcons size={40} name={props.iconName} color="black" />
              <Text style={styles.collapsibleText}>{item.descripcion}</Text>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#b8b8b8' }} />
          </TouchableOpacity>
        </View>
      ));
    }
  };

  return (
    <View style={styles.container}>
      {
          children != null ? (
            <MotivoPopUp
            // ref={(target) => this.popupRef = target}
              open={open}
              onTouchOutside={onClosePopup}
              title="Motivo"
              listaMotivos={children}
              motivo={props.motivo}
              close={close}
            />
          ) : null
        }

      <ScrollView contentContainerStyle={{ marginBottom: 10 }}>
        <TouchableOpacity onPress={toggleExpanded}>
          <View style={styles.header}>
            <MaterialCommunityIcons size={40} name={props.iconName} color="black" />
            <Text style={styles.headerText}>{props.titleText}</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed}>
          {/* Renderica todos los tipos de solicitudes con sus subcategorías */}
          {
              loading ? (
                <Text style={styles.headerText}>Cargando...</Text>
              ) : renderItem()
            }

        </Collapsible>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
  },
  headerText: {
    fontWeight: '500',
    marginLeft: '3%',
    fontSize: 20,
    color: 'black',
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

export default AccordionView;
