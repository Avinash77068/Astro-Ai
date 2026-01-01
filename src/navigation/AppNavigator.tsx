import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { STRING } from '../components/constants/string';
import { Astrologer, RootStackParamList } from '../components/types/astro';
import { screenConfigs } from './screenConfigs';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        {screenConfigs.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
