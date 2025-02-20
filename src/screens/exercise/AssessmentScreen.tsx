import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Card, Text, Button, Stack, XStack, Image, TextArea, Slider } from 'tamagui';
import { Camera } from 'expo-camera';
import { Camera as CameraIcon, Save, Edit3, Activity } from '@tamagui/lucide-icons';

const AssessmentCard = styled(Card, {
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

const SubText = styled(Text, {
  fontSize: 14,
  color: '$textMuted',
});

type AssessmentMode = 'pain' | 'posture' | 'progress' | 'notes';

interface AssessmentScreenProps {
  route: {
    params: {
      exerciseId: number;
    };
  };
  navigation: any;
}

export const AssessmentScreen = ({ route, navigation }: AssessmentScreenProps) => {
  const theme = useTheme();
  const [mode, setMode] = useState<AssessmentMode>('pain');
  const [painLevel, setPainLevel] = useState(0);
  const [notes, setNotes] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const renderPainAssessment = () => (
    <AssessmentCard elevate>
      <SectionTitle>Ağrı Değerlendirmesi</SectionTitle>
      <SubText marginBottom={16}>
        Egzersiz sırasında hissettiğiniz ağrı seviyesini belirtin
      </SubText>
      <Stack space={4}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text>Ağrı Seviyesi: {painLevel}</Text>
          <Text color={painLevel > 7 ? '$red10' : painLevel > 4 ? '$yellow10' : '$green10'}>
            {painLevel <= 3 ? 'Hafif' : painLevel <= 6 ? 'Orta' : 'Şiddetli'}
          </Text>
        </XStack>
        <Slider
          defaultValue={[painLevel]}
          min={0}
          max={10}
          step={1}
          onValueChange={([value]) => setPainLevel(value)}
        >
          <Slider.Track>
            <Slider.TrackActive backgroundColor="$blue10" />
          </Slider.Track>
          <Slider.Thumb index={0} circular size="$4" />
        </Slider>
      </Stack>
    </AssessmentCard>
  );

  const renderPostureAnalysis = () => (
    <AssessmentCard elevate>
      <SectionTitle>Postür Analizi</SectionTitle>
      <SubText marginBottom={16}>
        Duruş pozisyonunuzu analiz etmek için fotoğraf çekin
      </SubText>
      <View style={{ height: 300, borderRadius: 12, backgroundColor: '$gray5', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          icon={CameraIcon}
          size="$5"
          circular
          onPress={() => {
            // TODO: Kamera özelliği daha sonra eklenecek
            console.log('Kamera özelliği geliştirme aşamasında');
          }}
        />
      </View>
    </AssessmentCard>
  );

  const renderProgressPhoto = () => (
    <AssessmentCard elevate>
      <SectionTitle>İlerleme Fotoğrafı</SectionTitle>
      <SubText marginBottom={16}>
        İlerlemenizi takip etmek için fotoğraf çekin
      </SubText>
      <XStack space={4} flexWrap="wrap">
        <Card width={100} height={100} backgroundColor="$gray5">
          <Text textAlign="center" marginTop={40}>Önceki</Text>
        </Card>
        <Button
          width={100}
          height={100}
          icon={CameraIcon}
          onPress={() => setShowCamera(true)}
        >
          Yeni Foto
        </Button>
      </XStack>
    </AssessmentCard>
  );

  const renderNotes = () => (
    <AssessmentCard elevate>
      <SectionTitle>Notlar</SectionTitle>
      <SubText marginBottom={16}>
        Egzersiz sırasındaki gözlemlerinizi not edin
      </SubText>
      <TextArea
        value={notes}
        onChangeText={setNotes}
        placeholder="Notlarınızı buraya yazın..."
        minHeight={120}
      />
    </AssessmentCard>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <Stack space={4} padding={16}>
        {/* Mod Seçimi */}
        <XStack space={4} flexWrap="wrap">
          <Button
            flex={1}
            icon={Activity}
            backgroundColor={mode === 'pain' ? '$blue10' : undefined}
            onPress={() => setMode('pain')}
          >
            Ağrı
          </Button>
          <Button
            flex={1}
            icon={CameraIcon}
            backgroundColor={mode === 'posture' ? '$blue10' : undefined}
            onPress={() => setMode('posture')}
          >
            Postür
          </Button>
          <Button
            flex={1}
            icon={Save}
            backgroundColor={mode === 'progress' ? '$blue10' : undefined}
            onPress={() => setMode('progress')}
          >
            İlerleme
          </Button>
          <Button
            flex={1}
            icon={Edit3}
            backgroundColor={mode === 'notes' ? '$blue10' : undefined}
            onPress={() => setMode('notes')}
          >
            Notlar
          </Button>
        </XStack>

        {/* Seçilen Moda Göre İçerik */}
        {mode === 'pain' && renderPainAssessment()}
        {mode === 'posture' && renderPostureAnalysis()}
        {mode === 'progress' && renderProgressPhoto()}
        {mode === 'notes' && renderNotes()}

        {/* Kaydet Butonu */}
        <Button
          backgroundColor="$blue10"
          color="white"
          size="$4"
          marginTop={8}
          onPress={() => navigation.goBack()}
        >
          Değerlendirmeyi Kaydet
        </Button>
      </Stack>
    </ScrollView>
  );
};

export default AssessmentScreen; 