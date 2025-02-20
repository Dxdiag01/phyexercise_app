import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { styled, useTheme } from 'tamagui';
import { Stack, Text, Button, Progress, XStack, Card } from 'tamagui';
import { Video, ResizeMode } from 'expo-av';
import { CameraType, Camera } from 'expo-camera';
import { Play, Pause, SkipForward, Camera as CameraIcon, Check } from '@tamagui/lucide-icons';

const { width, height } = Dimensions.get('window');

const VideoContainer = styled(View, {
  width: width,
  height: height * 0.4,
  backgroundColor: '$background',
});

const ControlsContainer = styled(View, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const InfoCard = styled(Card, {
  padding: 16,
  margin: 16,
  backgroundColor: '$background',
});

const TimerText = styled(Text, {
  fontSize: 48,
  fontWeight: '700',
  textAlign: 'center',
  color: '$text',
});

const SubText = styled(Text, {
  fontSize: 16,
  color: '$textMuted',
  textAlign: 'center',
});

interface ExercisePlayerScreenProps {
  route: {
    params: {
      exerciseId: number;
    };
  };
  navigation: any;
}

type ExerciseMode = 'video' | 'camera' | 'break' | 'complete';

export const ExercisePlayerScreen = ({ route, navigation }: ExercisePlayerScreenProps) => {
  const theme = useTheme();
  const { exerciseId } = route.params;
  const [mode, setMode] = useState<ExerciseMode>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [breakTime, setBreakTime] = useState(30);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Bu veriler normalde API'den gelecek
  const exerciseData = {
    title: 'Boyun Germe Egzersizi',
    video: 'https://example.com/exercise-video.mp4',
    duration: '00:45',
    sets: 3,
    reps: 10,
    breakDuration: 30,
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSet = () => {
    if (currentSet < exerciseData.sets) {
      setMode('break');
      setCurrentSet(prev => prev + 1);
      const timer = setInterval(() => {
        setBreakTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setMode('video');
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setMode('complete');
    }
  };

  const handleStartCamera = () => {
    setMode('camera');
  };

  const handleAssessment = () => {
    navigation.navigate('Assessment', { exerciseId });
  };

  const renderContent = () => {
    switch (mode) {
      case 'video':
        return (
          <>
            <VideoContainer>
              <Video
                source={{ uri: exerciseData.video }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                shouldPlay={isPlaying}
                style={{ flex: 1 }}
              />
              <ControlsContainer>
                <XStack justifyContent="space-between" alignItems="center">
                  <Text color="white">{exerciseData.duration}</Text>
                  <Button
                    icon={isPlaying ? Pause : Play}
                    circular
                    size="$5"
                    onPress={handlePlayPause}
                  />
                  <Button
                    icon={CameraIcon}
                    circular
                    size="$5"
                    onPress={handleStartCamera}
                  />
                </XStack>
              </ControlsContainer>
            </VideoContainer>
            <InfoCard elevate>
              <Stack space={4}>
                <Text fontSize={20} fontWeight="600">{exerciseData.title}</Text>
                <Progress value={progress} marginVertical={8}>
                  <Progress.Indicator backgroundColor="$blue10" />
                </Progress>
                <XStack justifyContent="space-between">
                  <Text>Set {currentSet}/{exerciseData.sets}</Text>
                  <Text>{exerciseData.reps} Tekrar</Text>
                </XStack>
                <XStack space={4}>
                  <Button
                    flex={1}
                    icon={SkipForward}
                    backgroundColor="$blue10"
                    color="white"
                    onPress={handleNextSet}
                  >
                    Sonraki Set
                  </Button>
                  <Button
                    flex={1}
                    backgroundColor="$gray5"
                    onPress={handleAssessment}
                  >
                    Değerlendirme
                  </Button>
                </XStack>
              </Stack>
            </InfoCard>
          </>
        );

      case 'camera':
        if (!hasPermission) {
          return (
            <Stack flex={1} justifyContent="center" alignItems="center" padding={16}>
              <Text>Kamera izni verilmedi</Text>
              <Button
                marginTop={16}
                onPress={() => setMode('video')}
              >
                Videoya Dön
              </Button>
            </Stack>
          );
        }

        return (
          <>
            <VideoContainer>
              <View style={{ flex: 1 }}>
                {hasPermission && (
                  <View style={{ flex: 1 }}>
                    <Text>Kamera Görüntüsü</Text>
                    {/* Kamera özelliği geçici olarak devre dışı */}
                  </View>
                )}
              </View>
            </VideoContainer>
            <InfoCard elevate>
              <Stack space={4}>
                <Text fontSize={20} fontWeight="600">Form Analizi</Text>
                <Text color="$textMuted">
                  Egzersiz formunuz yapay zeka tarafından analiz ediliyor...
                </Text>
              </Stack>
            </InfoCard>
          </>
        );

      case 'break':
        return (
          <Stack flex={1} justifyContent="center" alignItems="center" padding={16}>
            <TimerText>{breakTime}</TimerText>
            <SubText>Dinlenme Süresi</SubText>
            <Text marginTop={32} color="$textMuted">
              Bir sonraki set için hazırlanın
            </Text>
            <Button
              marginTop={32}
              icon={SkipForward}
              onPress={() => setMode('video')}
            >
              Dinlenmeyi Atla
            </Button>
          </Stack>
        );

      case 'complete':
        return (
          <Stack flex={1} justifyContent="center" alignItems="center" padding={16}>
            <Check size={64} color={theme.blue10.get()} />
            <Text fontSize={24} fontWeight="600" marginTop={16}>
              Tebrikler!
            </Text>
            <Text color="$textMuted" textAlign="center" marginTop={8}>
              Egzersiz setini başarıyla tamamladınız
            </Text>
            <Button
              marginTop={32}
              backgroundColor="$blue10"
              color="white"
              onPress={() => navigation.goBack()}
            >
              Egzersizi Tamamla
            </Button>
          </Stack>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background.get() }}>
      {renderContent()}
    </View>
  );
};

export default ExercisePlayerScreen; 