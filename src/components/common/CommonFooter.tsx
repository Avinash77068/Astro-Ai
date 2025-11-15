import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function CommonFooter({
    children,
    onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#ffffff15',
        marginTop: 20,
        borderRadius: 20,
        bottom: 10,
      }}
    >
      <TouchableOpacity onPress={onClick}>
        {children}
      </TouchableOpacity>
    </View>
  );
}
