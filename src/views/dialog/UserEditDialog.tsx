// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Chip, Dialog, Divider, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import {
  createUser1,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getAllUsers,
  getRoleAndPermissions
} from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import { ErrorMessage, Form, Formik } from 'formik'

export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const UserEditDialog = ({ handleClose, open, setOpen, setShowEdit, showEdit }) => {
  const initialValues = showEdit
    ? {
        firstName: editPrefillData?.firstName,
        lastName: editPrefillData?.lastName,
        email: editPrefillData?.email,
        password: editPrefillData?.password,
        phone: editPrefillData?.phone,
        state: editPrefillData?.state,
        district: editPrefillData?.city,
        taluka: editPrefillData?.taluka,
        villageName: editPrefillData?.villageName,
        role: editPrefillData?.role
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        state: '',
        district: '',
        taluka: '',
        villageName: '',
        role: ''
      }
  return (
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose()} open={open}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={values => {
          handleSubmit(values)
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <>
            <Box
              sx={{
                margin: 10
              }}
            >
              <Form>
                <Box sx={{ mb: 8, textAlign: 'center' }}>
                  <Divider>
                    <Chip
                      sx={{
                        fontSize: '22px',
                        padding: '15px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        backgroundColor: '#f6f5f8'
                      }}
                      label='User Details'
                    />
                  </Divider>
                </Box>
                <Grid
                  container
                  spacing={6}
                  sx={{
                    padding: '10px'
                  }}
                >
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='firstName'
                      error={Boolean(errors.firstName && touched.firstName)}
                      fullWidth
                      label='First Name'
                      placeholder='First Name'
                    />
                    <ErrorMessage name='firstName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.lastName}
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.lastName && touched.lastName)}
                      fullWidth
                      label='Last Name'
                      placeholder='Last Name'
                    />
                    <ErrorMessage name='lastName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.email}
                      name='email'
                      type='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors?.email && touched?.email)}
                      fullWidth
                      label='email'
                      placeholder='email'
                    />
                    <ErrorMessage name='lastName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.password}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors?.password && touched?.password)}
                      fullWidth
                      label='Password'
                      placeholder='Password'
                    />
                    <ErrorMessage name='lastName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.phone}
                      name='phone'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.phone && touched.phone)}
                      fullWidth
                      label='Phone Number'
                      placeholder='Phone Number'
                    />
                    <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>state</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='state'
                        value={values?.state}
                        label='state'
                        onChange={(e: any) => {
                          setFieldValue('state', e?.target?.value)
                          setSTATE(e?.target?.value)
                        }}
                      >
                        {allState?.data?.map((name: any) => (
                          <MenuItem key={name?.name} value={name?.name}>
                            {name?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <Tooltip title='Please select state first'>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>District</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='district'
                          disabled={STATE?.length <= 0}
                          value={district}
                          label='district'
                          onChange={(e: any) => {
                            setFieldValue('district', e?.target?.value)
                            setDistrict(e?.target?.value)
                          }}
                        >
                          {allDistrict?.map((name: any) => (
                            <MenuItem key={name?.name} value={name?.name}>
                              {name?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={pincode}
                      name='pinCode'
                      onChange={e => {
                        handlePincode(e.target.value)
                      }}
                      fullWidth
                      label='Pin Code'
                      placeholder='Pin Code'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Tooltip
                      title='Please enter pincode first'
                      disableFocusListener={!(pincode.length <= 0)}
                      disableHoverListener={!(pincode.length <= 0)}
                      disableTouchListener={!(pincode.length <= 0)}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='taluka'
                          disabled={pincode.length <= 0}
                          value={values?.taluka && values?.taluka}
                          label='taluka'
                          onChange={handleChange}
                        >
                          {getAddressByPinCodeData &&
                            removeDuplicatesTaluka(getAddressByPinCodeData)?.map((name: any) => (
                              <MenuItem key={name?.Block} value={name?.Block}>
                                {name?.Block}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Tooltip
                      title='Please enter pincode first'
                      disableFocusListener={!(pincode.length <= 0)}
                      disableHoverListener={!(pincode.length <= 0)}
                      disableTouchListener={!(pincode.length <= 0)}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Village Name</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='villageName'
                          disabled={pincode.length <= 0}
                          value={values?.villageName && values?.villageName}
                          label='villageName'
                          onChange={handleChange}
                        >
                          {getAddressByPinCodeData?.[0]?.PostOffice?.map(name => (
                            <MenuItem key={name?.Name} value={name?.Name}>
                              {name?.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='role'
                        value={values?.role}
                        label='Role'
                        onChange={handleChange}
                      >
                        {getRoles?.map((Item: any) => (
                          <MenuItem key={Item?.roleType} value={Item?.roleType}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}></Grid>
                  <Box
                    sx={{
                      padding: 5
                    }}
                  >
                    <Button
                      variant='contained'
                      type='submit'
                      sx={{
                        mr: 1,
                        '&:hover': {
                          backgroundColor: '#5E7954'
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Form>
            </Box>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default UserEditDialog
