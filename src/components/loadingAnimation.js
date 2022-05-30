import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = (props,loading,children) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={props.size} color="black" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width:700,
    height:700,
    alignContent: 'flex-start',
    backgroundColor: 'transparent',
  },
});

export default Loading;
