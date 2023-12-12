import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import fonts from '../utils/fonts';

interface ICardProps {
  isBlank: boolean;
  enableEntypo: boolean;
  nombreItem: string;
  iconName: string;
  isDesable: boolean;
  col: string;
  style: ViewStyle;
}

const Card = ({ isBlank, enableEntypo: isIconType, ...props }: ICardProps) => {
  if (isBlank) {
    return <View style={[styles.squareStyleBlank, props.style]} />;
  }
  if (!isIconType) {
    return (
      <View style={[styles.squareStyle, props.style]}>
        <Icon
          size={40}
          style={styles.iconContainer}
          name={props.iconName}
          color={props.isDesable ? 'CCCCCC' : props.col}
        />
        <Text style={props.isDesable ? styles.textstyleDes : styles.textstyle}>
          {props.nombreItem}
        </Text>
      </View>
    );
  }
  return (
    <View style={{ ...styles.squareStyle, ...props.style }}>
      <FontAwesome5
        name={props.iconName}
        size={40}
        style={styles.iconContainer}
        solid
        color={props.isDesable ? 'CCCCCC' : props.col}
      />
      {props.nombreItem === 'CasaDeEmpenio' && (
        <Text style={props.isDesable ? styles.textstyleDes : styles.textstyle}>
          {props.nombreItem}
          {' '}
          Casa de Empeño
        </Text>
      )}

      {props.nombreItem === 'JuegoDeAzar' && (
        <Text style={props.isDesable ? styles.textstyleDes : styles.textstyle}>
          {props.nombreItem}
          {' '}
          Juego de Azar
        </Text>
      )}

      {props.nombreItem === 'Alcohol' && (
        <Text style={props.isDesable ? styles.textstyleDes : styles.textstyle}>
          Licencia de Alcoholes
        </Text>
      )}

      { !['CasaDeEmpenio', 'JuegoDeAzar', 'Alcohol'].includes(props.nombreItem)
        && (
        <Text style={props.isDesable ? styles.textstyleDes : styles.textstyle}>
          {props.nombreItem}
        </Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  squareStyle: {
    borderRadius: 5,
    width: 104,
    height: 95,
    backgroundColor: '#831D45',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginHorizontal: 12,
  },
  squareStyleDes: {
    borderRadius: 5,
    width: 104,
    height: 95,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    marginHorizontal: 12,
  },
  squareStyleBlank: {
    borderRadius: 5,
    width: 104,
    height: 95,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  iconContainer: {
    margin: 5,
  },
  textstyle: {
    paddingHorizontal: 1,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    color: '#ffffff',
  },
  textstyleDes: {
    paddingHorizontal: 1,
    textAlign: 'center',
    fontFamily: fonts.semiBold,
    color: '#CCCCCC',
  },
});

export default Card;