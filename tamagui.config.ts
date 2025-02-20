import { createFont, createTamagui } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'
import { tokens, themes } from '@tamagui/themes'
import { createMedia } from '@tamagui/react-native-media-driver'

const headingFont = createFont({
  family: 'Poppins',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  lineHeight: {
    1: 20,
    2: 22,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    10: 48,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    5: -0.2,
    6: -0.3,
    7: -0.4,
    8: -0.5,
  },
})

const bodyFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  lineHeight: {
    1: 20,
    2: 22,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    10: 48,
  },
  weight: {
    4: '400',
    5: '500',
    6: '600',
  },
  letterSpacing: {
    4: 0,
    5: -0.2,
    6: -0.3,
  },
})

const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens: {
    ...tokens,
    fontSize: {
      1: 12,
      2: 14,
      3: 16,
      4: 18,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
    },
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config 