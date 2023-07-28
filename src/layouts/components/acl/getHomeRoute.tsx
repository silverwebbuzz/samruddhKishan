/**
 *  Set Home URL based on User Roles
 */

const getHomeRoute = (role: string) => {
  // const roles = localStorage.getItem('role')
  // let FilterRoles = JSON?.parse(roles ? roles : null)
  // FilterRoles?.map(function (roleId: any, index: any) {
  if (role === 'client') {
    return '/acl'
  } else if (role === 'admin') {
    return '/dashboard'
  } else {
    return '/farmers'
  }
}

export default getHomeRoute
