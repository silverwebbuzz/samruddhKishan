//@ts-nocheck
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
// import { Menu, Close } from '@mui/icons-material'

import { Button } from '@mui/material'
import Link from 'next/link'

export default function Navbar() {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  return (
    <Box sx={{ backgroundColor: 'background.paper' }} className='landing_home_page_header'>
      <Container
        sx={{ py: { xs: 2, mx: 1 }, px: { xs: '50px' } }}
        style={{ maxWidth: '100%', padding: '0.5rem 10% 0.5rem 10%', minHeight: '102px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{
              ml: 'auto',
              width: '100%',
              display: { xs: 'flex', md: 'none' },
              justifyContent: { xs: 'space-between', md: 'none' }
            }}
          >
            <img className='logo-img' src='/images/logo/logo1234.png' alt='logo' />
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
              <Icon fontSize={35} icon='material-symbols:menu' />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              transition: theme => theme.transitions.create(['top']),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: 'background.paper',
                zIndex: 'appBar',
                position: 'fixed',
                height: { xs: '60vh', md: 'auto' },
                top: visibleMenu ? 0 : '-120vh',
                left: 0
              })
            }}
          >
            <img className='logo-img' src='/images/logo/logo1234.png' alt='logo' />
            <div className='main-menu'>
              <ul className='sub-menu'>
                <Link className='menu-link' href='/' passHref>
                  <li className='menu-item'>Home</li>
                </Link>
                <Link className='menu-link' href='/about-us' passHref>
                  <li className='menu-item'>About Us</li>
                </Link>
                <Link className='menu-link' href='/contact-us' passHref>
                  <li className='menu-item'>Contact Us</li>
                </Link>
                <Link className='menu-link' href='/products' passHref>
                  <li className='menu-item'>Products</li>
                </Link>
                <Link className='menu-link' href='/services' passHref>
                  <li className='menu-item'>Services</li>
                </Link>
              </ul>
            </div>
            <Box sx={{ display: 'flex' }}>
              <Button className='login-btn'>Farmer Inquery</Button>
              <Button sx={{ ml: '10px' }} className='login-btn'>
                Login
              </Button>
            </Box>
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: 'fixed',
                  top: 20,
                  right: 20
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Icon fontSize='35px' icon='iconoir:cancel' />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
