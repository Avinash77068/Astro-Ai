import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HomeScreen from '../components/mainScreen/HomeScreen/HomeScreen';
import FeaturePage from '../components/mainScreen/pages/FeaturePage';
import SplashScreen from '../components/mainScreen/SplashScree/SplashScree';
import OnboardingFlow from '../components/mainScreen/OnboardingFlow/index';
import LoveCalculationScreen from '../components/mainScreen/screens/LoveCalculation/LoveCalculationScreen';
import PredictionsScreen from '../components/mainScreen/screens/Predictions/PredictionsScreen';
import AccountScreen from '../components/mainScreen/screens/Account/AccountScreen';
import ChatScreen from '../components/mainScreen/screens/Chat/ChatScreen';
import ProfileScreen from '../components/mainScreen/ProfileScreen';
import { STRING } from '../components/constants/string';
import { RootStackParamList } from '../components/types/astro';

// Define screen configurations in a typed array for better organization and performance
export const screenConfigs: Array<{
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  options:
    | NativeStackNavigationOptions
    | ((props: { route: any }) => NativeStackNavigationOptions);
}> = [
  {
    name: STRING.SPLASH_SCREEN as keyof RootStackParamList,
    component: SplashScreen,
    options: { headerShown: false },
  },
  {
    name: STRING.ONBOARDING as keyof RootStackParamList,
    component: OnboardingFlow,
    options: { headerShown: false },
  },
  {
    name: STRING.HOME as keyof RootStackParamList,
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: STRING.LOVE_CALCULATION as keyof RootStackParamList,
    component: LoveCalculationScreen,
    options: { title: 'Love Calculation' },
  },
  {
    name: STRING.PREDICTIONS as keyof RootStackParamList,
    component: PredictionsScreen,
    options: { title: 'Chat Now' },
  },
  {
    name: STRING.ACCOUNT as keyof RootStackParamList,
    component: AccountScreen,
    options: { title: 'My Account' },
  },
  {
    name: STRING.CHAT as keyof RootStackParamList,
    component: ChatScreen,
    options: ({ route }) => ({
      title: route.params?.astrologer.name || 'Chat',
      headerShown: false,
    }),
  },
  {
    name: STRING.PROFILE_SCREEN as keyof RootStackParamList,
    component: ProfileScreen,
    options: { title: 'Profile' },
  },
  {
    name: STRING.FEATURE_PAGE as keyof RootStackParamList,
    component: FeaturePage,
    options: ({ route }) => ({
      title: route.params?.title || 'Feature',
    }),
  },
];
