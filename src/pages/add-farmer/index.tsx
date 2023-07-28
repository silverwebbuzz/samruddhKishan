//@ts-nocheck
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Tooltip
} from '@mui/material'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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
import * as yup from 'yup'

const FarmerDetails = () => {
  const { allDistrict, allState, getFarmer, getAddressByPinCodeData } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const farmerData = JSON.parse(localStorage.getItem('FarmerData'))
  const [STATE, setSTATE] = useState('')
  const [file, setFile] = useState('')
  const [pincode, setPincode] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    asPerAbove: '',
    DOB: '',
    aadharNumber: '',
    mobileNumber: '',
    wpNumber: '',
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
    farmerLandOwnershipType: '',
    appliedForSoilTesting: 'yes'
  }

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

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name  is required'),
    middleName: yup.string().required('Middle name is required'),
    lastName: yup.string().required('Last name is required'),
    // pinCode: yup.string().required('pinCode is required'),
    mobileNumber: yup
      .string()
      .required('Mobile number is required')
      // .min(10)
      .matches(/^ *(?:0 *[23478](?: *\d){8}|[1-9](?: *\d)*|0 *[01569](?: *\d)*) *$/, 'Phone number is not valid'),
    // .required('Mobile number is required'),
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
      asPerAbove: values?.asPerAbove,
      DOB: values?.DOB,
      aadharNumber: values?.aadharNumber,
      mobileNumber: values?.mobileNumber,
      wpNumber: values?.wpNumber,
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
      appliedForSoilTesting: 'yes' ? 1 : 0
    }
    if (!farmerData) {
      dispatch(createFarmer(payload)).then(res => {
        console.log('res', res?.payload?.id)
        if (res?.payload?.id) {
          let payload = {
            id: res?.payload?.id,
            file: file
          }
          dispatch(uploadImage(payload))
          router.push('/farmers')
        }
      })
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
    let payload = {
      id: farmerData
    }
    dispatch(getAllState())
    dispatch(getSingleFarmer(payload))
  }, [])

  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])

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
            if (values?.appliedForSoilTesting === 'yes' && file?.length > 0) {
              handleSubmit(values)
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
                      label='First Name *'
                      placeholder='First Name'
                    />
                    <ErrorMessage name='firstName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.lastName && touched.lastName)}
                      fullWidth
                      label='Last Name *'
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
                      label='Date of birth *'
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.aadharNumber}
                      name='aadharNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.aadharNumber && touched.aadharNumber)}
                      fullWidth
                      label='Adhar Number *'
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
                      label='Mobile Number *'
                      placeholder='Mobile Number'
                    />
                    <ErrorMessage name='mobileNumber' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      value={values?.wpNumber}
                      name='wpNumber'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='number'
                      error={Boolean(errors.wpNumber && touched.wpNumber)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                      label='Whatsapp Number *'
                      placeholder='Whatsapp Number'
                    />
                    <ErrorMessage name='wpNumber' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
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
                        value={values?.state}
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
                          disabled={STATE.length <= 0}
                          value={values?.district}
                          label='district'
                          onChange={handleChange}
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
                    {' '}
                    <TextField
                      value={values?.religion}
                      name='religion'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Religion'
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
                {/* <FormControlLabel
                  control={<Checkbox checked={values.asPerAbove} onChange={setFieldValue} name='asPerAbove' />}
                  label='Land Address As Per Above'
                /> */}
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
                        value={values?.landDistrict && values?.landDistrict}
                        label='landDistrict'
                        onChange={handleChange}
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
                    <TextField
                      value={values?.landVillage}
                      name='landVillage'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Village'
                      placeholder='landVillage'
                    />
                    {/* <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-v2-password'>Land Village</InputLabel>
                      <OutlinedInput
                        label='landVillage'
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
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
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
                    {' '}
                    <TextField
                      value={values?.pattaType}
                      name='pattaType'
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
                      onBlur={handleBlur}
                      fullWidth
                      label='LatNo'
                      placeholder='LatNo'
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {' '}
                    <TextField
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
                      value={values?.landArea}
                      name='landArea'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      label='Land Area'
                      placeholder='Land Area'
                    /> */}
                    <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-v2-password'>Land Area</InputLabel>
                      <OutlinedInput
                        label='landArea'
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      Upload Land Document
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
                          Upload Land Document
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
                            Upload Land Document
                            <input type='file' hidden onChange={e => handleFile(e)} />
                          </Button>
                        </Box>
                        {values?.appliedForSoilTesting === 'yes' ? (
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
