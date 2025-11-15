import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Sidebar from '../../common/Sidebar';

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

// 🌟 SORTED FEATURE CARDS ARRAY
const homeCards = [
  // MAIN FEATURES
  { title: 'Love Calculation', icon: '❤️', href: '/love-calculation' },
  { title: 'Future Prediction', icon: '🔮', href: '/future-prediction' },
  { title: 'Kundli Mini', icon: '🕉️', href: '/kundli-mini' },
  { title: 'Baby Name', icon: '👶', href: '/baby-name' },
  { title: 'Lucky Child', icon: '🌞', href: '/lucky-child' },

  // RASHI
  { title: 'Today', icon: '📅', href: '/daily-rashi' },
  { title: 'Week', icon: '📆', href: '/weekly-rashi' },
  { title: 'Month', icon: '🗓', href: '/monthly-rashi' },

  // FOOTER TOOLS
  { title: 'Tools', icon: '🛠', href: '/tools' },
  { title: 'Career', icon: '💼', href: '/career' },
  { title: 'Account', icon: '👤', href: '/account' },
];

export default function HomeScreen() {
  const [menu, setMenu] = useState(false);

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

      {/* Header */}
      <View style={{ padding: 20, paddingTop: 50 }}>
        <TouchableOpacity onPress={() => setMenu(!menu)}>
          <Text style={{ color: '#fff', fontSize: 22 }}>☰</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 28,
            color: '#fff',
            fontWeight: 'bold',
            marginTop: 10,
          }}
        >
          आज का ज्योतिष
        </Text>

        <Text style={{ color: '#ddd', marginTop: 5, fontSize: 16 }}>
          Welcome, Avinash 👋
        </Text>
      </View>

      {/* GRID CARDS */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
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
              onPress={() => console.log('Navigate to:', item.href)}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                {item.icon} {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DAILY TIPS */}
        <Text
          style={{
            marginTop: 20,
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
            padding: 20,
            borderRadius: 18,
            backgroundColor: '#ffffff15',
          }}
        >
          <Text style={{ color: '#fff' }}>• Lucky Color: Indigo</Text>
          <Text style={{ color: '#fff' }}>• Mantra: Om Namah Shivaya</Text>
          <Text style={{ color: '#fff' }}>• Remedy: Light a ghee lamp</Text>
        </View>
      </ScrollView>
    </View>
  );
}
