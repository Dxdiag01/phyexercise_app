import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { ExercisePlayerScreen } from '../screens/exercise/ExercisePlayerScreen';
import { TreatmentProgramDetailScreen } from '../screens/exercise/TreatmentProgramDetailScreen';
import { AssessmentScreen } from '../screens/exercise/AssessmentScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { TreatmentProgramsScreen } from '../screens/exercise/TreatmentProgramsScreen';
import { PatientProfileScreen } from '../screens/onboarding/PatientProfileScreen';
import { RoleSelectionScreen } from '../screens/onboarding/RoleSelectionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="ExercisePlayer" component={ExercisePlayerScreen} />
        <Stack.Screen name="TreatmentProgramDetail" component={TreatmentProgramDetailScreen} />
        <Stack.Screen name="TreatmentPrograms" component={TreatmentProgramsScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 