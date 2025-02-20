import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { YStack, Text, Card, XStack, Button, Theme } from 'tamagui';
import { performanceMonitor } from '../../utils/performanceMonitor';
import { Clock, RefreshCw, Trash2 } from '@tamagui/lucide-icons';

interface MetricSummary {
  type: string;
  count: number;
  averageTime: number;
  totalTime: number;
}

export const PerformanceDebugScreen = () => {
  const [metrics, setMetrics] = useState<MetricSummary[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const calculateMetrics = () => {
    const allMetrics = performanceMonitor.getMetrics();
    const types = ['render', 'api', 'load', 'interaction'];

    const summaries = types.map(type => {
      const typeMetrics = allMetrics.filter(m => m.type === type);
      const totalTime = typeMetrics.reduce((sum, m) => sum + m.duration, 0);
      
      return {
        type,
        count: typeMetrics.length,
        averageTime: typeMetrics.length ? totalTime / typeMetrics.length : 0,
        totalTime
      };
    });

    setMetrics(summaries);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    calculateMetrics();
    setRefreshing(false);
  };

  const clearMetrics = () => {
    performanceMonitor.clearMetrics();
    calculateMetrics();
  };

  useEffect(() => {
    calculateMetrics();
  }, []);

  const formatTime = (ms: number) => {
    return `${ms.toFixed(2)}ms`;
  };

  const getMetricColor = (averageTime: number) => {
    if (averageTime < 100) return '$green10';
    if (averageTime < 300) return '$yellow10';
    return '$red10';
  };

  return (
    <Theme name="light">
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding="$4" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={24} fontWeight="bold">
              Performans Metrikleri
            </Text>
            <Button
              icon={Trash2}
              size="$3"
              variant="outlined"
              onPress={clearMetrics}
            >
              Temizle
            </Button>
          </XStack>

          {metrics.map((metric) => (
            <Card key={metric.type} bordered padding="$4">
              <YStack space="$2">
                <Text fontSize="$5" fontWeight="bold" textTransform="capitalize">
                  {metric.type}
                </Text>

                <XStack space="$4" flexWrap="wrap">
                  <YStack space="$1" flex={1}>
                    <Text fontSize="$2" color="$gray11">
                      İşlem Sayısı
                    </Text>
                    <Text fontSize="$4" color="$blue10">
                      {metric.count}
                    </Text>
                  </YStack>

                  <YStack space="$1" flex={1}>
                    <Text fontSize="$2" color="$gray11">
                      Ortalama Süre
                    </Text>
                    <Text
                      fontSize="$4"
                      color={getMetricColor(metric.averageTime)}
                    >
                      {formatTime(metric.averageTime)}
                    </Text>
                  </YStack>

                  <YStack space="$1" flex={1}>
                    <Text fontSize="$2" color="$gray11">
                      Toplam Süre
                    </Text>
                    <Text fontSize="$4" color="$gray11">
                      {formatTime(metric.totalTime)}
                    </Text>
                  </YStack>
                </XStack>
              </YStack>
            </Card>
          ))}

          <Text fontSize="$2" color="$gray11" textAlign="center">
            Son güncelleme: {new Date().toLocaleTimeString()}
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default PerformanceDebugScreen; 