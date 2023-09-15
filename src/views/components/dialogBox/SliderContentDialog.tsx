// ** React Imports
// @ts-nocheck
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Formik, Form, FormikProps, ErrorMessage } from 'formik'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { getAllCategories, updateCategory } from 'src/slice/categoriesSlice'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { createProduct, getAllProducts, updateProduct } from 'src/slice/productSlice'
import { createSlide, getAllSlides, updateSlide } from 'src/slice/sliderSlice'

const SliderContentDialog = ({ show, handleCancel, edit, setEdit, editField }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const [sliderImage, setSliderImage] = useState(false)

  const handleCategory = (values: any, { resetForm }: any) => {
    let formData = new FormData()
    formData.append('sliderNumber', values?.sliderNumber)
    formData.append('sliderSubHeader', values?.sliderSubHeader)
    formData.append('sliderMainHeaderWithColor', values?.sliderMainHeaderWithColor)
    formData.append('sliderSubHeader2', values?.sliderSubHeader2)
    formData.append('sliderDescription', values?.sliderDescription)
    if (sliderImage) {
      formData.append('sliderImages', values?.sliderImages)
    }

    let payload = formData
    if (edit) {
      payload.append('id', editField?.id)
      dispatch(updateSlide(payload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllSlides({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    } else {
      dispatch(createSlide(payload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllSlides({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    }
    setEdit(false)
  }
  // Validations
  // const validationSchema = yup.object({
  //   productName: yup.string().required('Category name is required')
  //   // brandLogo: yup.mixed().test('fileRequired', 'Brand logo is required', value => !!value),
  //   // productImage: yup.mixed().test('fileRequired', 'Product image is required', value => !!value)
  // })
  const ProfilePicture = styled('img')(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }))

  const isValidUrl = urlString => {
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
          <ProfilePicture src={file} alt='profile-picture' />
        </Box>
      )
    } else {
      if (file?.type?.startsWith('image')) {
        return (
          <Box>
            <ProfilePicture src={URL.createObjectURL(file)} alt='slider-image' />
          </Box>
        )
      } else {
        return (
          <Box>
            <ProfilePicture
              src={'/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg'}
              alt='slider-image'
            />
          </Box>
        )
      }
    }
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={show} onClose={handleCancel} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  id: editField?.id,
                  sliderNumber: editField?.sliderNumber,
                  sliderSubHeader: editField?.sliderSubHeader,
                  sliderMainHeaderWithColor: editField?.sliderMainHeaderWithColor,
                  sliderSubHeader2: editField?.sliderSubHeader2,
                  sliderDescription: editField?.sliderDescription,
                  sliderImages: editField?.sliderImages
                }
              : {
                  sliderNumber: '',
                  sliderSubHeader: '',
                  sliderMainHeaderWithColor: '',
                  sliderSubHeader2: '',
                  sliderDescription: '',
                  sliderImages: ''
                }
          }
          // validationSchema={validationSchema}
          onSubmit={(values: any, { resetForm }) => {
            handleCategory(values, { resetForm })
          }}
        >
          {(props: FormikProps<any>) => {
            const { values, touched, errors, handleBlur, handleChange, setFieldValue } = props

            return (
              <Form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      label='Position'
                      autoComplete='off'
                      value={values?.sliderNumber}
                      type='number'
                      helperText={errors?.sliderNumber && touched?.sliderNumber ? errors?.sliderNumber : ''}
                      error={errors?.sliderNumber && touched?.sliderNumber ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='sliderNumber'
                      placeholder={edit ? 'Update Slider Position' : 'Add Slider Position'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='Slider Sub-Header'
                      autoComplete='off'
                      value={values?.sliderSubHeader}
                      type='text'
                      helperText={errors?.sliderSubHeader && touched?.sliderSubHeader ? errors?.sliderSubHeader : ''}
                      error={errors?.sliderSubHeader && touched?.sliderSubHeader ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='sliderSubHeader'
                      placeholder={edit ? 'Update Slider Sub-Header' : 'Add Slider Sub-Header'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='sliderMainHeaderWithColor'
                      value={values?.sliderMainHeaderWithColor}
                      label='Slider Main-Header With Color'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors?.sliderMainHeaderWithColor && touched?.sliderMainHeaderWithColor
                          ? errors?.sliderMainHeaderWithColor
                          : ''
                      }
                      error={errors?.sliderMainHeaderWithColor && touched?.sliderMainHeaderWithColor ? true : false}
                      type='text'
                      placeholder={edit ? 'Update Slider Main-Header With Color' : 'Add Slider Main-Header With Color'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='sliderSubHeader2'
                      value={values?.sliderSubHeader2}
                      label='Slider Sub-Header2'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors?.sliderSubHeader2 && touched?.sliderSubHeader2 ? errors?.sliderSubHeader2 : ''}
                      error={errors?.sliderSubHeader2 && touched?.sliderSubHeader2 ? true : false}
                      type='text'
                      placeholder={edit ? 'Update Slider Sub-Header2' : 'Add Slider Sub-Header2'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='Slider Description'
                      autoComplete='off'
                      rows={4}
                      multiline
                      value={values?.sliderDescription}
                      type='text'
                      helperText={
                        errors?.sliderDescription && touched?.sliderDescription ? errors?.sliderDescription : ''
                      }
                      error={errors?.sliderDescription && touched?.sliderDescription ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='sliderDescription'
                      placeholder={edit ? 'Update Slider Description' : 'Add Slider Description'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FilePreview file={values.sliderImages} />
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
                        Upload Slide Image
                        <input
                          type='file'
                          hidden
                          onChange={e => {
                            setFieldValue('sliderImages', e.target?.files[0])
                            setSliderImage(true)
                          }}
                        />
                      </Button>
                    </Box>
                    <ErrorMessage name='sliderImages' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ marginTop: '25px' }}>
                      <Button type='submit' variant='contained' size='medium'>
                        Save
                      </Button>
                      <Button
                        color='error'
                        sx={{ marginLeft: '10px' }}
                        size='medium'
                        variant='outlined'
                        onClick={() => {
                          setFieldValue('sliderSubHeader', '')
                          setEdit(false)
                          handleCancel()
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
      </DialogContent>
    </Dialog>
  )
}

export default SliderContentDialog
