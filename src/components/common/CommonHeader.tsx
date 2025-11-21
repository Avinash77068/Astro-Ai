import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CommonHeader({
  title = 'आज का ज्योतिष',
  onMenu,
  paragraph,
  icon,
}: {
  title?: string;
  onMenu: () => void;
  paragraph?: string;
  icon?: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onMenu()}>
          <Text style={styles.menuIcon}>{icon}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <Text style={styles.welcomeText}>{paragraph}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1A0855',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
});
