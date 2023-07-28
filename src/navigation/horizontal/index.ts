// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Farmers',
    path: '/farmers',
    action: 'read',
    subject: 'farmers',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Users',
    path: '/users',
    action: 'read',
    subject: 'users',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Roles & Permissions',
    icon: 'tabler:settings',
    children: [
      {
        title: 'Roles',
        path: '/roles'
      },
      {
        title: 'Permissions',
        path: '/permissions'
      }
    ]
  }
]

export default navigation
