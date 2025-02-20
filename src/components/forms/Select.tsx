import { styled, GetProps } from 'tamagui'
import { Select as TamaguiSelect } from 'tamagui'

const selectVariants = {
  variant: {
    default: {
      backgroundColor: '$surface',
      borderWidth: 1,
      borderColor: '$borderColor',
      borderRadius: '$4'
    },
    filled: {
      backgroundColor: '$gray100',
      borderWidth: 0,
      borderRadius: '$4'
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '$borderColor',
      borderRadius: '$4'
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

export const Select = styled(TamaguiSelect, {
  name: 'Select',
  variants: selectVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// Alt bileşenler için stil tanımlamaları
export const SelectTrigger = styled(TamaguiSelect.Trigger, {
  padding: '$8',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  backgroundColor: '$surface',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const SelectContent = styled(TamaguiSelect.Content, {
  backgroundColor: '$surface',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  shadowColor: '$overlay',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  zIndex: 5
})

export const SelectItem = styled(TamaguiSelect.Item, {
  padding: '$8',
  backgroundColor: 'transparent',
  
  pressStyle: {
    backgroundColor: '$gray100'
  },
  
  hoverStyle: {
    backgroundColor: '$gray100'
  }
})

export const SelectItemText = styled(TamaguiSelect.ItemText, {
  fontSize: 16,
  color: '$color'
})

export type SelectProps = GetProps<typeof Select>
export type SelectVariants = keyof typeof selectVariants 