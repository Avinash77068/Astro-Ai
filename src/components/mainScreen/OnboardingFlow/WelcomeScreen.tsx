import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Action from '../../common/Action';

export default function WelcomeScreen({
  setScreen,
  formData,
  setFormData,
}: any) {
  const [error, setError] = useState('');

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
    <LinearGradient colors={['#0f172a', '#1e293b']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <Image
            source={require('../../../assets/zodiac-signs.webp')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome!</Text>
          {/* <Text style={styles.sub}>Enter your mobile number to continue</Text> */}

          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#9CA3AF"
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
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  box: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 38, fontWeight: '800', color: '#FCD34D',width: '100%',textAlign: 'center',marginBottom: 24 },
  // sub: { color: '#E5E7EB', marginTop: 8, fontSize: 16 ,},
  logo: { width: 150, height: 150, marginBottom: 24,alignSelf: 'center',borderRadius: 300,overflow: 'hidden' },
  input: {
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 14,
    padding: 16,
    color: '#fff',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  error: { color: '#ef4444', marginTop: 6 },
  button: {
    marginTop: 30,
    backgroundColor: '#FCD34D',
    borderRadius: 14,
    paddingVertical: 16,
  },
});
