import { StyleSheet,View,TouchableWithoutFeedback} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Octicons';


const Footer = props => {
    const closeFromFooter = () =>{
      const {back} = props
      return(back)
  }
  const [showGoBack, setShowGoBack] = useState(props.showBack);

  return (
    <View style={{...props.style}}>
        <TouchableWithoutFeedback onPress={closeFromFooter() }>
          {
            showGoBack ? (
              <View style={styles.textContainer}>
                <Icon size={41} name='chevron-left' color="black" />
              </View>
            ) : 
            <View style={styles.textContainer}>
                
            </View>
          }

        </TouchableWithoutFeedback>

      
            <View style={styles.textContainer}>
                <Icon size={41} name='people' color="black" />
            </View>  
        
    
        <View style={styles.textContainer}>

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
