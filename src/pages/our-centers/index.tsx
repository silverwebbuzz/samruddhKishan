//@ts-nocheck
import { ReactNode } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
import { getLogoAPI } from 'src/slice/settingSlice'
import { getAllContent } from 'src/slice/contentSectionSlice'
import { getFooter } from 'src/slice/landingPageSlice'

const OurCentersPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { getContentData } = useSelector((state: any) => state?.rootReducer?.landingPageReducer)
  const dispatch = useDispatch<AppDispatch>()
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllContent())
    dispatch(getFooter())
  }, [])
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        BGImg={'/images/logo/slider1.jpg'}
        bannerName='Our Centers'
        bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
      />
      <AboutSection ourCenter={true} DATA={getContentData} JSONHandler={JSONHandler} />

      {/* Footer section start */}
      <FooterSection DATA={getContentData} LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      {/* Footer section end */}
    </>
  )
}
OurCentersPage.authGuard = false
OurCentersPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default OurCentersPage
