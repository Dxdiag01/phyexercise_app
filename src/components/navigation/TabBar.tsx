import { styled, GetProps } from 'tamagui'
import { Stack, Text } from 'tamagui'

const tabBarVariants = {
  variant: {
    default: {
      backgroundColor: '$surface'
    },
    glass: {
      backgroundColor: '$backdrop',
      backdropFilter: 'blur(10px)'
    },
    dark: {
      backgroundColor: '$gray800',
      borderTopColor: '$gray700'
    }
  }
} as const

export const TabBar = styled(Stack, {
  name: 'TabBar',
  backgroundColor: '$surface',
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  paddingBottom: '$2',
  paddingTop: '$2',
  variants: tabBarVariants,
  defaultVariants: {
    variant: 'default'
  }
})

// Tab butonu
const tabButtonVariants = {
  active: {
    true: {
      // Aktif durum stilleri
    }
  }
} as const

export const TabButton = styled(Stack, {
  name: 'TabButton',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$4',
  gap: '$1',
  variants: tabButtonVariants,
  defaultVariants: {
    active: false
  }
})

// Tab ikonu
const tabIconVariants = {
  active: {
    true: {
      color: '$primary'
    },
    false: {
      color: '$gray500'
    }
  }
} as const

export const TabIcon = styled(Stack, {
  name: 'TabIcon',
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
  variants: tabIconVariants,
  defaultVariants: {
    active: false
  }
})

// Tab etiketi
const tabLabelVariants = {
  active: {
    true: {
      color: '$primary',
      fontWeight: '600'
    },
    false: {
      color: '$gray500',
      fontWeight: '400'
    }
  }
} as const

export const TabLabel = styled(Text, {
  name: 'TabLabel',
  fontSize: 12,
  marginTop: '$1',
  variants: tabLabelVariants,
  defaultVariants: {
    active: false
  }
})

export type TabBarProps = GetProps<typeof TabBar>
export type TabBarVariants = keyof typeof tabBarVariants
export type TabButtonProps = GetProps<typeof TabButton>
export type TabButtonVariants = keyof typeof tabButtonVariants
export type TabIconProps = GetProps<typeof TabIcon>
export type TabIconVariants = keyof typeof tabIconVariants
export type TabLabelProps = GetProps<typeof TabLabel>
export type TabLabelVariants = keyof typeof tabLabelVariants 