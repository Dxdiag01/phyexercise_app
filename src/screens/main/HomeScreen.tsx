import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Theme, Button } from 'tamagui';
import { Activity, Calendar, Clock, Trophy, Star } from '@tamagui/lucide-icons';

export const HomeScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Karşılama Mesajı */}
          <YStack space="$2">
            <Text fontSize={24} fontWeight="bold">
              Merhaba, Ahmet 👋
            </Text>
            <Text fontSize="$4" color="$gray11">
              Bugün nasıl hissediyorsun?
            </Text>
          </YStack>

          {/* Günlük Özet */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              Günlük Özet
            </Text>
            
            <XStack space="$4" flexWrap="wrap">
              <Card bordered flex={1} padding="$3" space="$2" backgroundColor="$blue2">
                <Clock size={24} color="$blue10" />
                <Text fontSize="$3" color="$gray11">Bugünkü Süre</Text>
                <Text fontSize="$5" fontWeight="bold">45 dk</Text>
              </Card>

              <Card bordered flex={1} padding="$3" space="$2" backgroundColor="$green2">
                <Calendar size={24} color="$green10" />
                <Text fontSize="$3" color="$gray11">Egzersiz Sayısı</Text>
                <Text fontSize="$5" fontWeight="bold">3/5</Text>
              </Card>
            </XStack>
          </Card>

          {/* Bugünkü Egzersizler */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              Bugünkü Egzersizler
            </Text>

            <YStack space="$3">
              <Card bordered padding="$3" pressStyle={{ scale: 0.98 }}>
                <XStack space="$3" alignItems="center">
                  <Activity size={24} color="$blue10" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">Boyun Germe</Text>
                    <Text fontSize="$3" color="$gray11">15 dakika • 3 set</Text>
                  </YStack>
                  <Button size="$3" themeInverse>Başla</Button>
                </XStack>
              </Card>

              <Card bordered padding="$3" pressStyle={{ scale: 0.98 }}>
                <XStack space="$3" alignItems="center">
                  <Activity size={24} color="$blue10" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">Omuz Egzersizi</Text>
                    <Text fontSize="$3" color="$gray11">20 dakika • 4 set</Text>
                  </YStack>
                  <Button size="$3" themeInverse>Başla</Button>
                </XStack>
              </Card>
            </YStack>
          </Card>

          {/* Son Aktiviteler */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              Son Aktiviteler
            </Text>

            {/* Tamamlanan Egzersizler */}
            <YStack space="$3">
              <Card bordered padding="$3">
                <XStack space="$3" alignItems="center">
                  <Activity size={24} color="$success" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">Boyun Germe Egzersizi</Text>
                    <Text fontSize="$3" color="$gray11">2 saat önce tamamlandı</Text>
                  </YStack>
                </XStack>
              </Card>
            </YStack>

            {/* Başarı Rozetleri */}
            <YStack space="$3" marginTop="$4">
              <Card bordered padding="$3" backgroundColor="$yellow2">
                <XStack space="$3" alignItems="center">
                  <Trophy size={24} color="$yellow10" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">Yeni Rozet Kazanıldı!</Text>
                    <Text fontSize="$3" color="$gray11">3 gün üst üste egzersiz yaptın</Text>
                  </YStack>
                </XStack>
              </Card>
            </YStack>

            {/* İstatistikler */}
            <YStack space="$3" marginTop="$4">
              <Card bordered padding="$3" backgroundColor="$blue2">
                <XStack space="$3" alignItems="center">
                  <Star size={24} color="$blue10" />
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight="bold">Haftalık Hedef</Text>
                    <Text fontSize="$3" color="$gray11">%85 tamamlandı - 2 egzersiz kaldı</Text>
                  </YStack>
                </XStack>
              </Card>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default HomeScreen; 