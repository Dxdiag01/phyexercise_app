import { styled } from 'tamagui'
import { Stack } from 'tamagui'

export const GlassCard = styled(Stack, {
  name: 'GlassCard',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',

  variants: {
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
    },
    size: {
      small: {
        padding: 8,
        borderRadius: 8
      },
      medium: {
        padding: 16,
        borderRadius: 12
      },
      large: {
        padding: 24,
        borderRadius: 16
      }
    }
  },

  defaultVariants: {
    size: "medium",
    interactive: false
  }
}) 