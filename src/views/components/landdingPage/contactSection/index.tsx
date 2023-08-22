import React from 'react'
import { Box, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
const ContactSection = () => {
  return (
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
  )
}

export default ContactSection
