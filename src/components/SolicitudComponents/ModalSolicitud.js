import {
  Modal, 
  TouchableWithoutFeedback, 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  Alert,
} from 'react-native';

import React, { useState, useEffect } from 'react';

import Footer from '../Footer';
import { getTiposDeSolicitudes } from '../../services/api';
import AccordionView from './accordion';

const WIDTH = Dimensions.get('window').width;

const ModalSolicitud = props => {
  const [motivos, setMotivos] = useState(null);
  const [renderCard, setRenderCard] = useState(false);
  const [motivoParentId, setMotivoParentId] = useState(null);
  const [motivoDesc, setMotivoDesc] = useState(null);
  const [entidadId, setEntidadId] = useState(null);
  const [motivoID, setMotivoID] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    try {
      getData();
    } catch (error) {
      console.log(error)
    }
    
    return () => {
      abortController.abort();
      setEntidadId({});
      setMotivos({});
    }
  }, []);

  const getData = async () => {
    
    const id = 1;
    const tipos = await getTiposDeSolicitudes(id);
  
    setMotivos(tipos)
    if (motivos != null) {
      setEntidadId(id);
    }      
  }

  const showCards = () =>{
    setRenderCard(true);
  }

  const close = (entidad, motivo, descripcion) =>{
    props.onclose(entidad,motivo,descripcion)
    props.close
  }

  const renderTitle = () => {
    return (

      <View>
        <Text style={{
          color: '#182E44',
          fontSize: 20,
          fontWeight: '500',
          margin: 15,
          textAlign: 'center',
        }}
        >
          {props.title}
        </Text>
      </View>

    );
  };

  const createCard = () => {
        return motivos.map((item, index) => (
          <View key={index}>
            <AccordionView
              close={selectMotivo}
              renderCard={showCards}
              parentId={item.id}
              motivo={item.descripcion}
              sampleSolicitud="nothing"
              titleText={item.descripcion}
              iconName="chart-box-outline"
            />
          </View>
  
        ));

  };

  // Manda los motivos del modal hacia la pantalla donde se debe de mostrar ya el motivo seleccionado junto con su subcategoría
  const selectMotivo = (entidad, motivo, descripcion) => {
    props.onclose(
      entidad,
      motivo,
      descripcion,
    );
  };

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (

      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>

    );
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.open}
    >

      <View style={{
        flex: 1,
        backgroundColor: '#000000AA',
      }}
      >
        {renderOutsideTouchable(props.onTouchOutside)}
        <View style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}
        >

          <ScrollView>
            {renderTitle()}
            {
              motivos != null ? (
                createCard()
              ) : <Text style={{ alignSelf: 'center' }}>Cargando Motivos...</Text>
            }
          </ScrollView>
        </View>
      </View>

      <Footer
        back={props.close}
        showBack
        style={styles.footer}
      />
    </Modal>
  );
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
});

export default ModalSolicitud;
