import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FeaturePageProps = {
  route: {
    params: {
      title: string;
      icon: string;
    };
  };
};

export default function FeaturePage({ route }: FeaturePageProps) {
  const { title, icon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {icon} {title}
      </Text>
      <Text style={styles.content}>
        This is the {title} page. Content will be added here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0855',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});
