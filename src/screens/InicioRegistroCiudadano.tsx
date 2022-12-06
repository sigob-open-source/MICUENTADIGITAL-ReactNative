import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../components/DropDowAlertProvider';

const InicioRegistroCiudadano = () => {
  const notify = useNotification();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Datos Personales</Text>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="CURP*"
                fontSize={11}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="Nombre(s)*"
                fontSize={11}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="Apellido Paterno*"
                fontSize={11}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="Apellido Materno*"
                fontSize={11}
              />
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="Género"
                fontSize={11}
              />
            </View>

            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.textButton}>Continuar con el Registro</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.linkText}>Ya tengo una cuenta</Text>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default InicioRegistroCiudadano;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: '#EDF2F5',
  },
  menuContainer: {
    width: 305,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4E585F',
    marginBottom: 10,
  },
  textInputContainer: {
    marginVertical: 5,
    width: '80%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
    fontSize: 2,
  },
  button: {
    backgroundColor: '#582E44',
    width: 230,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textButton: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: 12,
  },
  linkText: {
    fontSize: 12,
    marginTop: 15,
    fontWeight: '400',
    color: '#4D89FF',
  },
});
