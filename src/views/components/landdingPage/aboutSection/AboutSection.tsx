import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getAllUsers } from 'src/slice/farmers'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const AboutSection = ({ DATA, JSONHandler, ourCenter }: any) => {
  const dispatch = useDispatch()
  const { getUsers } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  return (
    <section className='about-section sec_padding'>
      <Grid container>
        {ourCenter ? (
          <div className='about-content our_center_about_sec'>
            <Grid container spacing={4}>
              <Grid item lg={7} md={7} sm={12} xs={12}>
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
                          <div className='center_address'>
                            <h5>ADDRESS:</h5>
                            <p>
                              {`${Itm.taluka ? Itm.taluka : ''}, ${Itm?.city ? Itm?.city : ''}`}
                              <br />
                              {`${Itm?.state ? Itm?.state : ''}, ${Itm?.pinCode ? Itm?.pinCode : ''}, IN`}
                            </p>
                          </div>
                          <div className='center_service'>
                            <h5>SERVICE OFFERED:</h5>
                            <p>- Product Services</p>
                          </div>
                          <div className='center_phone'>
                            <strong>Phone : </strong>
                            <a href='tel:+91 85558 41988'>{`${Itm?.phone ? '+91' + ' ' + Itm?.phone : ''}`}</a>
                          </div>
                        </div>
                      )
                  })}
                </div>
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <div className='about-card' style={{ paddingLeft: '50px' }}>
                  <div className='card1'>
                    <img
                      className='top-card-img'
                      src={JSONHandler(DATA?.contentCards)?.[0]?.contentCardImage}
                      alt='card1'
                      width={'50px'}
                    />
                    <h3 className='about-card-heading'>{JSONHandler(DATA?.contentCards)?.[0]?.contentCardHeading}</h3>
                    <p className='about-card-text'>{JSONHandler(DATA?.contentCards)?.[0]?.contentCardText}</p>
                  </div>
                  <div className='card2'>
                    <img
                      className='top-card-img'
                      src={JSONHandler(DATA?.contentCards)?.[1]?.contentCardImage}
                      alt='card1'
                      width={'50px'}
                    />
                    <h3 className='about-card-heading'>{JSONHandler(DATA?.contentCards)?.[1]?.contentCardHeading}</h3>
                    <p className='about-card-text'>{JSONHandler(DATA?.contentCards)?.[1]?.contentCardText}</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <Box sx={{ display: { md: 'flex' }, flexDirection: { sx: 'column' } }} style={{ alignItems: 'center' }}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div className='about-sec'>
                <img className='about-img' src={DATA?.contentMainImg} alt='slider1.jpg' />
                <div className='sub-about-img'>
                  <img className='about-img2' src={DATA?.contentSubImg} alt='slider1.jpg' />
                </div>
              </div>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <div className='about-content'>
                <div className='about-text'>
                  <h2 className='about-heading'>{DATA?.contentHeader}</h2>
                  <p className='about-des'>{DATA?.contentText}</p>
                  {/* <p className='about-des'>
              There are many variations of passages of ipsum available but the majority have suffered alteration in
              some form by injected humor or random word which don’t look even. Comparison new ham melancholy son
              themselves.
            </p> */}
                  <div className='about_content_list'>
                    <ul className='check_solid_list mt-20'>
                      {JSONHandler(DATA?.contentPointDetail)?.map((ITM: any) => {
                        return (
                          <li>
                            <Icon icon='material-symbols:check' />
                            {ITM?.contentPointDetail}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
                <div className='about-card'>
                  <div className='card1'>
                    <img
                      className='top-card-img'
                      src={JSONHandler(DATA?.contentCards)?.[0]?.contentCardImage}
                      alt='card1'
                      width={'50px'}
                    />
                    <h3 className='about-card-heading'>{JSONHandler(DATA?.contentCards)?.[0]?.contentCardHeading}</h3>
                    <p className='about-card-text'>{JSONHandler(DATA?.contentCards)?.[0]?.contentCardText}</p>
                  </div>
                  <div className='card2'>
                    <img
                      className='top-card-img'
                      src={JSONHandler(DATA?.contentCards)?.[1]?.contentCardImage}
                      alt='card1'
                      width={'50px'}
                    />
                    <h3 className='about-card-heading'>{JSONHandler(DATA?.contentCards)?.[1]?.contentCardHeading}</h3>
                    <p className='about-card-text'>{JSONHandler(DATA?.contentCards)?.[1]?.contentCardText}</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Box>
        )}
      </Grid>
    </section>
  )
}

export default AboutSection
