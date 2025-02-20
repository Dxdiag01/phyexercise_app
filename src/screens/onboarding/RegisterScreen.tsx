import { YStack, Text, Theme, Button, Input, Form, ScrollView, XStack } from 'tamagui'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Alert } from 'react-native'

type RegisterScreenProps = {
  navigation: NavigationProp<any>
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async () => {
    try {
      setLoading(true)
      
      // Form validasyonu
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun.')
        return
      }

      if (form.password !== form.confirmPassword) {
        Alert.alert('Hata', 'Şifreler eşleşmiyor.')
        return
      }

      // TODO: Firebase kayıt işlemi burada yapılacak

      // Başarılı kayıt sonrası
      navigation.navigate('RoleSelection')
    } catch (error) {
      Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.')
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
              Hesap Oluştur
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Sağlıklı bir yaşam için ilk adımı atın
            </Text>
          </YStack>

          {/* Form */}
          <Form onSubmit={handleRegister}>
            <YStack space="$4">
              <Input
                placeholder="Ad Soyad"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                autoCapitalize="words"
                size="$4"
              />

              <Input
                placeholder="E-posta"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
                size="$4"
              />

              <Input
                placeholder="Şifre"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry
                size="$4"
              />

              <Input
                placeholder="Şifre Tekrar"
                value={form.confirmPassword}
                onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                secureTextEntry
                size="$4"
              />

              <Button
                themeInverse
                size="$5"
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
              </Button>
            </YStack>
          </Form>

          {/* Giriş Yap Linki */}
          <XStack justifyContent="center" space="$2">
            <Text color="$gray11">Zaten hesabınız var mı?</Text>
            <Text
              color="$primary"
              fontWeight="bold"
              onPress={() => navigation.navigate('Login')}
            >
              Giriş Yap
            </Text>
          </XStack>

          {/* Yasal Uyarı */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$4"
          >
            Kayıt olarak Kullanım Koşulları, Gizlilik Politikası ve KVKK Aydınlatma Metnini kabul etmiş olursunuz.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 