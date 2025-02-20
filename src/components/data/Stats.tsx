import { styled, GetProps } from 'tamagui'
import { Stack, Text } from 'tamagui'

const statCardVariants = {
  variant: {
    default: {
      backgroundColor: '$surface'
    },
    glass: {
      backgroundColor: '$backdrop',
      backdropFilter: 'blur(10px)',
      borderWidth: 1,
      borderColor: '$borderColor'
    },
    gradient: {
      backgroundImage: 'linear-gradient(45deg, $primary, $secondary)'
    }
  },
  size: {
    small: {
      padding: '$3',
      gap: '$1'
    },
    medium: {
      padding: '$4',
      gap: '$2'
    },
    large: {
      padding: '$6',
      gap: '$3'
    }
  }
} as const

// İstatistik kartı
export const StatCard = styled(Stack, {
  name: 'StatCard',
  backgroundColor: '$surface',
  borderRadius: '$3',
  padding: '$4',
  gap: '$2',
  variants: statCardVariants,
  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})

// İstatistik başlığı
export const StatTitle = styled(Text, {
  name: 'StatTitle',
  fontSize: 14,
  fontWeight: '500',
  opacity: 0.7
})

const statValueVariants = {
  size: {
    small: {
      fontSize: 18
    },
    medium: {
      fontSize: 20
    },
    large: {
      fontSize: 24
    }
  },
  trend: {
    up: {
      color: '$success'
    },
    down: {
      color: '$error'
    },
    neutral: {
      color: '$color'
    }
  }
} as const

// İstatistik değeri
export const StatValue = styled(Text, {
  name: 'StatValue',
  fontSize: 20,
  fontWeight: '600',
  variants: statValueVariants,
  defaultVariants: {
    size: 'medium',
    trend: 'neutral'
  }
})

const statChangeVariants = {
  trend: {
    up: {
      color: '$success'
    },
    down: {
      color: '$error'
    },
    neutral: {
      color: '$gray600'
    }
  }
} as const

// İstatistik değişim yüzdesi
export const StatChange = styled(Text, {
  name: 'StatChange',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$1',
  fontSize: 12,
  fontWeight: '500',
  variants: statChangeVariants,
  defaultVariants: {
    trend: 'neutral'
  }
})

// İstatistik açıklaması
export const StatDescription = styled(Text, {
  name: 'StatDescription',
  fontSize: 12,
  opacity: 0.7,
  marginTop: '$1'
})

const statIconVariants = {
  variant: {
    default: {
      backgroundColor: '$gray100'
    },
    success: {
      backgroundColor: '$success100'
    },
    error: {
      backgroundColor: '$error100'
    },
    warning: {
      backgroundColor: '$warning100'
    }
  }
} as const

// İstatistik ikonu
export const StatIcon = styled(Stack, {
  name: 'StatIcon',
  width: 32,
  height: 32,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  variants: statIconVariants,
  defaultVariants: {
    variant: 'default'
  }
})

// İstatistik grafik alanı
export const StatChart = styled(Stack, {
  name: 'StatChart',
  height: 40,
  marginTop: '$2',
  opacity: 0.5
})

export type StatCardProps = GetProps<typeof StatCard>
export type StatCardVariants = keyof typeof statCardVariants
export type StatTitleProps = GetProps<typeof StatTitle>
export type StatValueProps = GetProps<typeof StatValue>
export type StatValueVariants = keyof typeof statValueVariants
export type StatChangeProps = GetProps<typeof StatChange>
export type StatChangeVariants = keyof typeof statChangeVariants
export type StatDescriptionProps = GetProps<typeof StatDescription>
export type StatIconProps = GetProps<typeof StatIcon>
export type StatIconVariants = keyof typeof statIconVariants
export type StatChartProps = GetProps<typeof StatChart> 