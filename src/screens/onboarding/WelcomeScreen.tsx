import React from 'react';
import { YStack, Text, Button, Theme } from 'tamagui';
import { NavigationProp } from '@react-navigation/native';

type WelcomeScreenProps = {
  navigation: NavigationProp<any>;
};

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <Theme name="light">
      <YStack f={1} backgroundColor="$background" ai="center" jc="center" padding="$4">
        <Text
          color="$primary"
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          marginBottom="$4"
        >
          PhyExercise'e Hoş Geldiniz
        </Text>

        <Text
          color="$secondary"
          fontSize="$5"
          textAlign="center"
          marginBottom="$6"
        >
          Kişiselleştirilmiş fizik tedavi programınızla
          iyileşme yolculuğunuza başlayın
        </Text>

        <Button
          backgroundColor="$blue10"
          color="white"
          size="$5"
          marginBottom="$3"
          onPress={() => navigation.navigate('Login')}
        >
          Giriş Yap
        </Button>

        <Button
          backgroundColor="$blue5"
          color="$blue10"
          size="$5"
          onPress={() => navigation.navigate('Register')}
        >
          Kayıt Ol
        </Button>
      </YStack>
    </Theme>
  );
}; 