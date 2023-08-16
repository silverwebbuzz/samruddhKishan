// ** MUI Imports
//@ts-nocheck
import { SyntheticEvent, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from 'src/views/components/Navbar'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { Button, Card, CardContent, CardMedia, Grid } from '@mui/material'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Icon from 'src/@core/components/icon'
const HomePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <>
      <Navbar />
      <div className='hero'>
        <Swiper
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false
          }}
          effect={'fade'}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={swiper => console.log(swiper)}
        >
          <SwiperSlide
            style={{
              'background-image': 'url(/images/logo/slider1.jpg)',
              'background-position': 'center',
              'background-size': 'cover',
              width: '100%',
              height: '100%'
            }}
            className='slider-back1'
          >
            <div className='slider-content'>
              <h4 className='slider-subtitle'>Origanl and Natural</h4>
              <h1 className='silder-title'>Origanl and Natural</h1>
              <p className='silder-text'>
                Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible
                margaret suitable he followed.
              </p>
            </div>
            {/* <img src='https://swiperjs.com/demos/images/nature-1.jpg' alt='slider1' /> */}
          </SwiperSlide>
          <SwiperSlide
            style={{
              'background-image': 'url(/images/logo/slider3.jpg)',
              'background-position': 'center',
              'background-size': ' cover',
              width: '100%',
              height: '100%'
            }}
            className='slider-back2'
          >
            <div className='slider-content'>
              <h4 className='slider-subtitle'>Origanl and Natural</h4>
              <h1 className='silder-title'>Origanl and Natural</h1>
              <p className='silder-text'>
                Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible
                margaret suitable he followed.
              </p>
            </div>
            {/* <img src='/images/logo/slider1.jpg' /> */}
          </SwiperSlide>
          <SwiperSlide
            style={{
              'background-image': 'url(/images/logo/slider5.jpg)',
              'background-position': 'center',
              'background-size': ' cover',
              width: '100%',
              height: '100%'
            }}
            className='slider-back3'
          >
            <div className='slider-content'>
              <h4 className='slider-subtitle'>Origanl and Natural</h4>
              <h1 className='silder-title'>Origanl and Natural</h1>
              <p className='silder-text'>
                Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible
                margaret suitable he followed.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <section className='about-section'>
          <Box sx={{ display: 'flex' }}>
            <Grid sm={6} md={5} lg={6}>
              <div className='about-sec'>
                <img className='about-img' src='/images/logo/slider1.jpg' alt='slider1.jpg' />
                <img className='about-img2' src='/images/logo/slider3.jpg' alt='slider1.jpg' />
              </div>
            </Grid>
            <Grid sm={6} md={7} lg={6}>
              <div className='about-content'>
                <div className='about-text'>
                  <h1 className='about-heading'>Agriculture For Future Development</h1>
                  <p className='about-des'>
                    There are many variations of passages of ipsum available but the majority have suffered alteration
                    in some form by injected humor or random word which don’t look even. Comparison new ham melancholy
                    son themselves.
                  </p>
                  <p className='about-des'>
                    There are many variations of passages of ipsum available but the majority have suffered alteration
                    in some form by injected humor or random word which don’t look even. Comparison new ham melancholy
                    son themselves.
                  </p>
                  <p className='about-des'>
                    There are many variations of passages of ipsum available but the majority have suffered alteration
                    in some form by injected humor or random word which don’t look even. Comparison new ham melancholy
                    son themselves.
                  </p>
                </div>
                <div className='about-card'>
                  <div className='card1'>
                    <h3 className='about-card-heading'>Natural Farming</h3>
                    <p className='about-card-text'>Resolve parties but trying she shewing of moment.</p>
                  </div>
                  <div className='card2'>
                    <h3 className='about-card-heading'>Natural Farming</h3>
                    <p className='about-card-text'>Resolve parties but trying she shewing of moment.</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Box>
        </section>
        <section className='what-we-do'>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className='what-do-left'>
                <p className='what-do-heading'>WHAT WE DO</p>
                <h1 className='what-do-content'>
                  Currently we are <br />
                  selling organic food
                </h1>
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='what-do-right'>
                <p className='what-right-text'>
                  Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated
                  estimating excellence an to impression. ladies she basket season age her uneasy saw. Discourse
                  unwilling am no described.
                </p>
                <p className='what-right-text'>
                  Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated
                  estimating excellence an to impression. ladies she basket season age her uneasy saw. Discourse
                  unwilling am no described.
                </p>
                <p className='what-right-text'>
                  Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated
                  estimating excellence an to impression. ladies she basket season age her uneasy saw. Discourse
                  unwilling am no described.
                </p>
                <Button className='about-btn'>More about</Button>
              </Box>
            </Grid>
          </Grid>
          <div className='card-section'>
            <div className='main-card'>
              <div className='card-img'>
                <img className='card-image' src='/images/logo/card.jpg' alt='card' />
              </div>
              <div className='card-content'>
                <h2 className='card-heading'>Fresh Vegetables</h2>
                <p className='card-text'>
                  Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                </p>
              </div>
            </div>
            <div className='main-card'>
              <div className='card-img'>
                <img className='card-image' src='/images/logo/card.jpg' alt='card' />
              </div>
              <div className='card-content'>
                <h2 className='card-heading'>Fresh Vegetables</h2>
                <p className='card-text'>
                  Continue indulged speaking technical out horrible domestic position. Seeing rather you.Continue
                  indulged speaking technical out horrible domestic position. Seeing rather you.
                </p>
              </div>
            </div>
            <div className='main-card'>
              <div className='card-img'>
                <img className='card-image' src='/images/logo/card.jpg' alt='card' />
              </div>
              <div className='card-content'>
                <h2 className='card-heading'>Fresh Vegetables</h2>
                <p className='card-text'>
                  Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                </p>
              </div>
            </div>
            <div className='main-card'>
              <div className='card-img'>
                <img className='card-image' src='/images/logo/card.jpg' alt='card' />
              </div>
              <div className='card-content'>
                <h2 className='card-heading'>Fresh Vegetables</h2>
                <p className='card-text'>
                  Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='get-to-know'>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className='get-to-know-left'>
                <img className='get-to-know-img' src='./images/logo/slider6.jpg' alt='slider6' />
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='get-to-know-right'>
                <p className='get-to-know-heading'>GET TO KNOW US</p>
                <h1 className='get-to-know-content'>
                  Agriculture matters to <br />
                  the future of development
                </h1>
                <div>
                  <Accordion
                    className='accordion-main'
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                  >
                    <AccordionSummary
                      id='controlled-panel-header-1'
                      aria-controls='controlled-panel-content-1'
                      expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                    >
                      <h4 className='get-col-heading'>Accordion 1</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className='get-col-text'>
                        Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                        biscuit. Topping soufflé tart sweet croissant.
                      </p>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    className='accordion-main'
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                  >
                    <AccordionSummary
                      id='controlled-panel-header-2'
                      aria-controls='controlled-panel-content-2'
                      expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                    >
                      <h4 className='get-col-heading'>Accordion 1</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className='get-col-text'>
                        Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                        biscuit. Topping soufflé tart sweet croissant.
                      </p>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    className='accordion-main'
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                  >
                    <AccordionSummary
                      id='controlled-panel-header-3'
                      aria-controls='controlled-panel-content-3'
                      expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                    >
                      <h4 className='get-col-heading'>Accordion 1</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className='get-col-text'>
                        Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert
                        biscuit. Topping soufflé tart sweet croissant.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Box>
            </Grid>
          </Grid>
        </section>
        <section className='home-contact'>
          <Grid container>
            <Grid sm={12} md={6}>
              <Box className='home-contact-left'>
                <div className='form-section'>
                  <h4 className='form-heading'>HAVE QUESTIONS?</h4>
                  <form className='home-form'>
                    <input className='input-name' type='text' placeholder='Name' />
                    <input className='input-name' type='text' placeholder='Name' />
                    <input className='input-name' type='text' placeholder='Name' />
                  </form>
                </div>
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='home-contact-right'>
                <div className='contact-des'>
                  <h1>Contact Information</h1>
                  <p>
                    Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she
                    shewing.
                  </p>
                </div>
                <div className='contact-details'>
                  <div className='contact-icon'>
                    <Icon fontSize='25px' icon='ic:baseline-phone' />
                  </div>
                  <div className='contact-name'>
                    <h3>Phone Mo.</h3>
                    <p>+91 33378901</p>
                  </div>
                </div>
                <div className='contact-details'>
                  <div className='contact-icon'>
                    <Icon fontSize='25px' icon='mdi:location' />
                  </div>
                  <div className='contact-name'>
                    <h3>Our Location</h3>
                    <p>Ahmedabad, Gujarat</p>
                  </div>
                </div>
                <div className='contact-details'>
                  <div className='contact-icon'>
                    <Icon fontSize='25px' icon='ic:baseline-email' />
                  </div>
                  <div className='contact-name'>
                    <h3>Email</h3>
                    <p>example@gamil.com</p>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </section>
      </div>
    </>
  )
}
HomePage.authGuard = false
HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default HomePage
