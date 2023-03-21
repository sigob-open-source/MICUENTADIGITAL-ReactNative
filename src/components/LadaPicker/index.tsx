import React, { useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import ladas from '../../dataset/ladas.json';

type Lada = {
  id: number;
  lada: string;
  pais: string;
};

type Props = {
  visible: boolean;
  onSelect: (lada: Lada) => void;
  onClose: () => void;
};

const LadaModalPicker: React.FC<Props> = ({ visible, onSelect, onClose }) => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredLadas = ladas.filter((lada) => lada
    .pais.toLowerCase().includes(searchText.toLowerCase()));

  const renderItem = ({ item }: { item: Lada }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text style={styles.itemText}>
        {item.lada}
        {' '}
        -
        {' '}
        {item.pais}
      </Text>
    </TouchableOpacity>
  );

  const closeHandler = () => {
    onClose();
    setSearchText('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={closeHandler}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por país"
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredLadas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
});

export default LadaModalPicker;
