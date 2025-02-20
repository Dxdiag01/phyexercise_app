import React from 'react';
import { ScrollView } from 'react-native';
import { Stack, Text, YStack, Theme, useTheme } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import ProgramCard from '../../components/cards/ProgramCard';
import type { RootStackParamList, TreatmentProgramsScreenProps } from '../../navigation/types';
import { Activity } from '@tamagui/lucide-icons';

const subCategories = {
  orthopedic: [
    {
      id: 'neck',
      title: 'Boyun Bölgesi',
      conditions: [
        { id: 'herniation', title: 'Boyun Fıtığı' },
        { id: 'cervicalStraightening', title: 'Boyun Düzleşmesi' },
        { id: 'spondylosis', title: 'Servikal Spondiloz' },
      ],
    },
    {
      id: 'back',
      title: 'Bel Bölgesi',
      conditions: [
        { id: 'backHerniation', title: 'Bel Fıtığı' },
        { id: 'spondylolisthesis', title: 'Bel Kayması' },
        { id: 'muscleSpasm', title: 'Kas Spazmı' },
      ],
    },
    {
      id: 'shoulder',
      title: 'Omuz Bölgesi',
      conditions: [
        { id: 'frozenShoulder', title: 'Donmuş Omuz' },
        { id: 'rotatorCuff', title: 'Rotator Manşet' },
        { id: 'tendinitis', title: 'Tendinit' },
      ],
    },
    {
      id: 'knee',
      title: 'Diz Bölgesi',
      conditions: [
        { id: 'meniscus', title: 'Menisküs' },
        { id: 'osteoarthritis', title: 'Kireçlenme' },
        { id: 'ligamentInjury', title: 'Bağ Problemleri' },
      ],
    },
  ],
  posture: [
    {
      id: 'upperBody',
      title: 'Üst Vücut',
      conditions: [
        { id: 'kyphosis', title: 'Kifoz (Kamburluk)' },
        { id: 'forwardHead', title: 'Forward Head' },
        { id: 'roundedShoulders', title: 'Rounded Shoulders' },
      ],
    },
    {
      id: 'spine',
      title: 'Omurga',
      conditions: [
        { id: 'scoliosis', title: 'Skolyoz' },
        { id: 'lordosis', title: 'Lordoz' },
      ],
    },
  ],
  musculoskeletal: [
    {
      id: 'muscular',
      title: 'Kas Sistemi',
      conditions: [
        { id: 'muscleWeakness', title: 'Kas Güçsüzlüğü' },
        { id: 'flexibility', title: 'Esneklik Problemleri' },
      ],
    },
    {
      id: 'functional',
      title: 'Fonksiyonel',
      conditions: [
        { id: 'balance', title: 'Denge Bozuklukları' },
        { id: 'coordination', title: 'Koordinasyon Problemleri' },
      ],
    },
  ],
};

export const TreatmentProgramsScreen = ({ route }: TreatmentProgramsScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { categoryId } = route.params;

  const handleSubCategoryPress = (subCategoryId: string) => {
    navigation.navigate('TreatmentProgramDetail', {
      categoryId,
      subCategoryId,
    });
  };

  const currentSubCategories = subCategories[categoryId] || [];

  return (
    <Theme name="light">
      <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
        <YStack padding="$4" space="$4">
          {currentSubCategories.map((subCategory) => (
            <ProgramCard
              key={subCategory.id}
              title={subCategory.title}
              description={`${subCategory.conditions.length} rahatsızlık için tedavi programı`}
              duration="30-45 dk"
              icon={Activity}
              onPress={() => handleSubCategoryPress(subCategory.id)}
            />
          ))}
        </YStack>
      </ScrollView>
    </Theme>
  );
}; 