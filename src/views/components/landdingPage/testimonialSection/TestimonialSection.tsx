import React from 'react'
import { Box, Grid } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
const TestimonialSection = ({ DATA, JSONHandler }: any) => {
  return (
    <>
      <section className='testimonial_section sec_padding'>
        <Grid container style={{ alignItems: 'center' }}>
          <Grid sm={12} md={6} className='testimonial_left'>
            <Box>
              <h4>Testimonial</h4>
              <img src={DATA?.testimonialImg1} alt='testimonial image' />
              <img src={DATA?.testimonialImg2} alt='testimonial image' />
              <img src={DATA?.testimonialImg3} alt='testimonial image' />
              <img src={DATA?.testimonialImg4} alt='testimonial image' />
            </Box>
          </Grid>
          <Grid sm={12} md={6}>
            <Box className='testimonial_right'>
              <Swiper slidesPerView={1} loop={true} className='testimonial_slider'>
                {JSONHandler(DATA?.testimonialCard)?.map((Item: any) => {
                  return (
                    <SwiperSlide className='slider_item'>
                      <h4>“{Item?.testimonialDescription}”</h4>
                      <p>{Item?.testimonialPersonName} </p>
                      <span>{Item?.testimonialPersonRole} </span>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default TestimonialSection
