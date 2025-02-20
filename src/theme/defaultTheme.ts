import { Theme } from './types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#007AFF',    // Ana Mavi
    secondary: '#FF9500',  // Turuncu
    background: '#F2F2F7', // Light Mode Background
    text: '#1C1C1E',      // Dark Mode Text
    error: '#FF3B30',     // Kırmızı
    success: '#34C759',   // Yeşil
    warning: '#FFCC00',   // Sarı
    info: '#007AFF',      // Info için primary renk
    surface: '#FFFFFF',   // Yüzey rengi
    card: '#F2F2F7',      // Kart arkaplan
    border: '#E5E5EA',    // Border rengi
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
    },
    h2: {
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h3: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    button: {
      fontFamily: 'SF Pro Display',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
}; 