import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableWithoutFeedback, FlatList, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSolicitudes } from '../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentSolicitud from '../components/ContentSolicitud';
import fonts from '../utils/fonts';

const VerSolicitudes = (props) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    await getSolicitudes(null, currentPage).then(
      (res) => {
        setSolicitudes([...solicitudes, ...res]);
      },
    );
    setIsLoading(false);
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    getData();
    setIsLoading(false);
  }, [currentPage]);

  const renderItem = ({ item }) => (
    <ContentSolicitud fecha={item.fecha_de_la_solicitud} solicitud={item} />
  );

  const renderLoader = () => (
    isLoading
      ? (
        <View>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null

  );

  return (
    <View style={styles.container}>
      <Header style={styles.header} item="Solicitudes" imgnotif={require('../../assets/imagenes/notificationGet_icon.png')} img={require('../../assets/imagenes/header_logo.png')} />
      <View style={styles.container}>
        {(solicitudes.length === 0) ? <Text style={styles.noSolicitud}>No hay solicitudes por mostrar</Text> : null}
        <FlatList
          data={solicitudes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0.5}
        />
      </View>
      <Footer
        back={goBack}
        showBack
        style={styles.footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
  },
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
  footer: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 7 },
    shadowRadius: 32,
    shadowOpacity: 0.25,
    elevation: 20,
  },
  noSolicitud: {
    color: 'gray',
    fontFamily: fonts.semiBold,
    textAlign: 'center',
  },

});

export default VerSolicitudes;
