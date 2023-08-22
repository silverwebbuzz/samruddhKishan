import Link from 'next/link'
import React from 'react'
import Icon from 'src/@core/components/icon'
const FooterSection = () => {
  return (
    <>
      <footer className='sec_padding'>
        <div className='footer_first_col logo_col'>
          <a href='#'>
            <img src='/images/logo/logo1234.png' alt='' />
          </a>
          <p>
            Happen active county. Winding morning ambition shyness evident to poor. Because elderly new to the point to
            main success.
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
          <div className='contact-details contact_details_phone'>
            <div className='contact-icon'>
              <Icon icon='carbon:home' />
            </div>
            <div className='contact-name'>
              <h3>ADDRESS:</h3>
              <p>5919 Trussville Crossings Pkwy, Birmingham</p>
            </div>
          </div>
          <div className='contact-details contact_details_phone'>
            <div className='contact-icon'>
              <Icon icon='mdi-light:email-open' />
            </div>
            <div className='contact-name'>
              <h3>EMAIL:</h3>
              <p>
                <a href='mailto:info@validtheme.com'>info@validtheme.com</a>
              </p>
            </div>
          </div>
          <div className='contact-details contact_details_phone'>
            <div className='contact-icon'>
              <Icon icon='material-symbols:call-outline' />
            </div>
            <div className='contact-name'>
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
    </>
  )
}

export default FooterSection
