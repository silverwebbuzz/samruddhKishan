import { Box, Button, Card, Chip, Divider, Grid, TextField } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { createInquiry } from 'src/slice/inquirySlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'

const inqury = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [InquryName, setInquryName] = useState('')
  const router = useRouter()
  const isValid = (inquryName: any) => {
    try {
      return JSON.parse(inquryName)
    } catch (e) {
      console.log('Error parsing')
    }
  }
  useEffect(() => {
    const inquryName = localStorage.getItem('inquryName')
    const NAME = isValid(inquryName)
    setInquryName(NAME)
    dispatch(getLogoAPI())
  }, [])
  const handleSubmit = (values: any) => {
    console.log('values', values)
    localStorage.getItem('inquryName')
    let payload = {
      ...values
    }
    payload.IId = InquryName.id
    dispatch(createInquiry(payload)).then(res => {
      if (res?.payload?.status == 200) {
        toast.success('Inquiry created successfully')
      }
      localStorage.removeItem('inquiryName')
      router.push('/')
    })
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
      <section>
        <Box
          style={{
            padding: '5%',
            marginLeft: '20%',
            marginRight: '20%'
          }}
        >
          <Formik
            enableReinitialize
            initialValues={{
              IName: InquryName?.productName
                ? InquryName?.productName
                : InquryName?.serviceName
                ? InquryName?.serviceName
                : '',
              status: '',
              fullName: '',
              mobileNumber: '',

              email: '',
              quantity: 0,
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
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5
                  }}
                >
                  <Form onSubmit={handleSubmit}>
                    <Grid container gap={3}>
                      <Grid xs={12}>
                        <Box sx={{ mb: 8, textAlign: 'center' }}>
                          <Divider>
                            <Chip
                              sx={{
                                fontSize: '22px',
                                padding: '15px',
                                fontWeight: 'bold',
                                textAlign: 'left',
                                backgroundColor: '#f6f5f8'
                              }}
                              label='Inqury Details'
                            />
                          </Divider>
                        </Box>
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          label='Inqury about'
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

                      <Grid xs={12}>
                        <TextField
                          label='Full Name'
                          autoComplete='off'
                          value={values?.fullName}
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='fullName'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          label='Mobile Number'
                          autoComplete='off'
                          value={values?.mobileNumber}
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='mobileNumber'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          label='Email'
                          autoComplete='off'
                          value={values?.email}
                          type='email'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='email'
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </Grid>
                      {!InquryName?.serviceName ? (
                        <Grid xs={12}>
                          <TextField
                            label='Quantity'
                            autoComplete='off'
                            value={values?.quantity}
                            type='number'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            name='quantity'
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </Grid>
                      ) : null}
                      <Grid xs={12}>
                        <TextField
                          label='Description'
                          autoComplete='off'
                          value={values?.description}
                          multiline
                          rows={4}
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          name='description'
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
                </Card>
              )
            }}
          </Formik>
        </Box>
      </section>
    </>
  )
}
inqury.authGuard = false
inqury.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default inqury
