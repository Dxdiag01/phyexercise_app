import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, XStack, Progress, Separator } from 'tamagui';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, Clock, Activity } from '@tamagui/lucide-icons';

const { width } = Dimensions.get('window');

const ReportCard = styled(Card, {
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

const StatText = styled(Text, {
  fontSize: 16,
  color: '$textMuted',
});

const StatValue = styled(Text, {
  fontSize: 24,
  fontWeight: '700',
  color: '$text',
});

type ReportPeriod = 'weekly' | 'monthly' | 'trend';

export const DetailedReportsScreen = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState<ReportPeriod>('weekly');
  const chartColor = theme.blue10?.get() || '#007AFF';
  const textColor = theme.text?.get() || '#000000';
  const backgroundColor = theme.background?.get() || '#FFFFFF';

  // Bu veriler normalde API'den gelecek
  const weeklyData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [45, 60, 30, 55, 40, 65, 50],
      },
    ],
  };

  const monthlyData = {
    labels: ['1H', '2H', '3H', '4H'],
    datasets: [
      {
        data: [250, 320, 280, 390],
      },
    ],
  };

  const trendData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
    datasets: [
      {
        data: [65, 70, 75, 72, 80, 85],
      },
    ],
  };

  const renderWeeklyReport = () => (
    <Stack space={4}>
      <ReportCard>
        <SectionTitle>Haftalık Aktivite</SectionTitle>
        <BarChart
          data={weeklyData}
          width={width - 64}
          height={220}
          yAxisLabel=""
          yAxisSuffix="dk"
          chartConfig={{
            backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 0,
            color: () => chartColor,
            labelColor: () => textColor,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <XStack justifyContent="space-between" marginTop={8}>
          <Stack>
            <StatText>Toplam Süre</StatText>
            <StatValue>345 dk</StatValue>
          </Stack>
          <Stack>
            <StatText>Ortalama/Gün</StatText>
            <StatValue>49 dk</StatValue>
          </Stack>
        </XStack>
      </ReportCard>

      <ReportCard>
        <SectionTitle>Haftalık Özet</SectionTitle>
        <Stack space={4}>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Tamamlanan Egzersiz</StatText>
            <StatValue>18/21</StatValue>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Başarı Oranı</StatText>
            <StatValue>85%</StatValue>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Ağrı Azalması</StatText>
            <StatValue>30%</StatValue>
          </XStack>
        </Stack>
      </ReportCard>
    </Stack>
  );

  const renderMonthlyReport = () => (
    <Stack space={4}>
      <ReportCard>
        <SectionTitle>Aylık İlerleme</SectionTitle>
        <LineChart
          data={monthlyData}
          width={width - 64}
          height={220}
          chartConfig={{
            backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 0,
            color: () => chartColor,
            labelColor: () => textColor,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: chartColor,
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <XStack justifyContent="space-between" marginTop={8}>
          <Stack>
            <StatText>Toplam Süre</StatText>
            <StatValue>1240 dk</StatValue>
          </Stack>
          <Stack>
            <StatText>Ortalama/Hafta</StatText>
            <StatValue>310 dk</StatValue>
          </Stack>
        </XStack>
      </ReportCard>

      <ReportCard>
        <SectionTitle>Aylık Özet</SectionTitle>
        <Stack space={4}>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Tamamlanan Program</StatText>
            <StatValue>2/3</StatValue>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Düzenlilik Puanı</StatText>
            <StatValue>750</StatValue>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>İyileşme Oranı</StatText>
            <StatValue>45%</StatValue>
          </XStack>
        </Stack>
      </ReportCard>
    </Stack>
  );

  const renderTrendAnalysis = () => (
    <Stack space={4}>
      <ReportCard>
        <SectionTitle>6 Aylık Trend</SectionTitle>
        <LineChart
          data={trendData}
          width={width - 64}
          height={220}
          chartConfig={{
            backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 0,
            color: () => chartColor,
            labelColor: () => textColor,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: chartColor,
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </ReportCard>

      <ReportCard>
        <SectionTitle>Uzun Vadeli İyileşme</SectionTitle>
        <Stack space={4}>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Başlangıç Ağrı Seviyesi</StatText>
            <StatValue>8/10</StatValue>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Mevcut Ağrı Seviyesi</StatText>
            <StatValue>3/10</StatValue>
          </XStack>
          <Separator marginVertical={8} />
          <XStack justifyContent="space-between" alignItems="center">
            <StatText>Toplam İyileşme</StatText>
            <StatValue>62.5%</StatValue>
          </XStack>
        </Stack>
      </ReportCard>
    </Stack>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor }}>
      <Stack space={4} padding={16}>
        {/* Periyot Seçimi */}
        <XStack space={4}>
          <Button
            flex={1}
            icon={Calendar}
            backgroundColor={period === 'weekly' ? '$blue10' : '$gray5'}
            color={period === 'weekly' ? 'white' : '$text'}
            onPress={() => setPeriod('weekly')}
          >
            Haftalık
          </Button>
          <Button
            flex={1}
            icon={Clock}
            backgroundColor={period === 'monthly' ? '$blue10' : '$gray5'}
            color={period === 'monthly' ? 'white' : '$text'}
            onPress={() => setPeriod('monthly')}
          >
            Aylık
          </Button>
          <Button
            flex={1}
            icon={TrendingUp}
            backgroundColor={period === 'trend' ? '$blue10' : '$gray5'}
            color={period === 'trend' ? 'white' : '$text'}
            onPress={() => setPeriod('trend')}
          >
            Trend
          </Button>
        </XStack>

        {/* Seçilen Periyoda Göre Rapor */}
        {period === 'weekly' && renderWeeklyReport()}
        {period === 'monthly' && renderMonthlyReport()}
        {period === 'trend' && renderTrendAnalysis()}
      </Stack>
    </ScrollView>
  );
};

export default DetailedReportsScreen; 