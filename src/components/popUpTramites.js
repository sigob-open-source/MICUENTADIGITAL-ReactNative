import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import Mailer from 'react-native-mail';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownAlert from 'react-native-dropdownalert';
import colors from '../utils/colors';

const PopUpTramites = (props) => {
  const [descTramite, setDescTramite] = useState(null);
  const [nayaritImage, setNayaritImage] = useState('assets/imagenes/logo_horizontal.png');
  const [year, setYear] = useState(new Date().getFullYear());
  const [requisitos, setRequisitos] = useState(null);
  const [homoclave, setHomoclave] = useState(null);
  const [tipoTramite, setTipoTramite] = useState(null);
  const [dependencia, setDependencia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState('<h1>Sin requisitos.</h1>');

  let dropDownAlertRef = useRef();

  useEffect(() => {
    if (loading) {
      if (!props.openM) {
        dropDownAlertRef.closeAction;
        setLoading(false);
      }
    }
    const requisites = props.tramiteProp[3];
    if (requisites != undefined) {
      setRender(`<h1> Requisitos: ${props.tramiteProp[3].requisitos.map((entry) => `<h1>  - ${entry.descripcion}</h1>`)}`);
    } else {
      setRender('<h1>Sin requisitos.</h1>');
    }
  }, [props.openM]);

  useEffect(() => {
    if (props.tramiteProp[3] == undefined) {
      setRequisitos(['No se encontraron requisitos.']);
    } else {
      setRequisitos(props.tramiteProp[3]);
    }

    if (props.tramiteProp[4] == null) {
      setHomoclave('Desconocida');
    } else {
      setHomoclave(props.tramiteProp[4]);
    }

    if (props.tramiteProp[5] == null) {
      setDependencia('Desconocida.');
    } else {
      setDependencia(props.tramiteProp[5]);
    }

    if (props.tramiteProp[6] == null) {
      setTipoTramite('Desconocido');
    } else {
      setTipoTramite(props.tramiteProp[6]);
    }
  }, [props.tramiteProp]);

  const cerrarModal = () => {
    props.onTouchOutside;
  };
  const renderRequisitos = () => (
    <FlatList
      data={props.tramiteProp[3]}
      renderItem={({ item, index }) => (
        <Text style={styles.textStyle}>
          Requisitos:
          {item.requisitos.descripcion}
        </Text>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={!loading ? (props.onTouchOutside) : null} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  const listFooter = () => (
    <View style={{ flex: 1, height: 180 }}>

      <FlatList
        ListHeaderComponent={(
          <>
            <Text style={styles.textStyle}>
              Descripción:
              {' '}
              {props.tramiteProp[1]}
            </Text>
            <Text style={styles.textStyle}>Departamentos:</Text>
          </>
          )}
        data={props.tramiteProp[2]}
        renderItem={({ item, index }) => (
          <Text style={styles.textStyle2}>
            {item.clave}
            {' '}
            -
            {' '}
            {item.descripcion}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={(
          <>

            {props.tramiteProp[4] != null ? (
              <Text style={styles.textStyle}>
                Homoclave:
                {props.tramiteProp[4]}
              </Text>
            ) : <Text style={styles.textStyle}>Homoclave: Desconocida</Text>}
            {props.tramiteProp[5] != null ? (
              <Text style={styles.textStyle}>
                Dependencia:
                {props.tramiteProp[5]}
              </Text>
            ) : <Text style={styles.textStyle}>Dependencia: Desconocida</Text>}
            {props.tramiteProp[6] != null ? (
              <Text style={styles.textStyle}>
                Tipo de Trámite:
                {props.tramiteProp[6]}
              </Text>
            ) : <Text style={styles.textStyle}>Tipo de Trámite: Desconocido</Text>}

            {props.tramiteProp[3] == undefined ? (
              <Text style={styles.textStyle}>Requisitos: No se han encontrado requisitos.</Text>
            )
              : (
                <View>
                  <Text style={styles.textStyle}>Requisitos: </Text>
                  <FlatList
                    data={props.tramiteProp[3].requisitos}
                    renderItem={({ item, index }) => (
                      <Text style={styles.textStyle}>
                        {' '}
                        -
                        {item.descripcion}
                      </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}

          </>
          )}
      />

    </View>
  );

  const sendEmail = (ruta) => {
    Mailer.mail({
      subject: 'Ficha Trámite',
      recipients: [''],
      body: '',
      isHTML: true, // iOS only, exclude if false
      attachments: [{
        path: ruta, // The absolute path of the file from which to read data.
        type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf
      }],
    }, (error, event) => {
      if (error) {
        Alert.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
      }
    });
  };

  const abrirPDF = (ruta) => {
    const path = FileViewer.open(ruta) // absolute-path-to-my-local-file.
      .then(() => {
      // success
      })
      .catch((error) => {
      // error
      });
  };

  const createPDF = async (type) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permisos requeridos',
          message:
              'Se requieren permisos para guardar archivos en el dispositivo. ',
          buttonNeutral: 'Preguntame más tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          setLoading(true);
          try {

          } catch (error) {

          }
          if (type == 0) {
            dropDownAlertRef.alertWithType('info', 'En proceso...', 'Generando PDF...');
          }
          const data = props.tramiteProp[0];
          const today = new Date();
          const hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
          const minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
          const seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();

          const options = {
            html: `
              <style>
              * {
                box-sizing: border-box;
              }        
              footer {
                display: flex;
                position:fixed;
                font-size: 15px;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100px;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 3px;
                background-color: #701c30;;
                color: white;
              }
            
              @page { 
                background-color: red; 
                margin-left: 0pt; 
                margin-right: 0pt; 
                margin-top: 0pt; 
                margin-bottom: 0pt; 
                padding-left: 0pt; 
                padding-right: 0pt; 
                padding-top: 0pt; 
                padding-bottom: 0pt; 
              }
              #hello {
                display: flex;
                font-size: 10px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                padding-top: 20px;
                align-items: center;
                padding-left: 80px;
                padding-right: 80px;
                padding-bottom:350px;
              }
              #title {
                font-size: 20px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                text-align: center;
                justify-content: center;
                align-content: center;
              }
              #logo {
                color: white;
                font-size:18px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                background-color: #4b4548;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 150px;
                box-sizing: border-box;
                border-bottom: 10px solid#701c30;
                -webkit-box-shadow: 0px 0px 30px 11px rgba(0,0,0,0.63); 
                box-shadow: 0px 0px 30px 11px rgba(0,0,0,0.63);
              }
            
              .column {
              float: left;
              width: 50%;
              height: 200px; /* Should be removed. Only for demonstration */
              }
              #desc {
                padding:50px;
                text-align: center;
                font-size:20px;
              }
            
              /* Clear floats after the columns */
              .row:after {
                content: "";
                display: table;
                clear: both;
              }
              </style>
              <body style="margin: 0;">
                
              <div id="logo">
                  <h1>Ficha del trámite</h3>
              </div>
            
              <div class="container" id="title">
                <h1> ${props.tramiteProp[0]} </h1>
              </div>
                <h3 id="desc"> ${props.tramiteProp[1]} </h3>
              <div class="row">
                <div class="column">
                  <div class="row even" id="hello">
                    <div col-md-12">
                      <h1>Departamentos: ${props.tramiteProp[2].map((entry) => `<h1>${entry.clave} - ${entry.descripcion}</h1>`).join(' ')}</h1>
                      <h1>Homoclave: ${homoclave}</h1>
                    </div>
                  </div>
            
                </div>
                <div class="column  ">
            
                  <div class="row even" id="hello">
                    <div col-md-12">
                      <h1>Dependencia: ${dependencia}</h1>
                      <h1>Tipo de Tramite: ${tipoTramite}</h1>
                    </div>
                  </div>
            
                </div>
              </div>
            
                <div class="row even" id="hello">
                  <div col-md-12">
                    ${render}
                  </div>
                </div>
            
              
              </body>
              `,
            fileName: `ficha_tramite_${hours + minutes + seconds}`,
            directory: 'Download',
            base64: true,
            width: 737,
            height: 1283,
          };
          const file = await RNHTMLtoPDF.convert(options);

          // RNFetchBlob.fs.dirs.DownloadDir it's getting the download folder from internal storage
          const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/ficha_tramite_${hours + minutes + seconds}.pdf`;
          RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
            .then((response) => {

            })
            .catch((errors) => {
              console.log(' Error Log: ', errors);
            });
          setLoading(false);
          dropDownAlertRef.closeAction();
          if (type == 0) {
            Alert.alert(
              'PDF descargado',
              'Su PDF se descargó exitosamente.',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
            );
          } else {
            sendEmail(filePath);
          }
        } catch (error) {
          Alert.alert('Error', 'Ha habido un error al descargar el PDF.');
          setLoading(false);
          console.log(error);
        }
      } else {
        setLoading(false);
        Alert.alert('Permiso denegado', 'Debe de conceder los permisos necesarios para generar el PDF.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const close = () => {
    props.close;
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={props.openM}
      onRequestClose={
        loading ? (
          props.close
        ) : null
      }
    >
      <View>
        <DropdownAlert
          ref={(ref) => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </View>

      <View style={{
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >

        {renderOutsideTouchable(props.onTouchOutside)}

        <View style={styles.whiteSquareContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.titleText}>información del trámite</Text>
            <TouchableOpacity onPress={!loading ? (props.onTouchOutside) : null}>
              <MaterialCommunityIcons style={{ marginRight: 15 }} size={18} name="arrow-left" color="#404040" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', backgroundColor: '#DADADA', height: 1 }} />

          <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>

            <Text style={{
              fontWeight: '500',
              marginLeft: 15,
              fontSize: 13,
              alignSelf: 'flex-start',
              color: '#262626',
            }}
            >
              {props.tramiteProp[0]}
            </Text>

            <View style={{
              marginVertical: 10, width: '50%', backgroundColor: '#DADADA', height: 1,
            }}
            />

            {listFooter()}

            <View style={{
              marginVertical: 2, width: '89%', backgroundColor: '#DADADA', height: 1,
            }}
            />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => (!loading ? (createPDF(0)) : null)}>
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Descargar Ficha PDF</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => (!loading ? (createPDF(1)) : null)}>
                <View style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Reenviar por Correo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 145,
    height: 40,
    backgroundColor: colors.secundario,
    borderRadius: 5,
    margin: 2,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: '500',
  },
  whiteSquareContainer: {
    position: 'absolute',
    zIndex: 10,
    width: '90%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: '#404040',
  },
  textStyle: {
    marginVertical: 5,
    fontWeight: '400',
    marginLeft: 15,
    fontSize: 12,
    alignSelf: 'flex-start',
    color: '#262626',
  },
  textStyle2: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 12,
    alignSelf: 'flex-start',
    color: '#262626',
  },
  containerPDF: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PopUpTramites;
