import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { flexbox } from '@mui/system'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getAllCategoriesForSelect } from 'src/slice/categoriesSlice'
import { getAllServices } from 'src/slice/servicesSlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import Sidebar from 'src/views/components/sidebar'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
const ServicesPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const [selectedCategory, setSelectedCategory] = useState('')
  const { getCategoriesForSelect } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { servicesData } = useSelector((state: any) => state?.rootReducer?.servicesReducer)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllCategoriesForSelect())
    localStorage.removeItem('inquryName')
  }, [])

  useEffect(() => {
    const payload = {
      categoryId: selectedCategory
    }
    dispatch(getAllServices(payload))
  }, [selectedCategory])

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
      <section
        style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginTop: '20px',
          marginBottom: '20px'
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
            backgroundColor: '#ffffff',
            height: '100vh',
            flexWrap: 'wrap',
            marginLeft: '20px',
            width: 'calc(100% - 350px)',
            display: 'flex'
          }}
          className='custom-scroll-container'
        >
          {servicesData?.data?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  border: '1px solid',
                  backgroundColor: '#ffffff',
                  height: '400px',
                  display: 'flex',
                  marginLeft: '20px',
                  flexDirection: 'column',
                  width: '300px', // Adjust the width as per your requirements
                  marginBottom: '20px' // Add margin between cards
                }}
              >
                <CardContent
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-beteen',
                    alignItems: 'center',
                    padding: '40px'
                  }}
                >
                  <img
                    src={item?.serviceBannerImage}
                    style={{
                      borderRadius: '50%',
                      aspectRatio: 1,
                      objectFit: 'cover'
                    }}
                    height={150}
                    width={150}
                    alt={item?.productName}
                  />
                  <div dangerouslySetInnerHTML={{ __html: item?.serviceDetails }}></div>
                </CardContent>
                <Box
                  sx={{
                    backgroundColor: '#1f4e3d',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // padding: '10px 0',
                    height: '60px'
                  }}
                >
                  <p
                    style={{
                      color: '#fff',
                      margin: '0',
                      // textAlign: 'center',
                      paddingLeft: '10px'
                    }}
                  >
                    {item?.serviceName}
                  </p>
                  <Box
                    sx={{
                      display: 'flex'
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
                    <Tooltip
                      title='Inqury'
                      onClick={() => {
                        localStorage.setItem('inquryName', JSON.stringify(item))
                        router.push('/inqury')
                      }}
                    >
                      <IconButton size='small' sx={{ color: 'text.secondary', fontSize: '50px' }}>
                        <Icon icon='ph:question-bold' color='white' fontSize={24} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </div>
      </section>
    </>
  )
}

ServicesPage.authGuard = false
ServicesPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ServicesPage
