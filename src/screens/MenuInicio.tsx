import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import Square from '../components/CardPagos';
import Header from '../components/Header';
import ConnectionCheck from '../components/internetChecker';
import Banner from '../components/Banner';
import colors from '../utils/colors';

// Todo el datalist son los botones del menú de inicio, cada uno con sus propiedades como
// el icono del botón,color del botón en caso de que esté desactivado, nombre etc.

const dataList = [
  {
    isBlank: false,
    color: '#404040',
    name: 'Trámites',
    iconname: 'folder-open',
    enableEntypo: false,
    navegacion: 'tramites',
    necesitaLogin: false,
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Cartografía Digital',
    iconname: 'globe',
    enableEntypo: true,
    navegacion: 'cartografia',
    necesitaLogin: false,
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Zonificación de Predio',
    iconname: 'map-marked-alt',
    enableEntypo: true,
    navegacion: 'zonoficacion',
    necesitaLogin: false,
  },
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Oficinas de Atención',
  //   iconname: 'school',
  //   enableEntypo: true,
  //   navegacion: 'oficinaAtencion',
  //   necesitaLogin: false,
  // },
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Directorio',
  //   iconname: 'book',
  //   enableEntypo: true,
  //   navegacion: 'dirfuncionario',
  //   necesitaLogin: false,
  // },
  {
    isBlank: false,
    color: '#404040',
    name: 'Facturación',
    iconname: 'id-card-alt',
    enableEntypo: true,
    navegacion: 'webFacturacion',
    necesitaLogin: false,
    deshabilitado: false,
  },
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Solicitudes',
  //   iconname: 'street-view',
  //   enableEntypo: false,
  //   navegacion: 'solicitudSelect',
  //   deshabilitado: false,
  // },

  {
    isBlank: false,
    color: '#404040',
    name: 'Cabildo',
    iconname: 'users',
    enableEntypo: true,
    necesitaLogin: false,
    deshabilitado: false,
    navegacion: 'cobildo',
  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Estrados',
    iconname: 'balance-scale-right',
    enableEntypo: true,
    necesitaLogin: false,
    deshabilitado: false,
    navegacion: 'estrados',
  },
];
const numColumns = 3;

