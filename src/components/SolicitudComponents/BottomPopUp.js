import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const deviceHeight = Dimensions.get('window').height;

const BottomPopUp = props => {

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  const redirectToSettings = async (selectedOption) => {
    if (selectedOption == 0) {
      const resultGallery = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (resultGallery == false) {
        Alert.alert(
          'Alerta',
          'Debe de proporcionar permisos de almacenamiento para poder acceder a la galería.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Ir a configuración de la app', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false },
        );
      } else {
        props.pain();
      }
    }/// /////////////////////

    if (selectedOption == 1) {
      const resultCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      const resultStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (resultCamera == false || resultStorage == false) {
        Alert.alert(
          'Alerta',
          'Debe de proporcionar los permisos necesarios para poder acceder a la cámara. (Almacenamiento y Cámara).',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Ir a configuración de la app', onPress: () => Linking.openSettings() },
          ],
          { cancelable: false },
        );
      } else {
        props.pain2();
      }
    }/// /////////////////////
  };

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

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.open}
      onRequestClose={props.close}
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

          <TouchableOpacity onPress={() => redirectToSettings(0)} onPressOut={props.close}>
            <View style={styles.optionCard}>
              <View style={styles.collapsibleContent}>
                <MaterialCommunityIcons size={40} name="image-frame" color="black" />
                <Text style={styles.collapsibleText}>Galería</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => redirectToSettings(1)} onPressOut={props.close}>
            <View style={styles.optionCard}>
              <View style={styles.collapsibleContent}>
                <MaterialCommunityIcons size={40} name="camera-outline" color="black" />
                <Text style={styles.collapsibleText}>Cámara</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
    backgroundColor: '#e6e6e6',
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
});

export default BottomPopUp;
