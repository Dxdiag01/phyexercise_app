import { styled, GetProps } from 'tamagui'
import { Stack, Text } from 'tamagui'

const headerVariants = {
  variant: {
    default: {
      backgroundColor: '$surface'
    },
    transparent: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0
    },
    glass: {
      backgroundColor: '$backdrop',
      backdropFilter: 'blur(10px)'
    }
  },
  size: {
    small: {
      height: 48
    },
    medium: {
      height: 56
    },
    large: {
      height: 64
    }
  }
} as const

export const Header = styled(Stack, {
  name: 'Header',
  backgroundColor: '$surface',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$4',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  variants: headerVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// Header başlığı
const headerTitleVariants = {
  size: {
    small: {
      fontSize: 16
    },
    medium: {
      fontSize: 18
    },
    large: {
      fontSize: 20
    }
  }
} as const

export const HeaderTitle = styled(Text, {
  name: 'HeaderTitle',
  fontWeight: '600',
  color: '$color',
  variants: headerTitleVariants,
  defaultVariants: {
    size: 'medium'
  }
})

// Header sol/sağ butonları
const headerButtonVariants = {
  variant: {
    default: {
      backgroundColor: 'transparent'
    },
    ghost: {
      backgroundColor: 'transparent'
    },
    filled: {
      backgroundColor: '$gray100'
    }
  }
} as const

export const HeaderButton = styled(Stack, {
  name: 'HeaderButton',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  variants: headerButtonVariants,
  defaultVariants: {
    variant: 'default'
  }
})

// Header alt başlığı
const headerSubtitleVariants = {
  size: {
    small: {
      fontSize: 12
    },
    medium: {
      fontSize: 14
    },
    large: {
      fontSize: 16
    }
  }
} as const

export const HeaderSubtitle = styled(Text, {
  name: 'HeaderSubtitle',
  color: '$gray600',
  marginTop: '$1',
  variants: headerSubtitleVariants,
  defaultVariants: {
    size: 'medium'
  }
})

export type HeaderProps = GetProps<typeof Header>
export type HeaderVariants = keyof typeof headerVariants
export type HeaderTitleProps = GetProps<typeof HeaderTitle>
export type HeaderTitleVariants = keyof typeof headerTitleVariants
export type HeaderButtonProps = GetProps<typeof HeaderButton>
export type HeaderButtonVariants = keyof typeof headerButtonVariants
export type HeaderSubtitleProps = GetProps<typeof HeaderSubtitle>
export type HeaderSubtitleVariants = keyof typeof headerSubtitleVariants 