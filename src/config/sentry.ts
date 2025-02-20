import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  if (!process.env.EXPO_PUBLIC_SENTRY_DSN) {
    console.warn('Sentry DSN is not configured');
    return;
  }

  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    debug: process.env.EXPO_PUBLIC_ENV === 'development',
    environment: process.env.EXPO_PUBLIC_ENV,
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
  });
}; 