import { styled, GetProps } from 'tamagui'
import { Checkbox as TamaguiCheckbox, Stack, Text } from 'tamagui'

const checkboxVariants = {
  variant: {
    default: {
      borderWidth: 2,
      borderColor: '$borderColor',
      backgroundColor: '$surface'
    },
    filled: {
      backgroundColor: '$gray100',
      borderWidth: 0
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '$borderColor'
    }
  },
  size: {
    small: {
      size: 16,
      borderWidth: 1.5
    },
    medium: {
      size: 20,
      borderWidth: 2
    },
    large: {
      size: 24,
      borderWidth: 2.5
    }
  },
  state: {
    error: {
      borderColor: '$error',
      backgroundColor: '$error',
      opacity: 0.1
    },
    success: {
      borderColor: '$success',
      backgroundColor: '$success',
      opacity: 0.1
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }
} as const

export const Checkbox = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  borderRadius: '$2',
  variants: checkboxVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// Checkbox grubu
export const CheckboxGroup = styled(Stack, {
  gap: '$4',
  flexDirection: 'column'
})

// Checkbox etiketi
export const CheckboxLabel = styled(Text, {
  color: '$color',
  marginLeft: '$4',
  fontSize: 16
})

export type CheckboxProps = GetProps<typeof Checkbox>
export type CheckboxVariants = keyof typeof checkboxVariants 