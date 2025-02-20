import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Theme, Button } from 'tamagui';
import { BookOpen, Video, Heart, Clock, Star } from '@tamagui/lucide-icons';

const educationContent = {
  featured: {
    title: 'Temel Egzersiz Teknikleri',
    description: 'Doğru egzersiz teknikleri ve önemli püf noktaları',
    duration: '30 dk',
    instructor: 'Uzm. Fzt. Mehmet Demir',
    type: 'video'
  },
  categories: [
    {
      id: 'disorders',
      title: 'Rahatsızlık Bilgisi',
      description: 'Çeşitli rahatsızlıklar hakkında detaylı bilgiler',
      icon: Heart,
      items: [
        'Boyun Fıtığı',
        'Bel Fıtığı',
        'Donmuş Omuz',
        'Tendinit'
      ]
    },
    {
      id: 'exercises',
      title: 'Egzersiz Eğitimi',
      description: 'Doğru egzersiz teknikleri ve uygulamalar',
      icon: Video,
      items: [
        'Temel Egzersizler',
        'İleri Seviye Teknikler',
        'Form Düzeltme',
        'Nefes Teknikleri'
      ]
    },
    {
      id: 'lifestyle',
      title: 'Yaşam Tarzı',
      description: 'Sağlıklı yaşam için öneriler ve bilgiler',
      icon: Heart,
      items: [
        'Beslenme Önerileri',
        'Günlük Aktiviteler',
        'Uyku Düzeni',
        'Stres Yönetimi'
      ]
    }
  ]
};

export const EducationScreen = () => {
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
              <Card
                bordered
                padding="$4"
                backgroundColor="$blue2"
                pressStyle={{ scale: 0.98 }}
              >
                <XStack space="$3" alignItems="center">
                  <Video size={24} color="$blue10" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">
                      {educationContent.featured.title}
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      {educationContent.featured.description}
                    </Text>
                    
                    <XStack space="$4" marginTop="$2">
                      <Text fontSize="$3" color="$gray11">
                        <Clock size={16} color="$gray11" /> {educationContent.featured.duration}
                      </Text>
                      <Text fontSize="$3" color="$gray11">
                        {educationContent.featured.instructor}
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
              </Card>
            </YStack>
          </Card>

          {/* Eğitim Kategorileri */}
          {educationContent.categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} bordered padding="$4" space="$4">
                <XStack space="$3" alignItems="center" marginBottom="$2">
                  <Icon size={24} color="$blue10" />
                  <YStack flex={1}>
                    <Text fontSize="$5" fontWeight="bold">
                      {category.title}
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      {category.description}
                    </Text>
                  </YStack>
                </XStack>

                <YStack space="$2">
                  {category.items.map((item, index) => (
                    <Card
                      key={index}
                      bordered
                      padding="$3"
                      pressStyle={{ scale: 0.98 }}
                    >
                      <XStack space="$3" alignItems="center">
                        <Star size={16} color="$blue10" />
                        <Text fontSize="$3">{item}</Text>
                      </XStack>
                    </Card>
                  ))}
                </YStack>
              </Card>
            );
          })}
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default EducationScreen; 