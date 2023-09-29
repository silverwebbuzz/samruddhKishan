import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { contentPointDetail, getAllContent, updateCardContent } from 'src/slice/contentSectionSlice'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'

const PointCardDialog = ({ show, handleCancel, edit, setEdit, editField }: any) => {
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
      <DialogTitle>{edit ? 'Update Point' : 'Add Point'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  contentPointDetail: editField?.contentPointDetail
                }
              : {
                  contentPointDetail: ''
                }
          }
          onSubmit={(values, { resetForm }) => {
            console.log(values)
            let ID = localStorage.getItem('AllContentDataId')
            let payload = {
              id: ID,
              contentPointDetail: values?.contentPointDetail
            }
            if (edit) {
              payload.positionId = editField?.positionId
            }
            // @ts-ignore
            dispatch(contentPointDetail(payload)).then(() => {
              dispatch(getAllContent())
            })
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
                    label='Point'
                    name='contentPointDetail'
                    onChange={handleChange}
                    value={values.contentPointDetail}
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

export default PointCardDialog
