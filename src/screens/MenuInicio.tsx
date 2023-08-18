// External dependencies
import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';

// Internal dependencies
import Square from '../components/CardPagos';
import Header from '../components/Header';
import ConnectionCheck from '../components/internetChecker';
import Banner from '../components/Banner';
import colors from '../utils/colors';
import { useAppSelector } from '../store-v2/hooks';
import { RootStackParamList } from '../types/navigation';
import { useNotification } from '../components/DropDownAlertProvider';
import Button from '../components/Button';
import { clearAuth } from '../store-v2/reducers/auth';
import Card from '../components/Card';
import { CLEAR_AUTH } from '../store/reducers/auth';

// Types & Interfaces
type IMenuInicioScreenProps = NativeStackScreenProps<RootStackParamList, 'menuInicio'>;

interface IItemMenu {
  isBlank: boolean;
  color: string;
  name: string;
  iconname: string;
  enableEntypo: boolean;
  navegacion?: keyof RootStackParamList;
  necesitaLogin?: boolean;
  deshabilitado?: boolean;
  linkurl?: string;
}

/**
 * @description Todo el datalist son los botones del menú de inicio, cada uno con sus
 * propiedades como el icono del botón,color del botón en caso de que esté desactivado,
 * nombre etc.
 */
const dataList: IItemMenu[] = [
  {
    isBlank: false,
    color: '#404040',
    name: 'Pagar Infracciones',
    iconname: 'car',
    enableEntypo: false,
    navegacion: 'pagoPadron',
    necesitaLogin: false,
    padrones: 'Infracciones',

  },
  {
    isBlank: false,
    color: '#404040',
    name: 'Pagar Predial',
    iconname: 'house-user',
    enableEntypo: true,
    navegacion: 'pagoPadron',
    necesitaLogin: false,
    padrones: 'Predio',
  },
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Zonificación de Predio',
  //   iconname: 'map-marked-alt',
  //   enableEntypo: true,
  //   navegacion: 'zonoficacion',
  //   necesitaLogin: false,
  // },
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
    name: 'Facturar',
    iconname: 'id-card-alt',
    enableEntypo: true,
    navegacion: 'inicioFactura',
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
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Cabildo',
  //   iconname: 'users',
  //   enableEntypo: true,
  //   necesitaLogin: false,
  //   deshabilitado: false,
  //   navegacion: 'cobildo',
  // },
  // {
  //   isBlank: false,
  //   color: '#404040',
  //   name: 'Estrados',
  //   iconname: 'balance-scale-right',
  //   enableEntypo: true,
  //   necesitaLogin: false,
  //   deshabilitado: false,
  //   navegacion: 'estrados',
  // },
];

const item = { descripcion: 'Infracciones', estados_globales: 1, id: 19 };

const numColumns = 3;

