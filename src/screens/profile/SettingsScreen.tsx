import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Button, Stack, Theme, Switch, Select } from 'tamagui';
import { Bell, Moon, Globe, Shield, ChevronDown, Eye } from '@tamagui/lucide-icons';
import { AccessibilitySettings } from '../../components/settings/AccessibilitySettings';

const notificationSettings = [
  { id: 'exercise', title: 'Egzersiz Hatırlatıcıları', enabled: true },
  { id: 'progress', title: 'İlerleme Bildirimleri', enabled: true },
  { id: 'appointment', title: 'Randevu Hatırlatmaları', enabled: true },
  { id: 'tips', title: 'Günlük İpuçları', enabled: false },
];

const privacySettings = [
  { id: 'profile', title: 'Profil Gizliliği', enabled: true },
  { id: 'activity', title: 'Aktivite Görünürlüğü', enabled: false },
  { id: 'data', title: 'Veri Paylaşımı', enabled: true },
];

export const SettingsScreen = () => {
  const [theme, setTheme] = React.useState('light');
  const [language, setLanguage] = React.useState('tr');

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Bildirim Ayarları */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Bell size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Bildirimler
                </Text>
              </XStack>

              {notificationSettings.map((setting) => (
                <XStack key={setting.id} justifyContent="space-between" alignItems="center">
                  <Text fontSize="$4">{setting.title}</Text>
                  <Switch size="$3" defaultChecked={setting.enabled} />
                </XStack>
              ))}
            </Stack>
          </Card>

          {/* Görünüm Ayarları */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Moon size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Görünüm
                </Text>
              </XStack>

              <Stack space="$2">
                <Text fontSize="$4">Tema</Text>
                <Select
                  value={theme}
                  onValueChange={setTheme}
                >
                  <Select.Trigger iconAfter={ChevronDown}>
                    <Select.Value placeholder="Tema seçin" />
                  </Select.Trigger>

                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Temalar</Select.Label>
                        <Select.Item index={0} value="light">
                          <Select.ItemText>Açık Tema</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={1} value="dark">
                          <Select.ItemText>Koyu Tema</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={2} value="system">
                          <Select.ItemText>Sistem Teması</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </Stack>

              <Stack space="$2">
                <Text fontSize="$4">Dil</Text>
                <Select
                  value={language}
                  onValueChange={setLanguage}
                >
                  <Select.Trigger iconAfter={ChevronDown}>
                    <Select.Value placeholder="Dil seçin" />
                  </Select.Trigger>

                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Diller</Select.Label>
                        <Select.Item index={0} value="tr">
                          <Select.ItemText>Türkçe</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={1} value="en">
                          <Select.ItemText>English</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </Stack>
            </Stack>
          </Card>

          {/* Gizlilik Ayarları */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Shield size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Gizlilik
                </Text>
              </XStack>

              {privacySettings.map((setting) => (
                <XStack key={setting.id} justifyContent="space-between" alignItems="center">
                  <Text fontSize="$4">{setting.title}</Text>
                  <Switch size="$3" defaultChecked={setting.enabled} />
                </XStack>
              ))}

              <Button
                size="$4"
                icon={Shield}
                backgroundColor="$gray5"
                color="$gray11"
              >
                Gizlilik Politikası
              </Button>
            </Stack>
          </Card>

          {/* Erişilebilirlik Ayarları */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Eye size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Erişilebilirlik
                </Text>
              </XStack>
              <AccessibilitySettings />
            </Stack>
          </Card>

          {/* Uygulama Bilgisi */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            PhyExercise v1.0.0
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default SettingsScreen; 