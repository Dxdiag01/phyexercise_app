import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { YStack, Text, Progress, Theme } from 'tamagui';
import { loadingManager } from '../../utils/loadingManager';
import { performanceMonitor } from '../../utils/performanceMonitor';
import LottieView from 'lottie-react-native';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const LoadingScreen = () => {
  const [state, setState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    error: null,
  });

  useEffect(() => {
    const endLoadMeasure = performanceMonitor.measureLoad('InitialAppLoad');
    const unsubscribe = loadingManager.subscribe(setState);
    
    loadingManager.loadResources().finally(() => {
      endLoadMeasure();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderError = () => (
    <YStack space="$4" alignItems="center">
      <Text color="$red10" fontSize="$6">
        Hata Oluştu
      </Text>
      <Text color="$gray11" textAlign="center">
        {state.error}
      </Text>
      <Text
        color="$blue10"
        fontSize="$4"
        onPress={() => loadingManager.reload()}
      >
        Tekrar Dene
      </Text>
    </YStack>
  );

  const renderLoading = () => (
    <YStack space="$4" alignItems="center">
      <LottieView
        source={require('../../assets/animations/loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text fontSize="$6" fontWeight="bold">
        PhyExercise
      </Text>
      <Text color="$gray11" textAlign="center">
        Uygulama yükleniyor...
      </Text>
      <Progress value={state.progress * 100} width={200}>
        <Progress.Indicator backgroundColor="$blue10" />
      </Progress>
      <Text color="$gray10" fontSize="$2">
        {Math.round(state.progress * 100)}%
      </Text>
    </YStack>
  );

  return (
    <Theme name="light">
      <YStack
        flex={1}
        backgroundColor="$background"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        {state.error ? renderError() : renderLoading()}
      </YStack>
    </Theme>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen; 