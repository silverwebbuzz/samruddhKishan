// ** MUI Imports
//@ts-nocheck
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getFooter } from 'src/slice/landingPageSlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import ContactSection from 'src/views/components/landdingPage/contactSection'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import Topbar from 'src/views/components/topbar'

const ContactPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { getFooterData, getContentData } = useSelector((state: any) => state?.rootReducer?.landingPageReducer)

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getFooter())
  }, [])
  return (
    <>
      <Topbar data={getContentData} />

      <Navbar LOGO={getLogo?.logo} />
      <div className='contact-page'>
        <PageBanner
          height={200}
          BGImg={'/images/logo/slider6.jpg'}
          bannerName='Contact Us'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
        {/* Contact section start */}
        <ContactSection JSONHandler={JSONHandler} />
        {/* Contact section end */}
      </div>
      {/* Footer section start */}
      <FooterSection DATA={getFooterData?.data} LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      {/* Footer section end */}
    </>
  )
}
// AboutPage.guestGuard = true
ContactPage.authGuard = false
ContactPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ContactPage
