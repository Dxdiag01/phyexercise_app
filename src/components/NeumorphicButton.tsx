import { styled } from 'tamagui'
import { Button } from 'tamagui'

export const NeumorphicButton = styled(Button, {
  name: 'NeumorphicButton',
  backgroundColor: '$background',
  borderRadius: 12,
  padding: 16,
  shadowColor: '$shadow',
  shadowOffset: { width: -2, height: -2 },
  shadowOpacity: 0.5,
  shadowRadius: 10,

  variants: {
    size: {
      small: {
        padding: 8,
        borderRadius: 8,
        fontSize: 14
      },
      medium: {
        padding: 16,
        borderRadius: 12,
        fontSize: 16
      },
      large: {
        padding: 24,
        borderRadius: 16,
        fontSize: 18
      }
    },
    variant: {
      raised: {
        shadowOffset: { width: -3, height: -3 },
        shadowRadius: 15,
        pressStyle: {
          shadowOffset: { width: -1, height: -1 },
          shadowRadius: 5,
          scale: 0.98
        }
      },
      pressed: {
        shadowOffset: { width: -1, height: -1 },
        shadowRadius: 5,
        pressStyle: {
          shadowOffset: { width: -3, height: -3 },
          shadowRadius: 15,
          scale: 1.02
        }
      }
    }
  },

  defaultVariants: {
    size: "medium",
    variant: "raised"
  }
}) 