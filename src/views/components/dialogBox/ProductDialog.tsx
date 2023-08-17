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

const ProductDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()
  // ** State
  const [categories1, setCategories] = useState()
  const [filePreview, setFilePreview] = useState('')
  const [filePreviewForproductImage, setFilePreviewForproductImage] = useState('')
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  useEffect(() => {
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
  }, [])
  const handleCategory = (values: any, { resetForm }: any) => {
    // console.log(values)
    let formData = new FormData()
    formData.append('productName', values?.productName)
    // formData.append('categoryName', values?.categories)
    formData.append('productDescription', values?.productDescription)
    formData.append('productImage', values?.productImage)
    formData.append('brandLogo', values?.brandLogo)

    let payload = formData
    if (edit) {
      payload.append('id', editField?.id)
      dispatch(updateProduct(payload)).then(res => {
        // if (res.payload.status === 200) {
        dispatch(getAllProducts({ page: 1, pageSize: 10 }))
        // }
      })
      resetForm()
      handleCancel()
    } else {
      dispatch(createProduct(payload)).then(res => {
        // if (res.payload.status === 200) {
        dispatch(getAllProducts({ page: 1, pageSize: 10 }))
        // }
      })
      resetForm()
      handleCancel()
    }
    setEdit(false)
  }
  // Validations
  const validationSchema = yup.object({
    productName: yup.string().required('Category name is required'),
    brandLogo: yup.mixed().test('fileRequired', 'Brand logo is required', value => !!value),
    productImage: yup.mixed().test('fileRequired', 'Product image is required', value => !!value)
  })
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
            <ProfilePicture src={URL.createObjectURL(file)} alt='profile-picture' />
          </Box>
        )
      } else {
        return (
          <Box>
            <ProfilePicture
              src={'/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg'}
              alt='profile-picture'
            />
          </Box>
        )
      }
    }
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={show} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  categories: editField?.categoryName,
                  productName: editField?.productName,
                  productDescription: editField?.productDescription,
                  brandLogo: editField?.brandLogo,
                  productImage: editField?.productImage
                }
              : { productName: '', productDescription: '', productImage: '', brandLogo: '', categories: '' }
          }
          validationSchema={validationSchema}
          onSubmit={(values: any, { resetForm }) => {
            handleCategory(values, { resetForm })
          }}
        >
          {(props: FormikProps<any>) => {
            const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = props

            return (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      label='Product Name'
                      autoComplete='off'
                      value={values?.productName}
                      type='text'
                      helperText={errors?.productName && touched?.productName ? errors?.productName : ''}
                      error={errors?.productName && touched?.productName ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='productName'
                      placeholder={edit ? 'Update Product Name' : 'Add Product Name'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Categories</InputLabel>
                      <Select
                        id='demo-simple-select'
                        name='categories'
                        value={values?.categories}
                        label='Categories'
                        onChange={handleChange}
                      >
                        {categories?.data?.map(name => (
                          <MenuItem key={name?.categoryName} value={name?.categoryName}>
                            {name?.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      label='Product Description'
                      autoComplete='off'
                      rows={4}
                      multiline
                      value={values?.productDescription}
                      type='text'
                      helperText={
                        errors?.productDescription && touched?.productDescription ? errors?.productDescription : ''
                      }
                      error={errors?.productDescription && touched?.productDescription ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='productDescription'
                      placeholder={edit ? 'Update Product Description' : 'Add Product Description'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        margin: 5
                      }}
                    >
                      <FilePreview file={values.brandLogo} />
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
                          Upload Brand Logo
                          <input
                            type='file'
                            hidden
                            onChange={e => {
                              setFilePreviewForproductImage(e?.target?.files[0])
                              setFieldValue('brandLogo', e.target?.files[0])
                            }}
                          />
                        </Button>
                      </Box>
                      <ErrorMessage name='brandLogo' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        margin: 5
                      }}
                    >
                      <FilePreview file={values.productImage} />
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
                          Upload Product Image
                          <input
                            type='file'
                            hidden
                            onChange={e => {
                              setFilePreview(e?.target?.files[0])
                              setFieldValue('productImage', e.target?.files[0])
                            }}
                          />
                        </Button>
                      </Box>
                      <ErrorMessage name='productImage' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </Grid>
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
                        variant='contained'
                        onClick={() => {
                          setFieldValue('categoryName', '')
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

export default ProductDialog
