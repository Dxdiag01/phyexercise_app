import React from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { ThemeProvider } from './theme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initSentry } from './config/sentry';
import { initFirebase } from './config/firebase';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { View, Text } from 'react-native';
import { Navigation } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

// Sentry'yi başlat
initSentry();

// Firebase'i başlat
initFirebase().catch(console.error);

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config} defaultTheme="light">
        <ErrorBoundary fallback={null}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </ErrorBoundary>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
