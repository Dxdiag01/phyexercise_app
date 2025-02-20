import { NavigationContainer } from '@react-navigation/native';
import { TamaguiProvider, Theme } from 'tamagui';
import config from './tamagui.config';
import { Navigation } from './src/navigation/Navigation';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <Navigation />
      </Theme>
    </TamaguiProvider>
  );
} 