import {
  StyleSheet, Text, View, Image, TouchableOpacity, Linking,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Banner = () => (
  <View style={styles.aboutUs}>
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.subTituloInfo}>Redes Sociales</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
        >
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/GobiernoCdJuarez')}>
            <View style={styles.iconsRedes}>
              <FontAwesome5
                name="facebook"
                size={25}
                solid
                color="#ffffff"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/MunicipioJuarez')}>
            <View style={styles.iconsRedes}>
              <FontAwesome5
                name="twitter"
                size={25}
                solid
                color="#ffffff"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/@municipiodejuarez6912/featured')}>
            <View style={styles.iconsRedes}>
              <FontAwesome5
                name="youtube"
                size={23}
                solid
                color="#ffffff"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://juarezconectado.juarez.gob.mx/')}>
            <View style={styles.webButton}>
              <Text style={styles.aButton}>Juárez Conectado</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>

);

export default Banner;

const styles = StyleSheet.create({
  aboutUs: {
    flexDirection: 'row',
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#831D45',
    height: 50,
    width: 150,
    borderRadius: 5,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    height: 500,
    marginTop: 15,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bannerTitulo: {
    position: 'absolute',
    top: 245,
    left: 13,
  },
  bannerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '900',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 2,
  },
  bannerSubText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 5,
  },
  TituloInfo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#404040',
  },
  aButton: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  iconsRedes: {
    backgroundColor: '#184766',
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  subTituloInfo: {
    fontSize: 17,
    fontWeight: '500',
    color: '#404040',
    marginBottom: 10,
  },
});
