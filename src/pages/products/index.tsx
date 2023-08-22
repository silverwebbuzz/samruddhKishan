// ** MUI Imports
//@ts-nocheck
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <div className='products-page'>
        <PageBanner
          BGImg={'/images/logo/slider2.jpg'}
          bannerName='Products'
          //   bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
    </>
  )
}
// AboutPage.guestGuard = true
ProductsPage.authGuard = false
ProductsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default ProductsPage
