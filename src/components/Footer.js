import { StyleSheet,View, Text,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react'


const Footer = props => {
  return (
    <View style={{...props.style}}>
        <View style={styles.textContainer}>
            <Image style={styles.peopleIcon}source={require("../../assets/imagenes/people_icon.png")}/>
        </View>
    </View>
  )
}


export default Footer

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
        alignItems:'center'
    },
    peopleIcon:{
        height:41,
        width:41,
        borderRadius:10,
    },
})