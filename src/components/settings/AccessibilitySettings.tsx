import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Switch, Slider, Select, Button, Theme } from 'tamagui';
import { Eye, Type, Zap, Volume2, ChevronDown } from '@tamagui/lucide-icons';

export const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = React.useState(100);
  const [contrast, setContrast] = React.useState('normal');
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} padding="$4" space="$4">
          {/* Görsel Ayarlar */}
          <Card bordered padding="$4">
            <YStack space="$4">
              <XStack alignItems="center" space="$2">
                <Eye size={24} color="$blue10" />
                <Text fontSize={24} fontWeight="bold">
                  Görsel Ayarlar
                </Text>
              </XStack>

              {/* Yazı Boyutu */}
              <YStack space="$2">
                <Text fontSize="$4">Yazı Boyutu ({fontSize}%)</Text>
                <Slider
                  value={[fontSize]}
                  min={75}
                  max={200}
                  step={25}
                  onValueChange={([value]) => setFontSize(value)}
                >
                  <Slider.Track>
                    <Slider.TrackActive backgroundColor="$blue10" />
                  </Slider.Track>
                  <Slider.Thumb index={0} circular size="$4" />
                </Slider>
              </YStack>

              {/* Kontrast */}
              <YStack space="$2">
                <Text fontSize="$4">Kontrast</Text>
                <Select
                  value={contrast}
                  onValueChange={setContrast}
                >
                  <Select.Trigger iconAfter={ChevronDown}>
                    <Select.Value placeholder="Kontrast seçin" />
                  </Select.Trigger>

                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Kontrast Seçenekleri</Select.Label>
                        <Select.Item index={0} value="normal">
                          <Select.ItemText>Normal</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={1} value="high">
                          <Select.ItemText>Yüksek Kontrast</Select.ItemText>
                        </Select.Item>
                        <Select.Item index={2} value="low">
                          <Select.ItemText>Düşük Kontrast</Select.ItemText>
                        </Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>
            </YStack>
          </Card>

          {/* Hareket ve Animasyon */}
          <Card bordered padding="$4">
            <YStack space="$4">
              <XStack alignItems="center" space="$2">
                <Zap size={24} color="$blue10" />
                <Text fontSize={24} fontWeight="bold">
                  Hareket ve Animasyon
                </Text>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$4">Hareketi Azalt</Text>
                <Switch
                  size="$4"
                  checked={reduceMotion}
                  onCheckedChange={setReduceMotion}
                />
              </XStack>
            </YStack>
          </Card>

          {/* Ekran Okuyucu */}
          <Card bordered padding="$4">
            <YStack space="$4">
              <XStack alignItems="center" space="$2">
                <Volume2 size={24} color="$blue10" />
                <Text fontSize={24} fontWeight="bold">
                  Ekran Okuyucu
                </Text>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$4">VoiceOver/TalkBack</Text>
                <Switch
                  size="$4"
                  checked={screenReader}
                  onCheckedChange={setScreenReader}
                />
              </XStack>

              <Button
                size="$4"
                backgroundColor="$gray5"
                color="$gray11"
                onPress={() => {/* Ekran okuyucu eğitimi */}}
              >
                Ekran Okuyucu Eğitimi
              </Button>
            </YStack>
          </Card>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Bu ayarlar cihazınızın sistem ayarlarıyla senkronize çalışır.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default AccessibilitySettings; 