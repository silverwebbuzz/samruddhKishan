//@ts-nocheck

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
const navigation = (): VerticalNavItemsType => {
  //@ts-ignore
  const UserData = JSON.parse(localStorage.getItem('userData'))
  const roles = localStorage.getItem('role')
  const permissions = localStorage.getItem('Permission')
  //@ts-ignore
  let FilterPermissions = JSON?.parse(permissions ? permissions : null)
  //@ts-ignore

  let FilterRoles = JSON?.parse(roles ? roles : null)
  let ARRR = []
  //@ts-ignore
  const output = FilterRoles?.map(function (roleId, index) {
    FilterPermissions?.filter((permission: any) => {
      let ROLEID = JSON?.parse(roleId?.rolePermission)
      let ROLENAME = roleId?.roleType
      if (UserData?.role === ROLENAME) {
        ROLEID?.map((rID: any) => {
          if (rID == permission?.id) {
            // console.log(ROLENAME, permission)
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
        icon: 'ci:users'
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
    return FinalRoute
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
      },
      {
        title: 'Landing Page Content',
        path: '/landing-page-content',
        icon: 'fluent:content-view-32-regular'
      },
      {
        title: 'Products',
        path: '/products',
        icon: 'fluent-mdl2:b-i-dashboard'
      },
      {
        title: 'Categories',
        path: '/categories',
        icon: 'tabler:category'
      }
    ]
  }
}

export default navigation
