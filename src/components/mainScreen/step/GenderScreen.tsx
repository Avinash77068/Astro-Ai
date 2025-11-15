import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Action from '../../common/Action';


export default function GenderScreen({ setScreen }: any) {
  const [gender, setGender] = useState('Male');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, gender === 'Male' && styles.active]}
          onPress={() => setGender('Male')}
        >
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, gender === 'Female' && styles.active]}
          onPress={() => setGender('Female')}
        >
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>
      </View>
      <Action
        title="Continue"
        onPress={() => setScreen('home')}
        disabled={!gender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#FCD34D',
    borderColor: '#FCD34D',
  },
  optionText: { fontSize: 18, fontWeight: '600' },
});
