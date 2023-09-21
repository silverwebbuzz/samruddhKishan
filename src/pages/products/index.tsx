import React, { useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getAllProducts } from 'src/slice/productSlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import Sidebar from 'src/views/components/sidebar'

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { allProductsData } = useSelector((state: any) => state?.rootReducer?.productReducer)
  const [selectedCategory, setSelectedCategory] = useState('All') // State for selected category filter

  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner BGImg={'/images/logo/slider2.jpg'} bannerName='Products' />
      </div>
      <section
        style={{
          display: 'flex',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginTop: '20px', // Add margin to the top
          marginBottom: '20px', // Add margin to the bottom
          padding: 0
        }}
      >
        {/* Add the Sidebar component */}
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div
          style={{
            overflowY: 'auto',
            height: '100vh'
          }}
          className='custom-scroll-container'
        >
          <Grid xs={12} style={{ marginLeft: '20px' }}>
            {allProductsData?.data?.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    border: '1px solid',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px' // Adjust the width as per your requirements
                  }}
                >
                  <CardContent
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item?.productImage}
                      style={{
                        borderRadius: '50%',
                        aspectRatio: 1,
                        objectFit: 'cover'
                      }}
                      height={200}
                      width={200}
                      alt={item?.productName}
                    />

                    <p
                      style={{
                        textAlign: 'justify'
                      }}
                    >
                      {item?.productShort}
                    </p>
                  </CardContent>
                  <Box
                    sx={{
                      backgroundColor: '#1f4e3d',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant='body1'
                      style={{
                        color: '#fff',
                        textAlign: 'justify'
                      }}
                    >
                      {item?.productName}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </>
  )
}

ProductsPage.authGuard = false
ProductsPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ProductsPage
