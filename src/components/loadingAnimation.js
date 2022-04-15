import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
  container:{
    marginLeft:'3%',
    alignContent:'flex-start',
    backgroundColor:'white',
  }
})

function Loading({ loading, children }){
  if (loading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }
}

export default Loading;
