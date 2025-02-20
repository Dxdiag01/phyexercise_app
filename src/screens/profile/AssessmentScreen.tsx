import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Button, Stack, Theme, Progress, Select } from 'tamagui';
import { Activity, AlertTriangle, ChevronDown, Target, Thermometer } from '@tamagui/lucide-icons';

const symptoms = [
  { id: 'pain', title: 'Ağrı', level: 7, trend: 'decreasing' },
  { id: 'stiffness', title: 'Sertlik', level: 5, trend: 'stable' },
  { id: 'mobility', title: 'Hareket Kısıtlılığı', level: 4, trend: 'improving' },
];

const riskFactors = [
  { id: 'posture', title: 'Duruş Bozukluğu', risk: 'high' },
  { id: 'activity', title: 'Fiziksel Aktivite', risk: 'medium' },
  { id: 'weight', title: 'Kilo', risk: 'low' },
];

const relatedConditions = [
  { id: 'muscle', title: 'Kas Dengesizliği', status: 'active' },
  { id: 'joint', title: 'Eklem Kısıtlılığı', status: 'monitoring' },
  { id: 'nerve', title: 'Sinir Sıkışması', status: 'resolved' },
];

export const AssessmentScreen = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return '$red10';
      case 'medium':
        return '$yellow10';
      case 'low':
        return '$green10';
      default:
        return '$gray10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '$red10';
      case 'monitoring':
        return '$yellow10';
      case 'resolved':
        return '$green10';
      default:
        return '$gray10';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'decreasing':
        return '↓';
      case 'increasing':
        return '↑';
      case 'stable':
        return '→';
      case 'improving':
        return '↑';
      default:
        return '-';
    }
  };

  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Vücut Bölgesi Seçimi */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <Text fontSize="$6" fontWeight="bold">
                Vücut Bölgesi
              </Text>
              <Select
                value={selectedBodyPart}
                onValueChange={setSelectedBodyPart}
              >
                <Select.Trigger iconAfter={ChevronDown}>
                  <Select.Value placeholder="Vücut bölgesi seçin" />
                </Select.Trigger>

                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    <Select.Group>
                      <Select.Label>Bölgeler</Select.Label>
                      <Select.Item index={0} value="neck">
                        <Select.ItemText>Boyun</Select.ItemText>
                      </Select.Item>
                      <Select.Item index={1} value="back">
                        <Select.ItemText>Bel</Select.ItemText>
                      </Select.Item>
                      <Select.Item index={2} value="shoulder">
                        <Select.ItemText>Omuz</Select.ItemText>
                      </Select.Item>
                      <Select.Item index={3} value="knee">
                        <Select.ItemText>Diz</Select.ItemText>
                      </Select.Item>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </Stack>
          </Card>

          {/* Semptom Değerlendirme */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Thermometer size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Semptom Değerlendirme
                </Text>
              </XStack>

              {symptoms.map((symptom) => (
                <Stack key={symptom.id} space="$2">
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="$4">{symptom.title}</Text>
                    <XStack space="$2" alignItems="center">
                      <Text fontSize="$4" color="$gray11">
                        {symptom.level}/10
                      </Text>
                      <Text fontSize="$4" color="$blue10">
                        {getTrendIcon(symptom.trend)}
                      </Text>
                    </XStack>
                  </XStack>
                  <Progress value={symptom.level * 10}>
                    <Progress.Indicator backgroundColor="$blue10" />
                  </Progress>
                </Stack>
              ))}
            </Stack>
          </Card>

          {/* Risk Faktörleri */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <AlertTriangle size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Risk Faktörleri
                </Text>
              </XStack>

              {riskFactors.map((factor) => (
                <XStack key={factor.id} justifyContent="space-between" alignItems="center">
                  <Text fontSize="$4">{factor.title}</Text>
                  <Text
                    fontSize="$3"
                    color={getRiskColor(factor.risk)}
                    backgroundColor={`${getRiskColor(factor.risk)}Light`}
                    padding="$2"
                    borderRadius="$2"
                  >
                    {factor.risk.toUpperCase()}
                  </Text>
                </XStack>
              ))}
            </Stack>
          </Card>

          {/* İlişkili Durumlar */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Activity size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  İlişkili Durumlar
                </Text>
              </XStack>

              {relatedConditions.map((condition) => (
                <XStack key={condition.id} justifyContent="space-between" alignItems="center">
                  <Text fontSize="$4">{condition.title}</Text>
                  <Text
                    fontSize="$3"
                    color={getStatusColor(condition.status)}
                    backgroundColor={`${getStatusColor(condition.status)}Light`}
                    padding="$2"
                    borderRadius="$2"
                  >
                    {condition.status.toUpperCase()}
                  </Text>
                </XStack>
              ))}
            </Stack>
          </Card>

          {/* Hedefler */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <Target size={24} color="$blue10" />
                <Text fontSize="$6" fontWeight="bold">
                  Tedavi Hedefleri
                </Text>
              </XStack>

              <Button size="$4" themeInverse>
                Yeni Hedef Belirle
              </Button>
            </Stack>
          </Card>

          {/* Bilgilendirme */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            Bu değerlendirme sonuçları uzman kontrolünde güncellenmelidir.
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default AssessmentScreen; 