import { YStack, Text, Theme, Button, Input, Form, ScrollView, XStack } from 'tamagui'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Alert } from 'react-native'

type LoginScreenProps = {
  navigation: NavigationProp<any>
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      setLoading(true)
      
      // Form validasyonu
      if (!form.email || !form.password) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun.')
        return
      }

      // TODO: Firebase giriş işlemi burada yapılacak

      // Başarılı giriş sonrası
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert('Hata', 'Giriş sırasında bir hata oluştu.')
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
              Hoş Geldiniz
            </Text>
            <Text
              color="$gray11"
              fontSize="$4"
              textAlign="center"
            >
              Sağlıklı yaşam yolculuğunuza devam edin
            </Text>
          </YStack>

          {/* Form */}
          <Form onSubmit={handleLogin}>
            <YStack space="$4">
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

              <Button
                themeInverse
                size="$5"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </YStack>
          </Form>

          {/* Şifremi Unuttum */}
          <Text
            color="$primary"
            fontSize="$3"
            textAlign="center"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Şifremi Unuttum
          </Text>

          {/* Kayıt Ol Linki */}
          <XStack justifyContent="center" space="$2">
            <Text color="$gray11">Hesabınız yok mu?</Text>
            <Text
              color="$primary"
              fontWeight="bold"
              onPress={() => navigation.navigate('Register')}
            >
              Kayıt Ol
            </Text>
          </XStack>

          {/* Yasal Uyarı */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$4"
          >
            Giriş yaparak Kullanım Koşulları ve Gizlilik Politikasını kabul etmiş olursunuz.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  )
} 