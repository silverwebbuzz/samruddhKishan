import React from 'react'
import { Box, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { ErrorMessage, Form, Formik, FormikProps } from 'formik'
import { createInquiry } from 'src/slice/inquirySlice'
import { AppDispatch } from 'src/store/store'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import * as yup from 'yup'
const ContactSection = () => {
  const dispatch = useDispatch<AppDispatch>()

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required')
    // mobileNumber: yup
    //   .string()
    //   .required('Mobile number is required')
    //   .matches(/^(\+91|0)?[6789]\d{9}$/, 'Invalid mobile number')
  })

  const handleForm = (values: any, { resetForm }: any) => {
    let payload = {
      fullName: values?.fullName ? values?.fullName : '',
      email: values?.email ? values?.email : '',
      mobileNumber: values?.mobileNumber ? values?.mobileNumber : '',
      description: values?.description ? values?.description : '',
      flag: 'General'
    }
    console.log(payload)
    // payload.flag = singleProduct?.productName ? 'General' : singleProduct?.serviceName ? 'General' : ''
    dispatch(createInquiry(payload)).then(res => {
      if (res?.payload?.status == 200) {
        toast.success('Form submited successfully')
      }
    })
    resetForm()
  }
  return (
    <section className='home-contact sec_padding'>
      <Grid container style={{ alignItems: 'center' }}>
        <Grid sm={12} md={6}>
          <Box className='home-contact-left'>
            <div className='form-section'>
              <h5 className='sec_sub_title'>HAVE QUESTIONS?</h5>
              <h2 className='sec_title'>Send us a Massage</h2>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  fullName: '',
                  email: '',
                  mobileNumber: '',
                  description: ''
                }}
                onSubmit={(values, { resetForm }) => {
                  handleForm(values, { resetForm })
                }}
              >
                {(props: FormikProps<any>) => {
                  const { values, setFieldValue } = props

                  return (
                    <Form className='home-form'>
                      <div className='name_row'>
                        <input
                          type='text'
                          placeholder='Name'
                          name='fullName'
                          value={values?.fullName}
                          onChange={e => setFieldValue('fullName', e?.target?.value)}
                        />
                        <ErrorMessage name='fullName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </div>
                      <div className='email_phone_row'>
                        <div className='email_row'>
                          <input
                            type='email'
                            placeholder='Email*'
                            name='email'
                            value={values?.email}
                            onChange={e => setFieldValue('email', e?.target?.value)}
                          />
                          <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                        </div>
                        <div className='phone_row'>
                          <input
                            type='number'
                            placeholder='Phone'
                            name='mobileNumber'
                            value={values?.mobileNumber}
                            onChange={e => setFieldValue('mobileNumber', e?.target?.value)}
                          />
                        </div>
                      </div>
                      <div className='textarea_row'>
                        <textarea
                          id=''
                          cols={30}
                          rows={10}
                          placeholder='Tell Us About Produts..'
                          name='description'
                          value={values?.description}
                          onChange={e => setFieldValue('description', e?.target?.value)}
                        />
                      </div>
                      <div>
                        <button type='submit' className='submit_btn yellowbtn'>
                          <Icon icon='vaadin:paperplane' />
                          Get in Touch
                        </button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </Box>
        </Grid>
        <Grid sm={12} md={6}>
          <Box className='home-contact-right'>
            <div className='contact-des'>
              <h1 className='contact-heading'>Contact Information</h1>
              <p className='contact-text'>
                Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she
                shewing.
              </p>
            </div>
            <div className='contact-details contact_details_phone'>
              <div className='contact-icon'>
                <Icon fontSize='25px' icon='ic:baseline-phone' />
              </div>
              <div className='contact-name'>
                <h3>Phone No.</h3>
                <p>+91 33378901</p>
              </div>
            </div>
            <div className='contact-details contact_details_location'>
              <div className='contact-icon'>
                <Icon fontSize='25px' icon='mdi:location' />
              </div>
              <div className='contact-name'>
                <h3>Our Location</h3>
                <p>Ahmedabad, Gujarat</p>
              </div>
            </div>
            <div className='contact-details contact_details_email'>
              <div className='contact-icon'>
                <Icon fontSize='25px' icon='ic:baseline-email' />
              </div>
              <div className='contact-name'>
                <h3>Email</h3>
                <p>example@gamil.com</p>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </section>
  )
}

export default ContactSection
