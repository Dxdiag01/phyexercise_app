import React from 'react';
import { ScrollView, Image } from 'react-native';
import { YStack, Text, Card, XStack, Theme } from 'tamagui';
import { Heart, Coffee, Moon, Utensils, Clock } from '@tamagui/lucide-icons';

const lifestyleContent = {
  dailyRoutines: [
    {
      id: '1',
      title: 'Uyku Düzeni',
      description: 'Düzenli ve kaliteli uyku, iyileşme sürecini hızlandırır.',
      icon: Moon,
      tips: [
        'Her gün aynı saatte yatın ve kalkın',
        'Yatak odanızı karanlık ve serin tutun',
        'Yatmadan önce elektronik cihazları kullanmayın'
      ]
    },
    {
      id: '2',
      title: 'Beslenme',
      description: 'Doğru beslenme, ağrıları azaltmaya ve iyileşmeye yardımcı olur.',
      icon: Utensils,
      tips: [
        'Bol su için',
        'Antiinflamatuar besinleri tercih edin',
        'Öğün atlamamaya özen gösterin'
      ]
    },
    {
      id: '3',
      title: 'Günlük Aktiviteler',
      description: 'Günlük aktivitelerinizi düzenlemek, ağrılarınızı kontrol altında tutmanıza yardımcı olur.',
      icon: Heart,
      tips: [
        'Düzenli egzersiz yapın',
        'Uzun süre aynı pozisyonda kalmayın',
        'Ağır kaldırmaktan kaçının'
      ]
    }
  ],
  quickTips: [
    {
      id: '1',
      title: 'Doğru Oturma Pozisyonu',
      content: 'Sırtınızı dik tutun, ayaklarınız yere tam basmalı',
      readTime: '2 dk'
    },
    {
      id: '2',
      title: 'Stres Yönetimi',
      content: 'Meditasyon ve nefes egzersizleri yapın',
      readTime: '3 dk'
    },
    {
      id: '3',
      title: 'Ev Düzenlemesi',
      content: 'Yaşam alanınızı ergonomik hale getirin',
      readTime: '4 dk'
    }
  ]
};

export const LifestyleScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Günlük Rutinler */}
          {lifestyleContent.dailyRoutines.map((routine) => (
            <Card
              key={routine.id}
              bordered
              padding="$4"
              space="$4"
            >
              <XStack space="$3" alignItems="center">
                <routine.icon size={24} color="$blue10" />
                <YStack space="$1" flex={1}>
                  <Text fontSize="$5" fontWeight="bold">
                    {routine.title}
                  </Text>
                  <Text fontSize="$3" color="$gray11">
                    {routine.description}
                  </Text>
                </YStack>
              </XStack>

              <YStack space="$2" marginTop="$3">
                {routine.tips.map((tip, index) => (
                  <Text
                    key={index}
                    fontSize="$3"
                    color="$gray11"
                    marginLeft="$3"
                  >
                    • {tip}
                  </Text>
                ))}
              </YStack>
            </Card>
          ))}

          {/* Hızlı İpuçları */}
          <Card bordered padding="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$3">
              Hızlı İpuçları
            </Text>

            <YStack space="$3">
              {lifestyleContent.quickTips.map((tip) => (
                <Card
                  key={tip.id}
                  bordered
                  padding="$3"
                  pressStyle={{ scale: 0.98 }}
                >
                  <YStack space="$1">
                    <Text fontSize="$4" fontWeight="bold">
                      {tip.title}
                    </Text>
                    <Text fontSize="$3" color="$gray11">
                      {tip.content}
                    </Text>
                    <Text fontSize="$2" color="$gray10" marginTop="$2">
                      <Clock size={14} /> {tip.readTime} okuma
                    </Text>
                  </YStack>
                </Card>
              ))}
            </YStack>
          </Card>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Bu öneriler genel tavsiyelerdir. Kişisel durumunuza göre değişiklik gösterebilir.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default LifestyleScreen; 