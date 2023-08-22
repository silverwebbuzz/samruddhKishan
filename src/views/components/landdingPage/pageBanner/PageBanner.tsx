import React from 'react'
import { Container } from '@mui/material'

const PageBanner = (props: any) => {
  const { bannerName, bannerContent, BGImg } = props
  return (
    <div className='page-banner'>
      <img className='page-img' src={BGImg} alt='banner image' />
      <Container className='banner-container'>
        <div className='page-banner-content'>
          <h1 className='page-banner-heading'>{bannerName}</h1>
          {bannerContent && <p className='page-banner-text'>{bannerContent}</p>}
        </div>
      </Container>
    </div>
  )
}

export default PageBanner
