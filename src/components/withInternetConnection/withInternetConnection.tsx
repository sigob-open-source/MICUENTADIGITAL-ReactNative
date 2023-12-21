/* eslint-disable react/jsx-props-no-spreading */
// External dependencies
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function withInternetConnection<T>(ParentComponent: T) {
  // @ts-ignore
  const Component: T = (props) => {
    // Component's state
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(!!state.isConnected);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <>

        {/* @ts-ignore */}
        <ParentComponent {...props} />

        <Modal
          visible={!isConnected}
          transparent
        >
          <View style={styles.backgroundContainer}>

            <View style={styles.foregroundContainer}>
              <View style={styles.alertTitleContainer}>

                <Icon name="wifi" color="red" size={22} />

                <Text style={styles.alertTitle}>
                  Error de conexión
                </Text>
              </View>

              <Text style={styles.alertText}>
                Se requiere una conexión a Internet para continuar utilizando la aplicación.
              </Text>
            </View>
          </View>
        </Modal>

      </>
    ) as T;
  };

  return Component;
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foregroundContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 20,
  },
  alertTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 16,
    color: '#a4a4a4',
    marginLeft: 5,
  },
  alertText: {
    fontSize: 16,
    color: '#010101',
  },
});

export default withInternetConnection;
