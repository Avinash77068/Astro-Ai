import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CommonHeader({
  title = 'आज का ज्योतिष',
  onMenu,
  paragraph,
  icon,
}: {
  title?: string;
  onMenu: () => void;
        paragraph?: string;
  icon?: string;
}) {
  return (
    <View style={{ padding: 20, paddingTop: 50 }}>
      <TouchableOpacity onPress={onMenu}>
              <Text style={{ color: '#fff', fontSize: 22 }}>{icon}</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 28,
          color: '#fff',
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {title}
      </Text>

      <Text style={{ color: '#ddd', marginTop: 5, fontSize: 16 }}>
      {paragraph}
      </Text>
    </View>
  );
}
