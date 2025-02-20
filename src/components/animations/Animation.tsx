import { styled } from 'tamagui'
import { Stack } from 'tamagui'

// Temel animasyon konteyner
export const AnimatedContainer = styled(Stack, {
  name: 'AnimatedContainer',

  variants: {
    animation: {
      fadeIn: {
        enterStyle: {
          opacity: 0,
          scale: 1
        },
        exitStyle: {
          opacity: 1,
          scale: 1
        }
      },
      fadeOut: {
        enterStyle: {
          opacity: 1,
          scale: 1
        },
        exitStyle: {
          opacity: 0,
          scale: 1
        }
      },
      slideUp: {
        enterStyle: {
          opacity: 0,
          y: 20
        },
        exitStyle: {
          opacity: 1,
          y: 0
        }
      },
      slideDown: {
        enterStyle: {
          opacity: 0,
          y: -20
        },
        exitStyle: {
          opacity: 1,
          y: 0
        }
      },
      zoomIn: {
        enterStyle: {
          opacity: 0,
          scale: 0.9
        },
        exitStyle: {
          opacity: 1,
          scale: 1
        }
      },
      zoomOut: {
        enterStyle: {
          opacity: 0,
          scale: 1.1
        },
        exitStyle: {
          opacity: 1,
          scale: 1
        }
      }
    },
    duration: {
      fast: {
        animationDuration: '0.2s'
      },
      normal: {
        animationDuration: '0.3s'
      },
      slow: {
        animationDuration: '0.5s'
      }
    },
    delay: {
      none: {
        animationDelay: '0s'
      },
      short: {
        animationDelay: '0.1s'
      },
      medium: {
        animationDelay: '0.3s'
      },
      long: {
        animationDelay: '0.5s'
      }
    },
    easing: {
      linear: {
        animationTimingFunction: 'linear'
      },
      ease: {
        animationTimingFunction: 'ease'
      },
      easeIn: {
        animationTimingFunction: 'ease-in'
      },
      easeOut: {
        animationTimingFunction: 'ease-out'
      },
      easeInOut: {
        animationTimingFunction: 'ease-in-out'
      }
    }
  } as const,

  defaultVariants: {
    animation: 'fadeIn',
    duration: 'normal',
    delay: 'none',
    easing: 'ease'
  } as const
})

// Geçiş efekti konteyner
export const TransitionContainer = styled(Stack, {
  name: 'TransitionContainer',

  variants: {
    transition: {
      all: {
        transition: 'all 0.3s ease'
      },
      opacity: {
        transition: 'opacity 0.3s ease'
      },
      transform: {
        transition: 'transform 0.3s ease'
      },
      color: {
        transition: 'color 0.3s ease'
      },
      background: {
        transition: 'background-color 0.3s ease'
      }
    },
    duration: {
      fast: {
        transitionDuration: '0.2s'
      },
      normal: {
        transitionDuration: '0.3s'
      },
      slow: {
        transitionDuration: '0.5s'
      }
    },
    easing: {
      linear: {
        transitionTimingFunction: 'linear'
      },
      ease: {
        transitionTimingFunction: 'ease'
      },
      easeIn: {
        transitionTimingFunction: 'ease-in'
      },
      easeOut: {
        transitionTimingFunction: 'ease-out'
      },
      easeInOut: {
        transitionTimingFunction: 'ease-in-out'
      }
    }
  } as const,

  defaultVariants: {
    transition: 'all',
    duration: 'normal',
    easing: 'ease'
  } as const
}) 