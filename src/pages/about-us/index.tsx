// ** MUI Imports
//@ts-nocheck
import { useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import GetToKnow from 'src/views/components/landdingPage/getKnow/GetKnown'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import TestimonialSection from 'src/views/components/landdingPage/testimonialSection/TestimonialSection'

const AboutPage = () => {
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='about-page'>
        <PageBanner
          BGImg={'/images/logo/slider1.jpg'}
          bannerName='About Us'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
        {/* About section start */}
        <AboutSection />
        {/* About section end */}
        {/* Testimonial section start */}
        <TestimonialSection />
        {/* Testimonial section end */}
        {/* About section start */}
        <GetToKnow />
        {/* About section end */}
      </div>
      {/* Footer section start */}
      <FooterSection />
      {/* Footer section end */}
    </>
  )
}
// AboutPage.guestGuard = true
AboutPage.authGuard = false
AboutPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default AboutPage
