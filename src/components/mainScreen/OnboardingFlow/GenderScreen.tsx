import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Action from '../../common/Action';

export default function GenderScreen({ setScreen }: any) {
  const [gender, setGender] = useState('Male');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>
      <Text style={styles.subtitle}>
        Choose your gender to personalize your experience
      </Text>

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  option: {
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#1f2937',
    paddingVertical: 18,
    borderRadius: 12,
    width: '40%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  active: {
    backgroundColor: '#FCD34D',
    borderColor: '#FCD34D',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
