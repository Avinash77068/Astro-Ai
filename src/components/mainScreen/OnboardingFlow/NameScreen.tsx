import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Action from '../../common/Action';

export default function NameScreen({ setScreen }: any) {
  const [name, setName] = useState('avinash');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Name</Text>
      <Text style={styles.subtitle}>Please enter your full name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Action title="Next" onPress={() => setScreen('dob')} disabled={!name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#374151', // slightly darker than background
    backgroundColor: '#1f2937', // dark input background
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 30,
    fontSize: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
});
