// @ts-nocheck
// ** React Imports
import { useState, useEffect, SyntheticEvent, ElementType } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, ButtonProps, CardContent } from '@mui/material'

import { AppDispatch } from 'src/store/store'
import { useRouter } from 'next/router'
import { Form, Formik, FormikProps } from 'formik'

import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import { getGeneralSetting, updateGeneralSetting } from 'src/slice/settingSlice'
export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}

const Tab = styled(MuiTab)<any>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<any>(({ theme }) => ({
  borderBottom: '0 !important',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius
  },
  marginBottom: '10px'
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 200,
  height: 100,
  objectFit: 'contain',
  border: '1px solid #ddd',
  padding: '10px',
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    width: 150,
    height: 80
  }
}))

const FavIcon = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  objectFit: 'contain',
  border: '1px solid #ddd',
  padding: '10px',
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: '10px',
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))
const settings = () => {
  const [activeTab, setActiveTab] = useState<string>('general')
  const [imageLogo, setImageLogo] = useState<any>()
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const { updateGeneral, getGeneral } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const generalData = getGeneral[0]

  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (event: SyntheticEvent, value: string) => {
    // setIsLoading(true)
    setActiveTab(value)
  }

  useEffect(() => {
    const payload = {
      id: 1
    }
    dispatch(getGeneralSetting(payload))
  }, [updateGeneral])

  const handleChangeLogo = (e: any) => {
    setImageLogo(e?.target?.file)
  }

  const handleGeneral = (values: any, { resetForm }: any, submitType) => {
    let formdata = new FormData()

    if (submitType === 'general') {
      formdata.append('id', 1)
      formdata.append('applicationName', values?.applicationName ? values?.applicationName : '')
      formdata.append('applicationTitle', values?.applicationTitle ? values?.applicationTitle : '')
      formdata.append('adminEmail', values?.adminEmail ? values?.adminEmail : '')
      formdata.append('adminPhone', values?.adminPhone ? values?.adminPhone : '')
      formdata.append('adminAddress', values?.adminAddress ? values?.adminAddress : '')
      if (!isValidUrl(values?.logo)) {
        formdata.append('logo', values?.logo ? values?.logo : '')
      }
      if (!isValidUrl(values?.favIcon)) {
        formdata.append('favIcon', values?.favIcon ? values?.favIcon : '')
      }
      const generalPayload = formdata
      dispatch(updateGeneralSetting(generalPayload))
    } else if (submitType === 'email') {
      formdata.append('id', 1)
      formdata.append('mailProtocol', values?.mailProtocol ? values?.mailProtocol : '')
      formdata.append('mailTitle', values?.mailTitle ? values?.mailTitle : '')
      formdata.append('mailHost', values?.mailHost ? values?.mailHost : '')
      formdata.append('mailPort', values?.mailPort ? values?.mailPort : '')
      formdata.append('mailUsername', values?.mailUsername ? values?.mailUsername : '')
      formdata.append('mailPassword', values?.mailPassword ? values?.mailPassword : '')
      const emailPayload = formdata
      dispatch(updateGeneralSetting(emailPayload))
    } else if (submitType === 'social') {
      formdata.append('id', 1)
      formdata.append('facebook', values?.facebook ? values?.facebook : '')
      formdata.append('twitter', values?.twitter ? values?.twitter : '')
      formdata.append('instagram', values?.instagram ? values?.instagram : '')
      formdata.append('linkedin', values?.linkedin ? values?.linkedin : '')
      const socialPayload = formdata
      dispatch(updateGeneralSetting(socialPayload))
    } else if (submitType === 'googleAnalytics') {
      formdata.append('id', 1)
      formdata.append('googleAnalyticsCode', values?.googleAnalyticsCode ? values?.googleAnalyticsCode : '')
      const googleAnalyticsPayload = formdata
      dispatch(updateGeneralSetting(googleAnalyticsPayload))
    } else if (submitType === 'seo') {
      formdata.append('id', 1)
      formdata.append('metaTitle', values?.metaTitle ? values?.metaTitle : '')
      formdata.append('metaKeywords', values?.metaKeywords ? values?.metaKeywords : '')
      formdata.append('metaDescription', values?.metaDescription ? values?.metaDescription : '')
      const seoPayload = formdata
      dispatch(updateGeneralSetting(seoPayload))
    } else {
      return null
    }
  }
  const ProfilePicture = styled('img')(({ theme }) => ({
    width: '150px',
    height: '80px',
    objectFit: 'contain',
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }))

  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }
  const FilePreview = ({ file, onRemove }: any) => {
    if (isValidUrl(file)) {
      return (
        <Box>
          <ProfilePicture src={file} alt='logo' />
        </Box>
      )
    } else {
      if (file?.type?.startsWith('image')) {
        return (
          <Box>
            <ProfilePicture src={URL.createObjectURL(file)} alt='logo' />
          </Box>
        )
      } else {
        return (
          <Box>
            <ProfilePicture src={'/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg'} alt='logo' />
          </Box>
        )
      }
    }
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='forced scroll tabs example'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='general'
              label='General Settings'
              icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />}
            />
            <Tab value='email' label='E-mail Settings' icon={<Icon fontSize='1.125rem' icon='ic:outline-email' />} />
            <Tab value='social' label='Social Settings' icon={<Icon fontSize='1.125rem' icon='tabler:link' />} />
            <Tab
              value='googleAnalytics'
              label='Google Analytics Settings'
              icon={<Icon fontSize='1.125rem' icon='tabler:link' />}
            />
            <Tab value='seo' label='SEO Settings' icon={<Icon fontSize='1.125rem' icon='tabler:link' />} />
          </TabList>
          <Card sx={{ px: 6 }}>
            <Box sx={{ mt: 6 }}>
              <TabPanel sx={{ p: 0 }} value='general'>
                <Formik
                  enableReinitialize
                  initialValues={{
                    applicationName: generalData?.applicationName ? generalData?.applicationName : '',
                    applicationTitle: generalData?.applicationTitle ? generalData?.applicationTitle : '',
                    adminEmail: generalData?.adminEmail ? generalData?.adminEmail : '',
                    adminPhone: generalData?.adminPhone ? generalData?.adminPhone : '',
                    adminAddress: generalData?.adminAddress ? generalData?.adminAddress : '',
                    logo: generalData?.logo ? generalData?.logo : '',
                    favIcon: generalData?.favIcon ? generalData?.favIcon : ''
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={(values: any, { resetForm }) => {
                    handleGeneral(values, { resetForm }, 'general')
                  }}
                >
                  {(props: FormikProps<any>) => {
                    const { values, touched, errors, setFieldValue, handleBlur, handleChange, handleSubmit } = props
                    return (
                      <Form onSubmit={handleSubmit}>
                        <>
                          <CardContent sx={{ pt: 0 }}>
                            <Typography sx={{ py: 4 }} variant='h4'>
                              Gerneral Settings
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12} md={6}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-around'
                                    }}
                                  >
                                    <FilePreview file={values.logo} />
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                      <Button
                                        variant='contained'
                                        component='label'
                                        sx={{
                                          mr: 1,
                                          '&:hover': {
                                            backgroundColor: '#5E7954'
                                          }
                                        }}
                                      >
                                        Upload
                                        <input
                                          type='file'
                                          hidden
                                          onChange={e => {
                                            setFieldValue('logo', e.target?.files[0])
                                          }}
                                        />
                                      </Button>
                                      <Button
                                        variant='outlined'
                                        onClick={() => {
                                          setFieldValue('logo', '')
                                        }}
                                      >
                                        Reset
                                      </Button>
                                    </Box>
                                  </Box>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-around'
                                    }}
                                  >
                                    <FilePreview file={values.favIcon} />
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                      <Button
                                        variant='contained'
                                        component='label'
                                        sx={{
                                          mr: 1,
                                          '&:hover': {
                                            backgroundColor: '#5E7954'
                                          }
                                        }}
                                      >
                                        Upload
                                        <input
                                          type='file'
                                          hidden
                                          onChange={e => {
                                            setFieldValue('favIcon', e.target?.files[0])
                                          }}
                                        />
                                      </Button>
                                      <Button
                                        variant='outlined'
                                        onClick={() => {
                                          setFieldValue('favIcon', '')
                                        }}
                                      >
                                        Reset
                                      </Button>
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </CardContent>

                          <CardContent>
                            <Grid container spacing={5}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={values?.applicationName}
                                  name='applicationName'
                                  onChange={handleChange}
                                  fullWidth
                                  label='Application Name'
                                  placeholder='Application name'
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={values?.applicationTitle}
                                  name='applicationTitle'
                                  onChange={handleChange}
                                  fullWidth
                                  label='Application Title'
                                  placeholder='Application title'
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={values?.adminEmail}
                                  name='adminEmail'
                                  onChange={handleChange}
                                  fullWidth
                                  type='email'
                                  label='Email'
                                  placeholder='Email'
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={values?.adminPhone}
                                  name='adminPhone'
                                  onChange={handleChange}
                                  fullWidth
                                  type='number'
                                  label='Mobile No'
                                  placeholder='Mobile No'
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  value={values?.adminAddress}
                                  name='adminAddress'
                                  onChange={handleChange}
                                  fullWidth
                                  label='Address'
                                  placeholder='Address'
                                />
                              </Grid>
                              <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                  Save Changes
                                </Button>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </>
                      </Form>
                    )
                  }}
                </Formik>
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='email'>
                <CardContent>
                  <Typography sx={{ py: 4 }} variant='h4'>
                    Email Settings
                  </Typography>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      mailProtocol: generalData?.mailProtocol ? generalData?.mailProtocol : '',
                      mailTitle: generalData?.mailTitle ? generalData?.mailTitle : '',
                      mailHost: generalData?.mailHost ? generalData?.mailHost : '',
                      mailPort: generalData?.mailPort ? generalData?.mailPort : '',
                      mailUsername: generalData?.mailUsername ? generalData?.mailUsername : '',
                      mailPassword: generalData?.mailPassword ? generalData?.mailPassword : ''
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values: any, { resetForm }) => {
                      handleGeneral(values, { resetForm }, 'email')
                    }}
                  >
                    {(props: FormikProps<any>) => {
                      const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label='Mail Title'
                                placeholder='Mail title'
                                value={values?.mailTitle}
                                name='mailTitle'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.mailProtocol}
                                name='mailProtocol'
                                onChange={handleChange}
                                label='Mail Protocol'
                                placeholder='Mail protocol'
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.mailHost}
                                name='mailHost'
                                onChange={handleChange}
                                label='Mail Host'
                                placeholder='Mail host'
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.mailPort}
                                name='mailPort'
                                onChange={handleChange}
                                label='Mail Port'
                                placeholder='Mail port'
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.mailUsername}
                                name='mailUsername'
                                onChange={handleChange}
                                label='Mail Username'
                                placeholder='Mail username'
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.mailPassword}
                                name='mailPassword'
                                onChange={handleChange}
                                label='Mail Password'
                                placeholder='Mail password'
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )
                    }}
                  </Formik>
                </CardContent>
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='social'>
                <CardContent>
                  <Typography sx={{ py: 4 }} variant='h4'>
                    Social Settings
                  </Typography>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      facebook: generalData?.facebook ? generalData?.facebook : '',
                      twitter: generalData?.twitter ? generalData?.twitter : '',
                      instagram: generalData?.instagram ? generalData?.instagram : '',
                      linkedin: generalData?.linkedin ? generalData?.linkedin : ''
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values: any, { resetForm }) => {
                      handleGeneral(values, { resetForm }, 'social')
                    }}
                  >
                    {(props: FormikProps<any>) => {
                      const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label='Facebook'
                                placeholder='Facebook'
                                value={values?.facebook}
                                name='facebook'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.twitter}
                                name='twitter'
                                onChange={handleChange}
                                label='Twitter'
                                placeholder='Twitter'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.instagram}
                                name='instagram'
                                onChange={handleChange}
                                label='Instagram'
                                placeholder='Instagram'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                value={values?.linkedin}
                                name='linkedin'
                                onChange={handleChange}
                                label='Linkedin'
                                placeholder='Linkedin'
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )
                    }}
                  </Formik>
                </CardContent>
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='googleAnalytics'>
                <CardContent>
                  <Typography sx={{ py: 4 }} variant='h4'>
                    Google Analytics Settings
                  </Typography>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      googleAnalyticsCode: generalData?.googleAnalyticsCode ? generalData?.googleAnalyticsCode : ''
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values: any, { resetForm }) => {
                      handleGeneral(values, { resetForm }, 'googleAnalytics')
                    }}
                  >
                    {(props: FormikProps<any>) => {
                      const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={8}
                                label='Google Analytics Code'
                                placeholder='Google Analytics Code'
                                value={values?.googleAnalyticsCode}
                                name='googleAnalyticsCode'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )
                    }}
                  </Formik>
                </CardContent>
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='seo'>
                <CardContent>
                  <Typography sx={{ py: 4 }} variant='h4'>
                    SEO Settings
                  </Typography>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      metaTitle: generalData?.metaTitle ? generalData?.metaTitle : '',
                      metaKeywords: generalData?.metaKeywords ? generalData?.metaKeywords : '',
                      metaDescription: generalData?.metaDescription ? generalData?.metaDescription : ''
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values: any, { resetForm }) => {
                      handleGeneral(values, { resetForm }, 'seo')
                    }}
                  >
                    {(props: FormikProps<any>) => {
                      const { values, touched, errors, handleBlur, handleChange, handleSubmit } = props
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label='Meta title'
                                placeholder='Meta title'
                                value={values?.metaTitle}
                                name='metaTitle'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label='Meta Keywords'
                                placeholder='Meta keywords'
                                value={values?.metaKeywords}
                                name='metaKeywords'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label='Meta Description'
                                placeholder='Meta Description'
                                value={values?.metaDescription}
                                name='metaDescription'
                                onChange={handleChange}
                                InputLabelProps={{
                                  shrink: true
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                              <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )
                    }}
                  </Formik>
                </CardContent>
              </TabPanel>
            </Box>
          </Card>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default settings
