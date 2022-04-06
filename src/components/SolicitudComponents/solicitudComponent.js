import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getTiposDeSolicitudes } from '../../services/api';

const SolicitudCard = props =>{

  return(
    <View>
      <TouchableOpacity>
        <View style={styles.optionCard}>
          <View style={styles.collapsibleContent}>
            <MaterialCommunityIcons size={40} name={props.iconName}color={'black'} />
            <Text style={styles.collapsibleText}>{props.sampleSolicitud}</Text>
          </View>
        </View>
      </TouchableOpacity>  
    </View>
  
  )
}

const styles = StyleSheet.create({
  optionCard:{
    width:'100%',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:7,
    backgroundColor:'#e6e6e6',
  },
  collapsibleContent:{
    marginLeft:'2%',
    flexDirection:'row',
    alignItems:'center',
  },
  collapsibleText:{
    fontWeight:'500',
    marginLeft:'3%',
    fontSize:20,
    color:'black',
  },
});

export default SolicitudCard
