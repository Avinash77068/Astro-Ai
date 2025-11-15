import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Action from '../../common/Action';


export default function PlaceScreen({ setScreen }: any) {
  const [place, setPlace] = useState('Lucknow');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place of Birth</Text>

      <TextInput
        value={place}
        onChangeText={setPlace}
        placeholder="City / Village"
        style={styles.input}
      />

      <Action
        title="Next"
        onPress={() => setScreen('gender')}
        disabled={!place}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
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
