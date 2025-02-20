import React, { Suspense, Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text, YStack, styled } from 'tamagui';

// Yükleme ekranı için stil
const LoadingContainer = styled(View, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$background',
});

// Varsayılan yükleme ekranı
export const DefaultLoadingScreen = () => (
  <LoadingContainer>
    <YStack space="$4" alignItems="center">
      <ActivityIndicator size="large" color="$blue10" />
      <Text color="$gray11">Yükleniyor...</Text>
    </YStack>
  </LoadingContainer>
);

// Hata sınıfı
class ErrorBoundaryClass extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Bileşen yükleme hatası:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        <>{this.props.fallback}</>
      ) : (
        <LoadingContainer>
          <YStack space="$4" alignItems="center">
            <Text color="$red10" fontSize={24}>Bir hata oluştu</Text>
            <Text color="$gray11">Lütfen daha sonra tekrar deneyin</Text>
          </YStack>
        </LoadingContainer>
      );
    }

    return this.props.children;
  }
}

// Lazy loading wrapper
export const withLazyLoading = (
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
  LoadingComponent: React.ComponentType = DefaultLoadingScreen,
  ErrorComponent?: React.ComponentType
) => {
  const LazyComponent = React.lazy(importFn);

  return (props: any) => (
    <ErrorBoundaryClass fallback={ErrorComponent && <ErrorComponent />}>
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundaryClass>
  );
}; 