import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AstrologySplash from './components/mainScreen/SplashScree/SplashScree';
import OnboardingFlow from './components/mainScreen/OnboardingFlow/index';


export default function TotalFile() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowOnboarding(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showSplash && <AstrologySplash />}
      {showOnboarding && <OnboardingFlow />}
    </View>
  );
}
