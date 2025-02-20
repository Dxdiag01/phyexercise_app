import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, setUserProperties as firebaseSetUserProperties } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let analytics: any;

export const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    
    // Analytics'i sadece desteklenen ortamlarda başlat
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      analytics = getAnalytics(app);
    } else {
      console.log('Firebase Analytics is not supported in this environment');
    }
    
    return app;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};

export const logEvent = async (eventName: string, params?: Record<string, any>) => {
  try {
    if (analytics) {
      await firebaseLogEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.warn('Analytics event logging failed:', error);
  }
};

export const setUserProperties = async (properties: Record<string, string>) => {
  try {
    if (analytics) {
      await firebaseSetUserProperties(analytics, properties);
    }
  } catch (error) {
    console.warn('Setting user properties failed:', error);
  }
}; 