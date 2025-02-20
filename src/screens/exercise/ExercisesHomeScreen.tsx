import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Theme } from 'tamagui';
import { Activity, ChevronRight } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import ProgramCard from '../../components/cards/ProgramCard';
import type { RootStackParamList } from '../../navigation/types';

const mainCategories: Array<{
  id: 'orthopedic' | 'posture' | 'musculoskeletal';
  title: string;
  description: string;
  icon: typeof Activity;
}> = [
  {
    id: 'orthopedic',
    title: 'Ortopedik Rahatsızlıklar',
    description: 'Boyun, bel, omuz ve diz bölgesi rahatsızlıkları',
    icon: Activity
  },
  {
    id: 'posture',
    title: 'Postür Problemleri',
    description: 'Kifoz, skolyoz ve duruş bozuklukları',
    icon: Activity
  },
  {
    id: 'musculoskeletal',
    title: 'Kas-İskelet Sistemi',
    description: 'Kas güçsüzlüğü ve esneklik problemleri',
    icon: Activity
  }
];

export const ExercisesHomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCategoryPress = (categoryId: 'orthopedic' | 'posture' | 'musculoskeletal') => {
    navigation.navigate('TreatmentPrograms', { categoryId });
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Ana Başlık */}
          <Text fontSize="$6" fontWeight="bold" marginBottom="$2">
            Tedavi Programları
          </Text>

          {/* Ana Kategoriler */}
          <YStack space="$3">
            {mainCategories.map((category) => (
              <ProgramCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
                duration="30-45 dk"
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default ExercisesHomeScreen; 