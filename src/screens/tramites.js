import React, { Component, useState, useEffect } from 'react';
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
  Alert
} from 'react-native';

import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getDependencias } from '../services/api';
import { getTramites } from '../services/api';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo'
import PopUpTramites from '../components/popUpTramites';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectionCheck from '../components/internetChecker';

const WIDTH = Dimensions.get('window').width;

const Tramites = props =>{

  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [selectedDependency, setSelectedDependency] = useState(null);
  const [data, setData] = useState(null);
  const [dependencias, setDependencias] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [tramitesMunicipales, setTramitesMunicipales] = useState(null);
  const [selectedTramite, setSelectedTramite] = useState(null);
  const [tramiteDesc, setTramiteDesc] = useState(null);
  const [tramiteRequisitos, setTramiteRequisitos] = useState(null);
  const [department, setDepartment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [uniqueDependencyArray, setUniqueDependencyArray] = useState(null);
  const [tiposDeFiltros, setTiposDeFiltros] = useState(['Dependencia/Oficina','Busqueda','Más buscados','Clasificación','Sujeto de interés']);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("Dependencia/Oficina");
  const [Sujeto, setSujeto] = useState(['Empresa','Ciudadano']);
  const [sujetoSeleccionado, setSujetoSeleccionado] = useState('Empresa');
  const [clasificacion, setClasificacion] = useState(['Trámite','Servicio']);
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState("Trámite")
  const [fichaProps, setFichaProps] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const netInfo = useNetInfo();

  useEffect(() => {

    CheckConnected();
    
  }, [netInfo]);

  const CheckConnected = async () =>{

      const response = await NetInfo.fetch();
      if (!response.isConnected){
        setModalOpen(false);
        setIsConnected(false);
      }else{
        setIsConnected(true);
      }
    }

  const onShowPopup = (
    fichaProp, 
    ) => {
    if (isConnected){
      if (tramitesMunicipales != null){
        setFichaProps(fichaProp)
        setModalOpen(true);
      }
    }else{
      Alert.alert("Error","Debe estar conectado a internet para realizar esta acción.")
    }

  }


  const returnTramiteInfo = (item) => {
    return(
      
      <TouchableOpacity onPress={() => onShowPopup(
        [ 
          item.nombre,
          item.descripcion,
          item.departamentos,
          item.casos[0],
          item.homoclave,
          item.departamentos[0].unidad_operativa.descripcion,
          item.tipo_de_tramite
        ]
      )}
      >
        <View style={styles.tramiteView}>
          <Text style={styles.collapsibleText}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    if (data == null){
      obetnerDependencias();
      obtenerTramites();
    }
    
  }, []);
  
  const obtenerTramites = async () =>{
    try {
      const tramites = await getTramites();
    
      if (tramites.length > 0 && tramites != undefined){
        setData(tramites)
        setFilteredData(tramites)
        setTramitesMunicipales(tramites[0].nombre)      
      } else{
        setTramitesMunicipales('Sin Datos.')
      }
    } catch (error) {
      Alert.alert("Error","Ha habido un error al comunicarse con el servidor. Favor de intentarlo más tarde.")
      setTramitesMunicipales('Sin Datos.')
      console.log("Oh no: ",error)
    }

  }

  const obetnerDependencias = async () =>{
    try {
      const dependency = await getDependencias();
      if (dependency.length > 0 && dependency != undefined){
        setDependencies(dependency);
        setSelectedDependency(dependency[0].descripcion);
      } else{
        setSelectedDependency('No hay datos.')
      }
    } catch (error) {
      Alert.alert("Error","Ha habido un error al comunicarse con el servidor. Favor de intentarlo más tarde.")
      setSelectedDependency('No hay datos.')
      console.log("Oh no: ",error)
    }
 
  }

  const setDependency = (item) => {
    setSelectedDependency(item);
    setCollapsed(true);
  };

  const renderItem = (item) => 
  {
    return(
      <View>
        <TouchableOpacity onPress={() => setDependency(item)}>
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.collapsibleText}>{item}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    if (dependencies != null){
      switch(filtroSeleccionado){
        case "Dependencia/Oficina": 
          if (dependencias != null){
            setSelectedDependency(dependencies[0].descripcion); 
          }
          
        
        break;
        case "Busqueda": break;
        case "Más buscados": break;
        case "Clasificación" : setSelectedDependency("Trámite"); break;
        case "Sujeto de interés": break;
    }
    }


  }, [filtroSeleccionado]);

  const changeFiltro = (item) => {
    setFiltroSeleccionado(item);
    setFilteredData(data);

  }

  const renderFiltro = (item) => 
  {
    return(
      <View>
        <TouchableOpacity onPress={() => changeFiltro(item)}>
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.collapsibleText}>{item}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderTramite = (item, index) => {
    if (filtroSeleccionado === "Dependencia/Oficina")
    {
      if (item.departamentos[0].unidad_operativa.descripcion === selectedDependency){
        return(
          returnTramiteInfo(item)
        )
      }
    }else if (filtroSeleccionado === "Clasificación"){
      if (item.clasificacion === true && selectedDependency === "Trámite"){
        return(
          returnTramiteInfo(item)
        ) 
      }else if (item.clasificacion === false && selectedDependency === "Servicio"){
        return(
          returnTramiteInfo(item)
        ) 
      }
    }else{
      return(
        returnTramiteInfo(item)
      )      
    }
    


  };

  const toggleExpanded = () => {
    if (data != null) {
      setCollapsed(collapsed => !collapsed)
    }
  };

  const toggleTramiteFiltros = () => {
    setCollapsed2(collapsed2 => !collapsed2)
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  // Buscar un tramite en especifico filtrando dependiendo de lo que se devuelva en el campo de texto
  const searchTramite = (tramiteToSearch) => {
    if (data != null) {
      setFilteredData(data.filter((item) => item.nombre.toLowerCase().includes(tramiteToSearch.toLowerCase())))
    }
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ConnectionCheck/>
      <View style={{ flex: 1, alignItems: 'center' }}>
        
        <PopUpTramites
          openM={modalOpen}
          close={()=>setModalOpen(false)}
          onTouchOutside={()=>setModalOpen(false)}
          tramiteProp={fichaProps}
        />
        
        <Header
          style={styles.header}
          item="Trámites"
          imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../assets/imagenes/header_logo.png')}
        />

        <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}> Filtrar por </Text>

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
            />
            </Collapsible>
          </View>
        {
          filtroSeleccionado === "Dependencia/Oficina" ? (
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
          filtroSeleccionado === "Busqueda" ?(

            <>
              <Text style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '700',
                marginTop: 5,
              }}
              >
                {' '}
                Busqueda
              </Text><View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Buscar..."
                    placeholderTextColor="gray"
                    onChangeText={(text) => searchTramite(text) } />
                  <TouchableOpacity>
                    <View style={{
                      borderRadius: 10, width: 46, height: 46, justifyContent: 'center',
                    }} />
                  </TouchableOpacity>
                </View>
              </>
          ) : null
        }

        {
          filtroSeleccionado === "Sujeto de interés" ? (
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
          filtroSeleccionado === "Clasificación" ? (
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

        <Text style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 30,
          marginBottom:30,
        }}
        >
          {' '}
          Trámites
        </Text>
        {
        tramitesMunicipales == null ? (
          <View style={{justifyContent:'center', marginTop:20}}>
            <ActivityIndicator style={{alignSelf:'center'}}size="large" color="black"/>
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

      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />

    </View>
  );
}

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
    width: 336,
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
    width: 336,
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
    width:270,
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
    fontSize: 0.05 * WIDTH,
    color: 'black',
  },
  tramiteView: {
    width: WIDTH,
    height: 50,
    marginBottom:10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth:2,
    borderBottomWidth:2,
    borderColor:'#79142A',
  },
});

export default Tramites;
