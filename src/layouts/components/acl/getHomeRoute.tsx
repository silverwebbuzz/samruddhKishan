/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') {
    return '/acl'
  } else if (role === 'supervisor') {
    return '/farmers'
  } else return '/dashboard'
}

export default getHomeRoute
