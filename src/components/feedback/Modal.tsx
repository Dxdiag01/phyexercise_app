import { styled, GetProps } from 'tamagui'
import { Sheet, Text } from 'tamagui'

const modalVariants = {
  variant: {
    bottom: {
      snapPoints: ['40%', '60%', '90%']
    },
    center: {
      width: '90%',
      maxWidth: 500,
      borderRadius: '$4',
      alignSelf: 'center'
    },
    fullscreen: {
      snapPoints: ['100%']
    }
  },
  size: {
    small: {
      maxHeight: '40%'
    },
    medium: {
      maxHeight: '60%'
    },
    large: {
      maxHeight: '90%'
    }
  }
} as const

export const Modal = styled(Sheet, {
  name: 'Modal',
  backgroundColor: '$surface',
  borderTopLeftRadius: '$4',
  borderTopRightRadius: '$4',
  padding: '$4',
  variants: modalVariants,
  defaultVariants: {
    variant: 'bottom',
    size: 'medium'
  }
})

// Modal alt bileşenleri
export const ModalHeader = styled(Sheet.Handle, {
  height: 4,
  width: 40,
  backgroundColor: '$gray200',
  borderRadius: '$1',
  alignSelf: 'center',
  marginBottom: '$4'
})

export const ModalTitle = styled(Text, {
  fontSize: 20,
  fontWeight: '600',
  color: '$color',
  marginBottom: '$4'
})

export const ModalContent = styled(Sheet.Frame, {
  flex: 1,
  padding: '$4'
})

export const ModalFooter = styled(Sheet.Frame, {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '$3',
  padding: '$4',
  borderTopWidth: 1,
  borderTopColor: '$borderColor'
})

export const ModalOverlay = styled(Sheet.Overlay, {
  backgroundColor: '$overlay'
})

export type ModalProps = GetProps<typeof Modal>
export type ModalVariants = keyof typeof modalVariants 