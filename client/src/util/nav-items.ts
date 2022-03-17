import { FaCompass, FaHome, FaKey, FaUserCircle } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

export type NavItem = {
  icon: IconType
  label: string
  path: string
  loginRequired?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    icon: FaHome,
    label: 'Home',
    path: '/'
  },
  {
    icon: FaCompass,
    label: 'Explore',
    path: '/explore'
  },
  {
    icon: FaUserCircle,
    label: 'Profile',
    path: '/profile'
  }
]

export const LOGIN_NAV_ITEM: NavItem = {
  icon: FaKey,
  label: 'Log in',
  path: '/login'
}
