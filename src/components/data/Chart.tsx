import { styled } from 'tamagui'
import { Stack, Text } from 'tamagui'

// Temel grafik konteyner
export const ChartContainer = styled(Stack, {
  name: 'ChartContainer',
  width: '100%',
  height: 200,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  padding: 16,

  variants: {
    variant: {
      default: {
        backgroundColor: '#FFFFFF'
      },
      transparent: {
        backgroundColor: 'transparent'
      }
    },
    size: {
      small: {
        height: 150
      },
      medium: {
        height: 200
      },
      large: {
        height: 300
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'medium'
  } as const
})

// Grafik başlığı
export const ChartTitle = styled(Stack, {
  marginBottom: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

// Grafik alt başlığı
export const ChartSubtitle = styled(Text, {
  color: '#718096',
  marginBottom: 8
})

// Grafik lejantı
export const ChartLegend = styled(Stack, {
  flexDirection: 'row',
  gap: 16,
  marginTop: 16
})

// Lejant öğesi
export const ChartLegendItem = styled(Stack, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8
})

// Lejant renk göstergesi
export const ChartLegendColor = styled(Stack, {
  width: 12,
  height: 12,
  borderRadius: 6,

  variants: {
    color: {
      primary: {
        backgroundColor: '#007AFF'
      },
      secondary: {
        backgroundColor: '#FF9500'
      },
      success: {
        backgroundColor: '#34C759'
      },
      error: {
        backgroundColor: '#FF3B30'
      }
    }
  } as const,

  defaultVariants: {
    color: 'primary'
  } as const
})

// Grafik ekseni
export const ChartAxis = styled(Stack, {
  position: 'absolute',
  backgroundColor: '#E2E8F0',

  variants: {
    orientation: {
      horizontal: {
        width: '100%',
        height: 1
      },
      vertical: {
        width: 1,
        height: '100%'
      }
    }
  } as const,

  defaultVariants: {
    orientation: 'horizontal'
  } as const
})

// Grafik ızgarası
export const ChartGrid = styled(Stack, {
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0.1
})

// Grafik veri noktası
export const ChartDataPoint = styled(Stack, {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#007AFF',
  position: 'absolute',

  variants: {
    variant: {
      default: {
        backgroundColor: '#007AFF'
      },
      highlight: {
        backgroundColor: '#007AFF',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        width: 12,
        height: 12,
        borderRadius: 6
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default'
  } as const
}) 