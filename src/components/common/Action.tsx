import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ActionProps = {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
  style?: any;
};

export default function Action({
  onPress,
  disabled = false,
  title = 'Next',
  style = {},
}: ActionProps) {
  return (
    <TouchableOpacity
      style={[styles.primaryBtn, disabled && styles.disabledBtn, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.primaryBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: '#FCD34D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
