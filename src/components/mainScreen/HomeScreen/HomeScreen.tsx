import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import Sidebar from '../../common/Sidebar';
import CommonFooter from '../../common/CommonFooter';
import CommonHeader from '../../common/CommonHeader';


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

const luckyItems = [
  { label: 'Lucky Color', value: 'Indigo' },
  { label: 'Mantra', value: 'Om Namah Shivaya' },
  { label: 'Remedy', value: 'Light a ghee lamp' },
  { label: 'Lucky Number', value: '7' },
];

export default function HomeScreen() {
  const [menu, setMenu] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCardPress = (item: {
    title: string;
    icon: string;
    href: string;
  }) => {
    const specialRoutes: { [key: string]: keyof RootStackParamList } = {
      '/love-calculation': 'LoveCalculation',
      '/predictions': 'Predictions',
      '/account': 'Account',
    };
    const routeName = specialRoutes[item.href];
    if (routeName) {
      navigation.navigate(routeName as any);
    } else {
      navigation.navigate('FeaturePage', {
        title: item.title,
        icon: item.icon,
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1A0855' }}>
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

      <View style={[styles.sidebarContainer, { left: menu ? 0 : -260 }]}>
        <Sidebar onClose={() => setMenu(false)} />
      </View>

      <CommonHeader
        title="आज का ज्योतिष"
        onMenu={() => setMenu(!menu)}
        paragraph="Welcome, Avinash"
        icon="☰"
      />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Text style={styles.dailyTipsTitle}>DAILY TIPS</Text>
        <View style={styles.dailyTipsContainer}>
          {luckyItems.map((item, index) => (
            <Text key={index} style={styles.dailyTipsItem}>
              • {item.label}: {item.value}
            </Text>
          ))}
        </View>

        <View style={styles.featureGrid}>
          {homeCards.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(item)}
            >
              <Text style={styles.cardText}>
                {item.icon} {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CommonFooter onClick={() => navigation.navigate('Home')}>
        <View style={styles.footerIconRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: '#fff', fontSize: 24 }}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FeaturePage', { title: 'Tools', icon: '🛠️' })
            }
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>🛠️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Predictions')}>
            <Text style={{ color: '#fff', fontSize: 24 }}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={{ color: '#fff', fontSize: 24 }}>👤</Text>
          </TouchableOpacity>
        </View>
      </CommonFooter>
    </View>
  );
}
const styles = StyleSheet.create({
  // Full screen absolute for blur
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

  // Daily tips container
  dailyTipsContainer: {
    marginTop: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  dailyTipsItem: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  dailyTipsTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // Feature cards
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Footer icon row
  footerIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
