import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip
} from '@mui/material'
import {
  createUser1,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getAllUsers,
  getRoleAndPermissions,
  updateUser1
} from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { getAllCategories } from 'src/slice/categoriesSlice'
import DemoSelect from 'src/views/demo/demoSelect'
import CentersForm from 'src/views/components/UsersFormComponents/CentersForm'
import ApmcForm from 'src/views/components/UsersFormComponents/ApmcForm'
import VendorForm from 'src/views/components/UsersFormComponents/VendorForm'

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
const index = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const {
    getUsers,
    getRoles,
    getAddressByPinCodeData,
    allDistrict,
    allState,
    deleteUser,
    updateUsers12,
    createUser12
  } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)

  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const [pincode, setPincode] = useState('')
  const [STATE, setSTATE] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [rolePrefill, setRolePrefill] = useState('')
  const [roleID, setRoleID] = useState('')
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0)

  const [taluka, setTaluka] = useState('')

  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [editPrefillData, setEditPrefillData] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const handlePincode = e => {
    setPincode(e)
    let payload = {
      pincode: e ? e : ''
    }
    dispatch(getAdressByPincode(payload))
  }
  const validationSchema = yup.object().shape({
    role: yup.string().required('Role is required'),
    firstName: yup.string().when('role', {
      is: (role: any) => role !== '10' && role !== '13',
      then: yup => yup.required('First Name is required for this role'),
      otherwise: yup => yup.optional()
    }),
    lastName: yup.string().when('role', {
      is: (role: any) => role !== '10' && role !== '13',
      then: yup => yup.required('Last Name is required for this role'),
      otherwise: yup => yup.optional()
    }),
    pinCode: yup.string().matches(/^\d{6}$/, 'Invalid PIN code'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .max(10, 'Mobile number must be 10 digit')
      .max(10, 'Mobile number must be 10 digit')
      .matches(/^(\+91|0)?[6789]\d{9}$/, 'Invalid mobile number'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      )
  })

  const initialValues = {
    //normal User
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    district: '',
    pinCode: '',
    taluka: '',
    villageName: '',
    role: '',
    roleId: '',
    //centers
    centerName: '',
    centerRegisterUnderCompanyDate: '',
    centerKeyPerson: '',
    centerHandlingPersonName: '',
    centerTaluka: '',
    centerDistrict: '',
    centerTurnover: 0,
    centerMemberFarmer: 0,
    centerPerDayMilkCollection: 0,
    centerMilkStorageCapacity: 0,
    centerSellingMilkFor: '',
    centerOtherCompetitors: '',
    centerPaymentCycle: '',
    centerOtherFacltyByMilkAgency: '',
    centerFarmarPaymentProcess: '',
    centerMembersOnBoard: '',
    centerCurrentHurdeles: '',
    centerNeededFacultys: '',
    centerAllFinancialAudits: '',
    // apmc traders
    apmcFirmName: '',
    apmcAddress: '',
    apmcName: '',
    apmcTaluka: '',
    apmcDistrict: '',
    apmcPersonName: '',
    apmcConnectedFarmers: 0,
    apmcMajorCropsSelling: '',
    districtFarmerComingSellProduct: '',
    vendorImage: ''
  }
  const pincodeAutoCall = () => {
    let payload = {
      pincode: pincode ? pincode : ''
    }
    getAdressByPincode(payload)
  }
  useEffect(() => {
    if (pincode) {
      pincodeAutoCall()
    }
  }, [pincode])

  useEffect(() => {
    dispatch(getAllState())
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
  }, [])
  useEffect(() => {
    dispatch(getAllState())
    dispatch(getRoleAndPermissions())
  }, [])
  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])

  useEffect(() => {
    //@ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    let payload = {
      // adminId: userData?.id,
      page: page,
      pageSize: pageLimit
    }
    //@ts-ignore
    dispatch(getAllUsers(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
    // localStorage.removeItem('FarmerData')
  }, [page, pageCount, pageLimit, deleteUser, updateUsers12, createUser12])

  const handleSubmit = (values: any) => {
    let payload = [
      //other
      { firstName: values?.firstName },
      { lastName: values?.lastName },
      { email: values?.email },
      { password: values?.password },
      { phone: values?.phone },
      { state: values?.state },
      { city: district },
      { taluka: taluka },
      { village: values?.villageName },
      { pinCode: pincode },
      { roleId: values?.role },
      //center
      { centerName: values?.centerName },
      { centerRegisterUnderCompanyDate: values?.centerRegisterUnderCompanyDate },
      { centerKeyPerson: values?.centerKeyPerson },
      { centerHandlingPersonName: values?.centerHandlingPersonName },
      { centerTaluka: values?.centerTaluka },
      { centerDistrict: values?.centerDistrict },
      { centerTurnover: values?.centerTurnover },
      { centerMemberFarmer: values?.centerMemberFarmer },
      { centerPerDayMilkCollection: values?.centerPerDayMilkCollection },
      { centerMilkStorageCapacity: values?.centerMilkStorageCapacity },
      { centerSellingMilkFor: values?.centerSellingMilkFor },
      { centerOtherCompetitors: values?.centerOtherCompetitors },
      { centerPaymentCycle: values?.centerPaymentCycle },
      { centerOtherFacltyByMilkAgency: values?.centerOtherFacltyByMilkAgency },
      { centerFarmarPaymentProcess: values?.centerFarmarPaymentProcess },
      { centerMembersOnBoard: values?.centerMembersOnBoard },
      { centerCurrentHurdeles: values?.centerCurrentHurdeles },
      { centerNeededFacultys: values?.centerNeededFacultys },
      { centerAllFinancialAudits: values?.centerAllFinancialAudits },
      //apmc
      { apmcFirmName: values?.apmcFirmName },
      { apmcAddress: values?.apmcAddress },
      { apmcName: values?.apmcName },
      { apmcTaluka: values?.apmcTaluka },
      { apmcDistrict: values?.apmcDistrict },
      { apmcPersonName: values?.apmcPersonName },
      { apmcConnectedFarmers: values?.apmcConnectedFarmers },
      { apmcMajorCropsSelling: values?.apmcMajorCropsSelling },
      { districtFarmerComingSellProduct: values?.districtFarmerComingSellProduct },
      { vendorImage: values?.vendorImage },
      { categoryId: categoryIdPrefill }
    ]
    let formData = new FormData()
    payload.forEach(entry => {
      const key = Object.keys(entry)[0] // Extracting the key from the object
      const value = entry[key] // Extracting the value from the object
      formData.append(key, value) // Appending the key-value pair to the formData
    })
    dispatch(createUser1(formData)).then((res: any) => {
      if (res?.payload?.status === 200) {
        router.push('/users')
      }
    })
  }

  const ProfilePicture = styled('img')(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }))
  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }
  const FilePreview = ({ file, onRemove }: any) => {
    if (isValidUrl(file)) {
      return (
        <Box>
          <ProfilePicture src={file} alt='profile-picture' />
        </Box>
      )
    } else {
      if (file?.type?.startsWith('image')) {
        return (
          <Box>
            <ProfilePicture src={URL.createObjectURL(file)} alt='profile-picture' />
          </Box>
        )
      } else {
        return (
          <Box>
            <ProfilePicture
              src={'/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg'}
              alt='profile-picture'
            />
          </Box>
        )
      }
    }
  }
  return (
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
          handleSubmit(values)
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue, resetForm }) => (
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
                  <Grid item sm={12} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='role'
                        value={rolePrefill}
                        error={Boolean(errors.role && touched.role)}
                        label='Role'
                        onChange={e => {
                          setFieldValue('role', e.target?.value)
                          setFieldValue('email', '')
                          setFieldValue('phone', '')
                          setFieldValue('password', '')
                          setDistrict('')
                          setFieldValue('taluka', '')
                          setFieldValue('village', '')
                          setFieldValue('apmcDistrict', '')
                          setFieldValue('centerDistrict', '')
                          setFieldValue('firstName', '')
                          setFieldValue('lastName', '')
                          setFieldValue('apmcName', '')
                          setFieldValue('centerName', '')
                          setSTATE('')
                          setRolePrefill(e.target?.value)
                        }}
                      >
                        {getRoles?.map((Item: any) => (
                          <MenuItem key={Item?.roleType} value={Item?.id}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name='role' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </FormControl>
                  </Grid>
                  {values?.role == 13 ? (
                    <CentersForm
                      // POR={(values, handleChange, handleBlur, errors, touched, setFieldValue, resetForm)}
                      values={values}
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      allDistrict={allDistrict}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                      resetForm={resetForm}
                    />
                  ) : values?.role == 10 ? (
                    <ApmcForm
                      values={values}
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      allDistrict={allDistrict}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                      resetForm={resetForm}
                    />
                  ) : values?.role == 17 ? (
                    <VendorForm
                      values={values}
                      allState={allState}
                      STATE={STATE}
                      setSTATE={setSTATE}
                      setDistrict={setDistrict}
                      district={district}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      allDistrict={allDistrict}
                      handlePincode={handlePincode}
                      pincode={pincode}
                      setTaluka={setTaluka}
                      taluka={taluka}
                      getAddressByPinCodeData={getAddressByPinCodeData}
                      resetForm={resetForm}
                      categories={categories}
                      setCategoryIdPrefill={setCategoryIdPrefill}
                      categoryIdPrefill={categoryIdPrefill}
                      FilePreview={FilePreview}
                    />
                  ) : (
                    <>
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='lastName'
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='email'
                          error={Boolean(errors.email && touched.email)}
                          fullWidth
                          label='Email'
                          placeholder='Email'
                        />
                        <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='password'
                          error={Boolean(errors.password && touched.password)}
                          fullWidth
                          label='Password'
                          placeholder='Password'
                        />
                        <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='phone'
                          error={Boolean(errors.phone && touched.phone)}
                          fullWidth
                          type='number'
                          label='Phone'
                          placeholder='Phone'
                        />
                        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>State</InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            name='state'
                            value={values?.state}
                            label='State'
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
                            <InputLabel>District</InputLabel>
                            <Select
                              name='district'
                              disabled={STATE.length <= 0}
                              value={district}
                              label='District'
                              onChange={e => {
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
                          disableFocusListener={!(pincode?.length <= 0)}
                          disableHoverListener={!(pincode?.length <= 0)}
                          disableTouchListener={!(pincode?.length <= 0)}
                        >
                          <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>Taluka</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='taluka'
                              disabled={pincode?.length <= 0}
                              value={values?.taluka && values?.taluka}
                              label='Taluka'
                              onChange={handleChange}
                              // sx={{
                              //   '& .MuiSelect-root': {
                              //     borderWidth: '1px !important',
                              //     borderColor: '#8d8686 !important' // Set the desired color for the select
                              //   },
                              //   '& .MuiOutlinedInput-notchedOutline': {
                              //     borderColor: 'black !important' // Set the desired border color for the select
                              //   },

                              //   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              //     borderWidth: '1px !important',
                              //     borderColor: '#8d8686 !important'
                              //   },
                              //   '&.Mui-error': {
                              //     color: 'red' // Set the label color when the Select is in an error state
                              //   }
                              // }}
                            >
                              {getAddressByPinCodeData?.taluka?.map(name => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                      </Grid>
                      {/* <Grid item sm={6} xs={12}>
                      <TextField
                        value={values?.villageName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='villageName'
                        error={Boolean(errors.villageName && touched.villageName)}
                        fullWidth
                        label='Village Name'
                        placeholder='Village Name'
                      />
                      <ErrorMessage name='villageName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </Grid> */}
                      <Grid item sm={6} xs={12}>
                        <Tooltip
                          title='Please enter pincode first'
                          disableFocusListener={!(pincode.length <= 0)}
                          disableHoverListener={!(pincode.length <= 0)}
                          disableTouchListener={!(pincode.length <= 0)}
                        >
                          <FormControl fullWidth>
                            <InputLabel
                              // sx={{
                              //   color: 'black',
                              //   '&.Mui-focused': {
                              //     color: 'black' // Set the label color when focused
                              //   }
                              // }}
                              id='demo-simple-select-label'
                            >
                              Village Name
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='villageName'
                              disabled={pincode.length <= 0}
                              value={values?.villageName && values?.villageName}
                              label='Village Name'
                              onChange={handleChange}
                              // sx={{
                              //   '&.Mui-error fieldset': {
                              //     borderColor: 'red !important'
                              //   },
                              //   '& fieldset': {
                              //     borderWidth: '1px !important',
                              //     borderColor: '#8d8686 !important'
                              //   },
                              //   '&.Mui-focused fieldset': {
                              //     borderColor: '#7da370 !important',
                              //     borderWidth: '2px !important'
                              //   },
                              //   '& label.MuiInputLabel-root': {
                              //     color: 'black' // Set the label font color to blue
                              //   }
                              // }}
                            >
                              {getAddressByPinCodeData?.village?.map((name: any) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                      </Grid>
                    </>
                  )}
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
            </Box>
          </>
        )}
      </Formik>
    </Card>
  )
}

export default index
