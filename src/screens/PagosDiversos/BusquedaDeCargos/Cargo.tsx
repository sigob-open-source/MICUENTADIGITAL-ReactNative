/* eslint-disable react/require-default-props */
// External dependencies
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Internal dependencies
import Card from '../../../components/Card';
import Separator from '../../../components/Separator';

// Types & Interfaces
interface CargoProps {
  name: string;
  total?: number | null;
  onPress?: () => void;
  added?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Cargo = ({
  total,
  name,
  added,
  onPress,
  disabled,
  style,
}: CargoProps) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    disabled={disabled}
  >
    <View>
      <Card style={[style ?? {}, added ? styles.containerAdded : {}]}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Importe</Text>

          <Text style={styles.totalValue}>
            { total || 'Por calcular' }
          </Text>
        </View>

        <Separator gap={6} />

        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Icon
            name={added ? 'check-circle' : 'plus-circle'}
            size={25}
            color={added ? '#6DC66B' : '#3D3D3D'}
          />
        </View>
      </Card>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  containerAdded: {
    borderWidth: 2,
    borderColor: '#6DC66B',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#494949',
    fontWeight: '500',
    fontSize: 12,
  },
  totalValue: {
    color: '#9D9D9D',
    fontWeight: '500',
    fontSize: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    color: '#494949',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default Cargo;
