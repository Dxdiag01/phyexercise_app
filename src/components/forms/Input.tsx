import { styled, GetProps } from 'tamagui'
import { Input as TamaguiInput } from 'tamagui'

const inputVariants = {
  variant: {
    default: {
      borderWidth: 1,
      borderColor: '$borderColor',
      backgroundColor: '$surface'
    },
    filled: {
      backgroundColor: '$gray100',
      borderWidth: 0
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '$borderColor'
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
  },
  size: {
    small: {
      height: 32,
      fontSize: 14,
      paddingHorizontal: '$4'
    },
    medium: {
      height: 44,
      fontSize: 16,
      paddingHorizontal: '$8'
    },
    large: {
      height: 56,
      fontSize: 18,
      paddingHorizontal: '$12'
    }
  }
} as const

export const Input = styled(TamaguiInput, {
  name: 'Input',
  borderRadius: '$4',
  variants: inputVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// Özel input tipleri
export const EmailInput = styled(Input, {
  keyboardType: 'email-address',
  autoCapitalize: 'none',
  autoComplete: 'email'
})

export const PasswordInput = styled(Input, {
  secureTextEntry: true,
  autoCapitalize: 'none',
  autoComplete: 'password'
})

export const SearchInput = styled(Input, {
  variants: {
    variant: {
      filled: {}
    }
  }
})

export const NumberInput = styled(Input, {
  keyboardType: 'numeric'
})

export type InputProps = GetProps<typeof Input>
export type InputVariants = keyof typeof inputVariants 