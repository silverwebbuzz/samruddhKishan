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
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { createMasterDegree, updateMasterDegreeById } from 'src/slice/masterDegreeSlice'
import { createCategory, getAllCategories, updateCategory } from 'src/slice/categoriesSlice'
import styled from '@emotion/styled'
import { createBrands, getAllBrands, updateBrands } from 'src/slice/brandsSlice'

const BrandsDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  // ** State
  const handleCategory = (values: any, { resetForm }: any) => {
    const formData = new FormData()
    formData.append('brandName', values?.brandName)
    formData.append('brandLogo', values?.brandLogo)

    let payload = formData
    if (edit) {
      payload.append('id', editID)
      dispatch(updateBrands(payload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllBrands({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    } else {
      dispatch(createBrands(payload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllBrands({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    }
    setEdit(false)
  }
  // Validations
  const validationSchema = yup.object({
    brandName: yup.string().required('Brand name is required')
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
  return (
    <Dialog maxWidth='sm' fullWidth open={show} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Brands' : 'Add Brands'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  brandName: editField?.brandName,
                  brandLogo: editField?.brandLogo
                }
              : {
                  brandName: '',
                  brandLogo: ''
                }
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
                <Grid container gap={3}>
                  <Grid xs={12}>
                    <TextField
                      label='Brand Name'
                      autoComplete='off'
                      value={values?.brandName}
                      type='text'
                      helperText={errors?.brandName && touched?.brandName ? errors?.brandName : ''}
                      error={errors?.brandName && touched?.brandName ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='brandName'
                      placeholder={edit ? 'Update Brand Name' : 'Add  Brand Name'}
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
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: 'flex'
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
                            Upload
                            <input
                              type='file'
                              hidden
                              onChange={e => {
                                // setFilePreviewForproductImage(e?.target?.files[0])
                                setFieldValue('brandLogo', e.target?.files[0])
                                // setBrandLogoUpdated(true)
                              }}
                            />
                          </Button>
                        </Box>
                        <ErrorMessage name='brandLogo' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
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
                          setFieldValue('brandName', '')
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

export default BrandsDialog
