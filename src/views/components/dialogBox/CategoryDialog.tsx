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

const CategoryDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
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
      dispatch(updateCategory(editPayload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllCategories({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    } else {
      dispatch(createCategory(payload)).then(res => {
        if (res.payload.status === 200) {
          dispatch(getAllCategories({ page: 1, pageSize: 10 }))
        }
      })
      resetForm()
      handleCancel()
    }
    setEdit(false)
  }
  // Validations
  const validationSchema = yup.object({
    categoryName: yup.string().required('Category name is required')
  })

  return (
    <Dialog maxWidth='sm' fullWidth open={show} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? { categoryName: editField?.categoryName, categoryStatus: editField?.categoryStatus }
              : { categoryName: '', categoryStatus: 0 }
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
                      label='Category Name'
                      autoComplete='off'
                      value={values?.categoryName}
                      type='text'
                      helperText={errors?.categoryName && touched?.categoryName ? errors?.categoryName : ''}
                      error={errors?.categoryName && touched?.categoryName ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='categoryName'
                      placeholder={edit ? 'Update Category Name' : 'Add Category Name'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={values.categoryStatus} />}
                      label='Category Status'
                      name='categoryStatus'
                      onChange={e => {
                        setFieldValue('categoryStatus', e?.target?.checked)
                      }}
                    />
                    {console.log('values.categoryStatus', values.categoryStatus)}
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

export default CategoryDialog
