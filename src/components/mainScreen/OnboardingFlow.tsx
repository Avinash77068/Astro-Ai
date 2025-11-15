// OnboardingFlow.js
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import HomeScreen from '../common/HomeScreen';
import Action from '../common/Action';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [screen, setScreen] = useState('welcome'); // welcome, otp, name, dob, place, gender, complete
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [formData, setFormData] = useState({
    name: 'avinash',
    dob: '2000-01-01', // use YYYY-MM-DD or simple text input
    place: 'Delhi',
    gender: 'Male',
    mobile: '7706879675',
  });

  const handleOtpChange = (index: number, value: string) => {
    // allow only digits and one char
    const val = value.replace(/[^0-9]/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < otpRefs.length - 1) {
      otpRefs[index + 1].current;
    }
    if (!val && index > 0) {
      // nothing
    }
  };

  const handleOtpKeyPress = (
    { nativeEvent }: { nativeEvent: any },
    index: number,
  ) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current;
    }
  };

  const [error, setError] = useState('');

  const handleContinue = () => {
    if (formData.mobile.length === 10) {
      setError('');
      setScreen('otp');
    } else {
      setError('Please enter a valid 10-digit number');
    }
  };

  const resetAll = () => {
    setScreen('welcome');
    setOtp(['', '', '', '']);
    setFormData({ name: '', dob: '', place: '', gender: '', mobile: '' });
  };

  /* Screen renderers */

  const WelcomeScreen = () => {
    const handleMobileChange = (text: string) => {
      // Allow only numbers and limit to 10 digits
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
      
      // Use functional update to ensure we have the latest state
      setFormData(prev => ({
        ...prev,
        mobile: cleaned
      }));

      // Update error state
      if (cleaned.length > 0 && cleaned.length < 10) {
        setError('Please enter a valid 10-digit number');
      } else {
        setError('');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.flexGrow}>
          <View style={styles.centerWrap}>
            <View style={styles.welcomeAvatar}>
              <Text style={styles.emoji}>🔮</Text>
            </View>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSub}>Enter your mobile number</Text>
          </View>

          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#6B7280"
            keyboardType="phone-pad"
            value={formData.mobile}
            maxLength={10}
            onChangeText={handleMobileChange}
            style={[
              styles.numberInput,
              error ? { borderColor: '#ef4444' } : {},
            ]}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

  
          <Action
            title="Continue"
            style={[
              styles.continueButton,
              (!formData.mobile || formData.mobile.length < 10) &&
                styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!formData.mobile || formData.mobile.length < 10}
          />
        </View>
      </SafeAreaView>
    );
  };

  const OtpScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.centerWrap}>
        <View style={styles.logoBox}>
          <View style={styles.logoInner}>
            <View style={styles.logoDotsRow}>
              {Array.from({ length: 9 }).map((_, i) => (
                <View key={i} style={styles.logoDot} />
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.sub}>Enter the 4-digit code sent to</Text>
        <Text style={styles.phone}>+91 9876543210</Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={otpRefs[index]}
              value={digit}
              onChangeText={text => handleOtpChange(index, text)}
              onKeyPress={e => handleOtpKeyPress(e, index)}
              keyboardType="phone-pad"
              maxLength={1}
              style={styles.otpInput}
              textAlign="center"
              returnKeyType="next"
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            // simple dummy verification
            setScreen('name');
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.primaryBtnText}>Verify & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            /* resend (dummy) */
          }}
        >
          <Text style={styles.linkText}>
            Didn't receive code? <Text style={styles.highlight}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
  const NameScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenPad}>
        <TouchableOpacity
          onPress={() => setScreen('welcome')}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>What's your name?</Text>
        <Text style={styles.description}>
          This helps us personalize your experience
        </Text>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            value={formData.name}
            onChangeText={t => setFormData({ ...formData, name: t })}
            style={styles.textInput}
          />
        </View>
      </ScrollView>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, !formData.name && styles.disabledBtn]}
        onPress={() => setScreen('dob')}
        disabled={!formData.name}
      >
        <Text style={styles.primaryBtnText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const DobScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenPad}>
        <TouchableOpacity
          onPress={() => setScreen('name')}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>When's your birthday?</Text>
        <Text style={styles.description}>We need this to verify your age</Text>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
            value={formData.dob}
            onChangeText={t => setFormData({ ...formData, dob: t })}
            style={styles.textInput}
            keyboardType={
              Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'
            }
          />
        </View>
      </ScrollView>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
      </View>

      <Action
        onPress={() => setScreen('place')}
        disabled={!formData.dob}
      />
    </SafeAreaView>
  );

 

  const PlaceScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenPad}>
        <TouchableOpacity
          onPress={() => setScreen('dob')}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Where were you born?</Text>
        <Text style={styles.description}>Your place of birth</Text>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Place of Birth</Text>
          <TextInput
            placeholder="City, Country"
            placeholderTextColor="#9CA3AF"
            value={formData.place}
            onChangeText={t => setFormData({ ...formData, place: t })}
            style={styles.textInput}
          />
        </View>
      </ScrollView>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
      </View>

      <Action
        onPress={() => setScreen('gender')}
        disabled={!formData.place}
      />
    </SafeAreaView>
  );

  const GenderScreen = () => (  
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screenPad}>
        <TouchableOpacity
          onPress={() => setScreen('place')}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Select your gender</Text>
        <Text style={styles.description}>
          This helps us personalize your experience
        </Text>

        <View style={{ marginTop: 20, width: '100%' }}>
          {['Male', 'Female', 'Other', 'Prefer not to say'].map(option => {
            const selected = formData.gender === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => setFormData({ ...formData, gender: option })}
                style={[
                  styles.genderBtn,
                  selected
                    ? styles.genderBtnSelected
                    : styles.genderBtnUnselected,
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[styles.genderText, selected && { color: '#fff' }]}
                  >
                    {option}
                  </Text>
                  {selected && (
                    <View style={styles.checkOuter}>
                      <View style={styles.checkInner} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
      </View>

      <Action
        onPress={() => setScreen('complete')}
        disabled={!formData.gender}
      />
      </SafeAreaView>
  );

  const CompleteScreen = () => <HomeScreen />;

  /* Main render */
  return (
    <>
      {screen === 'welcome' && <WelcomeScreen />}
      {screen === 'otp' && <OtpScreen />}
      {screen === 'name' && <NameScreen />}
      {screen === 'dob' && <DobScreen />}
      {screen === 'place' && <PlaceScreen />}
      {screen === 'gender' && <GenderScreen />}
      {screen === 'complete' && <CompleteScreen />}
    </>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1724', // gray-900 like
  },
  centerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flexGrow: 1,
  },
  logoBox: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logoInner: {
    width: 80,
    height: 80,
    backgroundColor: '#111827',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoDotsRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoDot: {
    width: 6,
    height: 6,
    backgroundColor: '#60a5fa',
    borderRadius: 2,
    margin: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  sub: {
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'center',
  },
  phone: {
    color: '#F59E0B',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: '#7c3aed',
    borderRadius: 14,
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 6,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#FBBF24',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  primaryBtnText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  // New styles for continue button
  continueButton: {
    backgroundColor: '#7c3aed',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    width: '100%',
    marginTop: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#4b5563',
    opacity: 0.7,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
  highlight: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  flexGrow: {
    flex: 1,
    padding: 24,
  },
  welcomeAvatar: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 52,
  },
  welcomeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  welcomeSub: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 6,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  progressDot: {
    width: 32,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 999,
  },
  activeDot: {
    backgroundColor: '#FBBF24',
  },
  screenPad: {
    padding: 24,
    flexGrow: 1,
  },
  backBtn: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 26,
    color: '#fff',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  description: {
    color: '#9CA3AF',
    marginTop: 8,
  },
  label: {
    color: '#9CA3AF',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
  },
  disabledBtn: {
    backgroundColor: '#374151',
  },
  genderBtn: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    marginBottom: 12,
  },
  genderBtnSelected: {
    backgroundColor: '#7c3aed',
    borderColor: '#6d28d9',
  },
  genderBtnUnselected: {
    backgroundColor: '#111827',
    borderColor: '#374151',
  },
  genderText: {
    fontSize: 16,
    color: '#e5e7eb',
  },
  checkOuter: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInner: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#7c3aed',
  },
  successAvatar: {
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTick: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '700',
  },
  summaryBox: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#9CA3AF',
  },
  summaryValue: {
    color: '#fff',
    fontWeight: '600',
  },
  numberInput: {
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
    width: '100%',
    height: 60,
  },
  errorText: {
    color: '#ef4444',
    marginTop: 6,
    fontSize: 14,
    marginLeft: 4,
  },
});
