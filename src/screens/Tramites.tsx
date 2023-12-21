import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Input from '../components/Input';
import Separator from '../components/Separator';
import { getTramites, type ITramiteIndexado } from '../services/tramites/plantillas-de-tramites-de-atencion-ciudadana';
import { RootStackParamList } from '../types/navigation';

type TramitesScreenProps = NativeStackScreenProps<RootStackParamList, 'webTramites'>;

const Tramites = ({ navigation }: TramitesScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [tiposDeTramites, setTiposDeTramites] = useState<ITramiteIndexado[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTiposDeTramites = async () => {
    const response = await getTramites({
      entidad: 1,
      page: currentPage,
      desc: true,
    });
    return response.results;
  };

  const loadNextPage = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    const query: Record<string, unknown> = { entidad: 1, desc: true };

    if (searchText.trim()) {
      query.nombre = searchText.trim();
    }

    const response = await getTramites({
      page: nextPage,
      ...query,
    });

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
      desc: true,
    });

    setTiposDeTramites(response.results);
    setCurrentPage(1);
    setLoading(false);
  };

  return (
    <>
      <Header item="" />

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
          onPress={() => { void onSearch(); }}
        />
      </Card>

      <FlatList
        contentContainerStyle={styles.content}
        data={tiposDeTramites}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => { navigation.push('webTramites', { item }); }}>
              <Card>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}> TRÁMITE </Text>

                  <View style={{ flexDirection: 'row' }}>
                    <Text>{item.volumen_de_consultas}</Text>
                    <Icon style={{ marginRight: 8, marginLeft: 8 }} name="eye" color="#F98888" size={15} />
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
        onEndReached={() => { void loadNextPage(); }}
        ListFooterComponent={() => (loading ? <ActivityIndicator size="small" /> : null)}
      />
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