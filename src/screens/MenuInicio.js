
import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';

const dataList = [
    {isBlank:false,name:'Pagos', iconname:'wallet', enableEntypo:true},
    {isBlank:false,name:'Trámites', iconname:'folder-open',enableEntypo:false},
    {isBlank:false,name:'Peticiones', iconname:'file-text',enableEntypo:false},
    {isBlank:false,name:'Directorio', iconname:'book',enableEntypo:true},
    {isBlank:false,name:'Citas', iconname:'tasks',enableEntypo:true},
    {isBlank:false,name:'Oficinas de Atención', iconname:'school',enableEntypo:true},
    {isBlank:false,name:'Facturación', iconname:'id-card-alt',enableEntypo:true},
    {isBlank:false,name:'Otra\nnormatividad', iconname:'file-text',enableEntypo:false},
]
const numColumns = 3;

const WIDTH = Dimensions.get('window').width


/*
const MenuInicio = () =>(
    <View style={styles.container}>
        <Header style={styles.header}item="Pagos" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
        <View style={styles.mainContainer}>
            <View style={styles.menuContainer}>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
            </View>
            <View style={styles.menuContainer}>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
            </View>
            <View style={styles.menuContainer}>
                
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>
                <Square enableEntypo={true} nombreItem='Pagos' iconName="wallet"/>

            </View>
           
        </View>
        <Footer style={styles.footer}/>
    </View>
    
);
*/

class MenuInicio extends Component{
    formatData = (dataList, numColumns) =>{
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)

        while(totalLastRow !== 0 && totalLastRow !== numColumns){
            dataList.push({name:'nada', iconname:'question', enableEntypo:false,isBlank:true})
            totalLastRow++
        }
        return dataList
    }
    _renderItem = ({item,index}) => {
        return(
            <View style={{flex:1, alignItems:'center'}}>
                <Square isBlank={item.isBlank} style={styles.menuContainer} enableEntypo={item.enableEntypo} nombreItem={item.name} iconName={item.iconname}/>
            </View>
        );
    }
    render() {

        return(
            <View style={styles.container}>
                <Header style={styles.header}item="Pagos" imgnotif={require("../../assets/imagenes/notificationGet_icon.png")} img={require("../../assets/imagenes/header_logo.png")}/>
                <View style={{flex:1, marginHorizontal:'2%'}}>
                    <FlatList
                        data={this.formatData(dataList, numColumns)}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={numColumns}
                    />
                </View>
                <Footer style={styles.footer}/>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container:{
       // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
        backgroundColor:'#EDF2F5',
       
    },
    mainContainer:{
        flex:1,
        
        flexDirection:'row',
        flexWrap:'wrap'
    },
    menuContainer:{
        marginVertical:'6%',
    },

    textInputContainer:{
        marginTop:21,
        width:336,
        height:46,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowRadius: 7,
        shadowOpacity: 0.09,
        elevation: 5,
    },
    textInputStyle:{
        height:'100%',
        marginLeft:14,
        fontSize:13
    },
    iconContainer:{
        width: 39,
        height: 30,
        margin: 5,
    },
    header:{
        flexDirection:'row',
        height:64,
        width: '100%',
        backgroundColor:'#79142A',
        justifyContent:'center',
        alignItems:'center',
        borderBottomEndRadius:15,
        borderBottomLeftRadius:15,
        padding:20,
        marginBottom:14,
    },
    footer:{
        flexDirection:'row',
        height:64,
        width: '100%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 7 },
        shadowRadius: 32,
        shadowOpacity: 0.25,
        elevation: 20,
    },
})

export default MenuInicio;