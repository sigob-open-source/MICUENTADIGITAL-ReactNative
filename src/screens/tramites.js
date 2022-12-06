import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { getDependencias, getTramites } from '../services/api';

import PopUpTramites from '../components/popUpTramites';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectionCheck from '../components/internetChecker';

const WIDTH = Dimensions.get('window').width;

const Tramites = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [selectedDependency, setSelectedDependency] = useState(null);// Saber que dependencia ha seleccionado el usuario para filtrar los trámites
  const [data, setData] = useState(null);// Datos de los trámites
  const [dependencias, setDependencias] = useState(null); // Dependencias obtenidas
  const [filteredData, setFilteredData] = useState([]); // State para filtrar los trámites
  const [tramitesMunicipales, setTramitesMunicipales] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [tiposDeFiltros, setTiposDeFiltros] = useState(['Dependencia/Oficina', 'Búsqueda', 'Más buscados', 'Clasificación', 'Sujeto de interés']);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('Búsqueda');
  const [Sujeto, setSujeto] = useState(['Empresa', 'Ciudadano']);
  const [clasificacion, setClasificacion] = useState(['Trámite', 'Servicio']);
  const [fichaProps, setFichaProps] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [paginaAHacerleFetch, setPaginaAHacerleFetch] = useState(1);
  const [loading, setLoading] = useState(true);

  // Checar si el usuario está conectado a internet
  const netInfo = useNetInfo();
  useEffect(() => {
    CheckConnected();
  }, [netInfo]);

  // Obtener dependencias y trámites
  useEffect(() => {
    if (data == null) {
      obetnerDependencias();
      obtenerTramites();
    }
    // Evitar memory leaks por hacer fetch a API
    return () => {
      setLoading({});
      setPaginaAHacerleFetch({});
      setData({});
      setDependencias({});
      setFilteredData({});
      setTramitesMunicipales({});
    };
  }, []);

  // Checar conexión a internet
  const CheckConnected = async () => {
    const response = await NetInfo.fetch();
    if (!response.isConnected) {
      setModalOpen(false);
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  // Abre un modal que muestra la ficha del trámite seleccionado
  const onShowPopup = (
    fichaProp,
  ) => {
    if (isConnected) {
      if (tramitesMunicipales != null) {
        setFichaProps(fichaProp);
        setModalOpen(true);
      }
    } else {
      Alert.alert('Error', 'Debe estar conectado a internet para realizar esta acción.');
    }
  };

  // Función que se usa para renderizar los trámites obtenidos desde el api, en un FlatList
  const returnTramiteInfo = (item) => (

    <TouchableOpacity onPress={() => onShowPopup(
      [
        item.nombre,
        item.descripcion,
        item.departamentos,
        undefined,
        item.homoclave,
        item.departamentos[0].unidad_operativa.descripcion,
        // item.tipo_de_tramite
      ],
    )}
    >
      <View style={styles.tramiteView}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.collapsibleText}>{`${item.id} - ${item.nombre}`}</Text>
      </View>
    </TouchableOpacity>
  );

  // Función para obtener todos los Trámites, sin importar el número de paginas que haya
  const obtenerTramites = async () => {
    let endOfList = false;
    let items = [];
    let currentPage = 1;

    try {
      // Mientras haya páginas de las que agarrar info disponible, seguir llamando al API
      while (endOfList === false) {
        const tramites = await getTramites(currentPage);

        endOfList = !tramites.next;

        items = [...items, ...tramites.results];
        setData(items);
        setFilteredData(items);
        setTramitesMunicipales(items[0].nombre);
        currentPage += 1;
        setLoading(false);

        // Terminar la carga si se obtienen todos los trámites de forma éxitosa
        if (endOfList) {
          setLoading(false);
        } else {
          setTramitesMunicipales('Sin Datos.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Ha habido un error al comunicarse con el servidor. Favor de intentarlo más tarde.');
      setTramitesMunicipales('Sin Datos.');
      console.log('Oh no: ', error);
    }
  };

  // Obtener las dependencias para así poder filtrar los trámites
  const obetnerDependencias = async () => {
    try {
      const dependency = await getDependencias();
      if (dependency.length > 0 && dependency != undefined) {
        setDependencies(dependency);
        setSelectedDependency(dependency[0].descripcion);
      } else {
        setSelectedDependency('No hay datos.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ha habido un error al comunicarse con el servidor. Favor de intentarlo más tarde.');
      setSelectedDependency('No hay datos.');
      console.log('Oh no: ', error);
    }
  };

  const setDependency = (item) => {
    setSelectedDependency(item);
    setCollapsed(true);
  };

  const renderItem = (item) => (
    <View>
      <TouchableOpacity onPress={() => setDependency(item)}>
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.collapsibleText}>{item}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (dependencies != null) {
      switch (filtroSeleccionado) {
        case 'Dependencia/Oficina':
          if (dependencias != null) {
            setSelectedDependency(dependencies[0].descripcion);
          } else {
            setSelectedDependency('No hay datos.');
          }

          break;
        case 'Búsqueda': break;
        case 'Más buscados': Alert.alert('Alerta', 'Se está realizando mantenimiento a esta opción'); break;
        case 'Clasificación': setSelectedDependency('Trámite'); break;
        case 'Sujeto de interés': Alert.alert('Alerta', 'Se está realizando mantenimiento a esta opción'); break;
      }
    }
  }, [filtroSeleccionado]);

  const changeFiltro = (item) => {
    if (item == 'Más buscados' || item == 'Sujeto de interés') {
      Alert.alert('Alerta', 'Se está realizando mantenimiento a esta opción.');
    } else {
      setFiltroSeleccionado(item);
      setFilteredData(data);
    }
  };

  const renderFiltro = (item) => (
    <View>
      <TouchableOpacity onPress={() => changeFiltro(item)}>
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.collapsibleText}>{item}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderTramite = (item, index) => {
    if (filtroSeleccionado === 'Dependencia/Oficina') {
      if (item.departamentos[0].unidad_operativa.descripcion === selectedDependency) {
        return (
          returnTramiteInfo(item)
        );
      }
    } else if (filtroSeleccionado === 'Clasificación') {
      if (item.clasificacion === true && selectedDependency === 'Trámite') {
        return (
          returnTramiteInfo(item)
        );
      } if (item.clasificacion === false && selectedDependency === 'Servicio') {
        return (
          returnTramiteInfo(item)
        );
      }
    } else {
      return (
        returnTramiteInfo(item)
      );
    }
  };

  const toggleExpanded = () => {
    if (data != null) {
      setCollapsed((collapsed) => !collapsed);
    }
  };

  const toggleTramiteFiltros = () => {
    setCollapsed2((collapsed2) => !collapsed2);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  // Buscar un tramite en especifico filtrando dependiendo de lo que se devuelva en el campo de texto
  const searchTramite = (tramiteToSearch) => {
    if (data != null) {
      setFilteredData(data.filter((item) => item.nombre.toLowerCase().includes(tramiteToSearch.toLowerCase())));
    }
  };

  const loadMoreItem = () => {
    console.log('====================================');
    console.log('muchos items mas');
    console.log('====================================');
  };

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ConnectionCheck />
      <View style={{ flex: 1, alignItems: 'center' }}>

        <PopUpTramites
          openM={modalOpen}
          close={() => setModalOpen(false)}
          onTouchOutside={() => setModalOpen(false)}
          tramiteProp={fichaProps}
        />

        <Header
          style={styles.header}
          item="Trámites"
        />

        <View style={{ marginTop: '5%', alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={toggleTramiteFiltros}>
            <View style={styles.collapsibleHeader}>
              <Text numberOfLines={1} style={styles.headerText}>{filtroSeleccionado}</Text>
              {
                collapsed2 ? (
                  <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
                ) : <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-up" color="black" />
              }
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.collapsibleContainer}>
            <Collapsible collapsed={collapsed2}>
              <FlatList
                data={tiposDeFiltros}
                renderItem={({ item, index }) => renderFiltro(item, index)}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
              />
            </Collapsible>
          </View>
          {
          filtroSeleccionado === 'Dependencia/Oficina' ? (
            <>
              <TouchableWithoutFeedback onPress={toggleExpanded}>
                <View style={styles.collapsibleHeader}>
                  {selectedDependency == null ? (
                    <ActivityIndicator style={{ marginLeft: 20 }} size="large" color="black" />
                  ) : <Text numberOfLines={1} style={styles.headerText}>{selectedDependency}</Text>}

                  {collapsed ? (
                    <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
                  ) : <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-up" color="black" />}

                </View>
              </TouchableWithoutFeedback>

              <View style={styles.collapsibleContainer}>
                <Collapsible collapsed={collapsed}>
                  <FlatList
                    data={dependencies}
                    renderItem={({ item, index }) => renderItem(item.descripcion)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Collapsible>
              </View>
            </>
          ) : null
        }

          {
          filtroSeleccionado === 'Búsqueda' ? (

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Buscar..."
                placeholderTextColor="gray"
                onChangeText={(text) => searchTramite(text)}
              />
              <TouchableOpacity>
                <View style={{
                  borderRadius: 10, width: 46, height: 46, justifyContent: 'center',
                }}
                />
              </TouchableOpacity>
            </View>
          ) : null
        }

          {
          filtroSeleccionado === 'Sujeto de interés' ? (
            <>
              <TouchableWithoutFeedback onPress={toggleExpanded}>
                <View style={styles.collapsibleHeader}>
                  {selectedDependency == null ? (
                    <ActivityIndicator style={{ marginLeft: 20 }} size="large" color="black" />
                  ) : <Text numberOfLines={1} style={styles.headerText}>{selectedDependency}</Text>}

                  {collapsed ? (
                    <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
                  ) : <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-up" color="black" />}

                </View>
              </TouchableWithoutFeedback>

              <View style={styles.collapsibleContainer}>
                <Collapsible collapsed={collapsed}>
                  <FlatList
                    data={Sujeto}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Collapsible>
              </View>
            </>
          ) : null
        }

          {
          filtroSeleccionado === 'Clasificación' ? (
            <>
              <TouchableWithoutFeedback onPress={toggleExpanded}>
                <View style={styles.collapsibleHeader}>
                  {selectedDependency == null ? (
                    <ActivityIndicator style={{ marginLeft: 20 }} size="large" color="black" />
                  ) : <Text numberOfLines={1} style={styles.headerText}>{selectedDependency}</Text>}

                  {collapsed ? (
                    <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
                  ) : <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-up" color="black" />}

                </View>
              </TouchableWithoutFeedback>

              <View style={styles.collapsibleContainer}>
                <Collapsible collapsed={collapsed}>
                  <FlatList
                    data={clasificacion}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Collapsible>
              </View>
            </>
          ) : null
        }
          {
        loading == true ? (
          <View style={{ justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: 'gray' }}>Buscando trámites, por favor espere...</Text>
            <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="black" />
          </View>
        )
          : (
            <>
              {
            tramitesMunicipales == 'Sin datos.' ? (
              <Text style={{ color: 'gray' }}>No se encontraron trámites.</Text>
            )

              : (
                <FlatList
                  data={filteredData}
                  renderItem={({ item, index }) => renderTramite(item, index)}
                  keyExtractor={(item, index) => index.toString()}
                />
              )
          }

            </>
          )
      }
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    width: 336,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#79142A',
    alignSelf: 'center',
    marginBottom: 23,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  textInputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '88%',
    height: 46,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  textInputStyle: {
    color: 'black',
    width: 300,
  },
  collapsibleContainer: {
    backgroundColor: 'white',
    width: 336,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    height: 45,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  headerText: {
    fontWeight: '500',
    width: 270,
    marginLeft: '3%',
    fontSize: 18,
    color: 'black',
  },
  content: {
    width: 295,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    width: 336,
    backgroundColor: '#e6e6e6',
  },
  collapsibleText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    marginLeft: '1.5%',
    fontSize: 12,
    color: 'black',
  },
  tramiteView: {
    width: WIDTH,
    height: 75,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#d9d9d9',
    padding: 10,
  },
});

export default Tramites;
