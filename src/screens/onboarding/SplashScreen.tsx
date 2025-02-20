import React, { useEffect } from 'react'
import { YStack, Text, Theme } from 'tamagui'
import { NavigationProp } from '@react-navigation/native'
import { Image } from 'react-native'

type SplashScreenProps = {
  navigation: NavigationProp<any>
}

export const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    // 3 saniye sonra karşılama ekranına yönlendir
    const timer = setTimeout(() => {
      navigation.navigate('Welcome')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <Theme name="light">
      <YStack f={1} backgroundColor="$background" ai="center" jc="center" padding="$4">
        {/* Logo */}
        <YStack marginBottom="$4">
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </YStack>

        {/* Uygulama Adı */}
        <Text
          color="$primary"
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          marginBottom="$2"
        >
          PhyExercise
        </Text>

        {/* Slogan */}
        <Text
          color="$secondary"
          fontSize="$5"
          textAlign="center"
          marginBottom="$4"
        >
          Profesyonel Fizik Tedavi Asistanınız
        </Text>

        {/* Yasal Uyarı */}
        <Text
          color="$gray10"
          fontSize="$2"
          textAlign="center"
          marginTop="$6"
        >
          Bu uygulama profesyonel sağlık hizmeti yerine geçmez.
          Sadece destek amaçlıdır.
        </Text>
      </YStack>
    </Theme>
  )
} 