import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import Action from '../../common/Action';

export default function WelcomeScreen({ setScreen, formData, setFormData }: any) {
  const [error, setError] = useState('7706896765');

  const handleMobileChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setFormData((prev: any) => ({ ...prev, mobile: cleaned }));

    if (cleaned.length > 0 && cleaned.length < 10) {
      setError('Enter 10-digit valid number');
    } else {
      setError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.sub}>Enter your mobile number</Text>

        <TextInput
          placeholder="Enter Mobile Number"
          placeholderTextColor="#6B7280"
          keyboardType="phone-pad"
          value={formData.mobile}
          maxLength={10}
          onChangeText={handleMobileChange}
          style={[styles.input, error && { borderColor: '#ef4444' }]}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Action
          title="Continue"
          disabled={formData.mobile.length !== 10}
          onPress={() => setScreen('otp')}
          style={{ marginTop: 30 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 24 },
  box: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '700', color: '#fff' },
  sub: { color: '#9CA3AF', marginTop: 8 },
  input: {
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 14,
    padding: 16,
    color: '#fff',
    marginTop: 24,
  },
  error: { color: '#ef4444', marginTop: 6 },
});
