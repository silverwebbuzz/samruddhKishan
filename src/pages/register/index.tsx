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
import { ErrorMessage, Form, Formik } from 'formik'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import * as yup from 'yup'
// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
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
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  width: '100%',

  opacity: 0.8,
  objectFit: 'cover'
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
          router.push('/login')
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
            <Box sx={{ my: 6, textAlign: 'center' }}>
              <img
                src='/images/pages/logo1234.png'
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
                    error={Boolean(errors.email && touched.email)}
                  />{' '}
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
