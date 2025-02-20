import { styled, GetProps } from 'tamagui'
import { Stack } from 'tamagui'

const progressVariants = {
  variant: {
    default: {
      backgroundColor: '$gray200'
    },
    success: {
      backgroundColor: '$success',
      opacity: 0.2
    },
    error: {
      backgroundColor: '$error',
      opacity: 0.2
    },
    warning: {
      backgroundColor: '$warning',
      opacity: 0.2
    }
  },
  size: {
    small: {
      height: 2
    },
    medium: {
      height: 4
    },
    large: {
      height: 6
    }
  }
} as const

export const Progress = styled(Stack, {
  name: 'Progress',
  backgroundColor: '$gray200',
  borderRadius: '$1',
  overflow: 'hidden',
  variants: progressVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// İlerleme çubuğu
const progressBarVariants = {
  variant: {
    default: {
      backgroundColor: '$primary'
    },
    success: {
      backgroundColor: '$success'
    },
    error: {
      backgroundColor: '$error'
    },
    warning: {
      backgroundColor: '$warning'
    }
  }
} as const

export const ProgressBar = styled(Stack, {
  name: 'ProgressBar',
  height: '100%',
  borderRadius: '$1',
  variants: progressBarVariants,
  defaultVariants: {
    variant: 'default'
  }
})

// Dairesel ilerleme
const circularProgressVariants = {
  variant: {
    default: {
      borderColor: '$gray200'
    },
    success: {
      borderColor: '$success',
      opacity: 0.2
    },
    error: {
      borderColor: '$error',
      opacity: 0.2
    },
    warning: {
      borderColor: '$warning',
      opacity: 0.2
    }
  },
  size: {
    small: {
      width: 24,
      height: 24,
      borderWidth: 2
    },
    medium: {
      width: 40,
      height: 40,
      borderWidth: 4
    },
    large: {
      width: 56,
      height: 56,
      borderWidth: 6
    }
  }
} as const

export const CircularProgress = styled(Stack, {
  name: 'CircularProgress',
  borderRadius: 9999,
  borderColor: '$gray200',
  justifyContent: 'center',
  alignItems: 'center',
  variants: circularProgressVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// İlerleme değeri
const circularProgressValueVariants = {
  variant: {
    default: {
      borderTopColor: '$primary'
    },
    success: {
      borderTopColor: '$success'
    },
    error: {
      borderTopColor: '$error'
    },
    warning: {
      borderTopColor: '$warning'
    }
  }
} as const

export const CircularProgressValue = styled(Stack, {
  name: 'CircularProgressValue',
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: 9999,
  borderWidth: 4,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: 'transparent',
  transform: [{ rotate: '0deg' }],
  variants: circularProgressValueVariants,
  defaultVariants: {
    variant: 'default'
  }
})

export type ProgressProps = GetProps<typeof Progress>
export type ProgressVariants = keyof typeof progressVariants
export type ProgressBarProps = GetProps<typeof ProgressBar>
export type ProgressBarVariants = keyof typeof progressBarVariants
export type CircularProgressProps = GetProps<typeof CircularProgress>
export type CircularProgressVariants = keyof typeof circularProgressVariants
export type CircularProgressValueProps = GetProps<typeof CircularProgressValue>
export type CircularProgressValueVariants = keyof typeof circularProgressValueVariants 