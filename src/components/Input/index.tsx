/* eslint-disable react/require-default-props */
// External dependencies
import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

// Types & Interfaces
interface InputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  error?: string;
  label?: string;
  style?: ViewStyle,
  textInputStyle?: ViewStyle,
  disabled?: boolean;
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
}

const Input = ({
  placeholder,
  placeholderTextColor,
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  onBlur,
  onChangeText,
  value,
  error,
  label,
  style = {},
  textInputStyle = {},
  disabled = false,
  autoCapitalize = 'none',
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const containerStyles = [
    styles.container,
    isFocused ? styles.containerFocused : {},
    error ? styles.containerError : {},
  ];

  return (
    <View style={style}>
      {Boolean(label) && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={[containerStyles, textInputStyle]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          value={value}
          editable={!disabled}
          autoCapitalize={autoCapitalize}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 37,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
  },
  containerFocused: {
    borderColor: '#007AFF',
  },
  containerError: {
    borderColor: '#FF3B30',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
    padding: 0,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  error: {
    marginTop: 4,
    color: '#FF3B30',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '600',
    marginBottom: 4,
  },
});

export default Input;
