import { Box, Button, Card, CardContent, Chip, Divider, Grid, Tab, TextField, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { createInquiry } from 'src/slice/inquirySlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

import { Autoplay, Pagination, Navigation, EffectFade, FreeMode } from 'swiper/modules'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import { getFooter } from 'src/slice/landingPageSlice'
const Details = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [InquryName, setInquryName] = useState('')
  const [value, setValue] = useState('1')
  const { getFooterData } = useSelector((state: any) => state?.rootReducer?.landingPageReducer)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const router = useRouter()
  const isValid = (inquryName: any) => {
    try {
      return JSON.parse(inquryName)
    } catch (e) {
      console.log('Error parsing')
    }
  }
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  useEffect(() => {
    const inquryName = localStorage.getItem('inquryName')
    const NAME = isValid(inquryName)
    setInquryName(NAME)
    dispatch(getLogoAPI())
    dispatch(getFooter())
  }, [])
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner
          height={200}
          BGImg='/images/logo/slider2.jpg'
          bannerName={InquryName?.productName ? 'Product Details' : 'Service Details'}
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
      <section>
        {InquryName?.productName ? (
          <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
            <Card sx={{ width: { md: '70%', sm: '90%', xs: '90%' } }}>
              <CardContent>
                <Grid container>
                  <Grid md={6} xs={12}>
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      pagination={{
                        clickable: true
                      }}
                      navigation={true}
                      className='mySwiper main_product_slider'
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                      }}
                      slidesPerView={1}
                    >
                      <SwiperSlide className='product_body_slider'>
                        <img
                          className='product_image_slider'
                          src={
                            'https://images.unsplash.com/photo-1682695795255-b236b1f1267d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
                          }
                        />
                      </SwiperSlide>
                      <SwiperSlide className='product_body_slider'>
                        <img
                          className='product_image_slider'
                          src={
                            'https://plus.unsplash.com/premium_photo-1675813861705-ad5679e4f2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
                          }
                        />
                      </SwiperSlide>
                      <SwiperSlide className='product_body_slider'>
                        <img
                          className='product_image_slider'
                          src={
                            'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1675&q=80'
                          }
                        />
                      </SwiperSlide>
                      <SwiperSlide className='product_body_slider'>
                        <img
                          className='product_image_slider'
                          src={
                            'https://images.unsplash.com/photo-1682687220945-922198770e60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
                          }
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant='h4' sx={{ mb: 1, mt: { xs: 2 }, textAlign: { xs: 'center' } }}>
                        {InquryName?.productName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Price Range : </Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>
                          &#8377; {InquryName?.minPrice} to &#8377; {InquryName?.maxPrice}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Available Stock :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.availbilityStock}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Brand Name :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.brandName}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Categories :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.categoryName}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Product Code :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.productCode}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Product Units :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.productUnits}</Typography>
                      </Grid>
                    </Box>{' '}
                  </Grid>
                </Grid>
                <Grid>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                          <Tab label='Description' value='1' />
                          <Tab label='specification' value='2' />
                        </TabList>
                      </Box>
                      <TabPanel value='1'>
                        {' '}
                        <div
                          className='product_details_description'
                          dangerouslySetInnerHTML={{ __html: InquryName?.productShort }}
                        />
                      </TabPanel>
                      <TabPanel value='2'>
                        {JSONHandler(InquryName?.specification).map(item => {
                          return (
                            <Box sx={{ display: 'flex' }}>
                              <Grid md={6} sm={6}>
                                <Typography sx={{ mb: 1, fontWeight: 'bold' }}>{item?.title} :</Typography> &nbsp;
                              </Grid>
                              <Grid md={6} sm={6}>
                                <Typography sx={{ mb: 1 }}>{item?.value}</Typography>
                              </Grid>
                            </Box>
                          )
                        })}
                      </TabPanel>
                    </TabContext>
                  </Box>
                  {/* <Box sx={{ display: 'flex', mt: 2, ml: { xs: 0, md: 5, sx: 0 } }}>
                    <Grid container>
                      <Grid md={2}>
                        <Typography sx={{ fontWeight: 'bold' }}>Product Description :</Typography>
                      </Grid>
                      <Grid md={10}>
                        <div
                          className='product_details_description'
                          dangerouslySetInnerHTML={{ __html: InquryName?.productShort }}
                        />
                      </Grid>
                    </Grid>
                  </Box> */}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : InquryName?.serviceName ? (
          <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
            <Card sx={{ width: { md: '70%', sm: '90%', xs: '90%' } }}>
              <CardContent>
                <Grid container>
                  <Grid md={6} xs={12}>
                    <Box sx={{ mr: { md: 4, xs: 0, sm: 2 } }}>
                      <img
                        style={{ borderRadius: '10px', objectFit: 'cover', height: '100%' }}
                        className='service_image'
                        width={'100%'}
                        src={InquryName?.serviceBannerImage}
                        alt=''
                      />
                    </Box>
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant='h4' sx={{ mb: 1, mt: { xs: 2 }, textAlign: { xs: 'center' } }}>
                        {InquryName?.serviceName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Min Order Quantity :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.minOrderQuantity}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Available Days :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>
                          {InquryName?.availabilityStartDay} to {InquryName?.availabilityEndDay}
                        </Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Categories :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.categoryName}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>serviceLocation :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.serviceLocation}</Typography>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>serviceType :</Typography> &nbsp;
                      </Grid>
                      <Grid md={6} sm={6}>
                        <Typography sx={{ mb: 1 }}>{InquryName?.serviceType}</Typography>
                      </Grid>
                    </Box>{' '}
                  </Grid>
                </Grid>
                <Grid>
                  <Divider sx={{ my: 3 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>Service Description :</Typography>
                    <div
                      className='product_details_description'
                      dangerouslySetInnerHTML={{ __html: InquryName?.serviceDetails }}
                    />
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
      </section>
      <FooterSection DATA={getFooterData?.data} LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
    </>
  )
}
Details.authGuard = false
Details.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Details
