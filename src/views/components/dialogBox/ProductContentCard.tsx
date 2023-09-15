import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'
import { updateProductCardSection } from 'src/slice/productSectionSlice'

const ProductContentCard = ({ show, handleCancel, edit, setEdit, editField }: any) => {
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
      <DialogTitle>{edit ? 'Update Card' : 'Add Card'}</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  productContentMainCardImage: editField?.productContentMainCardImage,
                  bigProductContentSubHeading: editField?.bigProductContentSubHeading,
                  bigProductContentText: editField?.bigProductContentText
                }
              : { productContentMainCardImage: null, bigProductContentSubHeading: '', bigProductContentText: '' }
          }
          onSubmit={(values, { resetForm }) => {
            console.log(values)
            let cardFormData = new FormData()
            let ID = localStorage.getItem('AllContentDataId')
            cardFormData.append('id', ID)
            if (cardImage) {
              cardFormData.append('productContentMainCardImage', values?.productContentMainCardImage)
            }
            cardFormData.append('bigProductContentSubHeading', values?.bigProductContentSubHeading)
            cardFormData.append('bigProductContentText', values?.bigProductContentText)
            if (edit) {
              cardFormData.append('positionId', editField?.positionId)
            }
            let cardPayload = cardFormData
            // @ts-ignore
            dispatch(updateProductCardSection(cardPayload))
            setEdit(false)
            handleCancel()
            resetForm()
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box display={'flex'} alignItems={'center'}>
                    <Box width={100} height={80}>
                      <FilePreview file={values.productContentMainCardImage} />
                    </Box>
                    <IconButton color='primary' component='label'>
                      <Icon icon='material-symbols:upload' />
                      <input
                        hidden
                        type='file'
                        name={values.productContentMainCardImage}
                        onChange={(e: any) => {
                          setFieldValue('productContentMainCardImage', e.target?.files[0])
                          setCardImage(true)
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Product Card Heading'
                    name='bigProductContentSubHeading'
                    onChange={handleChange}
                    value={values.bigProductContentSubHeading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Product Card Text'
                    name='bigProductContentText'
                    onChange={handleChange}
                    value={values.bigProductContentText}
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

export default ProductContentCard
