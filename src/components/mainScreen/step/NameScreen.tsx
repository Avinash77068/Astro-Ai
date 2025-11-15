import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Action from '../../common/Action';

export default function NameScreen({ setScreen }: any) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={styles.input}
      />

      <Action
        title="Next"
        onPress={() => setScreen('dob')}
        disabled={!name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
  },
});
