import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, XStack, Progress, Sheet, Input, Select } from 'tamagui';
import { Target, Check, Plus, ChevronDown, Calendar, Clock, Activity } from '@tamagui/lucide-icons';

const GoalCard = styled(Card, {
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

const GoalTitle = styled(Text, {
  fontSize: 16,
  fontWeight: '500',
  color: '$text',
});

const GoalDescription = styled(Text, {
  fontSize: 14,
  color: '$textMuted',
});

const DateText = styled(Text, {
  fontSize: 12,
  color: '$textMuted',
});

export const GoalsScreen = () => {
  const theme = useTheme();
  const [showNewGoalSheet, setShowNewGoalSheet] = useState(false);
  const [goalType, setGoalType] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDuration, setGoalDuration] = useState('');

  // Bu veriler normalde API'den gelecek
  const activeGoals = [
    {
      id: 1,
      title: 'Günlük Egzersiz',
      description: 'Her gün en az 30 dakika egzersiz yap',
      progress: 70,
      deadline: '2 gün kaldı',
      type: 'daily',
    },
    {
      id: 2,
      title: 'Ağrı Seviyesi',
      description: 'Ağrı seviyesini 3 puan azalt',
      progress: 45,
      deadline: '1 hafta kaldı',
      type: 'pain',
    },
  ];

  const completedGoals = [
    {
      id: 3,
      title: 'Form Geliştirme',
      description: '10 egzersizde mükemmel form yakala',
      completedDate: '2 gün önce',
      type: 'form',
    },
    {
      id: 4,
      title: 'Düzenli Program',
      description: '7 gün üst üste programı tamamla',
      completedDate: '1 hafta önce',
      type: 'streak',
    },
  ];

  const renderActiveGoals = () => (
    <Stack space={4}>
      <SectionTitle>Aktif Hedefler</SectionTitle>
      {activeGoals.map((goal) => (
        <GoalCard key={goal.id} pressStyle={{ scale: 0.98 }}>
          <Stack space={2}>
            <XStack justifyContent="space-between" alignItems="center">
              <GoalTitle>{goal.title}</GoalTitle>
              <DateText>{goal.deadline}</DateText>
            </XStack>
            <GoalDescription>{goal.description}</GoalDescription>
            <Progress value={goal.progress} marginTop={8}>
              <Progress.Indicator backgroundColor="$blue10" />
            </Progress>
            <XStack justifyContent="space-between" alignItems="center" marginTop={4}>
              <Text color="$textMuted">İlerleme: %{goal.progress}</Text>
              <Button size="$2" chromeless backgroundColor="$gray5">İptal Et</Button>
            </XStack>
          </Stack>
        </GoalCard>
      ))}
    </Stack>
  );

  const renderCompletedGoals = () => (
    <Stack space={4}>
      <SectionTitle>Tamamlanan Hedefler</SectionTitle>
      {completedGoals.map((goal) => (
        <GoalCard key={goal.id} backgroundColor="$green2">
          <Stack space={2}>
            <XStack justifyContent="space-between" alignItems="center">
              <GoalTitle>{goal.title}</GoalTitle>
              <Check color={theme.green10?.get()} />
            </XStack>
            <GoalDescription>{goal.description}</GoalDescription>
            <DateText marginTop={4}>Tamamlandı: {goal.completedDate}</DateText>
          </Stack>
        </GoalCard>
      ))}
    </Stack>
  );

  const renderNewGoalSheet = () => (
    <Sheet
      modal
      open={showNewGoalSheet}
      onOpenChange={setShowNewGoalSheet}
      snapPoints={[50]}
      dismissOnSnapToBottom
      position={0}
    >
      <Sheet.Overlay />
      <Sheet.Frame padding="$4">
        <Sheet.Handle />
        <Stack space={4}>
          <SectionTitle>Yeni Hedef Oluştur</SectionTitle>
          
          <Stack space={2}>
            <Text>Hedef Tipi</Text>
            <Select
              value={goalType}
              onValueChange={setGoalType}
            >
              <Select.Trigger iconAfter={ChevronDown}>
                <Select.Value placeholder="Hedef tipini seçin" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Item index={0} value="daily">
                      <Select.ItemText>Günlük Egzersiz</Select.ItemText>
                    </Select.Item>
                    <Select.Item index={1} value="pain">
                      <Select.ItemText>Ağrı Seviyesi</Select.ItemText>
                    </Select.Item>
                    <Select.Item index={2} value="form">
                      <Select.ItemText>Form Geliştirme</Select.ItemText>
                    </Select.Item>
                    <Select.Item index={3} value="streak">
                      <Select.ItemText>Düzenli Program</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </Stack>

          <Stack space={2}>
            <Text>Hedef Değeri</Text>
            <Input
              value={goalTarget}
              onChangeText={setGoalTarget}
              placeholder="Örn: 30 dakika, 5 puan azalma"
            />
          </Stack>

          <Stack space={2}>
            <Text>Süre</Text>
            <Input
              value={goalDuration}
              onChangeText={setGoalDuration}
              placeholder="Örn: 1 hafta, 30 gün"
            />
          </Stack>

          <Button
            backgroundColor="$blue10"
            color="white"
            size="$4"
            onPress={() => setShowNewGoalSheet(false)}
          >
            Hedef Oluştur
          </Button>
        </Stack>
      </Sheet.Frame>
    </Sheet>
  );

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
        <Stack space={4} padding={16}>
          {renderActiveGoals()}
          {renderCompletedGoals()}
        </Stack>
      </ScrollView>

      <Button
        position="absolute"
        bottom={16}
        right={16}
        size="$5"
        circular
        icon={Plus}
        backgroundColor="$blue10"
        onPress={() => setShowNewGoalSheet(true)}
      />

      {renderNewGoalSheet()}
    </>
  );
};

export default GoalsScreen; 