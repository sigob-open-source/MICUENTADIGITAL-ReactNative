/* eslint-disable react/require-default-props */
// External dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Types & Interfaces
interface CartProps {
  items?: number;
  size?: number;
  style?: ViewStyle;
}

const Cart = ({
  items = 0,
  size = 24,
  style,
}: CartProps) => {
  const showCircle = Boolean(items) && items > 0;
  return (
    <View style={[styles.container, style]}>
      <Icon name="shopping-cart" size={size} color="#000" />

      {showCircle && (
        <View style={[styles.circle, { height: size, width: size }]}>
          <Text style={styles.count}>{items}</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Cart;
