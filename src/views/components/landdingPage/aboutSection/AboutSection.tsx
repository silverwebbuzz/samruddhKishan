import { Box, Grid } from '@mui/material'
import React from 'react'

const AboutSection = () => {
  return (
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
                There are many variations of passages of ipsum available but the majority have suffered alteration in
                some form by injected humor or random word which don’t look even. Comparison new ham melancholy son
                themselves.
              </p>
              <p className='about-des'>
                There are many variations of passages of ipsum available but the majority have suffered alteration in
                some form by injected humor or random word which don’t look even. Comparison new ham melancholy son
                themselves.
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
  )
}

export default AboutSection
