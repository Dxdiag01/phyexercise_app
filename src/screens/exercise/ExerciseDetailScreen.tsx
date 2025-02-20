import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Theme, useTheme } from 'tamagui';
import ExerciseCard from '../../components/cards/ExerciseCard';

// Örnek egzersiz verileri
const neckExercises = [
  {
    id: '1',
    title: 'Boyun Germe Egzersizi',
    description: 'Boyun kaslarını nazikçe gererek esnekliği artırın ve ağrıyı azaltın.',
    duration: '2-3 dakika',
    repetitions: '10 tekrar x 3 set',
    imageUrl: 'https://example.com/neck-stretch.gif', // Mixamo'dan alınacak animasyon
  },
  {
    id: '2',
    title: 'İzometrik Boyun Güçlendirme',
    description: 'Boyun kaslarını güçlendirerek fıtık kaynaklı ağrıları azaltın.',
    duration: '5 dakika',
    repetitions: '5 tekrar x 2 set',
    imageUrl: 'https://example.com/neck-strength.gif', // Mixamo'dan alınacak animasyon
  },
  // Daha fazla egzersiz eklenebilir
];

export const ExerciseDetailScreen = () => {
  const theme = useTheme();

  const handleExercisePress = (exerciseId: string) => {
    // Egzersiz başlatma ekranına yönlendirme
    console.log('Egzersiz başlatıldı:', exerciseId);
  };

  const handleInfoPress = (exerciseId: string) => {
    // Egzersiz detay bilgilerini gösterme
    console.log('Detay görüntülendi:', exerciseId);
  };

  return (
    <Theme name="light">
      <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
        <YStack padding="$4" space="$4">
          {neckExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              title={exercise.title}
              description={exercise.description}
              duration={exercise.duration}
              repetitions={exercise.repetitions}
              imageUrl={exercise.imageUrl}
              onPress={() => handleExercisePress(exercise.id)}
              onInfoPress={() => handleInfoPress(exercise.id)}
            />
          ))}
        </YStack>
      </ScrollView>
    </Theme>
  );
}; 