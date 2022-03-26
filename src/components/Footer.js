import { StyleSheet,View, Text,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Octicons';


const Footer = props => {
  return (
    <View style={{...props.style}}>
        <View style={styles.textContainer}>
            <Icon size={41} name='people' color="black" />
        </View>
    </View>
  )
}


export default Footer

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
        alignItems:'center',
        marginTop:'-5%'
    },
    peopleIcon:{
        height:41,
        width:41,
    },
})