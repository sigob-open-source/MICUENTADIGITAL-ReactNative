/* eslint-disable react/require-default-props */
// External components
import React, { useMemo } from 'react';
import {
  ColorValue,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

// Types & Interfaces
interface CardProps {
  backgroundColor?: ColorValue;
  disableShadow?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const Card = ({
  backgroundColor = '#fff',
  disableShadow = false,
  style = {},
  children,
}: React.PropsWithChildren<CardProps>) => {
  const cardStyles = useMemo(() => {
    let output = [styles.card, { backgroundColor }] as ViewStyle[];

    if (!disableShadow) {
      output.push(styles.shadow);
    }

    if (Array.isArray(style)) {
      output = output.concat(style);
    } else {
      output.push(style);
    }

    return output;
  }, [backgroundColor, style, disableShadow]);

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Card;
