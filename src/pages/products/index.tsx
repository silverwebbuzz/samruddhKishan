import React, { useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, Select, MenuItem, IconButton, Tooltip, SvgIcon } from '@mui/material'

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
import { getAllCategoriesForSelect } from 'src/slice/categoriesSlice'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { allProductsData } = useSelector((state: any) => state?.rootReducer?.productReducer)
  const [selectedCategory, setSelectedCategory] = useState('All') // State for selected category filter
  const { getCategoriesForSelect } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const router = useRouter()
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllCategoriesForSelect())
  }, [])
  useEffect(() => {
    const payload = {
      categoryId: selectedCategory
    }
    dispatch(getAllProducts(payload))
  }, [selectedCategory])
  const chunkArray = (array, chunkSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const chunkedProducts = chunkArray(allProductsData?.data || [], 3)

  function TruncateText({ text, maxLength = 60 }) {
    const [isTruncated, setIsTruncated] = useState(true)

    const toggleTruncate = () => {
      setIsTruncated(!isTruncated)
    }
    return (
      <div>
        {isTruncated ? (
          <div>
            <p>
              {text?.slice(0, maxLength)}{' '}
              {text?.length > 60 ? (
                <span style={{ color: '#1f4e3d', fontWeight: 'bold' }} onClick={toggleTruncate}>
                  Show More
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
        ) : (
          <div>
            <p>
              {text}{' '}
              <span style={{ color: '#1f4e3d', fontWeight: 'bold' }} onClick={toggleTruncate}>
                {' '}
                Show Less
              </span>
            </p>
          </div>
        )}
      </div>
    )
  }
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner
          BGImg='/images/logo/slider2.jpg'
          bannerName='Products'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
'
        />
      </div>
      <section
        style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginTop: '20px', // Add margin to the top
          marginBottom: '20px' // Add margin to the bottom
          // padding: 0
        }}
      >
        <Sidebar
          DATA={getCategoriesForSelect?.data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div
          style={{
            overflowY: 'auto',
            height: '100vh',
            // display: 'flex',
            flexWrap: 'wrap',
            marginLeft: '20px',
            width: 'calc(100% - 350px)'
          }}
          className='custom-scroll-container'
        >
          {chunkedProducts?.map((chunk, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px'
              }}
            >
              {chunk.map((item: any) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      border: '1px solid',
                      backgroundColor: '#ffffff',
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '300px'
                    }}
                  >
                    <CardContent
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px'
                      }}
                    >
                      <img
                        src={item?.productImage}
                        style={{
                          borderRadius: '50%',
                          aspectRatio: 1,
                          objectFit: 'cover'
                        }}
                        height={150}
                        width={150}
                        alt={item?.productName}
                      />

                      <TruncateText text={item?.productShort} />
                    </CardContent>
                    <Box
                      sx={{
                        backgroundColor: '#1f4e3d',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '50px'
                      }}
                    >
                      <p
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          margin: '0',
                          paddingLeft: '10px'
                        }}
                      >
                        {item?.productName}
                      </p>
                      <Box
                        sx={{
                          alignItems: 'start'
                        }}
                      >
                        <Tooltip title='View'>
                          <IconButton
                            size='small'
                            sx={{ color: 'text.secondary' }}
                            onClick={() => {
                              // handleClickOpenDelete()
                              // setDeleteID(row?.id)
                              // setDelelteField(row?.brandName)
                            }}
                          >
                            {/* <Icon icon={} />
                             */}
                            <Icon icon='carbon:view' color='white' fontSize={24} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Inqury'>
                          <IconButton
                            size='small'
                            sx={{ color: 'text.secondary', fontSize: '50px' }}
                            onClick={() => {
                              localStorage.setItem('inquryName', JSON.stringify(item))
                              router.push('/inqury')
                            }}
                          >
                            <Icon icon='ph:question-bold' color='white' fontSize={24} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

ProductsPage.authGuard = false
ProductsPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ProductsPage
