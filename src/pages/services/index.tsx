import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { flexbox } from '@mui/system'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getAllCategoriesForSelect } from 'src/slice/categoriesSlice'
import { getAllServices } from 'src/slice/servicesSlice'
import { getLogoAPI } from 'src/slice/settingSlice'
import { AppDispatch } from 'src/store/store'
import Navbar from 'src/views/components/landdingPage/navBar/Navbar'
import PageBanner from 'src/views/components/landdingPage/pageBanner/PageBanner'
import Sidebar from 'src/views/components/sidebar'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import FooterSection from 'src/views/components/landdingPage/footerSection'
import { Form, Formik, FormikProps } from 'formik'
import toast from 'react-hot-toast'
import { createInquiry } from 'src/slice/inquirySlice'
const ServicesPage = () => {
  const { getLogo } = useSelector((state: any) => state?.rootReducer?.settingsReducer)
  const [selectedCategory, setSelectedCategory] = useState('')
  const { getCategoriesForSelect } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { servicesData } = useSelector((state: any) => state?.rootReducer?.servicesReducer)
  const [open, setOpen] = useState<boolean>(false)
  const [singleProduct, setProduct] = useState(null)

  const dispatch = useDispatch<AppDispatch>()
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const router = useRouter()
  useEffect(() => {
    dispatch(getLogoAPI())
    dispatch(getAllCategoriesForSelect())
    localStorage.removeItem('inquryName')
  }, [])
  const handleSubmit = (values: any) => {
    console.log('values', values)
    localStorage.getItem('inquryName')
    let payload = {
      ...values
    }
    payload.IId = singleProduct.id
    payload.flag = singleProduct?.productName ? 'product' : singleProduct?.serviceName ? 'service' : ''
    dispatch(createInquiry(payload)).then(res => {
      if (res?.payload?.status == 200) {
        toast.success('Inquiry created successfully')
      }
      localStorage.removeItem('inquiryName')
      router.push('/')
    })
  }
  useEffect(() => {
    const payload = {
      categoryId: selectedCategory
    }
    dispatch(getAllServices(payload))
  }, [selectedCategory])
  useEffect(() => {
    dispatch(getLogoAPI())
  }, [])
  useEffect(() => {
    document.body.classList.add('landingPage')
    return () => {
      document.body.classList.remove('landingPage')
    }
  }, [])
  const JSONHandler = (data: any) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return []
    }
    return JSON.parse(data)
  }
  return (
    <>
      <Navbar LOGO={getLogo?.logo} />
      <div className='services-page'>
        <PageBanner
          BGImg={'/images/logo/slider3.jpg'}
          bannerName='Services'
          bannerContent='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
        />
      </div>
      <section
        style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      >
        <Sidebar
          DATA={getCategoriesForSelect?.data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div
          style={{
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            height: '100vh',
            flexWrap: 'wrap',
            marginLeft: '20px',
            width: 'calc(100% - 350px)',
            display: 'flex'
          }}
          className='custom-scroll-container'
        >
          {servicesData?.data?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  border: '1px solid',
                  backgroundColor: '#ffffff',
                  height: '400px',
                  display: 'flex',
                  marginLeft: '20px',
                  flexDirection: 'column',
                  width: '300px', // Adjust the width as per your requirements
                  marginBottom: '20px' // Add margin between cards
                }}
              >
                <CardContent
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-beteen',
                    alignItems: 'center',
                    padding: '40px'
                  }}
                >
                  <img
                    src={item?.serviceBannerImage}
                    style={{
                      borderRadius: '50%',
                      aspectRatio: 1,
                      objectFit: 'cover'
                    }}
                    height={150}
                    width={150}
                    alt={item?.productName}
                  />
                  <Typography variant='h6' className='single_service_card_title' fontWeight={600}>
                    {item?.serviceName}
                  </Typography>
                  <div
                    className='single_service_card_desc'
                    dangerouslySetInnerHTML={{ __html: item?.serviceDetails }}
                  ></div>
                </CardContent>
                <Box
                  sx={{
                    backgroundColor: '#1f4e3d',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // padding: '10px 0',
                    height: '60px'
                  }}
                >
                  {/* <p
                    style={{
                      color: '#fff',
                      margin: '0',
                      // textAlign: 'center',
                      paddingLeft: '10px'
                    }}
                  >
                    {item?.serviceName}
                  </p> */}
                  <Box
                    className='single_product_btm'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'start'
                    }}
                  >
                    <Tooltip title='View'>
                      <IconButton
                        size='small'
                        sx={{ color: 'text.secondary' }}
                        onClick={() => {
                          localStorage.setItem('inquryName', JSON.stringify(item))
                          router.push('/inqury')
                        }}
                      >
                        {/* <Icon icon={} />
                         */}
                        <Icon icon='carbon:view' color='white' fontSize={24} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title='Inqury'
                      onClick={() => {
                        setProduct(item), setOpen(true)
                      }}
                    >
                      <IconButton size='small' sx={{ color: 'text.secondary', fontSize: '50px' }}>
                        <Icon icon='ph:question-bold' color='white' fontSize={24} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </div>
      </section>
      <FooterSection LOGO={getLogo?.logo} JSONHandler={JSONHandler} />
      <Dialog maxWidth='sm' onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
        <DialogTitle id='full-screen-dialog-title'>
          {/* <Typography variant='h6' component='span'>
          </Typography> */}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              IName: singleProduct?.productName
                ? singleProduct?.productName
                : singleProduct?.serviceName
                ? singleProduct?.serviceName
                : '',
              status: 'pending',
              fullName: '',
              mobileNumber: '',
              email: '',
              quantity: 0,
              description: ''
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
                    {!singleProduct?.serviceName ? (
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
                            handleClose()
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
                // </Card>
              )
            }}
          </Formik>
          {/* </Box> */}
        </DialogContent>
        {/* <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </>
  )
}

ServicesPage.authGuard = false
ServicesPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ServicesPage
