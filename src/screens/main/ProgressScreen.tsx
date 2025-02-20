import React from 'react';
import { ScrollView } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, XStack, Progress } from 'tamagui';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Trophy, Calendar, Target, TrendingUp, Award, Clock } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { YStack, Theme } from 'tamagui';

const { width } = Dimensions.get('window');

const OverviewCard = styled(Card, {
  marginVertical: 8,
  padding: 16,
  borderRadius: 12,
  backgroundColor: '$background',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
});

const SectionTitle = styled(Text, {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 8,
  color: '$text',
});

const StatCard = styled(Card, {
  flex: 1,
  padding: 12,
  borderRadius: 8,
  backgroundColor: '$backgroundHover',
});

const StatValue = styled(Text, {
  fontSize: 24,
  fontWeight: '700',
  color: '$text',
  marginTop: 4,
});

const StatLabel = styled(Text, {
  fontSize: 14,
  color: '$textMuted',
});

const weeklyProgress = [
  { day: 'Pzt', completed: 3, total: 3 },
  { day: 'Sal', completed: 2, total: 3 },
  { day: 'Çar', completed: 3, total: 3 },
  { day: 'Per', completed: 1, total: 3 },
  { day: 'Cum', completed: 2, total: 3 },
  { day: 'Cmt', completed: 0, total: 2 },
  { day: 'Paz', completed: 0, total: 2 }
];

const goals = [
  {
    id: 1,
    title: 'Günlük Egzersiz',
    description: 'Her gün en az 30 dakika egzersiz yap',
    progress: 70,
    icon: Calendar
  },
  {
    id: 2,
    title: 'Haftalık Hedef',
    description: '5 gün egzersiz programını tamamla',
    progress: 60,
    icon: Target
  },
  {
    id: 3,
    title: 'Aylık Başarı',
    description: '20 gün düzenli egzersiz yap',
    progress: 45,
    icon: Award
  }
];

export const ProgressScreen = () => {
  const theme = useTheme();
  const chartColor = theme.blue10?.get() || '#007AFF';
  const textColor = theme.text?.get() || '#000000';
  const backgroundColor = theme.background?.get() || '#FFFFFF';

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Bu veriler normalde API'den gelecek
  const painData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [7, 6, 5, 4, 3, 4, 3],
      },
    ],
  };

  const exerciseStats = {
    weeklyCompletionRate: 85,
    totalMinutes: 420,
    totalSessions: 12,
  };

  const achievements = [
    { id: 1, title: '7 Gün Streak', progress: 5, total: 7 },
    { id: 2, title: 'Form Ustası', progress: 8, total: 10 },
    { id: 3, title: 'Düzenli Sporcu', progress: 12, total: 20 },
  ];

  const handleNavigate = (screen: 'DetailedReports' | 'Goals') => {
    navigation.navigate(screen);
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Haftalık İlerleme */}
          <Card bordered padding="$4" space="$4">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$4">
              Haftalık İlerleme
            </Text>

            <YStack space="$4">
              <XStack space="$2" height={160} alignItems="flex-end">
                {weeklyProgress.map((day) => (
                  <YStack
                    key={day.day}
                    flex={1}
                    space="$2"
                    alignItems="center"
                  >
                    <YStack
                      height={120 * (day.completed / day.total)}
                      width={40}
                      backgroundColor={day.completed > 0 ? '$blue10' : '$gray5'}
                      borderRadius="$4"
                    />
                    <Text fontSize="$2" color="$gray11">
                      {day.day}
                    </Text>
                    <Text fontSize="$2" color="$gray11">
                      {day.completed}/{day.total}
                    </Text>
                  </YStack>
                ))}
              </XStack>
            </YStack>
          </Card>

          {/* Hedefler */}
          <Text fontSize="$5" fontWeight="bold" marginTop="$2" marginBottom="$2">
            Hedefler
          </Text>

          <YStack space="$3">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <Card key={goal.id} bordered padding="$4" space="$3">
                  <XStack space="$3" alignItems="center">
                    <Card
                      backgroundColor={goal.progress >= 70 ? '$green2' : '$blue2'}
                      padding="$2"
                      borderRadius="$4"
                    >
                      <Icon
                        size={24}
                        color={goal.progress >= 70 ? '$green10' : '$blue10'}
                      />
                    </Card>
                    <YStack flex={1} space="$2">
                      <Text fontSize="$4" fontWeight="bold">
                        {goal.title}
                      </Text>
                      <Text fontSize="$3" color="$gray11">
                        {goal.description}
                      </Text>
                      <Progress
                        value={goal.progress}
                        backgroundColor="$gray5"
                      >
                        <Progress.Indicator
                          backgroundColor={goal.progress >= 70 ? '$green10' : '$blue10'}
                        />
                      </Progress>
                      <Text fontSize="$3" color="$gray11" textAlign="right">
                        %{goal.progress} tamamlandı
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              );
            })}
          </YStack>

          {/* Toplam İstatistikler */}
          <Card bordered padding="$4" space="$4" backgroundColor="$blue2" marginTop="$2">
            <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
              Toplam İstatistikler
            </Text>

            <XStack space="$4" flexWrap="wrap">
              <Card bordered flex={1} padding="$3" space="$2">
                <Clock size={24} color="$blue10" />
                <Text fontSize="$3" color="$gray11">Toplam Süre</Text>
                <Text fontSize="$5" fontWeight="bold">420 dk</Text>
              </Card>

              <Card bordered flex={1} padding="$3" space="$2">
                <Award size={24} color="$blue10" />
                <Text fontSize="$3" color="$gray11">Başarı Puanı</Text>
                <Text fontSize="$5" fontWeight="bold">850</Text>
              </Card>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default ProgressScreen; 