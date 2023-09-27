//@ts-nocheck
import { ReactNode } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import AboutSection from 'src/views/components/landdingPage/aboutSection/AboutSection'
import { getLogoAPI } from 'src/slice/settingSlice'
import { getAllContent } from 'src/slice/contentSectionSlice'
import { getFooter } from 'src/slice/landingPageSlice'
import { Box, Card, Grid, Typography } from '@mui/material'
import { getAllUsers } from 'src/slice/farmers'
import MapWrapper from 'src/views/components/mapWrapper/mapWrapper'

const OurCentersPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const { getContentData } = useSelector((state: any) => state?.rootReducer?.landingPageReducer)
  const { getUsers } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const dispatch = useDispatch<AppDispatch>()

  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllContent())
    dispatch(getAllUsers())
    dispatch(getFooter())
  }, [])

  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <PageBanner
        BGImg={'/images/logo/slider1.jpg'}
        bannerName='Our Centers'
        bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
      />
      {/* <AboutSection ourCenter={true} DATA={getContentData} JSONHandler={JSONHandler} /> */}
      <section
        style={{
          paddingRight: '5%',
          paddingLeft: '5%'
        }}
      >
        <div className='about-content our_center_about_sec'>
          <Grid container spacing={4}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Typography variant='h4' fontWeight={900}>
                Our Centers are <br />
                located across the Country
              </Typography>
              <div
                className='our_center_list'
                style={{
                  marginTop: '5px'
                }}
              >
                {getUsers?.data?.map((Itm: any) => {
                  if (Itm?.roleId == '13')
                    return (
                      <div className='center_list_single' style={{ marginBottom: '30px' }}>
                        <div className='center_service'>
                          <h5>CENTER NAME</h5>
                          <p>{Itm?.centerName}</p>
                        </div>
                        <div className='center_address'>
                          <h5>ADDRESS:</h5>
                          <p>
                            {`${Itm.taluka ? Itm.taluka : ''}, ${Itm?.city ? Itm?.city : ''}`}
                            <br />
                            {`${Itm?.state ? Itm?.state : ''}, ${Itm?.pinCode ? Itm?.pinCode : ''}, IN`}
                          </p>
                        </div>
                      </div>
                    )
                })}
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <MapWrapper />
            </Grid>
          </Grid>
        </div>
      </section>
      <FooterSection DATA={getContentData} LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
    </>
  )
}
OurCentersPage.authGuard = false
OurCentersPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default OurCentersPage
