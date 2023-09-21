import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'
import { updateProductCardSection } from 'src/slice/productSectionSlice'
import { updateFaq } from 'src/slice/faqSlice'

const FaqDialog = ({ show, handleCancel, edit, setEdit, editField }: any) => {
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
      <DialogTitle>{edit ? 'Update Questions & Feedbacks' : 'Add Questions & Feedbacks'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  userQuestion: editField?.userQuestion,
                  userAnswer: editField?.userAnswer
                }
              : { userQuestion: '', userAnswer: '' }
          }
          onSubmit={(values, { resetForm }) => {
            let ID = localStorage.getItem('AllContentDataId')
            const payload = {
              id: ID,
              userQuestion: values?.userQuestion,
              userAnswer: values?.userAnswer
            }
            if (edit) {
              payload.positionId = editField?.positionId
            }
            dispatch(updateFaq(payload))
            setEdit(false)
            handleCancel()
            resetForm()
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Question'
                    name='userQuestion'
                    onChange={handleChange}
                    value={values.userQuestion}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={4}
                    label='Answer'
                    name='userAnswer'
                    onChange={handleChange}
                    value={values.userAnswer}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{ mr: 2 }} type='submit' variant='contained'>
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
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default FaqDialog
