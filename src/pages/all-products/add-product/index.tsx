// @ts-nocheck
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Formik, Form, FormikProps, ErrorMessage, Field, FieldArray } from 'formik'
import {
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { getAllCategories } from 'src/slice/categoriesSlice'
import { createService } from 'src/slice/servicesSlice'
import { useRouter } from 'next/router'
import { getAllBrands } from 'src/slice/brandsSlice'
import { toast } from 'react-hot-toast'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const addProduct = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { brandsData } = useSelector((state: any) => state?.rootReducer?.brandsReducer)

  const ProfilePicture = styled('img')(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }))

  // ** State
  const handleServices = (values: any, { resetForm }: any) => {
    let formdata = new FormData()
    formdata.append('vendorName', values?.vendorName)
    formdata.append('categoryId', values?.categoryId)
    formdata.append('serviceName', values?.ServiceName)
    formdata.append('serviceType', values?.serviceType)
    formdata.append('serviceDetails', values?.serviceDetails)
    formdata.append('serviceLocation', values?.serviceLocation)
    formdata.append('minOrderQuantity', values?.minOrderQuantity)
    formdata.append('availabilityStartDay', values?.availabilityStartDay)
    formdata.append('availabilityEndDay', values?.availabilityEndDay)
    formdata.append('serviceBannerImage', values?.serviceBannerImage)
    formdata.append('status', values?.status === true ? 1 : 0)

    let payload = formdata
    dispatch(createService(payload)).then(res => {
      if (res?.payload?.status === 200) {
        router.push('/all-services')
      }
    })
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }
  // Validations
  const validationSchema = yup.object({
    ServiceName: yup.string().required('Services name is required')
  })
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
        toast.error('please select image')
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

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllBrands())
  }, [])

  return (
    <Card
      sx={{
        padding: 5
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          vendorName: '',
          productName: '',
          categoryId: '',
          brandId: '',
          productShort: '',
          specification: [],
          producctVideoUrl: '',
          productDescription: '',
          productImage: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          handleServices(values, { resetForm })
        }}
      >
        {(props: FormikProps<any>) => {
          const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = props
          return (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'> Select Category</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='categoryId'
                      value={values?.categoryId}
                      label='Category Name'
                      onChange={(e: any) => {
                        setFieldValue('categoryId', e?.target?.value)
                      }}
                    >
                      {categories?.data?.map((Item: any) => (
                        <MenuItem key={Item?.categoryName} value={Item?.id}>
                          {Item?.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'> Select Vendor Name</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='vendorName'
                      value={values?.vendorName}
                      label='Select Vendor Name'
                      onChange={(e: any) => {
                        setFieldValue('vendorName', e?.target?.value)
                      }}
                    >
                      <MenuItem key={'vendorName'} value={'vendorName'}>
                        {'vendorName'}
                      </MenuItem>
                      {/* {categories?.data?.map((Item: any) => (
                        <MenuItem key={Item?.categoryName} value={Item?.id}>
                          {Item?.categoryName}
                        </MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Select Brand</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='brandId'
                      value={values?.brandId}
                      label='Select Brand'
                      onChange={(e: any) => {
                        setFieldValue('brandId', e?.target?.value)
                      }}
                    >
                      {brandsData?.data?.map((Item: any) => (
                        <MenuItem key={Item?.brandName} value={Item?.id}>
                          {Item?.brandName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Product Name'
                    autoComplete='off'
                    // rows={4}
                    // multiline
                    value={values?.productName}
                    type='text'
                    helperText={errors?.productName && touched?.productName ? errors?.productName : ''}
                    error={errors?.productName && touched?.productName ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='productName'
                    placeholder={'Add Product Name'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Product Code(SKU)'
                    autoComplete='off'
                    // rows={4}
                    // multiline
                    value={values?.productCode}
                    type='text'
                    helperText={errors?.productCode && touched?.productCode ? errors?.productCode : ''}
                    error={errors?.productCode && touched?.productCode ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='productCode'
                    placeholder={'Product Code(SKU)'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Product Short Description'
                    autoComplete='off'
                    rows={4}
                    multiline
                    value={values?.productShort}
                    type='text'
                    helperText={errors?.productShort && touched?.productShort ? errors?.productShort : ''}
                    error={errors?.productShort && touched?.productShort ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='productShort'
                    placeholder={'Product Short Description'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label='Product Video URL'
                    autoComplete='off'
                    value={values?.producctVideoUrl}
                    type='text'
                    helperText={errors?.producctVideoUrl && touched?.producctVideoUrl ? errors?.producctVideoUrl : ''}
                    error={errors?.producctVideoUrl && touched?.producctVideoUrl ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='producctVideoUrl'
                    placeholder={'Product Video URL'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    marginTop: '20px',
                    display: 'flex'
                  }}
                >
                  {/* <Typography variant='h6'>Product Image :</Typography> */}
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: 'flex'
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
                              setFieldValue('productImage', e.target?.files[0])
                            }}
                          />
                        </Button>
                      </Box>
                      <ErrorMessage name='productImage' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name='specification'
                    render={arrayHelpers => (
                      <div>
                        <Typography variant='h6'>Specification :</Typography>
                        {values.specification && values.specification.length > 0 ? (
                          values.specification.map((friend, index) => (
                            <div key={index}>
                              <Box display={'flex'} margin={2}>
                                <TextField
                                  sx={{
                                    margin: 2
                                  }}
                                  name={`specification.${index}.title`}
                                  label='title'
                                  size='small'
                                />
                                <TextField
                                  sx={{
                                    margin: 2
                                  }}
                                  name={`specification.${index}.value`}
                                  label='value'
                                  size='small'
                                />
                                <Button
                                  type='button'
                                  variant='contained'
                                  color='error'
                                  sx={{
                                    margin: 2
                                  }}
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  Delete
                                </Button>
                                <Button
                                  sx={{
                                    margin: 2
                                  }}
                                  variant='contained'
                                  type='button'
                                  onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                >
                                  ADD
                                </Button>
                              </Box>
                            </div>
                          ))
                        ) : (
                          <Button type='button' onClick={() => arrayHelpers.push('')}>
                            Add Specification
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </Grid>

                {/* <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: '20px'
                  }}
                >
                // Availability(Stock)	
                  <Grid item sm={12} xs={12}>
                    <Typography variant='h6'>Product Full Description :</Typography>
                    <Field sx={{ marginTop: '10px', marginBottom: '20px' }} name='productDescription'>
                      {({ field }: any) => (
                        <div
                          style={{
                            marginBottom: '20px'
                          }}
                        >
                          <ReactQuill
                            style={{
                              height: '200px',
                              margin: '20px'
                            }}
                            modules={modules}
                            value={field.value}
                            onChange={field.onChange(field.name)}
                          />
                        </div>
                      )}
                    </Field>
                  </Grid>
                </Grid> */}
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
    </Card>
  )
}

export default addProduct
