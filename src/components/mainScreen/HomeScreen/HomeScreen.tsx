import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import Sidebar from '../../common/Sidebar';
import CommonFooter from '../../common/CommonFooter';
import CommonHeader from '../../common/CommonHeader';


const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 260,
    zIndex: 11,
    backgroundColor: '#464067',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

// Feature Cards
const homeCards = [
  { title: 'Love Calculation', icon: '❤️', href: '/love-calculation' },
  { title: 'Future Prediction', icon: '🔮', href: '/future-prediction' },
  { title: 'Kundli Mini', icon: '🕉️', href: '/kundli-mini' },
  { title: 'Baby Name', icon: '👶', href: '/baby-name' },
  { title: 'Lucky Child', icon: '🌞', href: '/lucky-child' },
  { title: 'Today', icon: '📅', href: '/daily-rashi' },
  { title: 'Week', icon: '📆', href: '/weekly-rashi' },
  { title: 'Month', icon: '🗓', href: '/monthly-rashi' },
  { title: 'Tools', icon: '🛠', href: '/tools' },
  { title: 'Career', icon: '💼', href: '/career' },
  { title: 'Account', icon: '👤', href: '/account' },
];

export default function HomeScreen() {
  const [menu, setMenu] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCardPress = (item: { title: string; icon: string; href: string }) => {
    // Map of special routes that have their own screens
    const specialRoutes: { [key: string]: keyof RootStackParamList } = {
      '/love-calculation': 'LoveCalculation',
      '/predictions': 'Predictions',
      '/account': 'Account',
    };

    const routeName = specialRoutes[item.href];
    
    if (routeName) {
      // Use type assertion to ensure TypeScript understands this is a valid route
      navigation.navigate(routeName as any);
    } else {
      // Fallback to FeaturePage for other routes
      navigation.navigate('FeaturePage', {
        title: item.title,
        icon: item.icon,
      });
    }
  };

  const cardStyle = {
    width: '48%' as const,
    backgroundColor: '#ffffff12',
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffffff25',
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1A0855' }}>
      {/* Blur Overlay */}
      {menu && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenu(false)}
        >
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.7)"
          />
        </TouchableOpacity>
      )}

      {/* Sidebar */}
      <View style={[styles.sidebarContainer, { left: menu ? 0 : -260 }]}>
        <Sidebar onClose={() => setMenu(false)} />
      </View>

      {/* Common Header */}
      <CommonHeader
        title="आज का ज्योतिष"
        onMenu={() => setMenu(!menu)}
        paragraph="Welcome, Avinash"
        icon="☰"
      />

      {/* Body GRID */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* DAILY TIPS */}
        <Text
          style={{
            fontSize: 22,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          DAILY TIPS
        </Text>

        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
            padding: 20,
            borderRadius: 18,
            backgroundColor: '#ffffff15',
          }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ color: '#fff', width: '50%' }}>
              • Lucky Color: Indigo
            </Text>
            <Text style={{ color: '#fff', width: '50%' }}>
              • Mantra: Om Namah Shivaya
            </Text>
            <Text style={{ color: '#fff', width: '50%' }}>
              • Remedy: Light a ghee lamp
            </Text>
            <Text style={{ color: '#fff', width: '50%' }}>
              • Lucky Number: 7
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {homeCards.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={cardStyle}
              onPress={() => handleCardPress(item)}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                {item.icon} {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
<CommonFooter onClick={() => navigation.navigate('Home')}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: '#fff', fontSize: 24 }}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FeaturePage', { 
              title: 'Tools', 
              icon: '🛠️' 
            })}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>🛠️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Predictions')}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>👤</Text>
          </TouchableOpacity>
        </View>
      </CommonFooter>
    </View>
  );
}
