import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomPopUp from './BottomPopUp';

const CardSolicitud = (props) => {
  const [comment, setComment] = useState('');
  const [shouldShow, setShouldShow] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [changeTextImage, setChangeTextImage] = useState(true);
  const [image, setImage] = useState('../../assets/imagenes/none.jpg');
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const normalizeObject = (file) => ({
    uri: file.path,
    type: file.mime,
    name: file.path.substring(file.path.lastIndexOf('/') + 1, undefined),
    size: file.size,
  });

  useEffect(() => {
    if (props.timeout == true) { onClosePopup(); }

    if (archivo != null) {
      passImage();
    }
  }, [archivo]);

  const passImage = () => {
    props.onPassImage(archivo);
  };

  const launchCamera = async () => {
    try {
      const img = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        multiple: false,
        useFrontCamera: false,
      });
      setArchivo(normalizeObject(img));
      setShowImage(true);
      setImage(img.path);
      setChangeTextImage(false);
      setNombreArchivo(img.path.substring(img.path.lastIndexOf('/') + 1, undefined));
      setShouldShow(false);
    } catch (error) {
    }
  };

  const launchImageLibrary = async () => {
    try {
      const img = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: false,
        useFrontCamera: false,
      });
      setArchivo(normalizeObject(img));
      setShowImage(true);
      setImage(img.path);
      setChangeTextImage(false);
      setNombreArchivo(img.path.substring(img.path.lastIndexOf('/') + 1, undefined));
      setShouldShow(false);
    } catch (error) {

    }
  };

  return (
    <View>
      <View style={{ ...styles.squareStyle, ...props.style }}>
        <TouchableOpacity onPress={() => Alert.alert('Alerta', 'Opción en Mantenimiento.')/* setModalOpen(true) */}>
          {
            showImage ? (
              <Image
                style={{
                  width: '100%', height: '100%', borderBottomLeftRadius: 5, borderTopLeftRadius: 5,
                }}
                source={{ uri: image }}
              />
            ) : null
          }

          <View style={{ flex: 1, backgroundColor: 'transparent' }}>

            <View style={styles.agregarImagen}>
              <MaterialCommunityIcons size={60} name="image-outline" color="gray" />
            </View>

          </View>

        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
          <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }}>
            {
                changeTextImage ? (
                  <Text numberOfLines={3} style={styles.textStyle}>
                    Agregar imagen
                    {' '}
                    {'\n'}
                    de evidencia
                  </Text>
                )
                  : <Text numberOfLines={3} style={styles.textStyle}>{nombreArchivo}</Text>
              }
          </View>

          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {
              changeTextImage ? (
                <Text style={styles.changeImageText} />
              )
                : <Text onPress={() => setModalOpen(true)} style={styles.changeImageText}>Cambiar Imagen</Text>
                }
          </View>
        </View>
      </View>
      {/* Sección de comentario de usuario y ubicación de la solicitud */}
      <View>

        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <Icon size={40} name="person-circle-outline" color="black" />
          <View style={{ flex: 1, flexDirection: 'column' }}>

            <Text style={styles.TitleBottom}>Comentario de usuario</Text>
            <Text style={styles.userComment}>{props.getText}</Text>

          </View>

        </View>

        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <MaterialCommunityIcons size={40} name="map-marker-outline" color="black" />
          <View style={{ flex: 1, flexDirection: 'column' }}>

            <Text style={styles.TitleBottom}>{props.getLocation}</Text>
            <TouchableOpacity onPressIn={props.open}>
              <Text style={styles.verLocacionMapa}>Ver o añadir locación en el mapa.</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.linea} />

      </View>

      <BottomPopUp
        pain={launchImageLibrary}
        pain2={launchCamera}
        open={modalOpen}
        close={() => setModalOpen(false)}
        title="Elegir imagen"
        onTouchOutside={() => setModalOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  agregarImagen: {
    flex: 1,
    width: 161,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3E3E3',
  },
  squareStyle: {
    marginTop: '3%',
    borderRadius: 5,
    width: 333,
    height: 161,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginHorizontal: 12,
  },
  TitleBottom: {
    color: 'black',
    marginLeft: '3%',
    fontSize: 15,
  },
  userComment: {
    color: '#515151',
    marginLeft: '3%',
    fontSize: 15,
  },
  textStyle: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '600',
    paddingHorizontal: '10%',
    color: 'gray',
  },
  changeImageText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#0097B8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  verLocacionMapa: {
    marginLeft: '3%',
    justifyContent: 'center',
    color: '#0097B8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  imageStyle: {
    width: '100%',
    height: 161,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  linea: {
    alignSelf: 'center',
    marginTop: '6%',
    width: 336,
    height: 2,
    backgroundColor: '#C8CCD0',
  },
  squareStyleBlank: {
    borderRadius: 5,
    width: 104,
    height: 95,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  iconContainer: {
    margin: 5,
  },
});

export default CardSolicitud;
