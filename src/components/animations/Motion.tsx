import { styled } from 'tamagui'
import { Stack } from 'tamagui'

// Hareket konteyner
export const Motion = styled(Stack, {
  name: 'Motion',

  variants: {
    gesture: {
      swipe: {
        touchAction: 'pan-x',
        userSelect: 'none'
      },
      pinch: {
        touchAction: 'pinch-zoom',
        userSelect: 'none'
      },
      rotate: {
        touchAction: 'none',
        userSelect: 'none'
      },
      pan: {
        touchAction: 'pan-x pan-y',
        userSelect: 'none'
      }
    },
    feedback: {
      haptic: {
        // Dokunsal geri bildirim için özel stil
      },
      sound: {
        // Ses geri bildirimi için özel stil
      },
      visual: {
        // Görsel geri bildirim için özel stil
        pressStyle: {
          scale: 0.98,
          opacity: 0.8
        }
      }
    }
  } as const,

  defaultVariants: {
    gesture: 'swipe',
    feedback: 'visual'
  } as const
})

// Hareket efekti
export const MotionEffect = styled(Stack, {
  name: 'MotionEffect',

  variants: {
    effect: {
      spring: {
        transform: [{ scale: 1 }],
        pressStyle: {
          transform: [{ scale: 0.95 }],
          config: {
            tension: 300,
            friction: 10
          }
        }
      },
      bounce: {
        transform: [{ translateY: 0 }],
        pressStyle: {
          transform: [{ translateY: -10 }],
          config: {
            tension: 300,
            friction: 10,
            mass: 1
          }
        }
      },
      wobble: {
        transform: [{ rotate: '0deg' }],
        pressStyle: {
          transform: [{ rotate: '3deg' }],
          config: {
            tension: 300,
            friction: 10,
            mass: 1
          }
        }
      }
    },
    intensity: {
      soft: {
        config: {
          tension: 200,
          friction: 15
        }
      },
      medium: {
        config: {
          tension: 300,
          friction: 10
        }
      },
      hard: {
        config: {
          tension: 400,
          friction: 5
        }
      }
    }
  } as const,

  defaultVariants: {
    effect: 'spring',
    intensity: 'medium'
  } as const
})

// Hareket geri bildirimi
export const MotionFeedback = styled(Stack, {
  name: 'MotionFeedback',

  variants: {
    type: {
      success: {
        transform: [{ scale: 1 }],
        pressStyle: {
          transform: [{ scale: 1.1 }],
          backgroundColor: 'rgba(52, 199, 89, 0.2)'
        }
      },
      error: {
        transform: [{ scale: 1 }],
        pressStyle: {
          transform: [{ scale: 0.9 }],
          backgroundColor: 'rgba(255, 59, 48, 0.2)'
        }
      },
      warning: {
        transform: [{ scale: 1 }],
        pressStyle: {
          transform: [{ scale: 1.05 }],
          backgroundColor: 'rgba(255, 204, 0, 0.2)'
        }
      }
    }
  } as const,

  defaultVariants: {
    type: 'success'
  } as const
}) 