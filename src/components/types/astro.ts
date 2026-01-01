export type Astrologer = {
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
  ProfileScreen: undefined;
};