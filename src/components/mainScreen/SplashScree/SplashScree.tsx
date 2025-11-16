
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useEffect } from 'react';


export default function SplashScree({navigation}: any) {


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('onboarding');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Stars Icon */}
        <View style={styles.starsContainer}>
          {/* Small star - top left */}
          <View style={styles.smallStar}>
            <Svg width="40" height="40" viewBox="0 0 40 40">
              <Path
                d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z"
                fill="#FCD34D"
              />
            </Svg>
          </View>

          {/* Large star */}
          <View style={styles.largeStar}>
            <Svg width="80" height="80" viewBox="0 0 80 80">
              <Path
                d="M40 0 L45 35 L80 40 L45 45 L40 80 L35 45 L0 40 L35 35 Z"
                fill="#FCD34D"
              />
            </Svg>
          </View>

          {/* Tiny sparkle - right */}
          <View style={styles.tinyStar}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Path
                d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                fill="#FCD34D"
              />
            </Svg>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>AI Astrology</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Discover Your Destiny</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1b4b', // Fallback color
    
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  starsContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  largeStar: {
    zIndex: 10,
  },
  smallStar: {
    position: 'absolute',
    left: -8,
    top: -4,
    zIndex: 5,
  },
  tinyStar: {
    position: 'absolute',
    right: 0,
    top: 32,
    zIndex: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCD34D',
    marginTop: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    fontWeight: '300',
    letterSpacing: 1.5,
    marginTop: 16,
    textAlign: 'center',
  },
});
