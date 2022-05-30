import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableWithoutFeedback, 
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob'
import Pdf from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native-animatable';

const PopUpTramites = props => {
  const [descTramite, setDescTramite] = useState(null);
  const [nayaritImage, setNayaritImage] = useState('assets/imagenes/logo_horizontal.png')
  const [year, setYear] = useState(new Date().getFullYear());
  const [requisitos, setRequisitos] = useState(null);

  useEffect(() => {
    if (props.tramiteProp[3] == undefined){
      setRequisitos("No se encontraron requisitos.")
    }else{
      setRequisitos(props.tramiteProp[3]);
    }
  }, [props.tramiteProp[3]]);

  const renderOutsideTouchable = (onTouch) =>  {
    const view = <View style={{ flex: 1, width: '100%' }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  const listFooter = () => {
    return(
      <View>

        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.textStyle}>Descripción: {props.tramiteProp[1]}</Text>
              <Text style={styles.textStyle}>Departamentos:</Text>
            </>
          }
          data={props.tramiteProp[2]}
          renderItem={({ item, index }) => <Text style={styles.textStyle2}>{item.clave} - {item.descripcion}</Text>}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <>
            
              {props.tramiteProp[4] == "" ? (<Text style={styles.textStyle}>Homoclave: {props.tramiteProp[4]}</Text>):<Text style={styles.textStyle}>Homoclave: Desconocida</Text>}
              {props.tramiteProp[5] == "" ? (<Text style={styles.textStyle}>Dependencia: {props.tramiteProp[5]}</Text>):<Text style={styles.textStyle}>Dependencia: Desconocida</Text>}
              {props.tramiteProp[6] == "" ? (<Text style={styles.textStyle}>Tipo de Trámite: {props.tramiteProp[6]}</Text>):<Text style={styles.textStyle}>Tipo de Trámite: Desconocido</Text>}
            </>}
            {
              ...props.tramiteProp[3] == undefined ? (
                <Text style={styles.textStyle}>Requisitos: No se han encontrado requisitos.</Text>
              ) : <Text style={styles.textStyle}>Requisitos: {props.tramiteProp[3]}</Text>
            }
          />
        

      </View>
    );
  }

  const createPDF = async () => {
    const data = props.tramiteProp[0];
    const today = new Date();
    const hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    const minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    const seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    let options = {
      html: `

      <style>

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
        justify-content: center;
        align-items: center;
        height: 200px;
        text-align: center;
        padding-top:100px;
      }
      #logo {
        color: white;
        font-size:25px;
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

      </style>
      <body style="margin: 0;">

      <div id="logo">
          <h1>Ficha del trámite</h3>
      </div>
      
      <div class="row even" id="hello">
        <div col-md-12">
          <h1>Nombre del trámite:${props.tramiteProp[1]}</h1>
          <h1>Departamentos: ${ props.tramiteProp[2].map(entry => {
            return `<h1>${entry.clave} - ${entry.descripcion}</h1>`
        }).join(' ')}</h1>
          <h1>Requisitos: ${requisitos}</h1>
        </div>
      </div>
      
      <footer>
        <div>
          <h1>© ${year} Gobierno del Estado de Nayarit</h1>
        </div>
      </footer>
      
      </body>
      `,
      fileName: `ficha_tramite_${hours + minutes + seconds}`,
      directory: 'Download',
      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options)

    // RNFetchBlob.fs.dirs.DownloadDir it's getting the download folder from internal storage
    let filePath = RNFetchBlob.fs.dirs.DownloadDir + `/ficha_tramite_${hours + minutes + seconds}.pdf`;
    
    RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
        .then(response => {
            console.log('Success Log: ', response);
        })
        .catch(errors => {
            console.log(" Error Log: ", errors);
        })
    // console.log(file.filePath);
    Alert.alert("PDF descargado",`Su PDF se descargó en la siguiente locación: ${filePath}`)
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={props.openM}
      onRequestClose={props.close}
    >
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
            <Text style={styles.titleText}>Requisitos del trámite</Text>
            <TouchableOpacity onPress={props.close}>
              <MaterialCommunityIcons style={{ marginRight: 15 }} size={30} name="arrow-left" color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />

          <Text style={{
            fontWeight: '500',
            marginLeft: 15,
            fontSize: 22,
            alignSelf: 'flex-start',
            marginVertical: 10,
            color: 'black',
          }}
          >
            {props.tramiteProp[0]}
          </Text>

          {listFooter()}

          <View style={styles.buttonsContainer}>

            <TouchableOpacity onPress={()=> createPDF()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Descargar Ficha PDF</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> createPDF()}>
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Reenviar por Correo</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonsContainer: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center', 
  }, 
  buttonStyle: {
    flexDirection:'row',
    marginHorizontal:10,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
    width:145,
    height:40,
    backgroundColor: colors.secundario,
    borderRadius:5,
  },  
  buttonTextStyle: {
    color:'white',
    fontWeight: '500',
  },
  whiteSquareContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: 'black',
  },
  textStyle: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 15,
    fontSize: 15,
    alignSelf: 'flex-start',
    color: 'black',
  },
  textStyle2: {
    marginVertical: 5,
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 15,
    alignSelf: 'flex-start',
    color: 'black',
  },
});

export default PopUpTramites;
