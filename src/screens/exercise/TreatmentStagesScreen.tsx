import React from 'react';
import { ScrollView } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, Progress } from 'tamagui';

const StageCard = styled(Card, {
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

const StageTitle = styled(Text, {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 4,
  color: '$text',
});

const StageDescription = styled(Text, {
  fontSize: 14,
  color: '$textMuted',
  marginBottom: 12,
});

const SubStageButton = styled(Button, {
  marginVertical: 4,
  height: 44,
  borderRadius: 8,
  backgroundColor: '$backgroundHover',
  justifyContent: 'flex-start',
  paddingLeft: 16,
});

export const TreatmentStagesScreen = () => {
  const theme = useTheme();

  const stages = [
    {
      title: 'Akut Dönem',
      description: 'Ağrı ve inflamasyonun kontrol altına alındığı ilk dönem',
      progress: 75,
      substages: [
        { id: 'painManagement', title: 'Ağrı Yönetimi' },
        { id: 'protectiveExercises', title: 'Koruyucu Egzersizler' },
        { id: 'activityModification', title: 'Aktivite Modifikasyonu' },
      ],
    },
    {
      title: 'Sub-akut Dönem',
      description: 'İyileşme sürecinin başladığı orta dönem',
      progress: 45,
      substages: [
        { id: 'mobilityExercises', title: 'Mobilite Egzersizleri' },
        { id: 'initialStrengthening', title: 'Başlangıç Güçlendirme' },
        { id: 'postureCorrection', title: 'Postür Düzeltme' },
      ],
    },
    {
      title: 'İdame Dönemi',
      description: 'Uzun vadeli iyileşme ve koruma dönemi',
      progress: 20,
      substages: [
        { id: 'advancedStrengthening', title: 'İleri Güçlendirme' },
        { id: 'functionalExercises', title: 'Fonksiyonel Egzersizler' },
        { id: 'preventiveProgram', title: 'Önleyici Program' },
      ],
    },
  ];

  const handleSubStagePress = (stageId: string, subStageId: string) => {
    // TODO: Navigate to specific treatment stage
    console.log(`Navigating to ${stageId}/${subStageId}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <Stack space={4} padding={16}>
        {stages.map((stage, index) => (
          <StageCard key={index} elevate>
            <StageTitle>{stage.title}</StageTitle>
            <StageDescription>{stage.description}</StageDescription>
            
            <Progress value={stage.progress} style={{ marginBottom: 12 }}>
              <Progress.Indicator backgroundColor="$blue10" />
            </Progress>
            
            <Stack space={2}>
              {stage.substages.map((substage) => (
                <SubStageButton
                  key={substage.id}
                  onPress={() => handleSubStagePress(stage.title, substage.id)}
                >
                  <Text color="$text">{substage.title}</Text>
                </SubStageButton>
              ))}
            </Stack>
          </StageCard>
        ))}
      </Stack>
    </ScrollView>
  );
};

export default TreatmentStagesScreen; 