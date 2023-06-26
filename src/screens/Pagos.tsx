import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import Square from '../components/CardPagos';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectionCheck from '../components/internetChecker';
import http from '../services/http';

const numColumns = 3;

const Pagos = (props) => {
  const [padrones, setPadrones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPadronesList();
    return () => {
      setPadrones([]);
    };
  }, []);

  const getPadronesList = async () => {
    try {
      const response = await http.get('catalogos/padrones/');
      const excludedDescriptions = [
        'Alcohol',
        'Notario',
        'Contribuyente',
        'Remolque',
        'Zona Exclusiva',
        'Expediente de comercio informal',
        'Expediente de mercado',
        'Contrato de policia',
        'Expediente de licencia de funcionamiento',
      ];
      console.log(response.data);
      const padrones = response.data.filter(
        (padron) => padron
          && typeof padron === 'object'
          && !excludedDescriptions.includes(padron.descripcion)
          && (padron.descripcion !== 'Todo' && padron.descripcion !== 'Multas'),
      );
      setPadrones(padrones);
    } catch (error) {
      console.error(error);
    }
  };
  const checkIcon = (elementName) => {
    if (elementName === 'Ciudadano') return 'user';
    if (elementName === 'Empresa') return 'briefcase';
    if (elementName === 'Infracciones') return 'car-alt';
    if (elementName === 'Predio') return 'building';
    if (elementName === 'Vehicular') return 'car-alt';
    if (elementName === 'Todo') return 'align-justify';
    if (elementName === 'Hospedaje') return 'hotel';
    if (elementName === 'Arrendamiento') return 'wpforms';
    if (elementName === 'Nomina') return 'hand-holding-usd';
    if (elementName === 'Alcohol') return 'glass-cheers';
    if (elementName === 'Cedular') return 'id-card';
    if (elementName === 'JuegoDeAzar') return 'delicious';
    if (elementName === 'Notario') return 'gavel';
    if (elementName === 'CasaDeEmpenio') return 'university';
    if (elementName === 'Agencia') return 'lock';
    if (elementName === 'Contribuyente') return 'user';
    if (elementName === 'Motocicleta') return 'motorcycle';
    if (elementName === 'Remolque') return 'caravan';
    if (elementName === 'Multas') return 'paste';
    if (elementName === 'Mercado') return 'store';
    if (elementName === 'Policia especial') return 'balance-scale-right';
    if (elementName === 'Comercio Informal') return 'cash-register';
    if (elementName === 'Expediente De Anuncio') return 'window-restore';
    if (elementName === 'Licencia De Funcionamiento') return 'id-badge';
    return 'van';
  };
  const checkDisebla = (elementName) => {
    if (elementName === 'Notario') return true;
    if (elementName === 'Alcohol') return true;
  };

  const formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - (totalRows * numColumns);

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({
        name: 'nada', iconname: 'question', enableEntypo: false, isBlank: true,
      });
      totalLastRow++;
    }
    return dataList;
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <ConnectionCheck />
      <View style={styles.container}>
        <Header style={styles.header} item="Pagos" />
        <View style={{ marginTop: '3%' }}>

          {padrones && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <FlatList
              data={padrones}
              renderItem={({ item }) => (
                <Pressable
                  disabled={checkDisebla(item.descripcion)}
                  onPress={() => props.navigation.push('pagoPadron', { padron: item })}
                >
                  <Square
                    col="#404040"
                    isBlank={false}
                    style={styles.menuContainer}
                    enableEntypo
                    nombreItem={item.descripcion || 'default'}
                    iconName={checkIcon(item.descripcion)}
                    isDesable={checkDisebla(item.descripcion)}
                  />
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </View>
          )}
        </View>
        <Footer back={goBack} showBack style={styles.footer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F5',
    alignItems: 'center',
  },

  menuContainer: {
    marginHorizontal: 6,
    marginVertical: '6%',
  },
  textInputContainer: {
    marginVertical: 15,
    width: 336,
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
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
  textInputStyle: {
    height: '100%',
    marginLeft: 14,
    fontSize: 13,
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
});

export default Pagos;
