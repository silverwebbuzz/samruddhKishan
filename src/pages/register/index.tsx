// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import

// ** MUI Components
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { Box, BoxProps, styled } from '@mui/system'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormControlLabelProps,
  IconButton,
  Link,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@emotion/react'
import { AnyAaaaRecord } from 'dns'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  // maxHeight: 600,
  height: '100%',
  width: '100%',
  opacity: 0.8,
  objectFit: 'cover'
  // marginTop: theme.spacing(12),
  // marginBottom: theme.spacing(12),
  // [theme.breakpoints.down(1540)]: {
  //   maxHeight: 550
  // },
  // [theme.breakpoints.down('lg')]: {
  //   maxHeight: 500
  // }
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
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  width: '100%',
  // marginTop: theme.spacing(12),
  // marginBottom: theme.spacing(12),
  opacity: 0.8,
  objectFit: 'cover'
  // [theme.breakpoints.down(1540)]: {
  //   maxHeight: 550
  // },
  // [theme.breakpoints.down('lg')]: {
  //   maxHeight: 500
  // }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()
  // ** Hooks
  const theme: any = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'image_2023_07_11T06_56_56_991Z (1)' : 'image_2023_07_11T06_56_56_991Z (1)'
  const handleSubmit = (values: any) => {
    const payload = {
      email: values?.email,
      password: values?.password,
      phone: values?.phone,
      name: values?.name
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/register`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        if (response?.data?.status === 200) {
          router.push('/super-admin/login')
          toast.success('User Created successfully')
        } else if (response?.data?.status === 401) {
          toast.error(response.data.message)
        } else {
          toast.error(response.data.message ? response.data.message : 'somthing went wrong')
        }
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }
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
          <RegisterIllustration alt='register-illustration' src={`/images/pages/${imageSource}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}

      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* <svg width={34} height={23.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg> */}
            <Box sx={{ my: 6, textAlign: 'center' }}>
              <img
                src='/images/pages/samrudh-kisaan-logo__2_-removebg-preview (1).png'
                style={{
                  height: 'auto',
                  width: '209px'
                }}
              />
              {/* <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography> */}
            </Box>
            <Formik
              // validationSchema={validationSchema}
              initialValues={{
                email: '',
                phone: '',
                name: '',
                password: ''
              }}
              onSubmit={values => handleSubmit(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur }: any) => (
                <Form>
                  <TextField
                    autoFocus
                    fullWidth
                    sx={{ mb: 4 }}
                    label='Name'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.name}
                  />
                  <TextField
                    fullWidth
                    label='Email'
                    sx={{ mb: 4 }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.email}
                    name='email'
                  />
                  <TextField
                    fullWidth
                    type='tel'
                    label='Phone Number'
                    sx={{ mb: 4 }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.phone}
                    name='phone'
                  />
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                    <OutlinedInput
                      label='Password'
                      //@ts-ignore
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.password}
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      sx={{ mb: 4 }}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
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
                    Sign up
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                    <Typography variant='body2'>
                      <LinkStyled href='/super-admin/login' sx={{ fontSize: '1rem' }}>
                        Sign in instead
                      </LinkStyled>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register