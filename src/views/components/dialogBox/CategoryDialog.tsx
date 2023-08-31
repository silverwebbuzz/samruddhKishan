// ** React Imports
// @ts-nocheck
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Formik, Form, FormikProps } from 'formik'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { AppDispatch, RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { createMasterDegree, updateMasterDegreeById } from 'src/slice/masterDegreeSlice'
import { createCategory, getAllCategories, updateCategory } from 'src/slice/categoriesSlice'
import DemoSelect from 'src/views/demo/demoSelect'
import { useEffect, useState } from 'react'

const CategoryDialog = ({ show, setShow, handleCancel, edit, setEdit, editField, editID }: any) => {
  // console.log(search)
  const dispatch = useDispatch<AppDispatch>()
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  // ** State
  const handleCategory = (values: any, { resetForm }: any) => {
    // console.log(values)
    const payload: any = {
      categoryId: selectedCategory === 'none' ? 0 : selectedCategory,
      categoryName: values?.categoryName,
      categoryStatus: values?.categoryStatus
    }
    let editPayload: any = {
      categoryId: selectedCategory === 'none' ? 0 : selectedCategory,
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
  // Validations
  const validationSchema = yup.object({
    categoryName: yup.string().required('Category name is required')
  })

  console.log('editField?.categoryIdeditField?.categoryId===>', editField?.categoryId)
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
                  categoryId: '',
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
                      data={categories?.data}
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
                      helperText={errors?.categoryName && touched?.categoryName ? errors?.categoryName : ''}
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
                  </Grid>
                  <Grid xs={12}>
                    <FormControl fullWidth>
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
