import React from 'react';
import { ScrollView, Image } from 'react-native';
import { YStack, Text, Card, XStack, Theme } from 'tamagui';
import { Clock, BookOpen } from '@tamagui/lucide-icons';
import { images } from '../../assets';

const disorderContent = {
  overview: {
    title: 'Bel Fıtığı Nedir?',
    description: 'Bel fıtığı, omurlar arasındaki disklerin yıpranması veya hasar görmesi sonucu ortaya çıkan bir rahatsızlıktır.',
    image: images.placeholder
  },
  sections: [
    {
      id: '1',
      title: 'Belirtiler',
      content: 'Bel ve bacak ağrısı, uyuşma, karıncalanma, kas güçsüzlüğü',
      readTime: '3 dk'
    },
    {
      id: '2',
      title: 'Risk Faktörleri',
      content: 'Yaş, aşırı kilo, yanlış duruş, ağır kaldırma',
      readTime: '4 dk'
    },
    {
      id: '3',
      title: 'Tedavi Yöntemleri',
      content: 'Fizik tedavi, egzersiz, ilaç tedavisi, cerrahi',
      readTime: '5 dk'
    }
  ]
};

export const DisorderInfoScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Genel Bakış */}
          <Card bordered padding="$4" space="$4">
            <YStack space="$3">
              <Image
                source={disorderContent.overview.image}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 8
                }}
                resizeMode="cover"
              />

              <YStack space="$2">
                <Text fontSize={24} fontWeight="bold">
                  {disorderContent.overview.title}
                </Text>
                <Text fontSize="$4" color="$gray11">
                  {disorderContent.overview.description}
                </Text>
              </YStack>
            </YStack>
          </Card>

          {/* Bölümler */}
          <YStack space="$4">
            {disorderContent.sections.map((section) => (
              <Card
                key={section.id}
                bordered
                padding="$4"
                pressStyle={{ scale: 0.98 }}
              >
                <XStack space="$3" alignItems="center">
                  <BookOpen size={24} color="$blue10" />
                  <YStack space="$1" flex={1}>
                    <Text fontSize="$5" fontWeight="bold">
                      {section.title}
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      {section.content}
                    </Text>
                    <Text fontSize="$2" color="$gray10" marginTop="$2">
                      <Clock size={14} /> {section.readTime} okuma
                    </Text>
                  </YStack>
                </XStack>
              </Card>
            ))}
          </YStack>

          {/* Bilgilendirme Notu */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Bu bilgiler genel bilgilendirme amaçlıdır. Her hasta için tedavi süreci farklılık gösterebilir.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default DisorderInfoScreen; 