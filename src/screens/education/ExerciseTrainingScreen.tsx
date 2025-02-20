import React from 'react';
import { ScrollView, Image } from 'react-native';
import { YStack, Text, Card, XStack, Theme, Button } from 'tamagui';
import { Clock, Play, Star } from '@tamagui/lucide-icons';
import { images } from '../../assets';

const exerciseContent = {
  featured: {
    title: 'Temel Egzersiz Teknikleri',
    description: 'Doğru egzersiz teknikleri ve önemli püf noktaları',
    duration: '30 dk',
    instructor: 'Uzm. Fzt. Mehmet Demir',
    image: images.placeholder
  },
  exercises: [
    {
      id: '1',
      title: 'Bel Germe Egzersizleri',
      duration: '15 dk',
      level: 'Başlangıç',
      thumbnail: images.placeholder
    },
    {
      id: '2',
      title: 'Güçlendirme Hareketleri',
      duration: '20 dk',
      level: 'Orta',
      thumbnail: images.placeholder
    },
    {
      id: '3',
      title: 'İleri Seviye Egzersizler',
      duration: '25 dk',
      level: 'İleri',
      thumbnail: images.placeholder
    }
  ]
};

export const ExerciseTrainingScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Öne Çıkan Eğitim */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              Öne Çıkan Eğitim
            </Text>

            <YStack space="$3">
              <Image
                source={exerciseContent.featured.image}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 8
                }}
                resizeMode="cover"
              />

              <YStack space="$2">
                <Text fontSize="$5" fontWeight="bold">
                  {exerciseContent.featured.title}
                </Text>
                <Text fontSize="$3" color="$gray11">
                  {exerciseContent.featured.description}
                </Text>
                
                <XStack space="$4" marginTop="$2">
                  <Text fontSize="$3" color="$gray11">
                    <Clock size={16} color="$gray11" /> {exerciseContent.featured.duration}
                  </Text>
                  <Text fontSize="$3" color="$gray11">
                    {exerciseContent.featured.instructor}
                  </Text>
                </XStack>

                <Button
                  size="$3"
                  themeInverse
                  icon={Play}
                  marginTop="$2"
                >
                  Eğitimi Başlat
                </Button>
              </YStack>
            </YStack>
          </Card>

          {/* Egzersiz Videoları */}
          <YStack space="$4">
            <Text fontSize="$5" fontWeight="bold">
              Egzersiz Videoları
            </Text>

            {exerciseContent.exercises.map((exercise) => (
              <Card
                key={exercise.id}
                bordered
                pressStyle={{ scale: 0.98 }}
              >
                <Image
                  source={exercise.thumbnail}
                  style={{
                    width: '100%',
                    height: 160,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}
                  resizeMode="cover"
                />
                
                <YStack padding="$3" space="$2">
                  <Text fontSize="$4" fontWeight="bold">
                    {exercise.title}
                  </Text>
                  
                  <XStack space="$4">
                    <Text fontSize="$3" color="$gray11">
                      <Clock size={16} color="$gray11" /> {exercise.duration}
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      <Star size={16} color="$gray11" /> {exercise.level}
                    </Text>
                  </XStack>

                  <Button
                    size="$3"
                    marginTop="$2"
                    icon={Play}
                  >
                    İzle
                  </Button>
                </YStack>
              </Card>
            ))}
          </YStack>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Egzersizleri yaparken kendi sınırlarınıza dikkat edin.
            Herhangi bir ağrı veya rahatsızlık durumunda egzersizi sonlandırın.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default ExerciseTrainingScreen; 