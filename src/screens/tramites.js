import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  FlatList
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

class Tramites extends Component{
  constructor(props){
    super(props)
    this.state={
      collapsed: true,
      selectedDependency:null,
      data: null,
      filteredData: [],
      tramitesMunicipales: null,
      selectedTramite:null,
      tramiteDesc:null,
      tramiteRequisitos:null,
      department:null
    }
  }
  popupRef = React.createRef();
  controller = new AbortController();
  onShowPopup = (tramite,descTramite,departamento,requisitos) => {
    if (this.state.tramitesMunicipales!= null)
    {
      this.setState({
        selectedTramite:tramite,
        tramiteDesc:descTramite,
        department:departamento,
        tramiteRequisitos:requisitos,
      },this.popupRef.show)
    }

  }

  onClosePopup = () => {
    this.popupRef.close()
  };

  componentDidMount(){
    this.getDependencyList()
  }

  componentWillUnmount(){
    this.controller.abort()
  }
  
  getDependencyList = async () =>{
    await http.get('tramites/plantillas-tramites-atencion-ciudadana/?entidad_municipal=1').then(
      (response) => {
        const result = response.data;
        if (result.length>0){
          this.setState({
            data:result,
            filteredData:result,
            selectedDependency:result[0].departamentos[0].unidad_operativa.descripcion,
            tramitesMunicipales:result[0].nombre
          })
        }else{
          this.setState({
            selectedDependency:'No hay datos.',
            tramitesMunicipales:'Sin datos.'
          })  
        }
      },
      (error) => {
        this.setState({
          selectedDependency:'No se encontraron dependencias.',
          tramitesMunicipales:'Sin datos.'
        })  
        console.log(error);
      },
    );
  }

  setDependency = (item) =>
  {
    this.setState({
      selectedDependency:item,
      collapsed:true
    });
  }

  renderItem = (item) => {
    return(
      <View>
        <TouchableOpacity onPress={()=>this.setState(this.setDependency(item.descripcion))}>
          <View style={styles.content}>
            <Text style={styles.collapsibleText}>{item.descripcion}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderTramite = (item,index) =>{
    if (this.state.selectedDependency == item.departamentos[index].unidad_operativa.descripcion){
      return(
        <TouchableOpacity  onPress={()=>this.onShowPopup(
          item.nombre,
          item.descripcion,
          item.departamentos[index].descripcion,
          item.requisitos)}>

          <View style={styles.tramiteView}>
            <Text style={styles.collapsibleText}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }

  toggleExpanded = () => {
    if (this.state.data != null){
      this.setState({ collapsed: !this.state.collapsed });
    }
    
  };
  
  goBack = () => {
    this.props.navigation.goBack();
  };

  //Buscar un tramite en especifico filtrando dependiendo de lo que se devuelva en el campo de texto
  searchTramite(tramiteToSearch){
    if (this.state.data != null){
      this.setState({
        filteredData:this.state.data.filter(item=>item.nombre.toLowerCase().includes(tramiteToSearch.toLowerCase()))
      })
    }
  }

  render(){
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <PopUpTramites 
            ref={(target) => this.popupRef = target}
            onTouchOutside={this.onClosePopup}
            nombreTramite={this.state.selectedTramite}
            descTramite={this.state.tramiteDesc}
            nombreDepartamento={this.state.department}
            requisitos={this.state.tramiteRequisitos}
          />
          <Header
            style={styles.header}
            item="Trámites"
            imgnotif={require('../../assets/imagenes/notificationGet_icon.png')}
            img={require('../../assets/imagenes/header_logo.png')}
          />

          <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}> Filtrar por dependencia </Text>
  
          <TouchableWithoutFeedback onPress={this.toggleExpanded}>
            <View style={styles.collapsibleHeader}>
              {
                this.state.selectedDependency == null ? (
                  <Loading loading={true}></Loading>
                ) : <Text style={styles.headerText}>{this.state.selectedDependency}</Text>
              }
              
              {
                this.state.collapsed ?(
                  <MaterialIcons style={{alignSelf:'flex-end'}}size={40} name='keyboard-arrow-down' color={'black'} />
                ):<MaterialIcons style={{alignSelf:'flex-end'}}size={40} name='keyboard-arrow-up' color={'black'} />
              }
              
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.collapsibleContainer}>
            <Collapsible collapsed={this.state.collapsed}>
              <FlatList
                data={this.state.data}
                renderItem={({item,index})=> this.renderItem(item.departamentos[index].unidad_operativa)}
                keyExtractor={(item,index) => index.toString()}
              />
            </Collapsible>
          </View>

            <Text style={{ 
              color: 'black',
              fontSize: 20,
              fontWeight: '700',
              marginTop:5,
            }}> Busqueda </Text>

            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInputStyle} 
                placeholder="Buscar..." 
                placeholderTextColor="gray" 
                onChangeText={text=>{this.searchTramite(text)}}
              />
              <TouchableOpacity>
                <View style={{borderRadius:10,width:46, height:46,justifyContent:'center'}}>
                </View>
              </TouchableOpacity>
            </View>
            
          <Text style={{ 
            color: 'black', 
            fontSize: 20, 
            fontWeight: '700',
            marginTop:30,
          }}> Trámites Municipales </Text>

        {
          this.state.tramitesMunicipales == null ? (
            <View style={styles.tramiteView}>
              <Loading loading={true}></Loading>
            </View>
          ) : 
          <>
            {
              this.state.tramitesMunicipales == 'Sin datos.' ?(
                <Text style={{color: 'gray'}}>No se encontraron trámites.</Text>
              ) :
              
              <FlatList
              data={this.state.filteredData}
              renderItem={({ item, index }) => this.renderTramite(item, index)}
              keyExtractor={(item, index) => index.toString()} />

            }
            

          </>
        }

        </View>

        <Footer
          back={this.goBack}
          showBack
          style={styles.footer}
        />
  
      </View>
    );
  }

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
    width: 336,
    height: 46,
    alignSelf: 'center',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
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
    width:300,
  },
  collapsibleContainer:{
    backgroundColor:'white',
    width:336,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginTop:5,
    borderRadius:10,
  }, 
  collapsibleHeader: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width: 336,
    height:45,
    marginTop:5,
    borderRadius:10,
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  headerText: {
    fontWeight:'500',
    marginLeft:'3%',
    fontSize:20,
    color:'black',
  },
  content: {
    width:295,
    height:50,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  contentContainerStyle:{
    width:336,
    backgroundColor:'#e6e6e6',
  },
  collapsibleText:{
    flexShrink: 1,
    flex:1,
    flexWrap:'wrap',
    fontWeight:'500',
    marginLeft:'1.5%',
    fontSize:0.05*WIDTH,
    color:'black',
  },
  tramiteView:{
    width:WIDTH,
    height:50,
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
  }
});

export default Tramites;
