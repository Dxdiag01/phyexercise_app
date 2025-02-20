import { styled, GetProps } from 'tamagui'
import { Toast as TamaguiToast } from '@tamagui/toast'

const toastVariants = {
  variant: {
    success: {
      backgroundColor: '$success',
      color: '$surface'
    },
    error: {
      backgroundColor: '$error',
      color: '$surface'
    },
    warning: {
      backgroundColor: '$warning',
      color: '$color'
    },
    info: {
      backgroundColor: '$info',
      color: '$surface'
    }
  },
  position: {
    top: {
      top: '$4'
    },
    bottom: {
      bottom: '$4'
    }
  }
} as const

export const Toast = styled(TamaguiToast, {
  name: 'Toast',
  backgroundColor: '$surface',
  borderRadius: '$4',
  padding: '$4',
  shadowColor: '$overlay',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$3',
  variants: toastVariants,
  defaultVariants: {
    variant: 'info',
    position: 'top'
  }
})

// Toast alt bileşenleri
export const ToastTitle = styled(TamaguiToast.Title, {
  fontSize: 16,
  fontWeight: '600',
  color: 'inherit'
})

export const ToastDescription = styled(TamaguiToast.Description, {
  fontSize: 14,
  color: 'inherit',
  opacity: 0.9
})

export const ToastAction = styled(TamaguiToast.Action, {
  backgroundColor: 'transparent',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  borderRadius: '$2',
  pressStyle: {
    opacity: 0.7
  }
})

export const ToastClose = styled(TamaguiToast.Close, {
  backgroundColor: 'transparent',
  padding: '$1',
  borderRadius: '$2',
  pressStyle: {
    opacity: 0.7
  }
})

export type ToastProps = GetProps<typeof Toast>
export type ToastVariants = keyof typeof toastVariants 