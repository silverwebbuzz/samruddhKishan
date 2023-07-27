//@ts-nocheck
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import { Button, Card, Divider, InputAdornment, OutlinedInput, Radio, RadioGroup, Tooltip } from '@mui/material'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as yup from 'yup'

// ** Icon Imports
import { ErrorMessage, Form, Formik } from 'formik'
import Chip from 'src/@core/components/mui/chip'
import {
  createFarmer,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getSingleFarmer,
  updateFarmer,
  uploadImage
} from 'src/slice/farmers'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const FarmerDetails = () => {
  const { allDistrict, allState, getFarmer, getAddressByPinCodeData } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const [STATE, setSTATE] = useState('')
  const [Taluka, setTaluka] = useState('')
  const [file, setFile] = useState('')
  const farmerData = JSON.parse(localStorage.getItem('FarmerData'))
  const [pincode, setPincode] = useState('')
  const [district, setDistrict] = useState('')
  const [villageName, setVillageName] = useState('')
  const [landDistrict, setLandDistrict] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()

  const initialValues = {
    firstName: getFarmer?.[0]?.firstName,
    middleName: getFarmer?.[0]?.middleName,
    lastName: getFarmer?.[0]?.lastName,
    DOB: getFarmer?.[0]?.DOB,
    aadharNumber: getFarmer?.[0]?.aadharNumber,
    mobileNumber: getFarmer?.[0]?.mobileNumber,
    address: getFarmer?.[0]?.address,
    villageName: getFarmer?.[0]?.villageName,
    taluka: getFarmer?.[0]?.taluka,
    district: getFarmer?.[0]?.district,
    state: getFarmer?.[0]?.state,
    pinCode: getFarmer?.[0]?.pinCode,
    caste: getFarmer?.[0]?.caste,
    maritalStatus: getFarmer?.[0]?.maritalStatus,
    gender: getFarmer?.[0]?.gender,
    religion: getFarmer?.[0]?.religion,
    landDistrict: getFarmer?.[0]?.landDistrict,
    subDivision: getFarmer?.[0]?.subDivision,
    circle: getFarmer?.[0]?.circle,
    mouza: getFarmer?.[0]?.mouza,
    landVillage: getFarmer?.[0]?.landVillage,
    pattaType: getFarmer?.[0]?.pattaType,
    latNo: getFarmer?.[0]?.latNo,
    pattaNo: getFarmer?.[0]?.pattaNo,
    landArea: getFarmer?.[0]?.landArea,
    landType: getFarmer?.[0]?.landType,
    farmerLandOwnershipType: getFarmer?.[0]?.farmerLandOwnershipType,
    appliedForSoilTesting: getFarmer?.[0]?.appliedForSoilTesting === 1 ? 'yes' : 'no',
    maritalStatus: getFarmer?.[0]?.maritalStatus
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name  is required'),
    middleName: yup.string().required('Middle name is required'),
    mobileNumber: yup
      .string()
      .min(10, 'mobile number contain maximum 10 digit')
      .max(10, 'mobile number contain maximum 10 digit'),
    lastName: yup.string().required('Last name is required'),
    aadharNumber: yup
      .string()
      .required('Adhar number is required')
      .matches(
        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
        'please enter a valid adhar number'
      ),
    appliedForSoilTesting: yup.string().required('Periods of bond is required')
  })
  const handleSubmit = (values: any) => {
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    const payload = {
      adminId: userData?.id,
      firstName: values?.firstName,
      middleName: values?.middleName,
      lastName: values?.lastName,
      DOB: values?.DOB,
      aadharNumber: values?.aadharNumber,
      mobileNumber: values?.mobileNumber,
      address: values?.address,
      villageName: values?.villageName,
      taluka: values?.taluka,
      district: values?.district,
      state: values?.state,
      pinCode: pincode,
      caste: values?.caste,
      maritalStatus: values?.maritalStatus,
      gender: values?.gender,
      religion: values?.religion,
      landDistrict: values?.landDistrict,
      subDivision: values?.subDivision,
      circle: values?.circle,
      mouza: values?.mouza,
      landVillage: values?.landVillage,
      pattaType: values?.pattaType,
      latNo: values?.latNo,
      pattaNo: values?.pattaNo,
      landArea: values?.landArea,
      landType: values?.landType,
      farmerLandOwnershipType: values?.farmerLandOwnershipType,
      appliedForSoilTesting: values?.appliedForSoilTesting === 'yes' ? 1 : 0
    }
    if (getFarmer?.[0]?.id) {
      payload.id = getFarmer?.[0]?.id
      dispatch(updateFarmer(payload))
      if (file?.length > 0) {
        let payload = {
          id: getFarmer?.[0]?.id,
          file: file
        }
        dispatch(uploadImage(payload))
      }
      router.push('/farmers')
    }
  }

  const handlePincode = e => {
    setPincode(e)
    let payload = {
      pincode: e
    }
    dispatch(getAdressByPincode(payload))
  }
  useEffect(() => {
    if (getFarmer) {
      handlePincode(getFarmer?.[0]?.pinCode)
    }
  }, [getFarmer?.[0]?.pinCode])
  useEffect(() => {
    let payload = {
      id: farmerData
    }
    dispatch(getAllState())
    dispatch(getSingleFarmer(payload))
  }, [])

  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  const handleFile = async (e, param) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    if (base64) {
      setFile(base64)
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setPincode(getFarmer?.[0]?.pinCode)
      setSTATE(getFarmer?.[0]?.state)
      setDistrict(getFarmer?.[0]?.district)
      setTaluka(getFarmer?.[0]?.taluka)
      setVillageName(getFarmer?.[0]?.villageName)
      setLandDistrict(getFarmer?.[0]?.landDistrict)
      setUrl(getFarmer?.[0]?.file)
    }, 1000)
    return () => clearTimeout(timer)
  }, [getFarmer?.[0]?.state, getFarmer?.[0]?.taluka, getFarmer?.[0]?.pinCode])

  function removeDuplicatesTaluka(getAddressByPinCodeData) {
    const unique = getAddressByPinCodeData?.[0]?.PostOffice?.filter(
      (obj, index) => getAddressByPinCodeData?.[0]?.PostOffice?.findIndex(item => item.Block === obj.Block) === index
    )

    return unique
  }
  return (
    <>
      <Card
        sx={{
          padding: 10
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            if (values?.appliedForSoilTesting === 'yes') {
              if (url?.length > 0) {
                handleSubmit(values)
              } else if (file?.length > 0) {
                handleSubmit(values)
              }
            } else if (values?.appliedForSoilTesting === 'no') {
              handleSubmit(values)
            }
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
            <>
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
                      label='Farmer Details'
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
                      InputLabelProps={{
                        shrink: true
                      }}
                      placeholder='First Name'
                    />
                    <ErrorMessage name='firstName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.middleName}
                      name='middleName'
                      error={Boolean(errors.middleName && touched.middleName)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Middle Name'
                      placeholder='Middle Name'
                    />
                    <ErrorMessage name='middleName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.lastName}
                      name='lastName'
                      InputLabelProps={{
                        shrink: true
                      }}
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
                      value={values?.DOB}
                      name='DOB'
                      onChange={handleChange}
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
                      value={values?.aadharNumber}
                      name='aadharNumber'
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.aadharNumber && touched.aadharNumber)}
                      fullWidth
                      label='Adhar Number'
                      placeholder='Adhar Number'
                    />
                    <ErrorMessage name='aadharNumber' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.mobileNumber}
                      name='mobileNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='number'
                      error={Boolean(errors.mobileNumber && touched.mobileNumber)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      label='Mobile Number'
                      placeholder='Mobile Number'
                    />
                    <ErrorMessage name='mobileNumber' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.address}
                      name='address'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Address'
                      placeholder='Address'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>state</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='state'
                        value={STATE}
                        label='state'
                        onChange={(e: any) => {
                          setFieldValue('state', e?.target?.value)
                          setSTATE(e?.target?.value)
                        }}
                      >
                        {allState?.data?.map(name => (
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
                          // onChange={handleChange}
                          onChange={e => {
                            setFieldValue('district', e?.target?.value)
                            setDistrict(e?.target?.value)
                          }}
                        >
                          {allDistrict?.map(name => (
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
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={pincode}
                      name='pinCode'
                      type='number'
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
                      disableFocusListener={!(pincode?.length <= 0)}
                      disableHoverListener={!(pincode?.length <= 0)}
                      disableTouchListener={!(pincode?.length <= 0)}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='taluka'
                          disabled={pincode?.length <= 0}
                          value={Taluka}
                          label='taluka'
                          onChange={e => {
                            setFieldValue('taluka', e?.target?.value)
                            setTaluka(e?.target?.value)
                          }}
                          noOptionsMessage={() => 'No taluka Found'}
                        >
                          {getAddressByPinCodeData &&
                            removeDuplicatesTaluka(getAddressByPinCodeData)?.map(name => (
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
                      disableFocusListener={!(pincode?.length <= 0)}
                      disableHoverListener={!(pincode?.length <= 0)}
                      disableTouchListener={!(pincode?.length <= 0)}
                    >
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>Village Name</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='villageName'
                          disabled={pincode?.length <= 0}
                          value={villageName}
                          label='villageName'
                          // onChange={handleChange}
                          onChange={e => {
                            setFieldValue('villageName', e?.target?.value)
                            setVillageName(e?.target?.value)
                          }}
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
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.caste}
                      name='caste'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Caste'
                      placeholder='caste'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      value={values?.religion}
                      name='religion'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Religion'
                      InputLabelProps={{
                        shrink: true
                      }}
                      placeholder='Religion'
                    />
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
                </Grid>
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
                      label='Land Details'
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
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Land District</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='landDistrict'
                        value={landDistrict}
                        label='landDistrict'
                        onChange={e => {
                          setFieldValue('landDistrict', e?.target?.value)
                          setLandDistrict(e?.target?.value)
                        }}
                      >
                        {allDistrict?.map(name => (
                          <MenuItem key={name?.name} value={name?.name}>
                            {name?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.subDivision}
                      name='subDivision'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='SubDivision'
                      placeholder='SubDivision'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.circle}
                      name='circle'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Circle'
                      placeholder='Circle'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.mouza}
                      name='mouza'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Mouza'
                      placeholder='mouza'
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    {/* <FormControl fullWidth variant='outlined'>
                      <InputLabel shrink htmlFor='auth-login-v2-password'>
                        Land Village
                      </InputLabel>
                      <OutlinedInput
                        id='auth-login-v2-password'
                        label='landVillage'
                        notched
                        // InputLabelProps={{
                        //   shrink: true
                        // }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.landVillage}
                        name='landVillage'
                        type={'number'}
                        sx={{ mb: 4 }}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Box edge='end'>Sqft.</Box>
                          </InputAdornment>
                        }
                      />
                    </FormControl> */}
                    <TextField
                      value={values?.landVillage}
                      name='landVillage'
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Village'
                      placeholder='landVillage'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      value={values?.pattaType}
                      name='pattaType'
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='PattaType'
                      placeholder='PattaType'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      value={values?.latNo}
                      name='latNo'
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      fullWidth
                      label='LatNo'
                      placeholder='LatNo'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.pattaNo}
                      name='pattaNo'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='PattaNo'
                      placeholder='PattaNo'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    {/* <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.landArea}
                      name='landArea'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Area'
                      placeholder='Land Area'
                    /> */}
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor='auth-login-v2-password'>
                        Land Area
                      </InputLabel>
                      <OutlinedInput
                        label='landArea'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        notched
                        value={values?.landArea}
                        name='landArea'
                        type={'number'}
                        sx={{ mb: 4 }}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Box edge='end'>Sqft.</Box>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.landType}
                      name='landType'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Type'
                      placeholder='Land Type'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={values?.farmerLandOwnershipType}
                      name='farmerLandOwnershipType'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Farmer LandOwner Ship Type'
                      placeholder='Farmer LandOwner Ship Type'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                      Soil sample collected ?{' '}
                    </Typography>
                    <RadioGroup
                      row
                      aria-label='controlled'
                      value={values?.appliedForSoilTesting}
                      name='appliedForSoilTesting'
                      onChange={handleChange}
                    >
                      <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </Grid>
                  {values?.appliedForSoilTesting === 'yes' ? (
                    <>
                      <Grid item sm={6} xs={12}></Grid>
                      <Grid item sm={6} xs={12}>
                        <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.primary' }}>
                          {url?.length >= 0 ? 'Alredy uploaded your soil report ' : 'Uploaded your soil report '}
                        </Typography>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                          <Button
                            variant='contained'
                            component='label'
                            sx={{
                              mr: 1,
                              '&:hover': {
                                backgroundColor: '#5E7954'
                              }
                            }}
                          >
                            Update Soil Report
                            <input type='file' hidden onChange={e => handleFile(e)} />
                          </Button>
                        </Box>
                        {values?.appliedForSoilTesting === 'yes' && url?.length <= 0 ? (
                          file?.length <= 0 ? (
                            <div style={{ color: 'red' }}>{'please select image'}</div>
                          ) : null
                        ) : null}
                      </Grid>
                    </>
                  ) : null}
                </Grid>
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
              </Form>
            </>
          )}
        </Formik>
      </Card>
    </>
  )
}
FarmerDetails.acl = {
  action: 'read',
  subject: 'farmers'
}
export default FarmerDetails
