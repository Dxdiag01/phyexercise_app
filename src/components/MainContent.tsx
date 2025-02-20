import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeTest } from './ThemeTest';

export const MainContent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeTest />
    </SafeAreaView>
  );
}; 