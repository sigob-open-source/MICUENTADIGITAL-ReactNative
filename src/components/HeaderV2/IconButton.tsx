/* eslint-disable react/require-default-props */
// External dependencies
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Types & Interfaces
interface IconButtonProps {
  name: string;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const IconButton = ({
  name,
  onPress,
  disabled,
  color = '#782745',
}: IconButtonProps) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    disabled={disabled}
  >
    <View>
      <FontAwesome5
        name={name}
        size={23}
        solid
        color={color}
      />
    </View>
  </TouchableWithoutFeedback>
);

export default IconButton;
