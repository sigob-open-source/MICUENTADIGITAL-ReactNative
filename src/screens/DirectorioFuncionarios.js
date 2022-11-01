import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';

import colors from '../utils/colors';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getFuncionarios } from '../services/api';
import ModalFuncionario from '../components/modalFuncionarios';
import Loading from '../components/loadingAnimation';
import ConnectionCheck from '../components/internetChecker';

const WIDTH = Dimensions.get('window').width;

const DirectorioFunc = (props) => {
  const [funcionarios, setFuncionarios] = useState(null);
  const [funcionariosFiltered, setFuncionariosFiltered] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellidoPaterno, setApellidoPaterno] = useState(null);
  const [apellidoMaterno, setApellidoMaterno] = useState(null);
  const [lada, setLada] = useState(null);
  const [numero, setNumero] = useState(null);
  const [curp, setCurp] = useState(null);
  const [rfc, setRfc] = useState(null);
  const [observaciones, setObservaciones] = useState(null);
  const [puesto, setPuesto] = useState(null);
  const [foto, setFoto] = useState(null);
  const [genero, setGenero] = useState(null);
  const [estadoFuncionario, setEstadoFuncionario] = useState(null);
  const [estado, setEstado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [texto, setTexto] = useState('');
  const [buscarOficinaTexto, setBuscarOficinaText] = useState('');
  const [selected, setSelected] = useState(0);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [NumeroCelular, setNumeroCelular] = useState(null);
  const [correo, setCorreo] = useState(null);

  useEffect(() => {
    if (funcionarios != null) {
      if (selected === 0) {
        setLoading(false);
        setMostrarResultados(false);
        setFuncionariosFiltered([]);
      }

      if (selected === 1) {
        setKeyboardVisible(false);
        if (buscarOficinaTexto != '') {
          setMostrarResultados(true);
        } else {
          setLoading(false);
          setMostrarResultados(false);
          setFuncionariosFiltered([]);
        }
        const filterOficina = funcionarios.filter((item) => `${item.object_id}`
          .toLowerCase()
          .includes(buscarOficinaTexto.toLowerCase()));
        setFuncionariosFiltered(filterOficina);
      } else if (selected === 2) {
        if (texto != '') {
          setMostrarResultados(true);
        } else {
          setLoading(false);
          setMostrarResultados(false);
          setFuncionariosFiltered([]);
        }
        const filter = funcionarios.filter((item) => `${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`
          .toLowerCase()
          .includes(texto.toLowerCase()));
        setFuncionariosFiltered(filter);
        setTexto('');
      }
    }
  }, [funcionarios]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      setFuncionarios({});
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (selected == 1) {
      setTexto('');
    } else {
      setBuscarOficinaText('');
    }
  }, [selected]);

  useEffect(() => {
    if (keyboardVisible) {
      setOpacity(0.3);
    } else {
      setOpacity(1);
    }
  }, [keyboardVisible]);

  const getData = async () => {
    const funcionarios = await getFuncionarios();
    setFuncionarios(funcionarios);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const clearText = (text) => {
    setSelected(1);
    setBuscarOficinaText(text);
    if (text == '.' || text == ',' || text == ' ' || text == '-') {
      setBuscarOficinaText('');
    }
    setTexto('');
  };

  const clearBuscarOficinaText = (text) => {
    setSelected(2);
    setBuscarOficinaText('');
    setTexto(text);
    if (text == ' ') {
      setTexto('');
    } {}
  };

  // buscar funcionario por texto / nombre apellido etc
  const buscarPorTexto = async () => {
    setFuncionarios(null);
    setMostrarResultados(false);
    setKeyboardVisible(false);
    setLoading(true);
    try {
      const funcionarios = await getFuncionarios();
      setFuncionarios(funcionarios);
    } catch (error) {
      Alert.alert('ERROR', 'Hubo un error al comunicarse con el servidor. Por favor intentarlo más tarde.');
    }
  };

  const openModal = (
    nombre,
    apePater,
    apeMater,
    lada,
    num,
    curp,
    rfc,
    observ,
    puesto,
    genero,
    estadoFunc,
    estado,
    foto,
    numCel,
    correo,
  ) => {
    setNombre(nombre);
    setApellidoPaterno(apePater);
    setApellidoMaterno(apeMater);
    setLada(lada);
    setNumero(num);
    setCurp(curp);
    setRfc(rfc);
    setObservaciones(observ);
    setPuesto(puesto);
    setGenero(genero);
    setEstadoFuncionario(estadoFunc);
    setEstado(estado);
    setModalOpen(true);
    setFoto(foto);
    setNumeroCelular(numCel);
    setCorreo(correo);
  };

  const renderItem = (item) => (
    <View>
      <TouchableOpacity onPress={
          () => openModal(
            item.nombre,
            item.apellido_paterno,
            item.apellido_materno,
            item.lada,
            item.numero_de_empleado,
            item.CURP,
            item.RFC,
            item.observaciones,
            item.puesto,
            item.genero,
            item.estado_del_funcionario.descripcion,
            item.estado_civil,
            item.foto,
            item.numero_de_celular,
            item.correo_electronico,
          )
}
      >
        <View style={styles.content}>

          <Text style={styles.collapsibleText}>{`${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ConnectionCheck />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Header
          style={styles.header}
          item="Directorio"
          imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
          img={require('../../assets/imagenes/header_logo.png')}
        />
        <View style={{ marginTop: '5%' }}>
          <ModalFuncionario
            nombre={nombre}
            apellidoPaterno={apellidoPaterno}
            apellidoMaterno={apellidoMaterno}
            lada={lada}
            numero={numero}
            curp={curp}
            foto={foto}
            rfc={rfc}
            observaciones={observaciones}
            puesto={puesto}
            genero={genero}
            estadoFunc={estadoFuncionario}
            estado={estado}
            open={modalOpen}
            telefono={NumeroCelular}
            correo={correo}
            onTouchOutside={() => setModalOpen(false)}
          />

          <View style={styles.textInputContainer}>
            <TextInput
              keyboardType="number-pad"
              style={styles.textInputStyle}
              placeholder="Dependencia/Oficina.*"
              placeholderTextColor="gray"
              value={buscarOficinaTexto}
              onPressIn={() => setKeyboardVisible(true)}
              onSubmitEditing={() => buscarPorTexto()}
              onChangeText={(text) => clearText(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInputStyle}
              value={texto}
              placeholder="Busqueda de texto."
              placeholderTextColor="gray"
              onChangeText={(text) => clearBuscarOficinaText(text)}
              onPressIn={() => setKeyboardVisible(true)}
              onSubmitEditing={() => buscarPorTexto(texto)}
            />
          </View>
          {
          mostrarResultados ? (
            <View style={[styles.flatView, { opacity }]}>
              <FlatList
                data={funcionariosFiltered}
                renderItem={({ item, index }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null
        }

          {
          loading ? (
            <View style={styles.loadingView}>
              <Loading size="large" loading />
            </View>
          ) : null
        }

        </View>
      </View>
      {
        !(texto == null || texto == '') || !(buscarOficinaTexto == null || buscarOficinaTexto == '') ? (
          <TouchableOpacity onPress={() => buscarPorTexto()} onPressIn={Keyboard.dismiss}>
            <View style={styles.searchButton}>
              <Text style={styles.buttonText}>Buscar Funcionario</Text>
            </View>
          </TouchableOpacity>
        ) : null

      }

      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    width: 336,
    height: 46,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: colors.secundario,
    justifyContent: 'center',
    marginVertical: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  searchButtonDisabled: {
    width: 336,
    height: 46,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: colors.alternativo,
    justifyContent: 'center',
    marginVertical: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingView: {
    marginTop: 40,
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
    marginTop: 21,
    width: 336,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  textInputStyle: {
    color: 'black',
  },
  content: {
    width: WIDTH,
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#79142A',
  },
  collapsibleText: {
    flexShrink: 1,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '500',
    fontSize: 0.05 * WIDTH,
    color: 'black',
    textAlign: 'center',
  },
  tramiteView: {
    width: WIDTH,
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatView: {
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default DirectorioFunc;
