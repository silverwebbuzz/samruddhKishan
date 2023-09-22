// import { Box, Button, Card, Chip, Divider, Grid, TextField, Typography } from '@mui/material'
// import { Form, Formik, FormikProps } from 'formik'
// import { useRouter } from 'next/router'
// import { ReactNode, useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import { createInquiry } from 'src/slice/inquirySlice'
// import { getLogoAPI } from 'src/slice/settingSlice'
// import { AppDispatch } from 'src/store/store'
// import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
// import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

// const inqury = () => {
//   const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
//   const dispatch = useDispatch<AppDispatch>()
//   const [InquryName, setInquryName] = useState('')
//   const router = useRouter()
//   const isValid = (inquryName: any) => {
//     try {
//       return JSON.parse(inquryName)
//     } catch (e) {
//       console.log('Error parsing')
//     }
//   }
//   useEffect(() => {
//     const inquryName = localStorage.getItem('inquryName')
//     const NAME = isValid(inquryName)
//     setInquryName(NAME)
//     dispatch(getLogoAPI())
//   }, [])

//   return (
//     <>
//       <Navbar LOGO={getLogo?.logo} />
//       <div className='products-page'>
//         <PageBanner
//           BGImg='/images/logo/slider2.jpg'
//           bannerName='Inqury'
//           bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
//         />
//       </div>
//       <section>
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Name :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.productName}</Typography>
//         </Box>
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Code :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.productCode}</Typography>
//         </Box>
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Units :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.productUnits}</Typography>
//         </Box>{' '}
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Min Price :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.minPrice}</Typography>
//         </Box>
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Max Price :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.maxPrice}</Typography>
//         </Box>
//         <Box sx={{ display: 'flex' }}>
//           <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Description :</Typography> &nbsp;
//           <Typography sx={{ mb: 4 }}>{InquryName?.productDescription}</Typography>
//         </Box>
//       </section>
//     </>
//   )
// }
// inqury.authGuard = false
// inqury.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// export default inqury

import { Box, Button, Card, CardContent, Chip, Divider, Grid, TextField, Typography } from '@mui/material'
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

const inqury = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [InquryName, setInquryName] = useState('')

  const router = useRouter()
  const isValid = (inquryName: any) => {
    try {
      return JSON.parse(inquryName)
    } catch (e) {
      console.log('Error parsing')
    }
  }
  useEffect(() => {
    const inquryName = localStorage.getItem('inquryName')
    const NAME = isValid(inquryName)
    setInquryName(NAME)
    dispatch(getLogoAPI())
  }, [])

  console.log(InquryName, 'InquryName')
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner
          BGImg='/images/logo/slider2.jpg'
          bannerName={InquryName?.productName ? 'Product Details' : 'Service Details'}
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
      <section>
        {InquryName?.productName ? (
          <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
            <Card sx={{ width: '60%' }}>
              <Typography sx={{ mt: '20px' }} variant='h4' textAlign='center'>
                Product Details
              </Typography>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                  <img src={InquryName?.productImage} width='200px' height='200px' style={{ borderRadius: '50%' }} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Name :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.productName}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Code :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.productCode}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Units :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.productUnits}</Typography>
                  </Grid>
                </Box>{' '}
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Min Price :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.minPrice}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Max Price :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.maxPrice}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Product Description :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.productShort}</Typography>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ) : InquryName?.serviceName ? (
          <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
            <Card sx={{ width: '60%' }}>
              <Typography sx={{ mt: '20px' }} variant='h4' textAlign='center'>
                Service Details
              </Typography>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                  <img
                    src={InquryName?.serviceBannerImage}
                    width='200px'
                    height='200px'
                    style={{ borderRadius: '50%' }}
                  />
                </Box>
                {/* <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Full Name</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>
                      {InquryName?.firstName} {InquryName?.lastName}
                    </Typography>
                  </Grid>
                </Box> */}
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Service Name :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.serviceName}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Min Order Quantity:</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.minOrderQuantity}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Category Name :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4 }}>{InquryName?.categoryName}</Typography>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Grid md={6}>
                    <Typography sx={{ mb: 4, fontWeight: 'bold' }}>Service Description :</Typography> &nbsp;
                  </Grid>
                  <Grid md={6}>
                    <div
                      className='single_service_card_desc'
                      dangerouslySetInnerHTML={{ __html: InquryName?.serviceDetails }}
                    ></div>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
      </section>
    </>
  )
}
inqury.authGuard = false
inqury.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default inqury
