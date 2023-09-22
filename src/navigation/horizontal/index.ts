// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  //@ts-ignore
  const UserData = JSON.parse(localStorage.getItem('userData'))
  const roles = localStorage.getItem('role')
  const permissions = localStorage.getItem('Permission')
  //@ts-ignore
  let FilterPermissions = JSON?.parse(permissions ? permissions : null)
  //@ts-ignore

  let FilterRoles = JSON?.parse(roles ? roles : null)
  let ARRR = []

  const uniqueRoutes = (ARR: any) => {
    const uniqueArray = ARR.filter((value, index) => {
      // Check if the current object is the first occurrence in the array
      const firstIndex = ARR.findIndex(item => item.title === value.title)

      return index === firstIndex
    })
    return uniqueArray
  }
  //@ts-ignore
  const output = FilterRoles?.map(function (roleId, index) {
    FilterPermissions?.filter((permission: any) => {
      let ROLEID = JSON?.parse(roleId?.rolePermission)
      let ROLENAME = roleId?.roleType
      if (UserData?.role === ROLENAME) {
        ROLEID?.map((rID: any) => {
          if (rID == permission?.id) {
            ARRR.push(permission)
          }
        })
      }
    })
  })
  if (UserData?.role !== 'admin') {
    const Rout = [
      {
        title: 'Farmers',
        path: '/farmers',
        icon: 'game-icons:farmer'
      },
      {
        title: 'Users',
        path: '/users',
        action: 'read',
        subject: 'users',
        icon: 'ci:users'
      },
      {
        title: 'Brands',
        path: '/brands',
        action: 'read',
        subject: 'brands',
        icon: 'fluent:production-checkmark-24-regular'
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: 'tabler:category'
      },
      {
        title: 'Products',
        path: '/all-products',
        action: 'read',
        subject: 'all-products',
        icon: 'fluent-mdl2:b-i-dashboard'
      },
      {
        title: 'Services',
        path: '/all-services',
        action: 'read',
        subject: 'all-services',
        icon: 'carbon:ibm-cloud-hyper-protect-crypto-services'
      },
      {
        title: 'Inquiry',
        path: '/all-inquiry',
        action: 'read',
        subject: 'inquiry',
        icon: 'wpf:ask-question'
      },
      {
        title: 'CMS',
        icon: 'fluent:content-view-32-regular',
        children: [
          {
            title: 'Home Page',
            path: '/cms/home'
          },
          {
            title: 'FAQ',
            path: '/cms/faq'
          },
          {
            title: 'Testimonials',
            path: '/cms/testimonials'
          },
          {
            title: 'Footer',
            path: '/cms/footer'
          }
        ]
      },

      {
        title: 'Roles & Permissions',
        icon: 'grommet-icons:user-admin',

        children: [
          {
            title: 'Permissions',
            path: '/permissions'
          },
          { title: 'Role', path: '/roles' }
        ]
      }
    ]
    const FinalRoute = []
    const ABCG = Rout?.filter(r1 => {
      ARRR.map(r2 => {
        if (r1?.title == r2?.moduleName) {
          FinalRoute.push(r1)
        }
      })
    })

    return uniqueRoutes(FinalRoute)
  } else {
    return [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: 'fluent-mdl2:b-i-dashboard'
      },
      {
        title: 'Farmers',
        path: '/farmers',
        action: 'read',
        subject: 'farmers',
        icon: 'game-icons:farmer'
      },
      {
        title: 'Users',
        path: '/users',
        action: 'read',
        subject: 'users',
        icon: 'ci:users'
      },
      {
        title: 'Brands',
        path: '/brands',
        action: 'read',
        subject: 'brands',
        icon: 'fluent:production-checkmark-24-regular'
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: 'tabler:category'
      },
      {
        title: 'Products',
        path: '/all-products',
        action: 'read',
        subject: 'all-products',
        icon: 'fluent-mdl2:b-i-dashboard'
      },
      {
        title: 'Services',
        path: '/all-services',
        action: 'read',
        subject: 'all-services',
        icon: 'carbon:ibm-cloud-hyper-protect-crypto-services'
      },
      {
        title: 'Inquiry',
        path: '/all-inquiry',
        action: 'read',
        subject: 'inquiry',
        icon: 'wpf:ask-question'
      },

      { title: 'Settings', path: '/settings', action: 'read', subject: 'settings', icon: 'uil:setting' },
      {
        title: 'CMS',
        icon: 'fluent:content-view-32-regular',
        children: [
          {
            title: 'Home Page',
            path: '/cms/home'
          },
          {
            title: 'FAQ',
            path: '/cms/faq'
          },
          {
            title: 'Testimonials',
            path: '/cms/testimonials'
          },
          {
            title: 'Footer',
            path: '/cms/footer'
          }
        ]
      },

      {
        title: 'Roles & Permissions',
        icon: 'grommet-icons:user-admin',

        children: [
          {
            title: 'Permissions',
            path: '/permissions'
          },
          { title: 'role', path: '/roles' }
        ]
      }
    ]
  }
}

export default navigation
