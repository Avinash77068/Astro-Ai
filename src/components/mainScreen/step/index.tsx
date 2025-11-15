import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import OtpScreen from "./OtpScreen";
import NameScreen from "./NameScreen";
import DobScreen from "./DobScreen";
import PlaceScreen from "./PlaceScreen";
import GenderScreen from "./GenderScreen";
import HomeScreen from "../../common/HomeScreen";

export default function OnboardingFlow() {
  const [screen, setScreen] = useState('welcome');

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    place: '',
    gender: '',
    mobile: '',
  });

  return (
    <>
      {screen === 'welcome' && (
        <WelcomeScreen
          setScreen={setScreen}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {screen === 'otp' && <OtpScreen setScreen={setScreen} />}

      {screen === 'name' && (
        <NameScreen
          setScreen={setScreen}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {screen === 'dob' && (
        <DobScreen
          setScreen={setScreen}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {screen === 'place' && (
        <PlaceScreen
          setScreen={setScreen}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {screen === 'gender' && (
        <GenderScreen
          setScreen={setScreen}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {screen === 'home' && <HomeScreen />}
    </>
  );
}
