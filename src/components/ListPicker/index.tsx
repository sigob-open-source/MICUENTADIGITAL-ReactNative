import React, { useMemo, useState } from 'react';
import {
  View, Modal, TextInput, FlatList, StyleSheet, TouchableOpacity, Text,
} from 'react-native';

type ListItem = {
  value: number;
  label: string;
};

type Props = {
  visible: boolean;
  items: ListItem[];
  onSelect: (item: ListItem) => void;
  onClose: () => void;
};

function normalizeString(input: string) {
  return input.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const ListPicker: React.FC<Props> = ({
  visible, items, onSelect, onClose,
}) => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeString(searchText);
    const regexp = new RegExp(normalizedSearch, 'ig');
    return items.filter((item) => regexp.test(normalizeString(item.label)));
  }, [searchText, items]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const closeHandler = () => {
    onClose();
    setSearchText('');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={closeHandler}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearchText}
        />

        <FlatList
          keyboardShouldPersistTaps="always"
          data={filteredItems}
          keyExtractor={(item) => item.value.toString()}
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

export default ListPicker;
