import { StyleSheet,View, Text,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react'


const Header = props  => {
  return (
    <View style={{...props.style}}>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={props.img}/>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.tituloHeader}>{props.item}</Text>
      </View>

      <TouchableWithoutFeedback onPress={()=>console.log('hola me presionaste aaa')}>
        <View style={styles.logoContainer}>
          <Image style={styles.notifContainer} source={props.imgnotif}/>
        </View>
      </TouchableWithoutFeedback>

    </View>
  )
}

const styles = StyleSheet.create({
  textContainer:{
    flex:1,
    alignItems:'center'
  },
  tituloHeader:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  logoContainer:{
    height:41,
    width:41,
    borderRadius:10,
  },
  notifContainer:{
    height:35,
    width:35,
    borderRadius:10,
    resizeMode:'contain'
  }
})

export default Header;
