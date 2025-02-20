import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Activity, BarChart2, BookOpen, User } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';

import { HomeScreen } from '../screens/main/HomeScreen';
import { ExercisesHomeScreen } from '../screens/exercise/ExercisesHomeScreen';
import { ProgressScreen } from '../screens/main/ProgressScreen';
import { EducationScreen } from '../screens/main/EducationScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { RootStackParamList } from './types';

type TabParamList = {
  Home: undefined;
  Exercises: undefined;
  Progress: undefined;
  Education: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.blue10.get(),
        tabBarInactiveTintColor: theme.gray9.get(),
        tabBarStyle: {
          backgroundColor: theme.background.get(),
          borderTopColor: theme.borderColor.get(),
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background.get(),
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.color.get(),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          tabBarLabel: 'Ana Sayfa',
          headerTitle: 'Ana Sayfa',
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Activity color={color} size={size} />,
          tabBarLabel: 'Egzersizler',
          headerTitle: 'Egzersizler',
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
          tabBarLabel: 'İlerleme',
          headerTitle: 'İlerleme',
        }}
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
          tabBarLabel: 'Eğitim',
          headerTitle: 'Eğitim',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarLabel: 'Profil',
          headerTitle: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}; 