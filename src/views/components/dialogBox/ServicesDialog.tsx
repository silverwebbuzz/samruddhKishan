// ** React Imports
// @ts-nocheck
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Formik, Form, FormikProps } from 'formik'
import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { createMasterDegree, updateMasterDegreeById } from 'src/slice/masterDegreeSlice'
import { createCategory, getAllCategories, updateCategory } from 'src/slice/categoriesSlice'

const ServicesDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()
  // ** State
  const handleCategory = (values: any, { resetForm }: any) => {
    // console.log(values)
    const payload: any = {
      categoryName: values?.categoryName?.trim()
    }
    let editPayload: any = {
      categoryName: values?.categoryName,
      categoryStatus: values?.categoryStatus,
      id: editID
    }
    if (edit) {
      //   dispatch(updateCategory(editPayload)).then(res => {
      //     if (res.payload.status === 200) {
      //       dispatch(getAllCategories({ page: 1, pageSize: 10 }))
      //     }
      //   })
      resetForm()
      handleCancel()
    } else {
      //   dispatch(createCategory(payload)).then(res => {
      //     if (res.payload.status === 200) {
      //       dispatch(getAllCategories({ page: 1, pageSize: 10 }))
      //     }
      //   })
      resetForm()
      handleCancel()
    }
    setEdit(false)
  }
  // Validations
  const validationSchema = yup.object({
    categoryName: yup.string().required('Services name is required')
  })

  return (
    <Dialog maxWidth='sm' fullWidth open={show} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Services' : 'Add Services'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  categoryName: editField?.categoryName,
                  subCategoryName: editField?.subCategoryName,
                  categoryStatus: editField?.categoryStatus
                }
              : {
                  categoryName: '',
                  subCategoryName: '',
                  categoryStatus: 0
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
                <Grid
                  container
                  gap={3}
                  // sx={{
                  //   padding: 5
                  // }}
                >
                  <Grid xs={12}>
                    <TextField
                      label='Services Name'
                      autoComplete='off'
                      value={values?.categoryName}
                      type='text'
                      helperText={errors?.categoryName && touched?.categoryName ? errors?.categoryName : ''}
                      error={errors?.categoryName && touched?.categoryName ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='categoryName'
                      placeholder={edit ? 'Update Services Name' : 'Add Services Name'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={values.categoryStatus} />}
                      label='Services Status'
                      name='categoryStatus'
                      onChange={e => {
                        setFieldValue('categoryStatus', e?.target?.checked)
                      }}
                    />
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

export default ServicesDialog
