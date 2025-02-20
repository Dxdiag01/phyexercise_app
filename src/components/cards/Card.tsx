import { styled, GetProps } from 'tamagui'
import { Stack } from 'tamagui'

const cardVariants = {
  variant: {
    glass: {
      backgroundColor: '$overlay',
      backdropFilter: 'blur(10px)',
      borderWidth: 1,
      borderColor: '$borderColor'
    },
    solid: {
      backgroundColor: '$surface',
      shadowColor: '$overlay',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    neumorphic: {
      backgroundColor: '$gray100',
      shadowColor: '$surface',
      shadowOffset: { width: -5, height: -5 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
      borderRadius: '$8',
      after: {
        content: '',
        position: 'absolute',
        backgroundColor: '$gray100',
        shadowColor: '$overlay',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
      }
    }
  },
  size: {
    small: {
      padding: '$4',
      borderRadius: '$4'
    },
    medium: {
      padding: '$8',
      borderRadius: '$8'
    },
    large: {
      padding: '$12',
      borderRadius: '$12'
    }
  },
  interactive: {
    true: {
      pressStyle: {
        scale: 0.98,
        opacity: 0.9
      },
      hoverStyle: {
        scale: 1.02,
        opacity: 0.95
      }
    }
  }
} as const

export const Card = styled(Stack, {
  name: 'Card',
  variants: cardVariants,
  defaultVariants: {
    variant: 'solid',
    size: 'medium',
    interactive: false
  }
})

// Özel kart varyantları
export const GlassCard = styled(Card, {
  variants: {
    variant: {
      glass: {}
    }
  }
})

export const SolidCard = styled(Card, {
  variants: {
    variant: {
      solid: {}
    }
  }
})

export const NeumorphicCard = styled(Card, {
  variants: {
    variant: {
      neumorphic: {}
    }
  }
})

export type CardProps = GetProps<typeof Card>
export type CardVariants = keyof typeof cardVariants 