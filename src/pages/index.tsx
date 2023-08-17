// ** MUI Imports
//@ts-nocheck
import { SyntheticEvent, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Navbar from 'src/views/components/Navbar'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { Autoplay, Pagination, Navigation, EffectFade, FreeMode } from 'swiper/modules'
import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

const HomePage = () => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [viewPortEntered, setViewPortEntered] = useState(false)
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className='hero'>
        <section className='hero banner-area navigation-circle text-light banner-style-one zoom-effect overflow-hidden'>
          <Swiper
            fadeEffect={true}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            effect={'fade'}
            navigation={true}
            onSlideChange={() => console.log('Slide change')}
            modules={[Autoplay, Navigation, EffectFade]}
            className='mySwiper banner-fade swiper-container-fade '
          >
            <SwiperSlide className='banner-style-one'>
              <div
                className='banner-thumb bg-cover shadow dark'
                style={{
                  'background-image': 'url(/images/logo/slider1.jpg)'
                }}
              ></div>
              <div className='container'>
                <div className='row align-center'>
                  <div className='col-xl-7'>
                    <div className='content'>
                      <h4 className='slider_top_desc'>Original &amp; Natural</h4>
                      <h2 className='slider_top_heading'>
                        <strong>Organic Agriculture</strong> <span>Farming Products</span>
                      </h2>
                      <p className='slider_content_para'>
                        Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
                        horrible margaret suitable he followed.
                      </p>
                      <div className='button slider_content_btn'>
                        <a className='btn btn-theme secondary btn-md radius animation' href='#'>
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='banner-style-one'>
              <div
                className='banner-thumb bg-cover shadow dark'
                style={{
                  'background-image': 'url(/images/logo/slider2.jpg)'
                }}
              ></div>
              <div className='container'>
                <div className='row align-center'>
                  <div className='col-xl-7'>
                    <div className='content'>
                      <h4 className='slider_top_desc'>Original &amp; Natural</h4>
                      <h2 className='slider_top_heading'>
                        <strong>Agriculture Mature</strong> Farming Products
                      </h2>
                      <p className='slider_content_para'>
                        Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
                        horrible margaret suitable he followed.
                      </p>
                      <div className='button slider_content_btn'>
                        <a className='btn btn-theme secondary btn-md radius animation' href='#'>
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='banner-style-one'>
              <div
                className='banner-thumb bg-cover shadow dark'
                style={{
                  'background-image': 'url(/images/logo/slider1.jpg)'
                }}
              ></div>
              <div className='container'>
                <div className='row align-center'>
                  <div className='col-xl-7'>
                    <div className='content'>
                      <h4 className='slider_top_desc'>Original &amp; Natural</h4>
                      <h2 className='slider_top_heading'>
                        <strong>Organic Agriculture</strong> <span>Farming Products</span>
                      </h2>
                      <p className='slider_content_para'>
                        Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
                        horrible margaret suitable he followed.
                      </p>
                      <div className='button slider_content_btn'>
                        <a className='btn btn-theme secondary btn-md radius animation' href='#'>
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='banner-style-one'>
              <div
                className='banner-thumb bg-cover shadow dark'
                style={{
                  'background-image': 'url(/images/logo/slider2.jpg)'
                }}
              ></div>
              <div className='container'>
                <div className='row align-center'>
                  <div className='col-xl-7'>
                    <div className='content'>
                      <h4 className='slider_top_desc'>Original &amp; Natural</h4>
                      <h2 className='slider_top_heading'>
                        <strong>Agriculture Mature</strong> Farming Products
                      </h2>
                      <p className='slider_content_para'>
                        Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure
                        horrible margaret suitable he followed.
                      </p>
                      <div className='button slider_content_btn'>
                        <a className='btn btn-theme secondary btn-md radius animation' href='#'>
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
        <section className='about-section sec_padding'>
          <Box sx={{ display: { md: 'flex' }, flexDirection: { sx: 'column' } }}>
            <Grid sm={6} md={5} lg={5}>
              <div className='about-sec'>
                <img className='about-img' src='/images/logo/slider1.jpg' alt='slider1.jpg' />
                <div className='sub-about-img'>
                  <img className='about-img2' src='/images/logo/slider3.jpg' alt='slider1.jpg' />
                </div>
              </div>
            </Grid>
            <Grid sm={6} md={7} lg={7}>
              <div className='about-content'>
                <div className='about-text'>
                  <h2 className='about-heading'>
                    Agriculture For <br /> Future Development
                  </h2>
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
                    <img className='top-card-img' src='/images/logo/tameta.png' alt='card1' />
                    <h3 className='about-card-heading'>Natural Farming</h3>
                    <p className='about-card-text'>Resolve parties but trying she shewing of moment.</p>
                  </div>
                  <div className='card2'>
                    <img className='top-card-img' src='/images/logo/2.png' alt='card1' />
                    <h3 className='about-card-heading'>Natural Farming</h3>
                    <p className='about-card-text'>Resolve parties but trying she shewing of moment.</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Box>
        </section>
        <section className='what-we-do sec_padding'>
          <div className='section-bg-img'>
            <img src='/images/logo/18.png' alt='banner image' />
          </div>
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
                <Button className='about-btn'>More about</Button>
              </Box>
            </Grid>
          </Grid>
          <div className='card-section'>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30
                }
              }}
              className='mySwiper slider-main-card'
            >
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/1-1.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/27.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/27.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/27.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/1-1.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className='main-card-banner'>
                <div className='main-card'>
                  <div className='card-img'>
                    <img className='card-image' src='/images/logo/1-1.png' alt='card' />
                  </div>
                  <div className='card-content'>
                    <h5 className='card-heading'>Fresh Vegetables</h5>
                    <p className='card-text'>
                      Continue indulged speaking technical out horrible domestic position. Seeing rather you.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className='fresh_product_sec sec_padding'>
          <h2>
            Healthy Life With
            <br /> Fresh Products
          </h2>
          <div className='fresh_product_cards'>
            <img className='freshproductman_img' src='/images/logo/freshproductman.png' alt='freshproductman' />
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
            <div className='single_item'>
              <img src='/images/logo/1-2.png' alt='slider1.jpg' />
              <p>BlueBerry</p>
            </div>
          </div>
        </section>
        <section className='get-to-know sec_padding'>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid sm={12} md={5} style={{ position: 'relative' }}>
              <Box className='get-to-know-left'>
                <img className='get-to-know-img' src='./images/logo/1-1.jpg' alt='slider6' />
                <img className='get-to-know-img2' src='./images/logo/22.png' alt='slider6' />
              </Box>
              <Box className='get_to_know_btm'>
                <div className='get_to_know_btm_left'>
                  <img src='/images/logo/1-2.png' alt='' />
                </div>
                <div className='get_to_know_btm_right'>
                  <div className='timer'>
                    <CountUp end={259} duration={2} suffix='K'>
                      {({ countUpRef, start }) => (
                        <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </div>
                  <p>Agriculture, Organic Products</p>
                </div>
              </Box>
            </Grid>
            <Grid sm={12} md={7}>
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
        <section className='testimonial_section sec_padding'>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid sm={12} md={6} className='testimonial_left'>
              <Box>
                <h4>Testimonial</h4>
                <img src='./images/logo/2-1.jpg' alt='slider6' />
                <img src='./images/logo/1-2.jpg' alt='slider6' />
                <img src='./images/logo/1-2.jpg' alt='slider6' />
                <img src='./images/logo/1-2.jpg' alt='slider6' />
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='testimonial_right'>
                <Swiper slidesPerView={1} loop={true} className='testimonial_slider'>
                  <SwiperSlide className='slider_item'>
                    <h4>
                      “Targetingconsultation discover apartments. ndulgence off under folly death wrote cause her way
                      spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties
                      but why she shewing. She sang know now always remembering to the point.”
                    </h4>
                    <p>Metho k. Partho </p>
                    <span>Consultant </span>
                  </SwiperSlide>
                  <SwiperSlide className='slider_item'>
                    <h4>
                      “Targetingconsultation discover apartments. ndulgence off under folly death wrote cause her way
                      spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties
                      but why she shewing. She sang know now always remembering to the point.”
                    </h4>
                    <p>Metho k. Partho </p>
                    <span>Consultant </span>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Grid>
          </Grid>
        </section>
        <section className='product_gallery_section'>
          <div className='product_gallery_heading sec_padding'>
            <h5 className='sec_sub_title'>AWESOME GALLERY</h5>
            <h2 className='sec_title'>Gallery Of Our Products</h2>
            <div className='sec_heading_devider'></div>
          </div>
          <Grid container className='product_gallery_slider_main'>
            <Grid sm={12} md={12} className='product_gallery_slider_col'>
              <Box>
                <Swiper
                  slidesPerView={2.5}
                  spaceBetween={30}
                  loop={true}
                  freeMode={true}
                  pagination={{ clickable: true }}
                  modules={[FreeMode, Pagination]}
                  className='product_gallery_slider'
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0
                    },
                    576: {
                      slidesPerView: 1.5,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2.5
                    }
                  }}
                >
                  <SwiperSlide className='slider_item'>
                    <img src='./images/logo/2-2.jpg' alt='slider6' />
                    <div class='overlay'>
                      <span>Cereals</span>
                      <h4>
                        <a href='#'>Fresh Mandrains</a>
                      </h4>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className='slider_item'>
                    <img src='./images/logo/10.jpg' alt='slider6' />
                    <div class='overlay'>
                      <span>Cereals</span>
                      <h4>
                        <a href='#'>Fresh Mandrains</a>
                      </h4>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className='slider_item'>
                    <img src='./images/logo/5-1.jpg' alt='slider6' />
                    <div class='overlay'>
                      <span>Cereals</span>
                      <h4>
                        <a href='#'>Fresh Mandrains</a>
                      </h4>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className='slider_item'>
                    <img src='./images/logo/2-2.jpg' alt='slider6' />
                    <div class='overlay'>
                      <span>Cereals</span>
                      <h4>
                        <a href='#'>Fresh Mandrains</a>
                      </h4>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className='slider_item'>
                    <img src='./images/logo/10.jpg' alt='slider6' />
                    <div class='overlay'>
                      <span>Cereals</span>
                      <h4>
                        <a href='#'>Fresh Mandrains</a>
                      </h4>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Grid>
          </Grid>
          <div className='product_gallery_btm_counter sec_padding'>
            <div className='product_gallery_btm_counter_left'>
              <h5 className='sec_sub_title'>ACHIVEMENTS</h5>
              <h2 className='sec_title'>Delivering value since 1956</h2>
            </div>
            <div className='product_gallery_btm_counter_right'>
              <div className='harvest_counter counter'>
                <div className='timer'>
                  <CountUp end={250} duration={2} suffix='M'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Growth Tons of Harvest</p>
              </div>
              <div className='clients_counter counter'>
                <div className='timer'>
                  <CountUp end={98} duration={2} suffix='%'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Happy clients</p>
              </div>
              <div className='products_counter counter'>
                <div className='timer'>
                  <CountUp end={688} duration={2} suffix='K'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>Sales of our Products</p>
              </div>
            </div>
          </div>
        </section>
        <section className='home-contact sec_padding'>
          <Grid container style={{ alignItems: 'center' }}>
            <Grid sm={12} md={6}>
              <Box className='home-contact-left'>
                <div className='form-section'>
                  <h5 className='sec_sub_title'>HAVE QUESTIONS?</h5>
                  <h2 className='sec_title'>Send us a Massage</h2>
                  <form className='home-form'>
                    <div className='name_row'>
                      <input type='text' placeholder='Name' />
                    </div>
                    <div className='email_phone_row'>
                      <div className='email_row'>
                        <input type='email' placeholder='Email*' />
                      </div>
                      <div className='phone_row'>
                        <input type='number' placeholder='Phone' />
                      </div>
                    </div>
                    <div className='textarea_row'>
                      <textarea name='' id='' cols='30' rows='10' placeholder='Tell Us About Project*'></textarea>
                    </div>
                    <div>
                      <button className='submit_btn yellowbtn'>
                        <Icon icon='vaadin:paperplane' />
                        Get in Touch
                      </button>
                    </div>
                  </form>
                </div>
              </Box>
            </Grid>
            <Grid sm={12} md={6}>
              <Box className='home-contact-right'>
                <div className='contact-des'>
                  <h1 className='contact-heading'>Contact Information</h1>
                  <p className='contact-text'>
                    Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she
                    shewing.
                  </p>
                </div>
                <div className='contact-details contact_details_phone'>
                  <div className='contact-icon'>
                    <Icon fontSize='25px' icon='ic:baseline-phone' />
                  </div>
                  <div className='contact-name'>
                    <h3>Phone No.</h3>
                    <p>+91 33378901</p>
                  </div>
                </div>
                <div className='contact-details contact_details_location'>
                  <div className='contact-icon'>
                    <Icon fontSize='25px' icon='mdi:location' />
                  </div>
                  <div className='contact-name'>
                    <h3>Our Location</h3>
                    <p>Ahmedabad, Gujarat</p>
                  </div>
                </div>
                <div className='contact-details contact_details_email'>
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
        <section className='home_latest_blogs sec_padding'>
          <div className='latest_blog_lg'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
          <div className='latest_blog_sm'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
          <div className='latest_blog_sm'>
            <div className='card_img'>
              <Link href='#' passHref>
                <img src='/images/logo/blog-2.jpg' alt='' />
                <div className='btm_publish_date'>
                  <h4>14</h4>
                  <p>Apr,23</p>
                </div>
              </Link>
            </div>
            <div className='card_content'>
              <div className='auther_details'>
                <Link href='#' passHref>
                  <Icon icon='gg:profile' />
                  Agrul
                </Link>
                <Link href='#' passHref>
                  <Icon icon='ant-design:comment-outlined' />2 Comments
                </Link>
              </div>
              <h3>
                <Link href='#' passHref>
                  Announcing if the resolution sentiments Possession ye no mr unaffected remarkably
                </Link>
              </h3>
            </div>
          </div>
        </section>
        <footer className='sec_padding'>
          <div className='footer_first_col logo_col'>
            <a href='#'>
              <img src='/images/logo/logo1234.png' alt='' />
            </a>
            <p>
              Happen active county. Winding morning ambition shyness evident to poor. Because elderly new to the point
              to main success.
            </p>
            <div className='footer_form'>
              <input type='text' placeholder='input your email' />
              <button type='submit'>Go</button>
            </div>
          </div>
          <div className='footer_sec_col explore_menu'>
            <h3>Explore</h3>
            <ul>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#'>Meet Our Team</a>
              </li>
              <li>
                <a href='#'>Services</a>
              </li>
              <li>
                <a href='#'>News & Media</a>
              </li>
              <li>
                <a href='#'>Contact Us</a>
              </li>
              <li>
                <a href='#'>Volunteers</a>
              </li>
            </ul>
          </div>
          <div className='footer_third_col recent_post_menu'>
            <h3>Recent Posts</h3>
            <div className='fotter_post_item'>
              <div className='fotter_post_item_img'>
                <Link href='#'>
                  <img src='/images/logo/blog-2.jpg' alt='' />
                </Link>
              </div>
              <div className='fotter_post_item_content'>
                <p>April 14, 2023</p>
                <Link href='#'>
                  <h4>Announcing if the resolution sentiments</h4>
                </Link>
              </div>
            </div>
            <div className='fotter_post_item'>
              <div className='fotter_post_item_img'>
                <Link href='#'>
                  <img src='/images/logo/blog-2.jpg' alt='' />
                </Link>
              </div>
              <div className='fotter_post_item_content'>
                <p>April 14, 2023</p>
                <Link href='#'>
                  <h4>Announcing if the resolution sentiments</h4>
                </Link>
              </div>
            </div>
          </div>
          <div className='footer_forth_col contact_details_menu'>
            <h3>Contact Info</h3>
            <div class='contact-details contact_details_phone'>
              <div class='contact-icon'>
                <Icon icon='carbon:home' />
              </div>
              <div class='contact-name'>
                <h3>ADDRESS:</h3>
                <p>5919 Trussville Crossings Pkwy, Birmingham</p>
              </div>
            </div>
            <div class='contact-details contact_details_phone'>
              <div class='contact-icon'>
                <Icon icon='mdi-light:email-open' />
              </div>
              <div class='contact-name'>
                <h3>EMAIL:</h3>
                <p>
                  <a href='mailto:info@validtheme.com'>info@validtheme.com</a>
                </p>
              </div>
            </div>
            <div class='contact-details contact_details_phone'>
              <div class='contact-icon'>
                <Icon icon='material-symbols:call-outline' />
              </div>
              <div class='contact-name'>
                <h3>Phone Mo.</h3>
                <p>
                  <a href='tel:+91 33378901'>+91 33378901</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
        <div className='copyright sec_padding'>
          <div className='copyright_left'>© Copyright 2023. All Rights Reserved by Silverwebbuzz</div>
          <div className='copyright_right'>
            <a href='#'>Terms</a>
            <a href='#'>Privacy</a>
            <a href='#'>Support</a>
          </div>
        </div>
      </div>
    </>
  )
}
// Home.guestGuard = true
HomePage.authGuard = false
HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default HomePage
