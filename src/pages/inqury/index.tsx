import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

const inqury = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [InquryName, setInquryName] = useState('')
  useEffect(() => {
    const inquryName = localStorage.getItem('inquryName')
    setInquryName(inquryName)
    dispatch(getLogoAPI())
  }, [])
  const handleSubmit = (values: any) => {
    console.log('values', values)
  }
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='products-page'>
        <PageBanner
          BGImg='/images/logo/slider2.jpg'
          bannerName='Inqury'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
      <section
      // style={{
      //   paddingLeft: '5%',
      //   paddingRight: '5%'
      // }}
      >
        <Box
          style={{
            padding: '5%',
            marginLeft: '20%',
            marginRight: '20%'
          }}
        >
          <Card
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5
            }}
          >
            <Formik
              enableReinitialize
              initialValues={{
                IName: InquryName,
                status: '',
                mobileNumber: '',
                email: '',
                fullName: '',
                quantity: '',
                description: '',
                flag: ''
              }}
              onSubmit={(values: any, { resetForm }) => {
                handleSubmit(values, { resetForm })
              }}
            >
              {(props: FormikProps<any>) => {
                const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = props
                return (
                  <Form onSubmit={handleSubmit}>
                    <Grid container gap={3}>
                      <Grid xs={6}>
                        <TextField
                          label='Inqury'
                          autoComplete='off'
                          value={values?.IName}
                          disabled
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='IName'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                      <Grid xs={6}>
                        <TextField
                          label='Inqury'
                          autoComplete='off'
                          value={values?.IName}
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='IName'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>

                      <Grid xs={12}>
                        <Box sx={{ marginTop: '25px' }}>
                          <Button type='submit' variant='contained' size='medium'>
                            Submit
                          </Button>
                          <Button
                            color='error'
                            sx={{ marginLeft: '10px' }}
                            size='medium'
                            variant='contained'
                            onClick={() => {
                              //   setFieldValue('brandName', '')
                              //   setEdit(false)
                              //   handleCancel()
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )
              }}
            </Formik>
          </Card>
        </Box>
      </section>
    </>
  )
}
inqury.authGuard = false
inqury.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default inqury
