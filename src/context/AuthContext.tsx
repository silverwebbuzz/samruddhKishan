// // ** React Imports
// import { createContext, useEffect, useState, ReactNode } from 'react'

// // ** Next Import
// import { useRouter } from 'next/router'

// // ** Axios
// import axios from 'axios'

// // ** Config
// import authConfig from 'src/configs/auth'

// // ** Types
// import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// // ** Defaults
// const defaultProvider: AuthValuesType = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

// const AuthContext = createContext(defaultProvider)

// type Props = {
//   children: ReactNode
// }

// const AuthProvider = ({ children }: Props) => {
//   // ** States
//   const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
//   const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

//   // ** Hooks
//   const router = useRouter()

//   useEffect(() => {
//     const initAuth = async (): Promise<void> => {
//       const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)!
//       if (storedToken) {
//         setLoading(true)
//         router.push('/dashboard')
//         // await axios
//         //   .get(authConfig.meEndpoint, {
//         //     headers: {
//         //       Authorization: storedToken
//         //     }
//         //   })
//         //   .then(async response => {
//         //     setLoading(false)
//         setUser({ ...user, role: 'admin' })
//         //   })
//         //   .catch(() => {
//         //     setUser(null)
//         //     setLoading(false)
//         //   })
//       } else {
//         setLoading(false)
//       }
//     }

//     initAuth()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json'
//   }
//   const handleLogin = (params: LoginParams) => {
//     console.log('parsing login', params)
//     axios
//       .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, params, { headers })
//       .then(async response => {
//         const returnUrl = router.query.returnUrl
//         console.log('response', response)

//         setUser({ ...response.data.userData })

//         const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

//         router.replace(redirectURL as string)
//       })

//       .catch(err => {
//         console.log(err)
//       })
//   }

//   const handleLogout = () => {
//     setUser(null)
//     router.push('/login')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login: handleLogin,
//     logout: handleLogout
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { toast } from 'react-hot-toast'
import { getRoleAndPermissions } from 'src/slice/farmers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import { useSelector } from 'react-redux'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const dispatch = useDispatch<AppDispatch>()
  // ** Hooks
  const router = useRouter()
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = localStorage.getItem('accessToken')
      //@ts-ignore
      const UserData = JSON.parse(localStorage.getItem('userData'))

      if (storedToken && UserData) {
        setLoading(false)
        if (router.pathname) {
          setUser({ ...UserData })
          router.push(router.pathname)
        }
      } else {
        setUser(null)
        setLoading(false)
        if (router.pathname.includes('super-admin')) {
          router.replace('/super-admin/login')
        } else if (router.pathname === 'login') {
          router.replace('/login')
        } else {
          router.push(router.pathname)
        }
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {

  // }, [])
  const getAllPermissions = async () => {
    const permissions = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/GetAllPermission`, {
      headers
    })
    localStorage.setItem('Permission', JSON.stringify(permissions?.data?.data))
  }
  const handleOtherRoles = () => {
    dispatch(getRoleAndPermissions())
      .then(response => {
        localStorage.setItem('role', JSON.stringify(response.payload))
      })
      .then((res: any) => getAllPermissions())
  }
  const handleLoginSuccess = (response: any) => {
    setLoading(false)
    const returnUrl = router.query.returnUrl
    setUser({ ...response?.data?.data })
    let USER_DATA = response?.data?.data
    let TOKEN = response?.data?.data?.token
    localStorage.setItem('userData', JSON.stringify(USER_DATA))
    localStorage.setItem('accessToken', TOKEN)
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    router.replace(redirectURL as string)
    setLoading(false)
  }

  const handleLogin = ({ email, password, UserType }: any) => {
    const payload = {
      email: email,
      password: password
    }
    if (UserType === 'super-admin') {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`, payload, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .then(async response => {
          if (response?.data?.status === 200) {
            handleLoginSuccess(response)
          } else if (response?.data?.status === 401) {
            toast.error(response.data.message)
          } else {
            toast.error(response.data.message ? response.data.message : 'somthing went wrong')
          }
        })
        .catch(err => {
          console.log('ERROR: ', err)
        })
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/UserLogin`, payload, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .then(async response => {
          if (response?.data?.status === 200) {
            handleLoginSuccess(response)
            handleOtherRoles()
          } else if (response?.data?.status === 401) {
            toast.error(response.data.message)
          } else {
            toast.error(response.data.message ? response.data.message : 'somthing went wrong')
          }
        })
        .catch(err => {
          console.log('ERROR: ', err)
        })
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
