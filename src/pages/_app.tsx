// ** React Imports
import { ReactNode, createContext, useEffect, useState } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import '../../styles/slider.css'
import '../../styles/about.css'

import { Provider } from 'react-redux'
import store from 'src/store/store'
import axios from 'axios'
import { NextPage } from 'next/types'
import { AppProps } from 'next/dist/shared/lib/router/router'
// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage | any
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}
export const MyContext = createContext<any | undefined>(undefined)
interface SeoData {
  applicationTitle: string
  applicationName: string
  metaDescription: string
  metaKeywords?: string
}
// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...rest } = props
  const [district, setDistrict] = useState('')
  const [seoData, setSeoData] = useState<SeoData>()
  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? ((page: any) => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  const getSeoData = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/getSingleSetting`)
      setSeoData(response?.data?.data?.[0])
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  useEffect(() => {
    getSeoData()
  }, [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/getLogo`)
      .then(response => response.json())
      .then(data => {
        const faviconUrl = data?.data?.favIcon
        const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link')
        link.type = 'image/x-icon'
        link.rel = 'icon'
        link.href = faviconUrl
        document.head.appendChild(link)
      })
  }, [])
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{seoData?.applicationTitle}</title>
          <meta
            name='description'
            content={`${seoData?.applicationName ? seoData?.applicationName : seoData?.applicationTitle} - ${
              seoData?.metaDescription
            }`}
          />
          <meta name='keywords' content={seoData?.metaKeywords} />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Head>

        <AuthProvider>
          <MyContext.Provider
            value={{
              district,
              setDistrict
            }}
          >
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                          {getLayout(<Component {...pageProps} />)}
                        </AclGuard>
                      </Guard>
                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                      </ReactHotToast>
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </MyContext.Provider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
