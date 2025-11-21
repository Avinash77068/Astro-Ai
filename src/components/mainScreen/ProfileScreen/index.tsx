import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProfileCard from './ProfileCard';
import WalletCard from './WalletCard';
import MenuList from './MenuList';
import LogoutButton from './LogoutButton';



export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ProfileCard />
      <WalletCard />
      <MenuList />
      <LogoutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0855',
    // paddingTop: 100,
  },
});
