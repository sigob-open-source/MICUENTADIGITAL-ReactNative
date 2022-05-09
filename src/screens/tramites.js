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
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import http from '../services/http';

import PopUpTramites from '../components/popUpTramites';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/loadingAnimation';

const WIDTH = Dimensions.get('window').width;

const Tramites = props =>{

  const [collapsed, setCollapsed] = useState(true)
  const [selectedDependency, setSelectedDependency] = useState(null)
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [tramitesMunicipales, setTramitesMunicipales] = useState(null)
  const [selectedTramite, setSelectedTramite] = useState(null)
  const [tramiteDesc, setTramiteDesc] = useState(null)
  const [tramiteRequisitos, setTramiteRequisitos] = useState(null)
  const [department, setDepartment] = useState(null)

  let popupRef = React.createRef();

  controller = new AbortController();

  const onShowPopup = (tramite, descTramite, departamento, requisitos) => {
    if (tramitesMunicipales != null){
      setSelectedTramite(tramite);
      setTramiteDesc(descTramite);
      setDepartment(departamento);
      setTramiteRequisitos(requisitos);
      popupRef.show;
    }
  }
  const onClosePopup = () => {
    popupRef.close();
  };

  ////REPLACE THE STUFF BELOW WITHT HE HOOK EQUIVALENT

  useEffect(() => {
    getDependencyList();
  }, []);
  useEffect(() => {
    // componentWillUnmount
    return () => {
       controller.abort();
    }
  }, []);

  //const componentDidMount = () => {
  //  getDependencyList();
  //}

  //const componentWillUnmount = () => {
   //this.controller.abort();
  //}

  const getDependencyList = async () => {
    await http.get('tramites/plantillas-tramites-atencion-ciudadana/?entidad_municipal=1').then(
      (response) => {
        const result = response.data;
        if (result.length > 0) {
          setData(result)
          setFilteredData(result)
          setSelectedDependency(result[0].departamentos[0].unidad_operativa.descripcion)
          setTramitesMunicipales(result[0].nombre)
        } else {
          setSelectedDependency('No hay datos.')
          setTramitesMunicipales('Sin Datos.')
        }
      },
      (error) => {
        setSelectedDependency('No hay datos.')
        setTramitesMunicipales('Sin Datos.')
        console.log(error);
      },
    );
  };

  const setDependency = (item) => {
    setSelectedDependency(item)
    setCollapsed(true)
  };

  const renderItem = (item) => (
    <View>
      <TouchableOpacity onPress={() => setDependency(item.descripcion)}>
        <View style={styles.content}>
          <Text style={styles.collapsibleText}>{item.descripcion}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderTramite = (item, index) => {
    if (selectedDependency == item.departamentos[index].unidad_operativa.descripcion) {
      return (
        <TouchableOpacity onPress={() => onShowPopup(
          item.nombre,
          item.descripcion,
          item.departamentos[index].descripcion,
          item.requisitos,
        )}
        >

          <View style={styles.tramiteView}>
            <Text style={styles.collapsibleText}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const toggleExpanded = () => {
    if (data != null) {
      setCollapsed(collapsed => !collapsed)
    }
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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <PopUpTramites
          ref={(target) => popupRef = target}
          onTouchOutside={onClosePopup}
          nombreTramite={selectedTramite}
          descTramite={tramiteDesc}
          nombreDepartamento={department}
          requisitos={tramiteRequisitos}
        />
        <Header
          style={styles.header}
          item="Trámites"
          imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../assets/imagenes/header_logo.png')}
        />

        <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}> Filtrar por dependencia </Text>

        <TouchableWithoutFeedback onPress={toggleExpanded}>
          <View style={styles.collapsibleHeader}>
            {
              selectedDependency == null ? (
                <Loading loading />
              ) : <Text style={styles.headerText}>{selectedDependency}</Text>
            }

            {
              collapsed ? (
                <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-down" color="black" />
              ) : <MaterialIcons style={{ alignSelf: 'flex-end' }} size={40} name="keyboard-arrow-up" color="black" />
            }

          </View>
        </TouchableWithoutFeedback>
        <View style={styles.collapsibleContainer}>
          <Collapsible collapsed={collapsed}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => renderItem(item.departamentos[index].unidad_operativa)}
              keyExtractor={(item, index) => index.toString()}
            />
          </Collapsible>
        </View>

        <Text style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 5,
        }}
        >
          {' '}
          Busqueda
        </Text>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Buscar..."
            placeholderTextColor="gray"
            onChangeText={(text) => {searchTramite(text); }}
          />
          <TouchableOpacity>
            <View style={{
              borderRadius: 10, width: 46, height: 46, justifyContent: 'center',
            }}
            />
          </TouchableOpacity>
        </View>

        <Text style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 30,
        }}
        >
          {' '}
          Trámites Municipales
        </Text>

        {
        tramitesMunicipales == null ? (
          <View style={styles.tramiteView}>
            <Loading loading />
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
    marginTop: 5,
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
    marginLeft: '3%',
    fontSize: 20,
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Tramites;
