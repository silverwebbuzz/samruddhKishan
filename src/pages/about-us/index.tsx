// ** MUI Imports
//@ts-nocheck
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getAllContent } from 'src/slice/contentSectionSlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import GetToKnow from 'src/views/components/landdingPage/getKnow/GetKnown'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import TestimonialSection from 'src/views/components/landdingPage/testimonialSection/TestimonialSection'
import Topbar from 'src/views/components/topbar'

const AboutPage = () => {
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
  }, [])
  return (
    <>
      <Topbar data={getContentData} />
      <Navbar LOGO={getLogo?.logo} />
      <div className='about-page'>
        <PageBanner
          height={200}
          BGImg={'/images/logo/slider1.jpg'}
          bannerName='About Us'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
        {/* About section start */}
        <AboutSection DATA={getContentData} JSONHandler={JSONHandler} />
        {/* About section end */}
        {/* Testimonial section start */}
        {/* <TestimonialSection DATA={getContentData} JSONHandler={JSONHandler} /> */}
        {/* Testimonial section end */}
        {/* About section start */}
        <GetToKnow DATA={getContentData} JSONHandler={JSONHandler} />
        {/* About section end */}
      </div>
      {/* Footer section start */}
      <FooterSection DATA={getContentData} LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      {/* Footer section end */}
    </>
  )
}
// AboutPage.guestGuard = true
AboutPage.authGuard = false
AboutPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default AboutPage
