// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Third Party Imports
import * as yup from 'yup'
// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
// ** Demo Imports
import { Stack } from '@mui/system'
import { ErrorMessage, Form, Formik } from 'formik'
import { Card, Link, Paper } from '@mui/material'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  width: '100%',
  opacity: 0.8,
  objectFit: 'cover'
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid black'
}))

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  // ** Vars
  const { skin } = settings
  const { login, logout } = auth
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email id is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      )
  })
  const handleErrCallback = (err: any) => {
    console.log(err)
  }

  const handleLogin = (values: any) => {
    let email = values.email
    let password = values.password
    let UserType = 'super-admin'
    login({ email, password, UserType })
  }

  const imageSource = skin === 'bordered' ? 'image_2023_07_11T06_56_56_991Z (1)' : 'image_2023_07_11T06_56_56_991Z (1)'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg'
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography align='center' variant='h5' fontWeight={800} marginBottom={5}>
            Super Admin Login
          </Typography>
          <Card
            sx={{
              padding: '3rem',
              boxShadow: '8.32785px 8.32785px 24.9835px rgba(2, 2, 70, 0.15)',
              borderRadius: '1rem'
            }}
            variant='outlined'
          >
            <Box sx={{ my: 6, textAlign: 'center' }}>
              <img
                src='/images/pages/samrudh-kisaan-logo__2_-removebg-preview (1).png'
                style={{
                  height: 'auto',
                  width: '209px'
                }}
              />
            </Box>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={(values: any) => handleLogin(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur }: any) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <TextField
                      autoFocus
                      name='email'
                      type='email'
                      label='Email'
                      value={values?.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.email && touched.email)}
                      placeholder='admin@gmail.com'
                      InputProps={{
                        //@ts-ignore
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon={'ic:outline-mail'} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                    <OutlinedInput
                      //@ts-ignore
                      value={values.password}
                      onBlur={handleBlur}
                      name='password'
                      label='Password'
                      error={Boolean(errors.password && touched.password)}
                      onChange={handleChange}
                      id='auth-login-v2-password'
                      type={showPassword ? 'text' : 'password'}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Icon icon={'solar:password-minimalistic-input-broken'} />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </FormControl>

                  <Button
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{
                      mb: 4,
                      '&:hover': {
                        backgroundColor: '#5E7954'
                      }
                    }}
                  >
                    Login
                  </Button>
                  {/* <Box>
                    <Box sx={{ padding: '0.5rem 2rem' }}>
                      <Typography gutterBottom sx={{ padding: '0 1rem' }} align='center' variant='body2'>
                        Don't have an accout?<LinkStyled href='/register'> Join Now</LinkStyled>
                      </Typography>
                    </Box>
                  </Box> */}
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
