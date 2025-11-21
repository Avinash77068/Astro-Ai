import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/AppNavigator';
import { astrologers } from '../../../mockData/mockData';

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



export default function AstrologersListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filterOnline, setFilterOnline] = useState(false);
  const [filterExp, setFilterExp] = useState<number | null>(null);
  const [filterLang, setFilterLang] = useState<string | null>(null);
  const [filterSpec, setFilterSpec] = useState<string | null>(null);

  const applyFilters = () => {
    return astrologers.filter(a => {
      if (filterOnline && !a.online) return false;
      if (filterExp && a.experience < filterExp) return false;
      if (filterLang && !a.languages.includes(filterLang)) return false;
      if (filterSpec && !a.specialization.includes(filterSpec)) return false;
      return true;
    });
  };

  const filteredList = applyFilters();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>🔮 Astrologer Experts</Text>
        <Text style={styles.subtitle}>Find the perfect astrologer for you</Text>

        {/* Horizontal Filter Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          <View style={styles.horizontalRow}>
            {/* Online Filter */}
            <TouchableOpacity
              style={[styles.filterBtn, filterOnline && styles.activeFilter]}
              onPress={() => setFilterOnline(!filterOnline)}
            >
              <Text style={styles.filterText}>
                {filterOnline ? 'Online ✔' : 'Online Only'}
              </Text>
            </TouchableOpacity>

            {/* Experience Filters */}
            {[3, 5, 10].map(exp => (
              <TouchableOpacity
                key={exp}
                style={[
                  styles.filterBtnSm,
                  filterExp === exp && styles.activeFilter,
                ]}
                onPress={() => setFilterExp(filterExp === exp ? null : exp)}
              >
                <Text style={styles.filterText}>{exp}+ Years</Text>
              </TouchableOpacity>
            ))}

            {/* Language Filters */}
            {['Hindi', 'English'].map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.filterBtnSm,
                  filterLang === lang && styles.activeFilter,
                ]}
                onPress={() => setFilterLang(filterLang === lang ? null : lang)}
              >
                <Text style={styles.filterText}>{lang}</Text>
              </TouchableOpacity>
            ))}

            {/* Specialization Filters */}
            {['Vedic', 'Numerology', 'Tarot'].map(spec => (
              <TouchableOpacity
                key={spec}
                style={[
                  styles.filterBtnSm,
                  filterSpec === spec && styles.activeFilter,
                ]}
                onPress={() => setFilterSpec(filterSpec === spec ? null : spec)}
              >
                <Text style={styles.filterText}>{spec}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Astrologer Cards */}
        {filteredList.map(user => (
          <TouchableOpacity 
            key={user.id} 
            style={styles.card}
            onPress={() => navigation.navigate('Chat', { astrologer: user })}
          >
            <View style={styles.row}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{user.name}</Text>

                <Text style={styles.status}>
                  {user.online ? '🟢 Online' : '🔴 Offline'}
                </Text>

                <Text style={styles.exp}>
                  {user.experience} Years Experience
                </Text>

                <TouchableOpacity 
                  style={styles.chatBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    navigation.navigate('Chat', { astrologer: user });
                  }}
                >
                  <Text style={styles.chatText}>Chat Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tagColumn}>
                <View style={styles.tagRow}>
                  {user.languages.map((lang, i) => (
                    <Text key={i} style={styles.langTag}>
                      {lang}
                    </Text>
                  ))}
                </View>

                <View style={styles.specRow}>
                  {user.specialization.map((spec, i) => (
                    <Text key={i} style={styles.specTag}>
                      {spec}
                    </Text>
                  ))}
                </View>
                <Text style={styles.rate}>₹ {user.rate}/min</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredList.length === 0 && (
          <Text style={{ color: '#fff', marginTop: 20 }}>
            No astrologers match selected filters.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0855' },
  content: { padding: 12 },

  title: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#ffffff90', marginBottom: 20 },

  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff15',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff30',
    marginRight: 10,
  },
  filterBtnSm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff15',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff30',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#FCD34D',
    borderColor: '#FCD34D',
  },
  filterText: { color: '#fff', fontWeight: '600' },

  card: {
    backgroundColor: '#ffffff12',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ffffff20',
  },
  row: { flexDirection: 'row' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FCD34D',
  },
  name: { fontSize: 18, color: '#fff', fontWeight: '700' },
  status: { color: '#ffffff90', fontSize: 12, marginBottom: 3 },
  exp: { color: '#fff', marginBottom: 4 },
  rate: { color: '#FCD34D', marginBottom: 6, fontWeight: 'bold' },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
  langTag: {
    backgroundColor: '#ffffff20',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
    fontSize: 12,
  },

  specRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  specTag: {
    backgroundColor: '#FCD34D25',
    color: '#FCD34D',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
    fontSize: 12,
  },

  chatBtn: {
    marginTop: 10,
    backgroundColor: '#FCD34D',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  chatText: { color: '#000', fontWeight: '700' },
  tagColumn: { flexDirection: 'column', gap: 6 },
});
