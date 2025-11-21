import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { astrologers } from '../../../mockData/mockData';

export default function AIAstrologers({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Astrologers</Text>
        <TouchableOpacity style={styles.chevronButton}>
          <ChevronRight size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ flexGrow: 0 }}
      >
        {astrologers.map(astrologer => (
          <TouchableOpacity
            key={astrologer.id}
            style={styles.card}
            onPress={() => navigation.navigate('Chat', { astrologer })}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: astrologer.avatar }} style={styles.image} />
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {astrologer.name}
            </Text>
            <Text style={styles.price}>{astrologer.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A0855',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  chevronButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexGrow: 1,
  },
  card: {
    alignItems: 'center',
    width: 100,
    marginRight: 16,
    marginBottom: 10,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400',
  },
});
