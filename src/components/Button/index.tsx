/* eslint-disable react/require-default-props */
// External dependencies
import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Types & Interfaces
type TButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: TButtonSize;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const Button = ({
  text = 'text',
  onPress = () => {},
  disabled = false,
  size = 'medium',
  iconName = '',
  style = {},
  textStyle = {},
  iconStyle = {},
  loading = false,
}: ButtonProps) => {
  const buttonStyles = useMemo(() => {
    const output = [styles.button] as ButtonProps['style'][];

    switch (size) {
      case 'small':
        output.push(styles.small);
        break;
      case 'large':
        output.push(styles.large);
        break;
      default:
        output.push(styles.medium);
        break;
    }

    output.push(style);

    if (disabled) {
      buttonStyles.push(styles.disabled);
    }

    return output;
  }, [style, size, disabled]);

  const textStyles = useMemo(() => {
    const output = [styles.text] as ButtonProps['textStyle'][];

    switch (size) {
      case 'small':
        output.push(styles.smallText);
        break;
      case 'large':
        output.push(styles.largeText);
        break;
      default:
        output.push(styles.mediumText);
        break;
    }

    output.push(textStyle);
    return output;
  }, [textStyle, size]);

  const textSize = useMemo(() => {
    let { fontSize } = styles.smallText;

    for (let i = 0; i < textStyles.length; i += 1) {
      const styleObj = textStyles[i] as TextStyle;

      if (styleObj.fontSize) {
        fontSize = styleObj.fontSize;
      }
    }

    return fontSize;
  }, [textStyles]);

  const textColor = useMemo(() => {
    let { color } = styles.text;

    for (let i = 0; i < textStyles.length; i += 1) {
      const styleObj = textStyles[i] as TextStyle;

      if (styleObj.color) {
        color = styleObj.color as string;
      }
    }

    return color;
  }, [textStyles]);

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled || loading}>
      <View style={buttonStyles}>
        {loading ? (
          <ActivityIndicator size={size === 'large' ? size : 'small'} color={textColor} />
        ) : (
          <>
            <Text style={textStyles}>{text}</Text>

            {Boolean(iconName) && (
              <Icon
                name={iconName}
                size={textSize}
                color={textColor}
                style={[styles.icon, iconStyle]}
              />
            )}

          </>
        )}

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#184766',
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  medium: {
    height: 44,
  },
  mediumText: {
    fontSize: 16,
  },
  small: {
    height: 36,
  },
  smallText: {
    fontSize: 14,
  },
  large: {
    height: 48,
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Button;
