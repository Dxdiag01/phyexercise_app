import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Theme, Button, Circle } from 'tamagui';
import { User, Settings, Bell, Lock, HelpCircle, LogOut, ChevronRight } from '@tamagui/lucide-icons';

const profileSections = [
  {
    title: 'Hesap',
    items: [
      { id: 'personal', icon: User, title: 'Kişisel Bilgiler', description: 'Ad, soyad, e-posta', color: '$blue10', bgColor: '$blue2' },
      { id: 'settings', icon: Settings, title: 'Uygulama Ayarları', description: 'Tema, dil, bildirimler', color: '$orange10', bgColor: '$orange2' },
      { id: 'notifications', icon: Bell, title: 'Bildirimler', description: 'Bildirim tercihleri', color: '$purple10', bgColor: '$purple2' }
    ]
  },
  {
    title: 'Gizlilik ve Güvenlik',
    items: [
      { id: 'privacy', icon: Lock, title: 'Gizlilik', description: 'Veri paylaşımı ve izinler', color: '$green10', bgColor: '$green2' },
      { id: 'security', icon: Lock, title: 'Güvenlik', description: 'Şifre ve güvenlik ayarları', color: '$red10', bgColor: '$red2' }
    ]
  },
  {
    title: 'Destek',
    items: [
      { id: 'help', icon: HelpCircle, title: 'Yardım', description: 'SSS ve destek', color: '$yellow10', bgColor: '$yellow2' }
    ]
  }
];

export const ProfileScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Profil Başlığı */}
          <Card bordered padding="$4" backgroundColor="$blue2">
            <XStack space="$4" alignItems="center">
              <Circle size={80} backgroundColor="white">
                <User size={40} color="$blue10" />
              </Circle>
              <YStack flex={1} space="$2">
                <Text fontSize="$6" fontWeight="bold" color="$gray12">
                  Ahmet Yılmaz
                </Text>
                <Text fontSize="$3" color="$gray11">
                  ahmet.yilmaz@email.com
                </Text>
                <Button
                  size="$3"
                  backgroundColor="white"
                  borderColor="$blue10"
                  borderWidth={1}
                  marginTop="$2"
                  pressStyle={{ scale: 0.97 }}
                >
                  <XStack space="$2" alignItems="center">
                    <User size={16} color="$blue10" />
                    <Text color="$blue10">Profili Düzenle</Text>
                  </XStack>
                </Button>
              </YStack>
            </XStack>
          </Card>

          {/* Profil Bölümleri */}
          {profileSections.map((section) => (
            <YStack key={section.title} space="$3">
              <Text fontSize="$4" fontWeight="bold" color="$gray11" marginLeft="$2">
                {section.title}
              </Text>

              <Card bordered backgroundColor="$background">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <YStack key={item.id}>
                      <Card
                        padding="$4"
                        pressStyle={{ scale: 0.98 }}
                        backgroundColor="$background"
                      >
                        <XStack space="$3" alignItems="center">
                          <Card padding="$2" borderRadius="$4" backgroundColor={item.bgColor}>
                            <Icon size={24} color={item.color} />
                          </Card>
                          <YStack flex={1}>
                            <Text fontSize="$4" fontWeight="bold" color="$gray12">
                              {item.title}
                            </Text>
                            <Text fontSize="$3" color="$gray11">
                              {item.description}
                            </Text>
                          </YStack>
                          <ChevronRight size={20} color="$gray11" />
                        </XStack>
                      </Card>
                      {index < section.items.length - 1 && (
                        <Card backgroundColor="$gray5" height={1} marginHorizontal="$4" />
                      )}
                    </YStack>
                  );
                })}
              </Card>
            </YStack>
          ))}

          {/* Çıkış Yap */}
          <Button
            size="$4"
            backgroundColor="$red2"
            borderColor="$red10"
            borderWidth={1}
            pressStyle={{ scale: 0.97 }}
            marginTop="$4"
          >
            <XStack space="$2" alignItems="center" justifyContent="center">
              <LogOut size={20} color="$red10" />
              <Text color="$red10" fontWeight="bold">
                Çıkış Yap
              </Text>
            </XStack>
          </Button>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default ProfileScreen; 