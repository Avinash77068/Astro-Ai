import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/mainScreen/HomeScreen/HomeScreen';

import FeaturePage from '../components/mainScreen/pages/FeaturePage';
import SplashScreen from '../components/mainScreen/SplashScree/SplashScree';
import OnboardingFlow from '../components/mainScreen/OnboardingFlow/index'
type Astrologer = {
  id: number;
  name: string;
  online: boolean;
  experience: number;
  languages: string[];
  specialization: string[];
  rate: number;
  avatar: string;
};

export type RootStackParamList = {
  SplashScreen: undefined;
  onboarding: undefined;
  Home: undefined;
  LoveCalculation: undefined;
  Predictions: undefined;
  Account: undefined;
  Chat: {
    astrologer: Astrologer;
  };
  FeaturePage: {
    title: string;
    icon: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import LoveCalculationScreen from '../components/mainScreen/screens/LoveCalculation/LoveCalculationScreen';
import PredictionsScreen from '../components/mainScreen/screens/Predictions/PredictionsScreen';
import AccountScreen from '../components/mainScreen/screens/Account/AccountScreen';
import ChatScreen from '../components/mainScreen/screens/Chat/ChatScreen';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#1A0855',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
  contentStyle: {
    backgroundColor: '#1A0855',
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboarding"
          component={OnboardingFlow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoveCalculation"
          component={LoveCalculationScreen}
          options={{ title: 'Love Calculation' }}
        />
        <Stack.Screen
          name="Predictions"
          component={PredictionsScreen}
          options={{ title: 'Chat Now' }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ title: 'My Account' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params?.astrologer.name || 'Chat',
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="FeaturePage"
          component={FeaturePage}
          options={({ route }) => ({
            title: route.params?.title || 'Feature',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
