import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Button, Avatar, Input, Stack, Theme } from 'tamagui';
import { User, Mail, Phone, Calendar, Weight, Ruler, Edit3 } from '@tamagui/lucide-icons';

// Örnek kullanıcı verileri
const userData = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  phone: '+90 555 123 4567',
  birthDate: '01.01.1980',
  weight: '75',
  height: '175',
  memberSince: '2024',
  programProgress: '85%',
  completedExercises: 45,
};

export const PersonalInfoScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleSave = () => {
    // TODO: API'ye kaydet
    setIsEditing(false);
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Profil Fotoğrafı ve Temel Bilgiler */}
          <Card bordered padding="$4">
            <YStack space="$4" alignItems="center">
              <Avatar circular size="$12">
                <Avatar.Image source={require('../../assets/profile-photo.png')} />
                <Avatar.Fallback backgroundColor="$blue5">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </Avatar.Fallback>
              </Avatar>

              <Button
                size="$3"
                icon={Edit3}
                chromeless
                onPress={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'İptal Et' : 'Düzenle'}
              </Button>
            </YStack>
          </Card>

          {/* Kişisel Bilgiler Formu */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <Text fontSize="$6" fontWeight="bold">
                Kişisel Bilgiler
              </Text>

              {/* İsim */}
              <Stack space="$2">
                <Text fontSize="$3" color="$gray11">Ad Soyad</Text>
                <XStack alignItems="center" space="$2">
                  <User size={20} color="$gray11" />
                  <Input
                    flex={1}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    disabled={!isEditing}
                  />
                </XStack>
              </Stack>

              {/* Email */}
              <Stack space="$2">
                <Text fontSize="$3" color="$gray11">E-posta</Text>
                <XStack alignItems="center" space="$2">
                  <Mail size={20} color="$gray11" />
                  <Input
                    flex={1}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    disabled={!isEditing}
                    keyboardType="email-address"
                  />
                </XStack>
              </Stack>

              {/* Telefon */}
              <Stack space="$2">
                <Text fontSize="$3" color="$gray11">Telefon</Text>
                <XStack alignItems="center" space="$2">
                  <Phone size={20} color="$gray11" />
                  <Input
                    flex={1}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    disabled={!isEditing}
                    keyboardType="phone-pad"
                  />
                </XStack>
              </Stack>

              {/* Doğum Tarihi */}
              <Stack space="$2">
                <Text fontSize="$3" color="$gray11">Doğum Tarihi</Text>
                <XStack alignItems="center" space="$2">
                  <Calendar size={20} color="$gray11" />
                  <Input
                    flex={1}
                    value={formData.birthDate}
                    onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
                    disabled={!isEditing}
                  />
                </XStack>
              </Stack>

              {/* Boy ve Kilo */}
              <XStack space="$4">
                <Stack flex={1} space="$2">
                  <Text fontSize="$3" color="$gray11">Boy (cm)</Text>
                  <XStack alignItems="center" space="$2">
                    <Ruler size={20} color="$gray11" />
                    <Input
                      flex={1}
                      value={formData.height}
                      onChangeText={(text) => setFormData({ ...formData, height: text })}
                      disabled={!isEditing}
                      keyboardType="numeric"
                    />
                  </XStack>
                </Stack>
                <Stack flex={1} space="$2">
                  <Text fontSize="$3" color="$gray11">Kilo (kg)</Text>
                  <XStack alignItems="center" space="$2">
                    <Weight size={20} color="$gray11" />
                    <Input
                      flex={1}
                      value={formData.weight}
                      onChangeText={(text) => setFormData({ ...formData, weight: text })}
                      disabled={!isEditing}
                      keyboardType="numeric"
                    />
                  </XStack>
                </Stack>
              </XStack>

              {isEditing && (
                <Button
                  size="$4"
                  themeInverse
                  onPress={handleSave}
                  marginTop="$2"
                >
                  Değişiklikleri Kaydet
                </Button>
              )}
            </Stack>
          </Card>

          {/* İstatistikler */}
          <Card bordered padding="$4">
            <Text fontSize="$6" fontWeight="bold" marginBottom="$4">
              İstatistikler
            </Text>
            <XStack justifyContent="space-around">
              <YStack alignItems="center" space="$2">
                <Text fontSize="$6" fontWeight="bold" color="$blue10">
                  {userData.programProgress}
                </Text>
                <Text fontSize="$3" color="$gray11">
                  Program İlerlemesi
                </Text>
              </YStack>

              <YStack alignItems="center" space="$2">
                <Text fontSize="$6" fontWeight="bold" color="$blue10">
                  {userData.completedExercises}
                </Text>
                <Text fontSize="$3" color="$gray11">
                  Tamamlanan Egzersiz
                </Text>
              </YStack>
            </XStack>
          </Card>

          {/* Üyelik Bilgisi */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            {userData.memberSince} yılından beri üye
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default PersonalInfoScreen; 