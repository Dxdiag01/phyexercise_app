import { YStack, Text, Theme, Button, Input, Form, ScrollView, Select, XStack } from 'tamagui'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Alert } from 'react-native'

type PatientProfileScreenProps = {
  navigation: NavigationProp<any>
}

export const PatientProfileScreen = ({ navigation }: PatientProfileScreenProps) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    birthDate: '',
    gender: '',
    height: '',
    weight: '',
    occupation: '',
    medicalHistory: '',
    currentMedications: ''
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      
      // Form validasyonu
      if (!form.birthDate || !form.gender || !form.height || !form.weight) {
        Alert.alert('Hata', 'Lütfen zorunlu alanları doldurun.')
        return
      }

      // TODO: Profil bilgilerini kaydet

      // Şikayet seçim ekranına yönlendir
      navigation.navigate('ComplaintSelection')
    } catch (error) {
      Alert.alert('Hata', 'Profil oluşturulurken bir hata oluştu.')
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
              Profil Bilgileri
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Size özel bir program oluşturabilmemiz için bilgilerinizi girin
            </Text>
          </YStack>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <YStack space="$4">
              {/* Doğum Tarihi */}
              <Input
                placeholder="Doğum Tarihi (GG/AA/YYYY)"
                value={form.birthDate}
                onChangeText={(text) => setForm({ ...form, birthDate: text })}
                keyboardType="numeric"
                size="$4"
              />

              {/* Cinsiyet */}
              <Select
                value={form.gender}
                onValueChange={(value) => setForm({ ...form, gender: value })}
                size="$4"
              >
                <Select.Trigger>
                  <Select.Value placeholder="Cinsiyet Seçin" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item index={0} value="male">Erkek</Select.Item>
                  <Select.Item index={1} value="female">Kadın</Select.Item>
                  <Select.Item index={2} value="other">Diğer</Select.Item>
                </Select.Content>
              </Select>

              {/* Boy ve Kilo */}
              <XStack space="$4">
                <Input
                  flex={1}
                  placeholder="Boy (cm)"
                  value={form.height}
                  onChangeText={(text) => setForm({ ...form, height: text })}
                  keyboardType="numeric"
                  size="$4"
                />
                <Input
                  flex={1}
                  placeholder="Kilo (kg)"
                  value={form.weight}
                  onChangeText={(text) => setForm({ ...form, weight: text })}
                  keyboardType="numeric"
                  size="$4"
                />
              </XStack>

              {/* Meslek */}
              <Input
                placeholder="Meslek"
                value={form.occupation}
                onChangeText={(text) => setForm({ ...form, occupation: text })}
                size="$4"
              />

              {/* Tıbbi Geçmiş */}
              <Input
                placeholder="Geçmiş Rahatsızlıklar / Ameliyatlar"
                value={form.medicalHistory}
                onChangeText={(text) => setForm({ ...form, medicalHistory: text })}
                multiline
                numberOfLines={3}
                size="$4"
              />

              {/* Mevcut İlaçlar */}
              <Input
                placeholder="Kullandığınız İlaçlar"
                value={form.currentMedications}
                onChangeText={(text) => setForm({ ...form, currentMedications: text })}
                multiline
                numberOfLines={3}
                size="$4"
              />

              <Button
                themeInverse
                size="$5"
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Devam Et'}
              </Button>
            </YStack>
          </Form>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Bilgileriniz gizlilik politikamız kapsamında korunmaktadır.
            Daha sonra profilinizden güncelleyebilirsiniz.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 