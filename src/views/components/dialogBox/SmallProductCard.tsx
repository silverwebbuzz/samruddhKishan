import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FilePreview } from 'src/views/components/filePreviewer/FilePreview'
import { updateProductCardSection } from 'src/slice/productSectionSlice'
import { updateSmallProductCard } from 'src/slice/smallProductSlice'

const SmallProductCard = ({ show, handleCancel, edit, setEdit, editField }: any) => {
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
                  smallProductContentCardImage: editField?.smallProductContentCardImage,
                  productContentName: editField?.productContentName
                }
              : { smallProductContentCardImage: '', productContentName: '' }
          }
          onSubmit={(values, { resetForm }) => {
            console.log(values)
            let cardFormData = new FormData()
            cardFormData.append('id', '156')
            if (cardImage) {
              cardFormData.append('smallProductContentCardImage', values?.smallProductContentCardImage)
            }
            cardFormData.append('productContentName', values?.productContentName)
            if (edit) {
              cardFormData.append('positionId', editField?.positionId)
            }
            let cardPayload = cardFormData
            // @ts-ignore
            dispatch(updateSmallProductCard(cardPayload))
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
                      <FilePreview file={values.smallProductContentCardImage} />
                    </Box>
                    <IconButton color='primary' component='label'>
                      <Icon icon='material-symbols:upload' />
                      <input
                        hidden
                        type='file'
                        name={values.smallProductContentCardImage}
                        onChange={(e: any) => {
                          setFieldValue('smallProductContentCardImage', e.target?.files[0])
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
                    name='productContentName'
                    onChange={handleChange}
                    value={values.productContentName}
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

export default SmallProductCard
