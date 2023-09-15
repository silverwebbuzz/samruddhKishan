// ** MUI Imports
//@ts-nocheck
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

const ServicesPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getLogoAPI())
  }, [])
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='services-page'>
        <PageBanner
          BGImg={'/images/logo/slider3.jpg'}
          bannerName='Services'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
    </>
  )
}
// AboutPage.guestGuard = true
ServicesPage.authGuard = false
ServicesPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ServicesPage
