import { YStack, Text, Theme, Button, Card, ScrollView, XStack, Input } from 'tamagui'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Image, Alert } from 'react-native'

type ComplaintSelectionScreenProps = {
  navigation: NavigationProp<any>
}

// Vücut bölgeleri
const bodyParts = [
  { id: 'neck', name: 'Boyun', image: require('../../assets/body-parts/neck.png') },
  { id: 'shoulder', name: 'Omuz', image: require('../../assets/body-parts/shoulder.png') },
  { id: 'back', name: 'Sırt', image: require('../../assets/body-parts/back.png') },
  { id: 'waist', name: 'Bel', image: require('../../assets/body-parts/waist.png') },
  { id: 'knee', name: 'Diz', image: require('../../assets/body-parts/knee.png') },
  { id: 'ankle', name: 'Ayak Bileği', image: require('../../assets/body-parts/ankle.png') }
]

export const ComplaintSelectionScreen = ({ navigation }: ComplaintSelectionScreenProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [painLevel, setPainLevel] = useState<number>(5)
  const [complaintDetails, setComplaintDetails] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      if (!selectedPart || !complaintDetails) {
        Alert.alert('Hata', 'Lütfen rahatsızlık bölgesi ve şikayet detaylarını girin.')
        return
      }

      // TODO: Şikayet bilgilerini kaydet

      // Program önerisi ekranına yönlendir
      navigation.navigate('ProgramSuggestion')
    } catch (error) {
      Alert.alert('Hata', 'Bilgiler kaydedilirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
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
              Rahatsızlık Bölgesi
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Şikayetinizin olduğu bölgeyi seçin ve detayları belirtin
            </Text>
          </YStack>

          {/* Vücut Bölgeleri Grid */}
          <YStack space="$4">
            <XStack flexWrap="wrap" justifyContent="space-between">
              {bodyParts.map((part) => (
                <Card
                  key={part.id}
                  width="48%"
                  marginBottom="$4"
                  bordered
                  pressStyle={{ scale: 0.98 }}
                  onPress={() => setSelectedPart(part.id)}
                  backgroundColor={selectedPart === part.id ? '$primary' : '$background'}
                  padding="$4"
                >
                  <YStack space="$2" alignItems="center">
                    <Image
                      source={part.image}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                    <Text
                      color={selectedPart === part.id ? '$background' : '$color'}
                      fontSize="$5"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {part.name}
                    </Text>
                  </YStack>
                </Card>
              ))}
            </XStack>
          </YStack>

          {selectedPart && (
            <YStack space="$4">
              {/* Ağrı Seviyesi */}
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="bold">Ağrı Seviyesi (1-10)</Text>
                <XStack space="$2" alignItems="center">
                  <Text fontSize="$3" color="$gray11">Az</Text>
                  <Input
                    flex={1}
                    value={painLevel.toString()}
                    onChangeText={(text) => {
                      const value = parseInt(text)
                      if (value >= 1 && value <= 10) {
                        setPainLevel(value)
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={2}
                    textAlign="center"
                  />
                  <Text fontSize="$3" color="$gray11">Çok</Text>
                </XStack>
              </YStack>

              {/* Şikayet Detayları */}
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="bold">Şikayet Detayları</Text>
                <Input
                  value={complaintDetails}
                  onChangeText={setComplaintDetails}
                  multiline
                  numberOfLines={4}
                  placeholder="Şikayetinizi detaylı olarak anlatın..."
                />
              </YStack>
            </YStack>
          )}

          {/* Devam Butonu */}
          <Button
            themeInverse
            size="$5"
            onPress={handleSubmit}
            disabled={loading || !selectedPart || !complaintDetails}
            opacity={!selectedPart || !complaintDetails ? 0.5 : 1}
          >
            {loading ? 'Kaydediliyor...' : 'Devam Et'}
          </Button>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Verdiğiniz bilgiler doğrultusunda size özel bir egzersiz programı oluşturulacaktır.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 