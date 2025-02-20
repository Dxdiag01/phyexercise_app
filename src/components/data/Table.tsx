import { styled } from 'tamagui'
import { Stack } from 'tamagui'

// Tablo konteyner
export const Table = styled(Stack, {
  name: 'Table',
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  overflow: 'hidden',

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
        borderRadius: 4
      },
      medium: {
        borderRadius: 8
      },
      large: {
        borderRadius: 12
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'medium'
  } as const
})

// Tablo başlık satırı
export const TableHeader = styled(Stack, {
  flexDirection: 'row',
  backgroundColor: '#F7FAFC',
  borderBottomWidth: 1,
  borderBottomColor: '#E2E8F0',
  padding: 12
})

// Tablo başlık hücresi
export const TableHeaderCell = styled(Stack, {
  flex: 1,
  paddingVertical: 8,
  paddingHorizontal: 12,

  variants: {
    align: {
      left: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      right: {
        alignItems: 'flex-end'
      }
    }
  } as const,

  defaultVariants: {
    align: 'left'
  } as const
})

// Tablo satırı
export const TableRow = styled(Stack, {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#E2E8F0',

  variants: {
    selected: {
      true: {
        backgroundColor: '#EBF8FF'
      }
    },
    hoverable: {
      true: {
        hoverStyle: {
          backgroundColor: '#F7FAFC'
        }
      }
    }
  } as const,

  defaultVariants: {
    selected: false,
    hoverable: true
  } as const
})

// Tablo hücresi
export const TableCell = styled(Stack, {
  flex: 1,
  paddingVertical: 12,
  paddingHorizontal: 12,

  variants: {
    align: {
      left: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      right: {
        alignItems: 'flex-end'
      }
    }
  } as const,

  defaultVariants: {
    align: 'left'
  } as const
})

// Tablo altbilgi
export const TableFooter = styled(Stack, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 12,
  borderTopWidth: 1,
  borderTopColor: '#E2E8F0',
  backgroundColor: '#F7FAFC'
})

// Tablo boş durumu
export const TableEmpty = styled(Stack, {
  padding: 24,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F7FAFC'
})

// Tablo yükleniyor durumu
export const TableLoading = styled(Stack, {
  padding: 24,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F7FAFC'
}) 