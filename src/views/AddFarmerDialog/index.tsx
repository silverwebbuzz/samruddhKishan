//@ts-nocheck
import React from 'react'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import { Button, Radio, RadioGroup } from '@mui/material'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Form, Formik } from 'formik'
import Chip from 'src/@core/components/mui/chip'

const AddFarmerDialog = (
  { popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] },
  { setShow }: any
) => {
  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    DOB: '',
    adharNumber: '',
    mobileNumber: '',
    address: '',
    villageName: '',
    taluka: '',
    district: '',
    state: '',
    pinCode: '',
    caste: '',
    maritalStatus: '',
    gender: '',
    religion: '',
    landDistrict: '',
    subDivision: '',
    circle: '',
    mouza: '',
    landVillage: '',
    pattaType: '',
    latNo: '',
    pattaNo: '',
    landArea: '',
    landType: '',
    farmerLandOwnershipType: ''
  }
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        selected={value || null}
        className='form-control'
        dateFormat='MMM d, yyyy'
        onChange={val => {
          onChange(name, val)
        }}
      />
    )
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <>
            <Form>
              <DialogContent
                sx={{
                  position: 'relative',
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <IconButton
                  size='small'
                  onClick={() => setShow(false)}
                  sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                >
                  <Icon icon='tabler:x' />
                </IconButton>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    Edit Farmer Information
                  </Typography>
                  <Typography variant='body2'>Updating user details will receive a privacy audit.</Typography>
                </Box>

                <Grid container spacing={6}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='firstName'
                      fullWidth
                      label='First Name'
                      placeholder='John'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.middleName}
                      name='middleName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Middle Name'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.lastName}
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Last Name'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.DOB}
                      name='DOB'
                      //   onChange={setFieldValue}
                      // onChange={handleChange}
                      fullWidth
                      type='date'
                      label='Date of birth'
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.adharNumber}
                      name='adharNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Adhar Number'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.mobileNumber}
                      name='mobileNumber'
                      type='number'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Mobile Number'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.address}
                      name='address'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Address'
                      placeholder='Doe'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.villageName}
                      name='villageName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Village Name'
                      placeholder='Village Name'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.taluka}
                      name='taluka'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Taluka'
                      placeholder='Taluka'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.district}
                      name='district'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='District'
                      placeholder='District'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.state}
                      name='state'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='State'
                      placeholder='state'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.state}
                      name='pinCode'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Pin Code'
                      placeholder='Pin Code'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.state}
                      name='caste'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Caste'
                      placeholder='caste'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                      Marital Status
                    </Typography>
                    <RadioGroup
                      row
                      aria-label='controlled'
                      value={values?.maritalStatus}
                      name='maritalStatus'
                      onChange={handleChange}
                    >
                      <FormControlLabel value='single' control={<Radio />} label='Single' />
                      <FormControlLabel value='married' control={<Radio />} label='Married' />
                    </RadioGroup>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                      Gender{' '}
                    </Typography>
                    <RadioGroup
                      row
                      aria-label='controlled'
                      value={values?.gender}
                      name='gender'
                      onChange={handleChange}
                    >
                      <FormControlLabel value='male' control={<Radio />} label='Male' />
                      <FormControlLabel value='female' control={<Radio />} label='Female' />
                      <FormControlLabel value='both' control={<Radio />} label='Both' />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
                  Discard
                </Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default AddFarmerDialog
