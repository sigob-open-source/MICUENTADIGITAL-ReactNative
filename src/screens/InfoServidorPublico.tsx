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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Header from '../components/Header';

const InfoServidorPublico = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Header item="Servidor Publico" />
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.notiContainer}>
        <View style={styles.txtContainer}>
          <Text style={{
            fontSize: 12,
            fontWeight: '800',
            color: '#4B4B4B',
            marginBottom: 3,
          }}
          >
            Notify
          </Text>
          <Text style={{
            fontSize: 12,
            fontWeight: '400',
            color: '#757575',
          }}
          >
            Si desea quejarse o denunciar a un servidor publico:
          </Text>
        </View>
        <View style={{
          height: '100%',
          width: 1,
          backgroundColor: '#EDF2F5',
          marginHorizontal: 10,
        }}
        />
        <TouchableOpacity>
          <View style={styles.icon}>
            <FontAwesome5
              name="times-circle"
              size={19}
              solid
              color="#5F2A46"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text>Nombre</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor="#C4C4C4"
            placeholder="Nombres:"
            fontSize={11}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor="#C4C4C4"
            placeholder="Apellidos"
            fontSize={11}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Descripcion Fisica</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor="#C4C4C4"
            placeholder="Describa a fisicamente:"
            fontSize={11}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={{
          width: '100%',
          marginBottom: 5,
          flexDirection: 'row',
        }}
        >
          <Text style={styles.txtTitle}>
            Indicar nombre de los testigos presenciales,
            en caso de presentar:
          </Text>
          <View style={{
            height: '100%',
            width: 1,
            backgroundColor: '#EDF2F5',
            marginHorizontal: 8,
          }}
          />
          <View style={styles.icon}>
            <FontAwesome5
              name="user-plus"
              size={17}
              solid
              color="#5F2A46"
            />
          </View>
        </View>

        <Text>Nombre</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholderTextColor="#C4C4C4"
            placeholder="Nombre de Testigo:"
            fontSize={11}
          />
        </View>
      </View>

    </ScrollView>
  </SafeAreaView>
);

export default InfoServidorPublico;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#EDF2F5',
  },
  inputContainerDatos: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  notiContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '100%',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRightColor: '#D44E4E',
    borderRightWidth: 3,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    shadowOpacity: 0.09,
    elevation: 5,
    color: 'black',
  },
  txtContainer: {
    flex: 1,
  },
  icon: {
    height: 40,
    width: 40,
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 10,
  },
  txtTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4B4B4B',
    flex: 1,
  },
});
