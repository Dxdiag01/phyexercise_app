import { styled, GetProps } from 'tamagui'
import { Sheet } from 'tamagui'

const drawerVariants = {
  variant: {
    default: {
      backgroundColor: '$surface'
    },
    glass: {
      backgroundColor: '$backdrop',
      backdropFilter: 'blur(10px)'
    },
    dark: {
      backgroundColor: '$gray800'
    }
  }
} as const

export const Drawer = styled(Sheet, {
  name: 'Drawer',
  backgroundColor: '$surface',
  width: 300,
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  variants: drawerVariants,
  defaultVariants: {
    variant: 'default'
  }
})

// Drawer başlığı
export const DrawerHeader = styled(Sheet.Frame, {
  name: 'DrawerHeader',
  height: 56,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$4',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor'
})

// Drawer içerik alanı
export const DrawerContent = styled(Sheet.Frame, {
  name: 'DrawerContent',
  flex: 1,
  padding: '$4'
})

// Drawer menü öğesi
const drawerItemVariants = {
  active: {
    true: {
      backgroundColor: '$gray100'
    }
  }
} as const

export const DrawerItem = styled(Sheet.Frame, {
  name: 'DrawerItem',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '$4',
  gap: '$3',
  variants: drawerItemVariants,
  defaultVariants: {
    active: false
  }
})

// Drawer menü öğesi ikonu
const drawerItemIconVariants = {
  active: {
    true: {
      color: '$primary'
    },
    false: {
      color: '$gray500'
    }
  }
} as const

export const DrawerItemIcon = styled(Sheet.Frame, {
  name: 'DrawerItemIcon',
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
  variants: drawerItemIconVariants,
  defaultVariants: {
    active: false
  }
})

// Drawer menü öğesi etiketi
const drawerItemLabelVariants = {
  active: {
    true: {
      color: '$primary',
      fontWeight: '600'
    },
    false: {
      color: '$color',
      fontWeight: '400'
    }
  }
} as const

export const DrawerItemLabel = styled(Sheet.Frame, {
  name: 'DrawerItemLabel',
  flex: 1,
  variants: drawerItemLabelVariants,
  defaultVariants: {
    active: false
  }
})

// Drawer alt menü
export const DrawerFooter = styled(Sheet.Frame, {
  name: 'DrawerFooter',
  padding: '$4',
  borderTopWidth: 1,
  borderTopColor: '$borderColor'
})

export type DrawerProps = GetProps<typeof Drawer>
export type DrawerVariants = keyof typeof drawerVariants
export type DrawerItemProps = GetProps<typeof DrawerItem>
export type DrawerItemVariants = keyof typeof drawerItemVariants
export type DrawerItemIconProps = GetProps<typeof DrawerItemIcon>
export type DrawerItemIconVariants = keyof typeof drawerItemIconVariants
export type DrawerItemLabelProps = GetProps<typeof DrawerItemLabel> 