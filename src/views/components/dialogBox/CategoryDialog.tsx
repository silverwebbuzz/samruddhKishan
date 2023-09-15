// ** React Imports
// @ts-nocheck
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Formik, Form, FormikProps, ErrorMessage } from 'formik'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { createMasterDegree, updateMasterDegreeById } from 'src/slice/masterDegreeSlice'
import { createCategory, getAllCategories, getAllCategoriesForSelect, updateCategory } from 'src/slice/categoriesSlice'
import DemoSelect from 'src/views/demo/demoSelect'
import { useEffect, useState } from 'react'

const CategoryDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, getCategoriesForSelect } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0)

  // ** State
  const handleCategory = (values: any, { resetForm }: any) => {
    const payload: any = {
      categoryId: selectedCategory == 0 ? 0 : selectedCategory,
      categoryName: values?.categoryName,
      categoryStatus: values?.categoryStatus
    }
    let editPayload: any = {
      categoryId: selectedCategory == 0 ? 0 : selectedCategory,
      categoryName: values?.categoryName,
      categoryStatus: values?.categoryStatus === '' ? 0 : values?.categoryStatus,
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

  useEffect(() => {
    if (edit) {
      setSelectedCategory(editField?.categoryId)
    }
  }, [editField?.categoryId])
  useEffect(() => {
    dispatch(getAllCategoriesForSelect())
  }, [])
  // Validations
  const validationSchema = yup.object({
    categoryName: yup.string().required('Category name is required'),
    categoryStatus: yup.string().required('Category status is required')
  })

  return (
    <Dialog maxWidth='sm' fullWidth open={show} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Update Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  categoryId: selectedCategory,
                  categoryName: editField?.categoryName,
                  categoryStatus: editField?.categoryStatus
                }
              : {
                  categoryId: 0,
                  categoryName: '',
                  categoryStatus: ''
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
                    <DemoSelect
                      data={getCategoriesForSelect?.data}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      label='Category Name'
                      autoComplete='off'
                      value={values?.categoryName}
                      type='text'
                      error={errors?.categoryName && touched?.categoryName ? true : false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth
                      name='categoryName'
                      placeholder={edit ? 'Update  Category Name' : 'Add  Category Name'}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <ErrorMessage name='categoryName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid xs={12}>
                    <FormControl fullWidth error={errors?.categoryStatus && touched?.categoryStatus ? true : false}>
                      <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='categoryStatus'
                        value={values.categoryStatus}
                        label='Status'
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage name='categoryStatus' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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

export default CategoryDialog
