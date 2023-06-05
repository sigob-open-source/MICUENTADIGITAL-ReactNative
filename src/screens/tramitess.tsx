import {
  FlatList,
  StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Separator from '../components/Separator';

import { getTramites } from '../services/api';

function normalizeString(input: string) {
  return input.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const Tramites = () => {
  const [loading, setLoading] = useState(true);
  const [tiposDeTramites, setTiposDeTramites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      const responseTiposDeTramites = await getTiposDeTramites();
      if (mounted) {
        setTiposDeTramites(responseTiposDeTramites);
        setLoading(false);
      }
    };
    void fetchData();
    return () => { mounted = false; };
  }, []);

  const getTiposDeTramites = async () => {
    const response = await getTramites({
      entidad: 1,
      page: currentPage,
    });
    return response.results;
  };

  const loadNextPage = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    const query: Record<string, number | string> = { entidad: 1, page: nextPage };
    if (searchText.trim()) {
      query.nombre = searchText.trim();
    }
    const response = await getTramites(query);

    if (response.results.length) {
      setTiposDeTramites([...tiposDeTramites, ...response.results]);
      setCurrentPage(nextPage);
    }
    setLoading(false);
  };

  const onSearch = async () => {
    setLoading(true);
    setTiposDeTramites([]);
    const response = await getTramites({
      entidad: 1,
      page: 1,
      nombre: searchText,
    });

    setTiposDeTramites(response.results);
    setCurrentPage(1);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Card style={styles.card}>

        <Input
          value={searchText}
          onChangeText={setSearchText}
          label="Buscar Trámite"
          placeholder="Buscar Trámite"
          placeholderTextColor="#cccccc"
          autoCapitalize="characters"
        />

        <Button
          style={styles.cta}
          text="Buscar"
          iconName="search"
          onPress={onSearch}
          disabled={loading}
        />
      </Card>

      <FlatList
        contentContainerStyle={styles.content}
        data={tiposDeTramites}
        keyExtractor={(data) => data.id}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.push('webTramites', { item })}>
              <Card>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}> TRÁMITE </Text>

                  <View>
                    <Icon name="eye" color="#F98888" size={15} />
                  </View>
                </View>

                <Separator gap={5} />
                <Text style={styles.field}>
                  Nombre
                </Text>
                <Text style={styles.value}>
                  {item.nombre}
                </Text>
              </Card>
            </TouchableOpacity>

          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ marginTop: 8 }} />}
        onEndReached={loadNextPage}
        ListFooterComponent={() => (loading ? <ActivityIndicator size="small" /> : null)}
      />
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 15 }}>
        {tiposDeTramites.map((item) => (
          <Card>
            <View style={styles.titleContainer}>
              <Text style={styles.title}> TRÁMITE </Text>

              <TouchableWithoutFeedback onPress={() => removeItem(index)}>
                <View>
                  <Icon name="eye" color="#F98888" size={15} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <Separator gap={5} />
            <Text style={styles.field}>
              Nombre
            </Text>
            <Text style={styles.value}>
              {item.nombre}
            </Text>
          </Card>
        ))}
      </ScrollView> */}
    </>
  );
};

export default Tramites;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 15,
    paddingTop: 15,
  },
  cta: {
    marginTop: 13,
  },
  card: {
    padding: 16,
    marginTop: 15,
    marginHorizontal: 10,
  },
  padron: {
    fontSize: 18,
    fontWeight: '500',
    color: '#010101',
    textTransform: 'uppercase',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#535353',
    fontSize: 10,
    fontWeight: '600',
  },
  field: {
    fontSize: 14,
    color: '#818181',
    fontWeight: '500',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#010101',
    fontWeight: '700',
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#cccc',
  },
  bottomInnerContainer: {
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#010101',
    fontWeight: '500',
  },
});
