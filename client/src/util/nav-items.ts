import { FaCompass, FaHome, FaKey } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

export type NavItem = {
  icon: IconType
  label: string
  path: string
  showInFooter: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    icon: FaHome,
    label: 'Feed',
    path: '/',
    showInFooter: true
  },
  {
    icon: FaCompass,
    label: 'Explore',
    path: '/explore',
    showInFooter: true
  },
  {
    icon: FaKey,
    label: 'Log in',
    path: '/login',
    showInFooter: true
  }
]
