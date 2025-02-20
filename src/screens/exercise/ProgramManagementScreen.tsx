import React from 'react';
import { ScrollView } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, Switch, XStack } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';

const SectionCard = styled(Card, {
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
  marginBottom: 12,
  color: '$text',
});

const SettingItem = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
});

const SettingText = styled(Text, {
  fontSize: 16,
  color: '$text',
});

const SettingDescription = styled(Text, {
  fontSize: 14,
  color: '$textMuted',
  marginTop: 4,
});

export const ProgramManagementScreen = () => {
  const theme = useTheme();

  const sections = {
    progressTracking: [
      { id: 'painScale', title: 'Ağrı Skalası', description: 'Günlük ağrı seviyesi takibi' },
      { id: 'rangeOfMotion', title: 'Hareket Açıklığı', description: 'Eklem hareket ölçümleri' },
      { id: 'functionalTests', title: 'Fonksiyonel Testler', description: 'Performans değerlendirmeleri' },
    ],
    programSettings: [
      { id: 'difficulty', title: 'Zorluk Seviyesi', description: 'Program zorluğunu ayarla' },
      { id: 'duration', title: 'Egzersiz Süresi', description: 'Günlük egzersiz süresini belirle' },
      { id: 'reps', title: 'Set/Tekrar Sayısı', description: 'Egzersiz yoğunluğunu ayarla' },
    ],
    reminders: [
      { id: 'dailyProgram', title: 'Günlük Program', description: 'Egzersiz hatırlatıcıları' },
      { id: 'progressMeasurement', title: 'İlerleme Ölçümü', description: 'Ölçüm zamanı bildirimleri' },
      { id: 'checkupTime', title: 'Kontrol Zamanı', description: 'Uzman kontrol randevuları' },
    ],
  };

  const handleSettingPress = (sectionId: string, settingId: string) => {
    // TODO: Navigate to specific setting detail
    console.log(`Navigating to ${sectionId}/${settingId}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <Stack space={4} padding={16}>
        {/* İlerleme Takibi */}
        <SectionCard elevate>
          <SectionTitle>İlerleme Takibi</SectionTitle>
          <Stack space={2}>
            {sections.progressTracking.map((item) => (
              <SettingItem key={item.id} onPress={() => handleSettingPress('progressTracking', item.id)}>
                <Stack>
                  <SettingText>{item.title}</SettingText>
                  <SettingDescription>{item.description}</SettingDescription>
                </Stack>
                <Button icon={ChevronRight} chromeless />
              </SettingItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Program Ayarları */}
        <SectionCard elevate>
          <SectionTitle>Program Ayarları</SectionTitle>
          <Stack space={2}>
            {sections.programSettings.map((item) => (
              <SettingItem key={item.id} onPress={() => handleSettingPress('programSettings', item.id)}>
                <Stack>
                  <SettingText>{item.title}</SettingText>
                  <SettingDescription>{item.description}</SettingDescription>
                </Stack>
                <Button icon={ChevronRight} chromeless />
              </SettingItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Hatırlatıcılar */}
        <SectionCard elevate>
          <SectionTitle>Hatırlatıcılar</SectionTitle>
          <Stack space={2}>
            {sections.reminders.map((item) => (
              <SettingItem key={item.id}>
                <Stack>
                  <SettingText>{item.title}</SettingText>
                  <SettingDescription>{item.description}</SettingDescription>
                </Stack>
                <Switch defaultChecked size="$3" />
              </SettingItem>
            ))}
          </Stack>
        </SectionCard>
      </Stack>
    </ScrollView>
  );
};

export default ProgramManagementScreen; 