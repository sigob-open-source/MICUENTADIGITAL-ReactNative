import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const InformacionDeQueja = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header item="Informacion de queja" />
      <ScrollView style={styles.container}>

        <View style={styles.inputContainerDatos}>
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: 12 }}>Fecha de lo Hechos</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="DD/MM/AA"
                fontSize={11}
              />
            </View>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: 12 }}>Hora Aproximada</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholderTextColor="#C4C4C4"
                placeholder="00:00AM"

                fontSize={11}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Nombre de Oficina</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              placeholder="*Nombre de la oficina en donde sucedieron los echos"
              fontSize={11}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Tramite/Servicio o Personal que lo atendio</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              placeholder="*De que Institucion es el Tramite/Servicio o el personal con quien trato?"
              fontSize={11}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Tramite o Servicio</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              placeholder="Ingrese el nombre del tramite o servicio que queria realizar"
              fontSize={11}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Actos u Omisiones del Servidor Publico</Text>
          <View style={styles.textInputContainerBOX}>
            <TextInput
              placeholderTextColor="#C4C4C4"
              placeholder="Narre los actos u omiciones del Servidor Publico que motivan su queja"
              fontSize={11}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('archivosDeQuejas')}>
          <View style={styles.button}>
            <Text style={{ color: '#FFFFFF' }}>Siguiente Paso</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default InformacionDeQueja;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#EDF2F5',
  },
  textInputContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
    fontSize: 2,
  },
  textInputContainerBOX: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#F1F1F1',
    fontSize: 2,
  },
  inputContainer: {
    width: '100%',
    height: 70,
  },
  inputContainerDatos: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#79142A',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
