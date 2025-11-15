import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PredictionsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>🔮 Predictions</Text>
        <Text style={styles.subtitle}>Your daily astrological predictions</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Horoscope</Text>
          <Text style={styles.placeholder}>
            Your daily horoscope will be shown here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0855',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff99',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff12',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff25',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  placeholder: {
    color: '#ffffff80',
    fontSize: 14,
    lineHeight: 22,
  },
});
