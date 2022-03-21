import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Card = props => {
    const[isBlank, blank] = useState(props.isBlank);
    const[isIconType, setIsIconType] = useState(props.enableEntypo);
    if (isBlank)
    return(
        
        <View handleEvent={blank} style={{...styles.squareStyleBlank,...props.style}}>
        </View>
    );
    else if (!isIconType) return(
        
        <View handleEvent={setIsIconType} style={{...styles.squareStyle,...props.style}}>
            <Icon size={40}styles={styles.iconContainer} name={props.iconName} color="#404040" />
            <Text style={{textAlign:'center'}}>{props.nombreItem}</Text>
        </View>
    );
    return(
        <View handleEvent={setIsIconType} style={{...styles.squareStyle,...props.style}}>
            <FontAwesome5 name={props.iconName} size={40} styles={styles.iconContainer} color="#404040" />
            <Text style={{textAlign:'center'}}>{props.nombreItem}</Text>
        </View>
    );
} 

const styles = StyleSheet.create({
    squareStyle:{
        borderRadius:5,
        width: 104,
        height: 95,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowRadius: 7,
        shadowOpacity: 0.09,
        elevation: 5,
        marginHorizontal:12
    },
    squareStyleBlank:{
        borderRadius:5,
        width: 104,
        height: 95,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:12
    },
    iconContainer:{
        margin: 5,
    }
})

export default Card;