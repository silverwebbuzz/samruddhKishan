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
  console.log('ABCD', UserData?.role, FilterRoles)
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
        // action: 'read',
        // subject: 'farmers',
        icon: 'tabler:smart-home'
      },
      {
        title: 'Users',
        path: '/users',
        // action: 'read',
        // subject: 'users',
        icon: 'tabler:smart-home'
      }
    ]
    const FinalRoute = []
    const ABCG = Rout?.filter(r1 => {
      ARRR.map(r2 => {
        if (r1?.title == r2?.moduleName) {
          console.log(' r2?.moduleName---->', r2?.moduleName)
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
  }
}

export default navigation
