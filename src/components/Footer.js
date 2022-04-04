import { StyleSheet,View,TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import useKeyboard from '../utils/keyboardListener';

const Footer = props => {
  const closeFromFooter = () =>{
    const {back} = props
    return(back)
  }
  
  const [showGoBack, setShowGoBack] = useState(props.showBack);
  const isKeyboardOpen = useKeyboard();//detecta si el keyboard está activo o no

  return (

    <View style={{...props.style}}>

    {
      !isKeyboardOpen ? (
        <><TouchableWithoutFeedback onPress={closeFromFooter()}>
            {showGoBack ? (
              <View style={styles.textContainer}>
                <Icon size={41} name='chevron-left' color="black" />
              </View>
            ) :
              <View style={styles.textContainer}></View>}

          </TouchableWithoutFeedback><View style={styles.textContainer}>
              <Icon size={41} name='people' color="black" />
            </View><View style={styles.textContainer}></View></>
      ) : 
      <><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {showGoBack ? (
              <View style={styles.textContainer}>
                <Icon size={41} name='chevron-left' color="black" />
              </View>
            ) :
              <View style={styles.textContainer}></View>}

          </TouchableWithoutFeedback><View style={styles.textContainer}>
              <Icon size={41} name='people' color="black" />
            </View><View style={styles.textContainer}></View></>
    }


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
