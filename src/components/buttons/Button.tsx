import { styled, GetProps } from 'tamagui'
import { Button as TamaguiButton } from 'tamagui'

const buttonVariants = {
  variant: {
    primary: {
      backgroundColor: '$primary',
      color: '#FFFFFF',
      pressStyle: {
        scale: 0.98,
        opacity: 0.9,
        backgroundColor: '$primary',
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '$primary',
      color: '$primary',
      pressStyle: {
        scale: 0.98,
        opacity: 0.9,
        backgroundColor: '$gray100'
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '$primary',
      pressStyle: {
        backgroundColor: '$gray100'
      }
    }
  },
  size: {
    xs: {
      height: 32,
      paddingHorizontal: '$4',
      fontSize: 12,
      fontWeight: '500'
    },
    sm: {
      height: 40,
      paddingHorizontal: '$8',
      fontSize: 14,
      fontWeight: '500'
    },
    md: {
      height: 48,
      paddingHorizontal: '$12',
      fontSize: 16,
      fontWeight: '500'
    },
    lg: {
      height: 56,
      paddingHorizontal: '$16',
      fontSize: 18,
      fontWeight: '500'
    },
    xl: {
      height: 64,
      paddingHorizontal: '$16',
      fontSize: 20,
      fontWeight: '500'
    }
  },
  rounded: {
    none: {
      borderRadius: 0
    },
    sm: {
      borderRadius: '$4'
    },
    md: {
      borderRadius: '$8'
    },
    lg: {
      borderRadius: '$12'
    },
    full: {
      borderRadius: 9999
    }
  },
  disabled: {
    true: {
      opacity: 0.5,
      pointerEvents: 'none',
      backgroundColor: '$disabled',
      borderColor: '$disabled',
      color: '$gray500'
    }
  },
  loading: {
    true: {
      opacity: 0.8,
      pointerEvents: 'none'
    }
  }
} as const

export const Button = styled(TamaguiButton, {
  name: 'Button',
  variants: buttonVariants,
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: "md",
    disabled: false,
    loading: false
  }
})

export type ButtonProps = GetProps<typeof Button>
export type ButtonVariants = keyof typeof buttonVariants 