const MenuInicio = (props) => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [hasSwitchedView, setHasSwitchedView] = useState(false);

  // En el diseño de esta pantalla, en algunos casos pueden quedar iconos vacios, pero estos se siguen mostrando
  // esta parte es para saber si debería haber más botones en las columnas restantes, en caso de que detecte que no debería haber,
  // cambia la propiedad de isblank a true, dentro del componente del botón, al ser esta propiedad true, el botón se hace invisible e imposible
  // de hacer clic en el.
  const formatData = (dataList, numColumns) => {
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
  //  Está función sirve para navegar a otras pantallas dependiendo del botón
  // que presionaste. También al presionar el botón hace que se active
  // un timer para evitar que se presionar el mismo botón varias veces, previniendo
  // así que puedas entrar a la misma pantalla multiples veces.
  const navigateToScreen = (item) => {
    if (item.linkurl) {
      Linking.openURL(item.linkurl);
    } else if (item.navegacion != null) {
      if (!hasSwitchedView) {
        setHasSwitchedView(true);
        props.navigation.push(item.navegacion);
        setTimeout(() => {
          setHasSwitchedView(false);
        }, 1000);
      }
    } else if (item.necesitaLogin) { // Aqui es donde se hace el check donde se detecta si se ocupa login o si una opción no está disponible/está en mantenimiento
      Alert.alert('Aviso', 'Necesita iniciar sesión para tener acceso a esta opción.');
    } else if (item.name != 'nada') {
      Alert.alert('Aviso', 'Se está realizando mantenimiento a esta función, favor de intentarlo más tarde.');
    }
  };

  // Esta función renderiza los botones dependiendo de sus propiedades, color, nombre, icono etc.
  const _renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback disabled={item.deshabilitado} onPress={() => navigateToScreen(item)}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Square
          col={item.color}
          isBlank={item.isBlank}
          style={styles.menuContainer}
          enableEntypo={item.enableEntypo}
          nombreItem={item.name}
          iconName={item.iconname}
          isDesable={item.deshabilitado}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <ConnectionCheck />
      <View style={{ marginBottom: '2%' }}>
        <Header
          item="Inicio"
        />
      </View>

      <View style={{ flex: 1, marginHorizontal: '2%' }}>

        <FlatList
          data={formatData(dataList, numColumns)}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          ListFooterComponent={(
            <>
              <View style={styles.separator} />

              <View style={styles.pagosStyle}>
                <View style={styles.tituloCardContainer}>
                  <Text style={styles.pagoTxt}>Pagos</Text>
                  <View style={styles.iconstyel}>
                    <FontAwesome5
                      name="money-check-alt"
                      size={30}
                      solid
                      color="#414141"
                    />
                  </View>
                </View>
                <View style={styles.buttonBox}>
                  <TouchableOpacity onPress={() => navigation.navigate('pagos')}>
                    <View style={styles.butonPagos}>
                      <Text style={styles.pagoSubCategoryText}>Consulta de adeudo</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.separator2} />
                  <TouchableOpacity onPress={() => navigation.navigate('seleccionarTipoDePadron')}>
                    <View style={styles.butonPagos}>
                      <Text style={styles.pagoSubCategoryText}>Agregar cobro</Text>
                    </View>
                  </TouchableOpacity>

                </View>

              </View>

              {/* <TouchableOpacity onPress={() => navigation.navigate('webAdeudos')}>
                <View style={styles.pagosStyle}>
                  <Text style={styles.pagoTxt}>Gestión de Trámites Gubernamentales</Text>
                  <View style={styles.iconstyel}>
                    <FontAwesome5
                      name="file-signature"
                      size={30}
                      solid
                      color="#414141"
                    />
                  </View>
                </View>
              </TouchableOpacity> */}

              <View style={styles.separator} />
              <Banner />
              <View style={styles.separator} />

              {/* <View style={styles.notifications}>
                <View style={styles.notificationsIcon}>
                  <FontAwesome5
                    name="comments"
                    size={35}
                    solid
                    color="#414141"
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.TituloInfo}>Una Nueva Iniciativa</Text>
                  <Text style={styles.subTituloInfo}>
                    El presidente comunica un cambio para la ciudad.
                  </Text>
                </View>
              </View> */}

              <View />
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  butonPagos: {
    height: 40,
    justifyContent: 'center',
  },
  buttonBox: {
    flex: 1,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  separator: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 336,
    height: 1,
    margin: '2%',
    backgroundColor: '#DCE1E5',
  },
  separator2: {
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: '#DCE1E5',
  },
  mainContainer: {
    flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuContainer: {
    marginVertical: '6%',
  },

  textInputContainer: {
    marginTop: 21,
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
  iconContainer: {
    width: 39,
    height: 30,
    margin: 5,
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
  notifications: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  TituloInfo: {
    fontSize: 18,
    marginBottom: 2,
    fontWeight: 'bold',
    color: '#404040',
  },
  subTituloInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404040',
  },
  notificationsIcon: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  iconsRedes: {
    backgroundColor: colors.secundario,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
  },
  pagosStyle: {
    backgroundColor: '#ffffff',
    height: 135,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 4,
    marginVertical: 5,
    borderTopWidth: 5,
    borderTopColor: '#86E2C0',
  },
  tituloCardContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DADCDF',
  },
  pagoTxt: {
    color: '#404040',
    fontWeight: '800',
    fontSize: 14,
    flex: 1,
  },
  iconstyel: {
    height: '100%',
    width: 60,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagoSubCategoryText: {
    color: '#404040',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default MenuInicio;
