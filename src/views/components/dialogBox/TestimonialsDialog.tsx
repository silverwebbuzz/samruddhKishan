import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'
import { updateProductCardSection } from 'src/slice/productSectionSlice'
import { updateFaq } from 'src/slice/faqSlice'
import { updateTestimonials } from 'src/slice/testimonialsSlice'
import { getAllContent } from 'src/slice/landingPageSlice'

const TestimonialsDialog = ({ show, handleCancel, edit, setEdit, editField }: any) => {
  const [cardImage, setCardImage] = useState(false)
  const dispatch = useDispatch()
  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={show}
      onClose={() => {
        handleCancel()
        setEdit(false)
      }}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle>{edit ? 'Update Testimonials' : 'Add Testimonials'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  testimonialPersonName: editField?.testimonialPersonName,
                  testimonialPersonRole: editField?.testimonialPersonRole,
                  testimonialDescription: editField?.testimonialDescription
                }
              : {
                  testimonialPersonName: '',
                  testimonialPersonRole: '',
                  testimonialDescription: ''
                }
          }
          onSubmit={(values, { resetForm }) => {
            let ID = localStorage.getItem('AllContentDataId')
            const payload = {
              id: ID,
              testimonialPersonName: values?.testimonialPersonName,
              testimonialPersonRole: values?.testimonialPersonRole,
              testimonialDescription: values?.testimonialDescription
            }
            if (edit) {
              //@ts-expect-error
              payload.positionId = editField?.positionId
            }
            //@ts-expect-error
            dispatch(updateTestimonials(payload)).then(() => {
              //@ts-expect-error
              dispatch(getAllContent())
            })

            setEdit(false)
            handleCancel()
            resetForm()
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Box
                sx={{
                  // marginTop: 5,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <TextField
                    fullWidth
                    size='small'
                    label='Person Name'
                    placeholder='Person Name'
                    value={values?.testimonialPersonName}
                    onChange={handleChange}
                    name='testimonialPersonName'
                    sx={{
                      margin: '0px 10px 0px 10px'
                    }}
                  />
                  <TextField
                    fullWidth
                    size='small'
                    label='Person Role'
                    placeholder='Person Role'
                    value={values?.testimonialPersonRole}
                    onChange={handleChange}
                    name='testimonialPersonRole'
                    sx={{
                      margin: '0px 10px 0px 10px'
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: 5
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    // maxRows={4}
                    onChange={handleChange}
                    size='small'
                    label='Description'
                    placeholder='Description'
                    value={values?.testimonialDescription}
                    sx={{
                      margin: '0px 10px 0px 10px'
                    }}
                    name='testimonialDescription'
                  />
                </Box>
              </Box>
              <Button sx={{ m: 3 }} variant='contained' type='submit'>
                Submit
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={() => {
                  setEdit(false)
                  handleCancel()
                }}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default TestimonialsDialog
