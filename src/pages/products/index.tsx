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

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  useEffect(() => {
    dispatch(getLogoAPI())
  }, [])
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner BGImg={'/images/logo/slider2.jpg'} bannerName='Products' />
      </div>
    </>
  )
}
ProductsPage.authGuard = false
ProductsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ProductsPage
