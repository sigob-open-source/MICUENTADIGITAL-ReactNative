import React, {Component} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';


const Card = props => {
    
    return(
        <View style={{...styles.squareStyle,...props.style}}>
            <Image style={styles.iconContainer}  source={props.img}/>
            <Text>{props.nombreItem}</Text>
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
    iconContainer:{
        width: 40,
        height:36,
        margin: 5,
        resizeMode:'contain'
    }
})

export default Card;