const MenuInicio = ({ navigation }: IMenuInicioScreenProps) => {
  // Component's state

  // TODO: Why is this needed?
  // eslint-disable-next-line
  const [hasSwitchedView, setHasSwitchedView] = useState(false);

  const ciudadano = useAppSelector((state) => state.auth.ciudadano);
  const notify = useNotification();

  const dispatch = useDispatch();

  /**
   * En el diseño de esta pantalla, en algunos casos pueden quedar iconos vacios,
   * pero estos se siguen mostrando esta parte es para saber si debería haber más
   * botones en las columnas restantes, en caso de que detecte que no debería haber,
   * cambia la propiedad de isblank a true, dentro del componente del botón, al ser
   * esta propiedad true, el botón se hace invisible e imposible de hacer clic en el.
   */
  const formatData = (items: IItemMenu[], columns: number) => {
    const totalRows = Math.floor(items.length / columns);
    const totalLastRow = items.length - (totalRows * columns);

    // while (totalLastRow !== 0 && totalLastRow !== columns) {
    //   items.push({
    //     name: 'nada',
    //     iconname: 'question',
    //     enableEntypo: false,
    //     isBlank: true,
    //     color: '#404040',
    //   });

    //   totalLastRow += 1;
    // }

    return items;
  };

  /**
   * Está función sirve para navegar a otras pantallas dependiendo del botón
   * que presionaste. También al presionar el botón hace que se active
   * un timer para evitar que se presionar el mismo botón varias veces, previniendo
   * así que puedas entrar a la misma pantalla multiples veces.
   */
  const navigateToScreen = (item: IItemMenu) => {
    if (item.name === 'nada') {
      notify({
        type: 'info',
        title: 'Aviso',
        message: 'Se está realizando mantenimiento a esta función, favor de intentarlo más tarde.',
      });
      return;
    }

    if (item.necesitaLogin && !ciudadano) {
      notify({
        type: 'warn',
        title: 'Aviso',
        message: 'Necesita iniciar sesión para tener acceso a esta opción',
      });

      return;
    }

    if (item.linkurl) {
      void Linking.openURL(item.linkurl);
      return;
    }

    if (item.navegacion) {
      setHasSwitchedView(true);
      navigation.navigate(item.navegacion, { padron: item.padrones });
    }
  };

  const logOut = () => {
    dispatch(clearAuth({}));

    navigation.reset({
      index: 0,
      routes: [
        { name: 'loginScreen' },
      ],
    });
  };

  const ciudadanoDisplayName = useMemo(() => {
    if (!ciudadano) return null;

    return [ciudadano.nombre, ciudadano.apellido_paterno].filter((x) => Boolean(x)).join(' ');
  }, [ciudadano]);

  /**
   * Esta función renderiza los botones dependiendo de sus propiedades, color, nombre, icono etc.
   */
  const renderMenuItem = ({ item }: { item: IItemMenu }) => (
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
          padron={item.padron}
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

        {
          Boolean(ciudadano) && (
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Bienvenido
              </Text>

              <Text style={styles.greetingSubject}>
                {ciudadanoDisplayName}
              </Text>
            </View>
          )
        }

        <View style={styles.separator} />

        <FlatList
          data={formatData(dataList, numColumns)}
          renderItem={renderMenuItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={numColumns}
          ListFooterComponent={(
            <>
              {/* <View style={styles.pagosStyle}>
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
                      <Text style={styles.pagoSubCategoryText}>Pago de trámites directos</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={styles.separator} />

              <TouchableOpacity onPress={() => navigation.navigate('tramites')}>
                <Card
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: '#009C6F',
                  }}
                >
                  <Text style={styles.greeting2}>Trámites</Text>
                  <FontAwesome5
                    name="folder-open"
                    size={30}
                    solid
                    color="#142B47"
                  />
                </Card>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={() => navigation.navigate('cartografia')}>
                <Card
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: '#009C6F',
                  }}
                >
                  <Text style={styles.greeting2}>Cartografía</Text>
                  <FontAwesome5
                    name="map-marked-alt"
                    size={30}
                    solid
                    color="#142B47"
                  />
                </Card>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={() => navigation.navigate('cobildo')}>
                <Card
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: '#009C6F',
                  }}
                >
                  <Text style={styles.greeting2}>Noticias</Text>
                  <FontAwesome5
                    name="newspaper"
                    size={30}
                    solid
                    color="#142B47"
                  />
                </Card>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity onPress={() => navigation.navigate('estrados')}>
                <Card
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 3,
                    borderBottomColor: '#009C6F',
                  }}
                >
                  <Text style={styles.greeting2}>Estrados</Text>
                  <FontAwesome5
                    name="table"
                    size={30}
                    solid
                    color="#142B47"
                  />
                </Card>
              </TouchableOpacity>

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

              {
                Boolean(ciudadano) && (
                  <Button
                    onPress={logOut}
                    style={styles.logOutButton}
                    iconStyle={styles.logOutIcon}
                    textStyle={styles.logOutText}
                    iconName="sign-out-alt"
                    text="Cerrar Sesión"
                    size="large"
                  />
                )
              }
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
    borderBottomWidth: 5,
    borderBottomColor: '#009C6F',
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
    fontWeight: '600',
    fontSize: 14,
  },
  greetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  greeting: {
    color: '#404040',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greeting2: {
    color: '#142B47',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  greetingSubject: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logOutButton: {
    marginTop: 8,
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    borderColor: '#a3a3a3',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  logOutText: {
    color: '#60595D',
  },
  logOutIcon: {
    margin: 0,
    marginRight: 8,
  },
});

export default MenuInicio;
