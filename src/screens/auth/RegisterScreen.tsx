import React, { useState } from 'react';
import { YStack, Text, Button, Input, Theme } from 'tamagui';
import { NavigationProp } from '@react-navigation/native';

type RegisterScreenProps = {
  navigation: NavigationProp<any>;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // TODO: Firebase entegrasyonu eklenecek
    // Şimdilik direkt giriş ekranına yönlendir
    navigation.navigate('Login');
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
          Kayıt Ol
        </Text>

        <Input
          size="$4"
          width={300}
          placeholder="Ad Soyad"
          value={name}
          onChangeText={setName}
        />

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

        <Input
          size="$4"
          width={300}
          placeholder="Şifre Tekrar"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          backgroundColor="$blue10"
          color="white"
          size="$4"
          width={300}
          onPress={handleRegister}
        >
          Kayıt Ol
        </Button>

        <Button
          backgroundColor="$blue5"
          color="$blue10"
          size="$4"
          width={300}
          onPress={() => navigation.navigate('Login')}
        >
          Zaten hesabın var mı? Giriş yap
        </Button>
      </YStack>
    </Theme>
  );
}; 