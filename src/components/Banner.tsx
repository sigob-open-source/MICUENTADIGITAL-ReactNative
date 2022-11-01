import {
  StyleSheet, Text, View, Image, TouchableOpacity, Linking,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IMAGEN from '../../assets/imagenes/publiJrz.jpg';

const Banner = () => (
  <>
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

            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/municipiojuarez')}>
              <View style={styles.iconsRedes}>
                <FontAwesome5
                  name="twitter"
                  size={25}
                  solid
                  color="#ffffff"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UC-GVeZjSK9YQr0PL7rlvcTg/featured')}>
              <View style={styles.iconsRedes}>
                <FontAwesome5
                  name="youtube"
                  size={23}
                  solid
                  color="#ffffff"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.juarez.gob.mx/')}>
              <View style={styles.webButton}>
                <Text style={styles.aButton}> Ir al portal web</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.banner}>
      <Image style={styles.bannerImage} source={IMAGEN} />
      <View style={styles.bannerTitulo}>
        <Text style={styles.bannerText}>App Ciudadana</Text>
        <Text style={styles.bannerSubText}>Tramites, pagos, solicitudes y mas!! al alcance </Text>
        <Text style={styles.bannerSubText}>de tu mano en una sola aplicacion ciudadana.</Text>
      </View>
    </View>
  </>

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
    backgroundColor: '#5F2A46',
    height: 50,
    width: 150,
    borderRadius: 5,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    height: 320,
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
    backgroundColor: '#5F2A46',
    height: 50,
    width: 70,
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
