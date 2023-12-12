/* eslint-disable react/require-default-props */
// External dependencies
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

// Types & Interfaces
interface SeparatorProps {
  gap?: number;
  topGap?: number;
  bottomGap?: number;
}

const Separator = ({ gap, topGap, bottomGap }: SeparatorProps) => {
  const propStyles = {} as ViewStyle;
  if (gap) {
    propStyles.marginVertical = gap;
  }

  if (topGap) {
    propStyles.marginTop = topGap;
  }

  if (bottomGap) {
    propStyles.marginBottom = bottomGap;
  }

  return (
    <View style={[styles.separator, propStyles]} />
  );
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#010101',
    opacity: 0.2,
  },
});

export default Separator;
