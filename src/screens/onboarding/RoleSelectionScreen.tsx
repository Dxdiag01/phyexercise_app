import { YStack, Text, Theme, Button, Card, XStack, ScrollView } from 'tamagui'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { User, UserCog } from '@tamagui/lucide-icons'

type RoleSelectionScreenProps = {
  navigation: NavigationProp<any>
}

type Role = 'patient' | 'therapist' | null

export const RoleSelectionScreen = ({ navigation }: RoleSelectionScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<Role>(null)

  const handleContinue = () => {
    if (selectedRole === 'patient') {
      navigation.navigate('PatientProfile')
    } else if (selectedRole === 'therapist') {
      navigation.navigate('TherapistProfile')
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
              Rolünüzü Seçin
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Size en uygun deneyimi sunabilmemiz için rolünüzü belirleyin
            </Text>
          </YStack>

          {/* Rol Kartları */}
          <YStack space="$4">
            {/* Hasta Kartı */}
            <Card
              bordered
              pressStyle={{ scale: 0.98 }}
              onPress={() => setSelectedRole('patient')}
              backgroundColor={selectedRole === 'patient' ? '$blue10' : '$background'}
              padding="$4"
            >
              <XStack space="$4" alignItems="center">
                <User size={60} color={selectedRole === 'patient' ? '$background' : '$blue10'} />
                <YStack flex={1} space="$2">
                  <Text
                    color={selectedRole === 'patient' ? '$background' : '$color'}
                    fontSize="$6"
                    fontWeight="bold"
                  >
                    Hastayım
                  </Text>
                  <Text
                    color={selectedRole === 'patient' ? '$background' : '$gray11'}
                    fontSize="$3"
                  >
                    Fizik tedavi desteği almak ve egzersiz programı oluşturmak istiyorum
                  </Text>
                </YStack>
              </XStack>
            </Card>

            {/* Fizyoterapist Kartı */}
            <Card
              bordered
              pressStyle={{ scale: 0.98 }}
              onPress={() => setSelectedRole('therapist')}
              backgroundColor={selectedRole === 'therapist' ? '$blue10' : '$background'}
              padding="$4"
            >
              <XStack space="$4" alignItems="center">
                <UserCog size={60} color={selectedRole === 'therapist' ? '$background' : '$blue10'} />
                <YStack flex={1} space="$2">
                  <Text
                    color={selectedRole === 'therapist' ? '$background' : '$color'}
                    fontSize="$6"
                    fontWeight="bold"
                  >
                    Fizyoterapistim
                  </Text>
                  <Text
                    color={selectedRole === 'therapist' ? '$background' : '$gray11'}
                    fontSize="$3"
                  >
                    Hastalarımı takip etmek ve tedavi programları oluşturmak istiyorum
                  </Text>
                </YStack>
              </XStack>
            </Card>
          </YStack>

          {/* Devam Butonu */}
          <Button
            backgroundColor="$blue10"
            color="white"
            size="$5"
            marginTop="$4"
            onPress={handleContinue}
            disabled={!selectedRole}
            opacity={!selectedRole ? 0.5 : 1}
          >
            Devam Et
          </Button>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            {selectedRole === 'therapist' 
              ? 'Fizyoterapist olarak kayıt olmak için diploma ve sertifikalarınız gerekecektir.'
              : 'Rol seçiminizi daha sonra profilinizden değiştirebilirsiniz.'}
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 