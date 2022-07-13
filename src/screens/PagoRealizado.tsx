import React from 'react';
import {
  View, Text, TextInput, TouchableWithoutFeedback, Dimensions, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import fonts from '../utils/fonts';

const PagoRealizado = ({ route }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header style={styles.header} item="Netpay Custom" />
      <View style={styles.bodyContainer}>
        <Text style={styles.label}>{route.params.message}</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('menuInicio')}>
          <View style={styles.buttonPrint}>
            <Text style={styles.textButton}>Regresar al Menu Principal</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: '#79142A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    marginBottom: 14,
  },
  textButton: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonPrint: {
    backgroundColor: '#566e00',
    width: Dimensions.get('window').width * 0.85,
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: '100%',
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyleRow: {
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: Dimensions.get('window').width * 0.28,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
  textInputStyleRowTwo: {
    height: '100%',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 5,
    width: Dimensions.get('window').width * 0.43,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
  },
});

export default PagoRealizado;
