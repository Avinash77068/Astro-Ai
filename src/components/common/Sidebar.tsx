import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HomeIcon, UserIcon, ToolIcon } from './IconSet';

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <View
      style={{
        width: 260,
        height: '100%',
        backgroundColor: '#464067ff',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>
        Menu
      </Text>

      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 30 }}>
        <HomeIcon size={28} color="#9C8BFF" />
        <Text style={{ color: '#fff', marginLeft: 15, fontSize: 18 }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25 }}>
        <UserIcon size={28} color="#9C8BFF" />
        <Text style={{ color: '#fff', marginLeft: 15, fontSize: 18 }}>
          My Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25 }}>
        <ToolIcon size={28} color="#9C8BFF" />
        <Text style={{ color: '#fff', marginLeft: 15, fontSize: 18 }}>
          Tools
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClose}
        style={{
          marginTop: 40,
          padding: 10,
          backgroundColor: '#fff2',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}
