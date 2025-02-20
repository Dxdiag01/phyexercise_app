import { styled, GetProps } from 'tamagui'
import { Stack } from 'tamagui'

const dataGridVariants = {
  variant: {
    default: {
      backgroundColor: '$surface'
    },
    transparent: {
      backgroundColor: 'transparent'
    }
  },
  layout: {
    list: {
      flexDirection: 'column'
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    masonry: {
      flexDirection: 'column',
      flexWrap: 'wrap'
    }
  },
  gap: {
    small: {
      gap: '$2'
    },
    medium: {
      gap: '$4'
    },
    large: {
      gap: '$6'
    }
  }
} as const

// Ana grid konteyner
export const DataGrid = styled(Stack, {
  name: 'DataGrid',
  width: '100%',
  backgroundColor: '$surface',
  borderRadius: '$3',
  overflow: 'hidden',
  variants: dataGridVariants,
  defaultVariants: {
    variant: 'default',
    layout: 'grid',
    gap: 'medium'
  }
})

const dataGridItemVariants = {
  size: {
    small: {
      width: '33.33%',
      padding: '$2'
    },
    medium: {
      width: '50%',
      padding: '$3'
    },
    large: {
      width: '100%',
      padding: '$4'
    }
  },
  interactive: {
    true: {
      pressStyle: {
        scale: 0.98,
        opacity: 0.9
      },
      hoverStyle: {
        backgroundColor: '$gray100'
      }
    }
  }
} as const

// Grid öğesi
export const DataGridItem = styled(Stack, {
  name: 'DataGridItem',
  backgroundColor: '$surface',
  borderRadius: '$3',
  overflow: 'hidden',
  variants: dataGridItemVariants,
  defaultVariants: {
    size: 'medium',
    interactive: true
  }
})

// Grid öğe başlığı
export const DataGridItemHeader = styled(Stack, {
  name: 'DataGridItemHeader',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor'
})

// Grid öğe içeriği
export const DataGridItemContent = styled(Stack, {
  name: 'DataGridItemContent',
  padding: '$3',
  gap: '$2'
})

// Grid öğe altbilgisi
export const DataGridItemFooter = styled(Stack, {
  name: 'DataGridItemFooter',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3',
  borderTopWidth: 1,
  borderTopColor: '$borderColor'
})

// Grid filtreleme alanı
export const DataGridFilter = styled(Stack, {
  name: 'DataGridFilter',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$3',
  padding: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor'
})

// Grid sıralama alanı
export const DataGridSort = styled(Stack, {
  name: 'DataGridSort',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$2',
  padding: '$2',
  backgroundColor: '$gray100',
  borderRadius: '$2'
})

// Grid sayfalama
export const DataGridPagination = styled(Stack, {
  name: 'DataGridPagination',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  backgroundColor: '$gray100'
})

export type DataGridProps = GetProps<typeof DataGrid>
export type DataGridVariants = keyof typeof dataGridVariants
export type DataGridItemProps = GetProps<typeof DataGridItem>
export type DataGridItemVariants = keyof typeof dataGridItemVariants
export type DataGridItemHeaderProps = GetProps<typeof DataGridItemHeader>
export type DataGridItemContentProps = GetProps<typeof DataGridItemContent>
export type DataGridItemFooterProps = GetProps<typeof DataGridItemFooter>
export type DataGridFilterProps = GetProps<typeof DataGridFilter>
export type DataGridSortProps = GetProps<typeof DataGridSort>
export type DataGridPaginationProps = GetProps<typeof DataGridPagination> 