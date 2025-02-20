import { StyleSheet } from 'react-native'

// WCAG 2.1 standartlarına uygun minimum dokunmatik hedef boyutları
export const touchTargetStyles = StyleSheet.create({
  touchableArea: {
    minWidth: 44,
    minHeight: 44,
    padding: 12,
    marginVertical: 4,
  },
  touchableIcon: {
    padding: 12,
    borderRadius: 22,
  },
  touchableListItem: {
    minHeight: 44,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  touchableTab: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

// Metin boyutları ve satır aralıkları
export const textStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24, // 1.5x line height
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 27,
  },
  caption: {
    fontSize: 14,
    lineHeight: 21,
  },
  heading1: {
    fontSize: 32,
    lineHeight: 48,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 36,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 30,
  },
})

// Odak göstergeleri
export const focusStyles = StyleSheet.create({
  focusOutline: {
    borderWidth: 2,
    borderColor: '#0052CC',
    borderStyle: 'solid',
  },
  focusHighlight: {
    backgroundColor: 'rgba(0, 82, 204, 0.1)',
  },
})

// Boşluk ve hizalama
export const spacingStyles = StyleSheet.create({
  verticalSpacing: {
    marginVertical: 8,
  },
  horizontalSpacing: {
    marginHorizontal: 8,
  },
  contentPadding: {
    padding: 16,
  },
})

// Erişilebilirlik yardımcı fonksiyonları
export const accessibilityHelpers = {
  button: {
    role: 'button',
    accessible: true,
  },
  header: {
    role: 'header',
    accessible: true,
  },
  image: (description: string) => ({
    accessible: true,
    accessibilityRole: 'image',
    accessibilityLabel: description,
  }),
  tab: (label: string, selected: boolean) => ({
    accessible: true,
    accessibilityRole: 'tab',
    accessibilityLabel: label,
    accessibilityState: { selected },
  }),
  modal: {
    role: 'dialog',
    accessible: true,
    accessibilityViewIsModal: true,
  },
} 