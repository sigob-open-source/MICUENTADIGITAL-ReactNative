import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';

const MaskedInput = () => {
  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [part3, setPart3] = useState('');
  const [part4, setPart4] = useState('');
  const [part5, setPart5] = useState('');

  const handlePart1Change = (text) => {
    setPart1(text);
  };

  const handlePart2Change = (text) => {
    setPart2(text);
  };

  const handlePart3Change = (text) => {
    setPart3(text);
  };

  const handlePart4Change = (text) => {
    setPart4(text);
  };

  const handlePart5Change = (text) => {
    setPart5(text);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={part1}
          onChangeText={handlePart1Change}
          maxLength={2}
          keyboardType="numeric"
        />

        <Text style={styles.textInput}>*Localidad</Text>
      </View>

      <Text style={styles.separator}>-</Text>
      <View>
        <TextInput
          style={styles.input}
          value={part2}
          onChangeText={handlePart2Change}
          maxLength={3}
          keyboardType="numeric"
        />

        <Text style={styles.textInput}>*Sector</Text>
      </View>

      <Text style={styles.separator}>-</Text>

      <View>
        <TextInput
          style={styles.input}
          value={part3}
          onChangeText={handlePart3Change}
          maxLength={3}
          keyboardType="numeric"
        />

        <Text style={styles.textInput}>*Manzana</Text>
      </View>

      <Text style={styles.separator}>-</Text>

      <View>
        <TextInput
          style={styles.input}
          value={part4}
          onChangeText={handlePart4Change}
          maxLength={3}
          keyboardType="numeric"
        />

        <Text style={styles.textInput}>*Lote</Text>
      </View>

      <Text style={styles.separator}>-</Text>

      <View>
        <TextInput
          style={styles.input}
          value={part5}
          onChangeText={handlePart5Change}
          maxLength={4}
          keyboardType="numeric"
        />

        <Text style={styles.textInput}>*Condominio</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#582E44',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 46,
    width: 53,

  },
  separator: {
    paddingHorizontal: 5,
  },
  textInput: {
    fontSize: 10,
    color: '#582E44',
  },
});

export default MaskedInput;
