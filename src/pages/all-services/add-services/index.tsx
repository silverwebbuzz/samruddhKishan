// @ts-nocheck
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Formik, Form, FormikProps, ErrorMessage, Field } from 'formik'
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
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
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { getAllCategories } from 'src/slice/categoriesSlice'
import { createService } from 'src/slice/servicesSlice'
import { useRouter } from 'next/router'
import { getAllUsers } from 'src/slice/farmers'
import DemoSelect from 'src/views/demo/demoSelect'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const addServices = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [vendorId, setVendorId] = useState(0)
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0)
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { getUsers } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const [serviceStatusPrefill, setServiceStatusPrefill] = useState('')
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
    formdata.append('vendorId', vendorId ? vendorId : 0)
    formdata.append('categoryId', categoryIdPrefill)
    formdata.append('serviceName', values?.ServiceName)
    formdata.append('serviceType', values?.serviceType)
    formdata.append('serviceDetails', values?.serviceDetails)
    formdata.append('serviceLocation', values?.serviceLocation)
    formdata.append('minOrderQuantity', values?.minOrderQuantity)
    formdata.append('availabilityStartDay', values?.availabilityStartDay)
    formdata.append('availabilityEndDay', values?.availabilityEndDay)
    formdata.append('serviceBannerImage', values?.serviceBannerImage)
    formdata.append('status', serviceStatusPrefill)

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
    dispatch(getAllUsers({ page: 1, pageSize: 10 }))
  }, [])
  const userFilter = (users: any) => {
    return users?.filter((user: any) => user.role === 'VENDORS')
  }
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
          categoryId: '',
          ServiceName: '',
          serviceType: '',
          serviceDetails: '',
          serviceLocation: '',
          minOrderQuantity: '',
          availabilityStartDay: '',
          availabilityEndDay: '',
          serviceBannerImage: '',
          serviceStatus: ''
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
                <Grid xs={12} sm={12}>
                  <Box sx={{ mb: 8, mt: 8, textAlign: 'center' }}>
                    <Divider>
                      <Chip
                        sx={{
                          fontSize: '22px',
                          padding: '15px',
                          fontWeight: 'bold',
                          textAlign: 'left',
                          backgroundColor: '#f6f5f8'
                        }}
                        label='Service Details'
                      />
                    </Divider>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6}>
                  {/* <FormControl fullWidth>
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
                  </FormControl> */}
                  <FormControl fullWidth>
                    <DemoSelect
                      data={categories?.data}
                      size={'medium'}
                      //@ts-ignore
                      selectedCategory={categoryIdPrefill}
                      //@ts-ignore
                      setSelectedCategory={setCategoryIdPrefill}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Vendor Name</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='vendorId'
                      value={vendorId}
                      label='Vendor Name'
                      onChange={(e: any) => {
                        setVendorId(e?.target?.value)
                      }}
                    >
                      {userFilter(getUsers?.data)?.map((Item: any) => (
                        <MenuItem key={Item?.id} value={Item?.id}>
                          {Item?.firstName} {Item?.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    label='Services Name'
                    autoComplete='off'
                    // rows={4}
                    // multiline
                    value={values?.ServiceName}
                    type='text'
                    helperText={errors?.ServiceName && touched?.ServiceName ? errors?.ServiceName : ''}
                    error={errors?.ServiceName && touched?.ServiceName ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='ServiceName'
                    placeholder={'Add Service Name'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'> Service Type</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='serviceType'
                      value={values?.serviceType}
                      label='Service Type'
                      onChange={(e: any) => {
                        setFieldValue('serviceType', e?.target?.value)
                      }}
                    >
                      <MenuItem key={'Heath Insurance'} value={'Heath Insurance'}>
                        {'Heath Insurance'}
                      </MenuItem>
                      <MenuItem key={'Vehicle Insurance'} value={'Vehicle Insurance'}>
                        {'Vehicle Insurance'}
                      </MenuItem>
                      <MenuItem key={'Loan'} value={'Loan'}>
                        {'Loan'}
                      </MenuItem>
                      <MenuItem key={'Other'} value={'Other'}>
                        {'Other'}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label='Service Location:'
                    autoComplete='off'
                    value={values?.serviceLocation}
                    type='text'
                    helperText={errors?.serviceLocation && touched?.serviceLocation ? errors?.serviceLocation : ''}
                    error={errors?.serviceLocation && touched?.serviceLocation ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='serviceLocation'
                    placeholder={'Service Location'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    label='Min Order Quantity'
                    autoComplete='off'
                    // rows={4}
                    // multiline
                    value={values?.minOrderQuantity}
                    type='number'
                    helperText={errors?.minOrderQuantity && touched?.minOrderQuantity ? errors?.minOrderQuantity : ''}
                    error={errors?.minOrderQuantity && touched?.minOrderQuantity ? true : false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    name='minOrderQuantity'
                    placeholder={'Min Order Quantity'}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Status</InputLabel>
                    <Select
                      // size='small'
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='serviceStatus'
                      label='Select Status'
                      value={serviceStatusPrefill}
                      onChange={e => {
                        setFieldValue('serviceStatus', e?.target?.value)
                        setServiceStatusPrefill(e?.target?.value)
                      }}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      // margin: 5
                      // marginLeft: 2,
                      padding: 2
                    }}
                  >
                    <Typography variant='body'>Availability :</Typography>
                    <FormControl
                      InputLabelProps={{
                        shrink: true
                      }}
                      sx={{ m: 1 }}
                      size='small'
                    >
                      <InputLabel labelId='demo-simple-select-label'>Start Day</InputLabel>
                      <Select
                        name='availabilityStartDay'
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Start Day'
                        value={values?.availabilityStartDay}
                        onChange={handleChange}
                      >
                        <MenuItem value={'Monday'}>Monday</MenuItem>
                        <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                        <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                        <MenuItem value={'Thursday '}>Thursday </MenuItem>
                        <MenuItem value={'Friday'}>Friday</MenuItem>
                        <MenuItem value={'Saturday'}>Saturday</MenuItem>
                        <MenuItem value={'Sunday'}>Sunday</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant='body'>to</Typography>
                    <FormControl name='availabilityEndDay' sx={{ m: 1 }} size='small'>
                      <InputLabel
                        InputLabelProps={{
                          shrink: true
                        }}
                      >
                        End Day
                      </InputLabel>
                      <Select
                        name='availabilityEndDay'
                        label='End Day'
                        value={values?.availabilityEndDay}
                        onChange={handleChange}
                      >
                        <MenuItem value={'Monday'}>Monday</MenuItem>
                        <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                        <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                        <MenuItem value={'Thursday '}>Thursday </MenuItem>
                        <MenuItem value={'Friday'}>Friday</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                  <Grid item xs={6}>
                    <Typography variant='h6'>Upload your Service Banner Image:</Typography>
                    <Box
                      sx={{
                        display: 'flex'
                      }}
                    >
                      <FilePreview file={values.serviceBannerImage} />
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
                              // setFilePreviewForproductImage(e?.target?.files[0])
                              setFieldValue('serviceBannerImage', e.target?.files[0])
                              // setBrandLogoUpdated(true)
                            }}
                          />
                        </Button>
                      </Box>
                      <ErrorMessage
                        name='serviceBannerImage'
                        render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: '20px'
                  }}
                >
                  <Grid item sm={12} xs={12}>
                    <Typography variant='h6'>Content :</Typography>
                    <Field sx={{ marginTop: '10px', marginBottom: '20px' }} name='content'>
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
    </Card>
  )
}

export default addServices
