import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Action from '../../common/Action';

export default function OtpScreen({ setScreen }: any) {
  const [otp, setOtp] = useState('1234');

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/zodiac-signs.webp')} style={styles.logo}/>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We have sent a 4-digit code to your number
      </Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        placeholder="Enter OTP"
        style={styles.input}
        maxLength={4}
      />

      <Action
        title="Verify"
        onPress={() => setScreen('name')}
        disabled={otp.length < 4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#2628a7e3', // soft background
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 50,
  },
});
