import { YStack, Text, Theme, Button, Card, ScrollView, XStack } from 'tamagui'
import React, { useState, useEffect } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Alert, ActivityIndicator } from 'react-native'

type ProgramSuggestionScreenProps = {
  navigation: NavigationProp<any>
}

// Örnek program önerisi
const suggestedProgram = {
  title: 'Boyun Fıtığı İyileştirme Programı',
  duration: '6 Hafta',
  sessionsPerWeek: 3,
  exercises: [
    {
      name: 'Boyun Germe',
      duration: '10 dakika',
      frequency: 'Günde 2 kez',
      difficulty: 'Kolay'
    },
    {
      name: 'Omuz Stabilizasyon',
      duration: '15 dakika',
      frequency: 'Haftada 3 kez',
      difficulty: 'Orta'
    },
    {
      name: 'Postür Düzeltme',
      duration: '20 dakika',
      frequency: 'Her gün',
      difficulty: 'Kolay'
    }
  ],
  recommendations: [
    'Düzenli egzersiz yapın',
    'Uzun süre telefon kullanımından kaçının',
    'Doğru yastık kullanımına dikkat edin',
    'Masa başında duruşunuza özen gösterin'
  ]
}

export const ProgramSuggestionScreen = ({ navigation }: ProgramSuggestionScreenProps) => {
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)

  useEffect(() => {
    // AI program önerisi yükleniyor simülasyonu
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAccept = async () => {
    try {
      setAccepting(true)
      // TODO: Program kabul işlemleri

      // Ana sayfaya yönlendir
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert('Hata', 'Program başlatılırken bir hata oluştu.')
    } finally {
      setAccepting(false)
    }
  }

  if (loading) {
    return (
      <Theme name="light">
        <YStack f={1} backgroundColor="$background" ai="center" jc="center" padding="$4">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text
            color="$gray11"
            fontSize="$4"
            textAlign="center"
            marginTop="$4"
          >
            Size özel program oluşturuluyor...
          </Text>
        </YStack>
      </Theme>
    )
  }

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Başlık */}
          <YStack space="$2" marginVertical="$4">
            <Text
              color="$primary"
              fontSize="$8"
              fontWeight="bold"
              textAlign="center"
            >
              Önerilen Program
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Şikayetlerinize özel hazırlanan program
            </Text>
          </YStack>

          {/* Program Detayları */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$6" fontWeight="bold" color="$primary">
              {suggestedProgram.title}
            </Text>
            
            <XStack space="$4" marginTop="$2">
              <Text fontSize="$4" color="$gray11">
                Süre: {suggestedProgram.duration}
              </Text>
              <Text fontSize="$4" color="$gray11">
                Haftalık: {suggestedProgram.sessionsPerWeek} seans
              </Text>
            </XStack>
          </Card>

          {/* Egzersizler */}
          <YStack space="$4">
            <Text fontSize="$5" fontWeight="bold">Egzersizler</Text>
            {suggestedProgram.exercises.map((exercise, index) => (
              <Card key={index} bordered padding="$4">
                <Text fontSize="$4" fontWeight="bold" marginBottom="$2">
                  {exercise.name}
                </Text>
                <YStack space="$1">
                  <Text fontSize="$3" color="$gray11">
                    Süre: {exercise.duration}
                  </Text>
                  <Text fontSize="$3" color="$gray11">
                    Sıklık: {exercise.frequency}
                  </Text>
                  <Text fontSize="$3" color="$gray11">
                    Zorluk: {exercise.difficulty}
                  </Text>
                </YStack>
              </Card>
            ))}
          </YStack>

          {/* Öneriler */}
          <YStack space="$4">
            <Text fontSize="$5" fontWeight="bold">Öneriler</Text>
            {suggestedProgram.recommendations.map((recommendation, index) => (
              <Text key={index} fontSize="$3" color="$gray11">
                • {recommendation}
              </Text>
            ))}
          </YStack>

          {/* Kabul Butonu */}
          <Button
            themeInverse
            size="$5"
            onPress={handleAccept}
            disabled={accepting}
          >
            {accepting ? 'Program Başlatılıyor...' : 'Programı Başlat'}
          </Button>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Program içeriği ilerlemenize göre güncellenecektir.
            Düzenli takip etmeniz önerilir.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 