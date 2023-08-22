// ** MUI Imports
//@ts-nocheck
import { useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ContactSection from 'src/views/components/landdingPage/contactSection'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

const ContactPage = () => {
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='contact-page'>
        <PageBanner
          BGImg={'/images/logo/slider6.jpg'}
          bannerName='Contact Us'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
        {/* Contact section start */}
        <ContactSection />
        {/* Contact section end */}
      </div>
      {/* Footer section start */}
      <FooterSection />
      {/* Footer section end */}
    </>
  )
}
// AboutPage.guestGuard = true
ContactPage.authGuard = false
ContactPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ContactPage
