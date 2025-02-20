import React from 'react';
import { ScrollView } from 'react-native';
import { Stack, Text, YStack, Theme, useTheme, XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import ProgramCard from '../../components/cards/ProgramCard';
import type { RootStackParamList, TreatmentProgramDetailScreenProps } from '../../navigation/types';
import { Activity, Clock, Users, ChevronRight } from '@tamagui/lucide-icons';

interface Condition {
  id: string;
  title: string;
  description: string;
  exercises: number;
  duration: string;
}

type ConditionsType = {
  [K in 'orthopedic' | 'posture' | 'musculoskeletal']: {
    [key: string]: Condition[];
  };
};

const conditions: ConditionsType = {
  orthopedic: {
    neck: [
      { id: 'herniation', title: 'Boyun Fıtığı', description: 'Boyun fıtığı tedavi programı', exercises: 8, duration: '45 dk' },
      { id: 'cervicalStraightening', title: 'Boyun Düzleşmesi', description: 'Boyun düzleşmesi tedavi programı', exercises: 6, duration: '30 dk' },
      { id: 'spondylosis', title: 'Servikal Spondiloz', description: 'Servikal spondiloz tedavi programı', exercises: 7, duration: '35 dk' },
    ],
    back: [
      { id: 'backHerniation', title: 'Bel Fıtığı', description: 'Bel fıtığı tedavi programı', exercises: 8, duration: '45 dk' },
      { id: 'spondylolisthesis', title: 'Bel Kayması', description: 'Bel kayması tedavi programı', exercises: 7, duration: '40 dk' },
      { id: 'muscleSpasm', title: 'Kas Spazmı', description: 'Kas spazmı tedavi programı', exercises: 6, duration: '30 dk' },
    ],
    // Diğer bölgeler için benzer şekilde devam eder
  },
  posture: {
    upperBody: [
      { id: 'kyphosis', title: 'Kifoz (Kamburluk)', description: 'Kifoz tedavi programı', exercises: 7, duration: '35 dk' },
      { id: 'forwardHead', title: 'Forward Head', description: 'Forward head tedavi programı', exercises: 6, duration: '30 dk' },
      { id: 'roundedShoulders', title: 'Rounded Shoulders', description: 'Rounded shoulders tedavi programı', exercises: 8, duration: '40 dk' },
    ],
    // Diğer postür problemleri için benzer şekilde devam eder
  },
  musculoskeletal: {
    muscular: [
      { id: 'muscleWeakness', title: 'Kas Güçsüzlüğü', description: 'Kas güçsüzlüğü tedavi programı', exercises: 8, duration: '45 dk' },
      { id: 'flexibility', title: 'Esneklik Problemleri', description: 'Esneklik problemleri tedavi programı', exercises: 7, duration: '35 dk' },
    ],
    // Diğer kas-iskelet sistemi problemleri için benzer şekilde devam eder
  },
};

export const TreatmentProgramDetailScreen = ({ route }: TreatmentProgramDetailScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { categoryId, subCategoryId } = route.params;

  const handleConditionPress = (conditionId: string) => {
    navigation.navigate('ExercisePlayer', {
      categoryId,
      subCategoryId,
      conditionId,
    });
  };

  const currentConditions = conditions[categoryId]?.[subCategoryId] || [];

  return (
    <Theme name="light">
      <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
        {/* Başlık */}
        <YStack padding="$4" space="$4">
          <Text fontSize="$7" fontWeight="bold" color="$blue10">
            {subCategoryId === 'neck' ? 'Boyun Bölgesi' :
             subCategoryId === 'back' ? 'Bel Bölgesi' :
             subCategoryId === 'shoulder' ? 'Omuz Bölgesi' :
             subCategoryId === 'knee' ? 'Diz Bölgesi' : 'Tedavi Programları'}
          </Text>
          <Text fontSize="$4" color="$gray11" marginBottom="$2">
            {currentConditions.length} farklı rahatsızlık için özel hazırlanmış tedavi programları
          </Text>

          {/* Program Kartları */}
          <YStack space="$4">
            {currentConditions.map((condition: Condition) => (
              <ProgramCard
                key={condition.id}
                title={condition.title}
                description={condition.description}
                exercises={condition.exercises}
                duration={condition.duration}
                icon={Activity}
                backgroundColor="$blue2"
                iconColor="$blue10"
                onPress={() => handleConditionPress(condition.id)}
              />
            ))}
          </YStack>

          {/* Bilgilendirme Kartı */}
          <Stack
            backgroundColor="$yellow2"
            padding="$4"
            borderRadius="$4"
            marginTop="$4"
          >
            <XStack space="$3" alignItems="center" marginBottom="$2">
              <Users size={24} color={theme.yellow10.get()} />
              <Text fontSize="$4" fontWeight="bold" color="$yellow10">
                Uzman Önerisi
              </Text>
            </XStack>
            <Text fontSize="$3" color="$yellow10">
              Her egzersizi düzenli olarak yapmanız ve ilerlemenizi takip etmeniz önemlidir.
              Herhangi bir ağrı veya rahatsızlık durumunda egzersizi durdurun ve uzmanınıza danışın.
            </Text>
          </Stack>
        </YStack>
      </ScrollView>
    </Theme>
  );
}; 