import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { registrarArchivo, registrarSolicitud } from '../services/api';
import axios from 'axios';

import ModalSolicitud from '../components/SolicitudComponents/ModalSolicitud';
import ComentarioModal from '../components/SolicitudComponents/ComentariosModal';
import { MapaModal } from '../components/SolicitudComponents/MapaModal';

import CardSolicitud from '../components/SolicitudComponents/CardSolicitud';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmacionPopUp from '../components/SolicitudComponents/confirmacionPopUp';
import ButtonRequest from '../components/SolicitudComponents/Button';

const WIDTH = Dimensions.get('window').width;

const Solicitud = props => {
  let popupRef = React.createRef();
  let popupRef2 = React.createRef();
  let popupRef3 = React.createRef();
  let popupRef4 = React.createRef();

  const [comment, setComment] = useState('Sin comentario.');
  const [location, setLocation] = useState('Sin locación');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [motivo_de_la_solicitud, setMotivo_de_la_solicitud] = useState(null);
  const [motivoSolID, setMotivoSolID] = useState(null);
  const [motivoDesc, setMotivoDesc] = useState(null);
  const [submotivoDesc, setSubMotivoDesc] = useState(null);
  const [showMotivo, setShowMotivo] = useState(false);
  const [entidadMunicipalId, setEntidadMunicipalId] = useState(null);
  const [archivo, setArchivo] = useState([]);
  const [hasSwitchedView, setHasSwitchedView] = useState(false)
  const [camposFaltantes, setCamposFaltantes] = useState([])

  useEffect(() => {
    onShowPopup()
  }, []);

  const submit = async () => {
    onCloseConfirmationPopUp()
    //Validar que el usuario llenó toda la información necesaria para poedr mandar la solicitufd

      const image = archivo
      const response = await registrarSolicitud(
        comment,
        latitud,
        longitud,
        motivo_de_la_solicitud,
        entidadMunicipalId,
      );
      if (response) {
        const responseFile = await registrarArchivo(
          response.seguimientos[0].id,
          image,
        );
        if (responseFile) {
          response.seguimientos[0].archivos.push(responseFile);
        }
        console.log(JSON.stringify(response, null, 2));
  
        Alert.alert(
          'Registro existoso', 
          'Su solicitud ha sido procesada con éxito, pronto recibirá informes de su solicitud.',
          [
            {text:'Aceptar', onPress: () => props.navigation.navigate('verSolicitudes')}
          ],
        );
      } else {
        Alert.alert('Error', 'Ha ocurrido un error, su solicitud no pudo ser registrada. Intente más tarde.');
      }

  };

  const imageToParent = (imageData) => {
    setArchivo(imageData);
  };

  const modalToParent = (modalData) => {
    setComment(modalData);
  };

  const motivoToParent = (entidad, motivo, descripcion) => {
    setShowMotivo(true);
    setMotivo_de_la_solicitud(motivo);
    setEntidadMunicipalId(entidad);
    setMotivoDesc(descripcion);
  };

  const mapToParent = (mapData, latitud, longitud) => {
    setLocation(mapData);
    setLatitud(latitud);
    setLongitud(longitud);
  };

  // Evita que se puedan abrir varios modales al spamear los botones
  const openModal = (type) => {

    if (!hasSwitchedView){
      setHasSwitchedView(true)
      if (type == 0){
        onShowCommentPopup()
      }
      else if (type == 2){
        onShowPopup();
      }
      else{
        onShowMapPopup();
      }
      setTimeout(() => {
        setHasSwitchedView(false)
      }, 2000);
    }

  }
  
  const onShowConfirmationPopUp = () =>{
    if ((location == 'Sin locacion') || (archivo == null) || (motivo_de_la_solicitud === null) || (comment === 'Sin comentario.' || comment === '')){
      Alert.alert(
        'Registro fallido', 
        'Hacen falta uno o más campos, favor de revisar la solicitud.'
        )
    }else{
      popupRef4.show()
    }
    
  }

  const onCloseConfirmationPopUp = () =>{
    popupRef4.close()
  }


  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const onShowCommentPopup = () => {
    popupRef2.show();
  };

  const onCloseCommentPopup = () => {
    popupRef2.close();
  };

  const onShowMapPopup = async () => {
    popupRef3.show();
  };

  const onCloseMapPopup = () => {
    popupRef3.close();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (

    <View style={styles.container}>

      <ModalSolicitud
        title="Elegir Motivo"
        ref={(target) => popupRef = target}
        onTouchOutside={onClosePopup}
        onclose={motivoToParent}
      />

      <Header
        style={styles.header}
        route={1}
        item="Trámites"
        imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
        img={require('../../assets/imagenes/header_logo.png')}
      />

      <ComentarioModal
        title="Escribe tu comentario"
        ref={(target) => popupRef2 = target}
        onTouchOutside={onClosePopup}
        modalToParent={modalToParent}
      />

      <MapaModal
        ref={(target) => popupRef3 = target}
        onTouchOutside={onClosePopup}
        mapToParent={mapToParent}
      />

      <ScrollView contentContainerStyle={{ padding: 10, paddingHorizontal: 0 }}>
        <View style={{ flex: 1, marginTop: 9, marginHorizontal: '2%' }}>

          <TouchableOpacity onPress={()=>openModal(2)}>
            <ButtonRequest texto="Motivo de Solicitud" iconName="keyboard-arrow-down" showArrow />
          </TouchableOpacity>
          {
            showMotivo ? (
              <View style={styles.optionCard}>
                <View style={styles.collapsibleContent}>
                  <MaterialCommunityIcons size={40} name="chart-box-outline" color="black" />
                  <Text style={styles.solicitudTipoText}>{motivoDesc}</Text>
                </View>
              </View>
            ) : null
          }

          <ConfirmacionPopUp 
            ref={(target) => popupRef4 = target}
            onTouchOutside={onClosePopup}
            nombreSolicitud={motivoDesc} 
            comentario={comment} 
            ubicacion={location} 
            confirmacion={submit}
          />

          <CardSolicitud onPassImage={imageToParent} openMap={onShowMapPopup} getText={comment} getLocation={location} />

          <TouchableOpacity onPress={() => openModal(0)}>
            <ButtonRequest texto="Cambiar Comentario" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openModal(1)}>
            <ButtonRequest texto="Cambiar Dirección" />
          </TouchableOpacity>

          <View>
            <View style={styles.sendRequestGeneralContainer}>
              <TouchableOpacity onPress={onShowConfirmationPopUp}>
                <View style={styles.sendRequestStyle}>
                
                  <View style={styles.sendRequestContainer}>
                    <Text style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '500',
                    }}
                    >
                      Enviar Solicitud
                    </Text>
                  </View>
                  

                </View>

             
            </TouchableOpacity>
            </View>
         </View>
        </View>

      </ScrollView>

      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  solicitudTipoText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    marginLeft: '1.5%',
    fontSize: 0.05 * WIDTH,
    color: 'black',
  },
  content: {
    marginVertical: 5,
  },
  collapsibleContent: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsibleText: {
    fontWeight: '500',
    marginLeft: '10%',
    fontSize: 20,
    color: 'black',
  },
  sendRequestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRequestGeneralContainer: {
    marginTop: '25%',
  },
  sendRequestStyle: {
    width: 333,
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
  optionCard: {
    width: 333,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
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
  optionCard: {
    width: '96%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
  collapsibleContent: {
    marginLeft: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsibleText: {
    fontWeight: '500',
    marginLeft: '3%',
    fontSize: 17,
    color: 'black',
  },
});

export default Solicitud;
