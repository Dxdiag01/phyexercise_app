import React, { useState } from 'react';
import { YStack, Text, Button, Input, Theme } from 'tamagui';
import { NavigationProp } from '@react-navigation/native';

type LoginScreenProps = {
  navigation: NavigationProp<any>;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Firebase entegrasyonu eklenecek
    // Şimdilik direkt ana ekrana yönlendir
    navigation.navigate('MainTabs');
  };

  return (
    <Theme name="light">
      <YStack f={1} backgroundColor="$background" ai="center" jc="center" padding="$4" space="$4">
        <Text
          color="$primary"
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          marginBottom="$4"
        >
          Giriş Yap
        </Text>

        <Input
          size="$4"
          width={300}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          size="$4"
          width={300}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          backgroundColor="$blue10"
          color="white"
          size="$4"
          width={300}
          onPress={handleLogin}
        >
          Giriş Yap
        </Button>

        <Button
          backgroundColor="$blue5"
          color="$blue10"
          size="$4"
          width={300}
          onPress={() => navigation.navigate('Register')}
        >
          Hesabın yok mu? Kayıt ol
        </Button>

        <Button
          backgroundColor="transparent"
          color="$gray10"
          size="$3"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Şifremi Unuttum
        </Button>
      </YStack>
    </Theme>
  );
}; 