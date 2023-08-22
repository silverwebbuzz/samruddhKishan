import React from 'react'
import { Box, Grid } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
const TestimonialSection = () => {
  return (
    <>
      <section className='testimonial_section sec_padding'>
        <Grid container style={{ alignItems: 'center' }}>
          <Grid sm={12} md={6} className='testimonial_left'>
            <Box>
              <h4>Testimonial</h4>
              <img src='/images/logo/2-1.jpg' alt='slider6' />
              <img src='/images/logo/1-2.jpg' alt='slider6' />
              <img src='/images/logo/1-2.jpg' alt='slider6' />
              <img src='/images/logo/1-2.jpg' alt='slider6' />
            </Box>
          </Grid>
          <Grid sm={12} md={6}>
            <Box className='testimonial_right'>
              <Swiper slidesPerView={1} loop={true} className='testimonial_slider'>
                <SwiperSlide className='slider_item'>
                  <h4>
                    “Targetingconsultation discover apartments. ndulgence off under folly death wrote cause her way
                    spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but
                    why she shewing. She sang know now always remembering to the point.”
                  </h4>
                  <p>Metho k. Partho </p>
                  <span>Consultant </span>
                </SwiperSlide>
                <SwiperSlide className='slider_item'>
                  <h4>
                    “Targetingconsultation discover apartments. ndulgence off under folly death wrote cause her way
                    spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but
                    why she shewing. She sang know now always remembering to the point.”
                  </h4>
                  <p>Metho k. Partho </p>
                  <span>Consultant </span>
                </SwiperSlide>
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default TestimonialSection
