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
  Tooltip,
  Typography
} from '@mui/material'
import {
  createUser1,
  getAdressByPincode,
  getAllDistrict,
  getAllState,
  getAllUsers,
  getRoleAndPermissions,
  getSingleUser,
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
import axios from 'axios'
import styled from '@emotion/styled'
import { getAllCategories } from 'src/slice/categoriesSlice'
import DemoSelect from 'src/views/demo/demoSelect'
import ApmcForm from 'src/views/components/UsersFormComponents/ApmcForm'
import CentersForm from 'src/views/components/UsersFormComponents/CentersForm'
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
  const { getRoles, allDistrict, allState, getAddressByPinCodeData } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)

  const [STATE, setSTATE] = useState('')
  const [rolePrefill, setRolePrefill] = useState('')
  const [userData, setUserData] = useState<any>({})
  const [district, setDistrict] = useState('')
  const [taluka, setTaluka] = useState('')
  const [village, setVillage] = useState('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [pincode, setPincode] = useState('')
  const [pinCodeAddress, setPinCodeAddress] = useState([])
  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
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
      then: yup => yup.required('First Name is required for this role'),
      otherwise: yup => yup.optional()
    }),
    pinCode: yup.string().matches(/^\d{6}$/, 'Invalid PIN code'),

    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    // apmcFirmName: yup.string().when('role', {
    //   is: (role: any) => role === 'APMC TRADERS',
    //   then: yup => yup.required('Apmc firm name is required for this role'),
    //   otherwise: yup => yup.optional()
    // }),
    // centerName: yup.string().when('role', {
    //   is: (role: any) => role === 'CENTERS',
    //   then: yup => yup.required('Center Name is required for this role'),
    //   otherwise: yup => yup.optional()
    // }),
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
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    password: userData?.password,
    phone: userData?.phone,
    state: STATE,
    district: district,
    taluka: taluka,
    villageName: village,
    pinCode: pincode,
    // role: userData?.role,
    role: userData?.roleId,
    //centuserData?.//ces
    centerName: userData?.centerName,
    centerRegisterUnderCompanyDate: userData?.centerRegisterUnderCompanyDate,
    centerKeyPerson: userData?.centerKeyPerson,
    centerHandlingPersonName: userData?.centerHandlingPersonName,
    centerTaluka: taluka,
    centerDistrict: district,
    centerTurnover: userData?.centerTurnover,
    centerMemberFarmer: userData?.centerMemberFarmer,
    centerPerDayMilkCollection: userData?.centerPerDayMilkCollection,
    centerMilkStorageCapacity: userData?.centerMilkStorageCapacity,
    centerSellingMilkFor: userData?.centerSellingMilkFor,
    centerOtherCompetitors: userData?.centerOtherCompetitors,
    centerPaymentCycle: userData?.centerPaymentCycle,
    centerOtherFacltyByMilkAgency: userData?.centerOtherFacltyByMilkAgency,
    centerFarmarPaymentProcess: userData?.centerFarmarPaymentProcess,
    centerMembersOnBoard: userData?.centerMembersOnBoard,
    centerCurrentHurdeles: userData?.centerCurrentHurdeles,
    centerNeededFacultys: userData?.centerNeededFacultys,
    centerAllFinancialAudits: userData?.centerAllFinancialAudits,
    // apmc traduserData?.// apmc trs
    apmcFirmName: userData?.apmcFirmName,
    apmcAddress: userData?.apmcAddress,
    apmcName: userData?.apmcName,
    apmcTaluka: taluka,
    apmcDistrict: district,
    apmcPersonName: userData?.apmcPersonName,
    apmcConnectedFarmers: userData?.apmcConnectedFarmers,
    apmcMajorCropsSelling: userData?.apmcMajorCropsSelling,
    districtFarmerComingSellProduct: userData?.districtFarmerComingSellProduct,
    vendorImage: userData?.vendorImage
  }
  const apiCallToGetUser = (payload: any) => {
    const res = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getSingleUsers/${payload?.id}`, {
      headers
    })
    return res
  }

  useEffect(() => {
    let userID = localStorage.getItem('editUserId')
    let payload = {
      id: userID
    }
    apiCallToGetUser(payload).then(response => {
      setUserData(response?.data?.data)
    })
    dispatch(getAllState())
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
    dispatch(getRoleAndPermissions())
  }, [])

  useEffect(() => {
    let payload = {
      pincode: userData?.pincode
    }
    if (userData && userData?.pinCode) {
      dispatch(getAdressByPincode(payload))
    }
  }, [userData?.pinCode])
  const handlePincode = (e: any) => {
    setPincode(e)
    let payload = {
      pincode: e ? e : ''
    }
    dispatch(getAdressByPincode(payload))
  }

  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])

  useEffect(() => {
    if (userData?.pinCode) {
      setPincode(userData?.pinCode)
      dispatch(getAdressByPincode({ pincode: userData?.pinCode })).then(res => {
        setTaluka(userData?.taluka && userData?.taluka)
        setVillage(userData?.village && userData?.village)
      })
    }
  }, [userData?.pinCode])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        setRolePrefill(userData?.roleId && userData?.roleId)
        setSTATE(userData?.state && userData?.state)
        setDistrict(userData?.city && userData?.city)
        setCategoryIdPrefill(userData?.categoryId && userData?.categoryId)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [
    userData?.state,
    userData?.village,
    userData?.categoryId,
    userData?.taluka,
    userData?.city,
    userData?.pinCode,
    userData?.role
  ])

  const handleSubmit = (values: any) => {
    let payload = [
      { id: userData?.id },
      { firstName: values?.firstName },
      { lastName: values?.lastName },
      { email: values?.email },
      { password: values?.password },
      { phone: values?.phone },
      { state: values?.state },
      { city: district },
      { taluka: values?.taluka },
      { village: village },
      { pinCode: pincode },
      { roleId: rolePrefill },

      { centerName: values?.centerName },
      { centerRegisterUnderCompanyDate: values?.centerRegisterUnderCompanyDate },
      { centerKeyPerson: values?.centerKeyPerson },
      { centerHandlingPersonName: values?.centerHandlingPersonName },
      { centerTaluka: values?.centerTaluka },
      { centerDistrict: district },
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

      { apmcFirmName: values?.apmcFirmName },
      { apmcAddress: values?.apmcAddress },
      { apmcName: values?.apmcName },
      { apmcTaluka: values?.apmcTaluka },
      { apmcDistrict: district },
      { apmcPersonName: values?.apmcPersonName },
      { apmcConnectedFarmers: values?.apmcConnectedFarmers },
      { apmcMajorCropsSelling: values?.apmcMajorCropsSelling },
      { districtFarmerComingSellProduct: values?.districtFarmerComingSellProduct },
      { vendorImage: values?.vendorImage },
      { categoryId: categoryIdPrefill }
    ]
    // if(roleId == 17){

    // }
    let formData = new FormData()
    payload.forEach(entry => {
      const key = Object.keys(entry)[0] // Extracting the key from the object
      const value = entry[key] // Extracting the value from the object
      formData.append(key, value) // Appending the key-value pair to the formData
    })
    dispatch(updateUser1(formData)).then((res: any) => {
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
                        disabled={userData?.flag === 1 ? true : false}
                        value={rolePrefill && rolePrefill}
                        error={Boolean(errors?.role && touched?.role)}
                        label='Role'
                        onChange={e => {
                          setFieldValue('role', e?.target?.value)
                          setFieldValue('email', '')
                          setFieldValue('phone', '')
                          setFieldValue('password', '')
                          setFieldValue('district', '')
                          setDistrict('')
                          setFieldValue('taluka', '')
                          setFieldValue('villageName', '')
                          setFieldValue('apmcDistrict', '')
                          // setFieldValue('centerDistrict', '')
                          setFieldValue('firstName', '')
                          setFieldValue('lastName', '')
                          setFieldValue('apmcName', '')
                          setFieldValue('centerName', '')

                          setFieldValue('state', '')
                          setSTATE('')
                          setVillage('')
                          setRolePrefill(e?.target?.value)
                        }}
                      >
                        {getRoles?.map((Item: any) => (
                          <MenuItem key={Item?.roleType} value={Item?.id}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography sx={{ color: '#898989' }} p={2}>
                        {userData?.flag === 1
                          ? '*Note: This user has added some records related to farmers, products, or services, so this user should not be edited'
                          : null}
                      </Typography>
                      <ErrorMessage name='role' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </FormControl>
                  </Grid>
                  {rolePrefill == 13 ? (
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
                  ) : rolePrefill == 10 ? (
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
                  ) : // <>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.firstName}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='firstName'
                  //       error={Boolean(errors.firstName && touched.firstName)}
                  //       fullWidth
                  //       label='Name of the firm'
                  //       placeholder='Name of the firm'
                  //     />
                  //     <ErrorMessage name='apmcFirmName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.apmcAddress}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='apmcAddress'
                  //       error={Boolean(errors.apmcAddress && touched.apmcAddress)}
                  //       fullWidth
                  //       label='Address'
                  //       placeholder='Address'
                  //     />
                  //     <ErrorMessage name='apmcAddress' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.apmcName}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='apmcName'
                  //       error={Boolean(errors.apmcName && touched.apmcName)}
                  //       fullWidth
                  //       label='Name of the apmc'
                  //       placeholder='Name of the apmc'
                  //     />
                  //     <ErrorMessage name='apmcName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <FormControl fullWidth>
                  //       <InputLabel id='demo-simple-select-label'>State</InputLabel>
                  //       <Select
                  //         labelId='demo-simple-select-label'
                  //         id='demo-simple-select'
                  //         name='state'
                  //         value={values?.state}
                  //         label='State'
                  //         onChange={(e: any) => {
                  //           setFieldValue('state', e?.target?.value)
                  //           setSTATE(e?.target?.value)
                  //         }}
                  //       >
                  //         {allState?.data?.map((name: any) => (
                  //           <MenuItem key={name?.name} value={name?.name}>
                  //             {name?.name}
                  //           </MenuItem>
                  //         ))}
                  //       </Select>
                  //     </FormControl>
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <Tooltip title='Please select state first'>
                  //       <FormControl fullWidth>
                  //         <InputLabel id='demo-simple-select-label'>District</InputLabel>
                  //         <Select
                  //           labelId='demo-simple-select-label'
                  //           id='demo-simple-select'
                  //           name='apmcDistrict'
                  //           disabled={STATE?.length <= 0}
                  //           value={district}
                  //           label='district'
                  //           onChange={e => {
                  //             setDistrict(e?.target?.value)
                  //             setFieldValue('apmcDistrict', e?.target?.value)
                  //           }}
                  //         >
                  //           {allDistrict?.map((name: any) => (
                  //             <MenuItem key={name?.name} value={name?.name}>
                  //               {name?.name}
                  //             </MenuItem>
                  //           ))}
                  //         </Select>
                  //       </FormControl>
                  //     </Tooltip>
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={pincode}
                  //       name='pinCode'
                  //       onChange={e => {
                  //         handlePincode(e.target.value)
                  //       }}
                  //       fullWidth
                  //       label='Pin Code'
                  //       placeholder='Pin Code'
                  //     />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <Tooltip
                  //       title='Please enter pincode first'
                  //       disableFocusListener={!(pincode?.length <= 0)}
                  //       disableHoverListener={!(pincode?.length <= 0)}
                  //       disableTouchListener={!(pincode?.length <= 0)}
                  //     >
                  //       <FormControl fullWidth>
                  //         <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                  //         <Select
                  //           labelId='demo-simple-select-label'
                  //           id='demo-simple-select'
                  //           name='taluka'
                  //           disabled={pincode?.length <= 0}
                  //           value={taluka}
                  //           label='taluka'
                  //           onChange={e => {
                  //             setFieldValue('taluka', e?.target?.value)
                  //             setTaluka(e?.target?.value)
                  //           }}
                  //         >
                  //           {getAddressByPinCodeData?.taluka?.map((name: any) => (
                  //             <MenuItem key={name} value={name}>
                  //               {name}
                  //             </MenuItem>
                  //           ))}
                  //         </Select>
                  //       </FormControl>
                  //     </Tooltip>
                  //   </Grid>

                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.apmcPersonName}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='apmcPersonName'
                  //       error={Boolean(errors.apmcPersonName && touched.apmcPersonName)}
                  //       fullWidth
                  //       label='Name of the person'
                  //       placeholder='Name of the person'
                  //     />
                  //     <ErrorMessage name='apmcPersonName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.phone}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='phone'
                  //       error={Boolean(errors.phone && touched.phone)}
                  //       fullWidth
                  //       label='Cell No.'
                  //       placeholder='Cell No.'
                  //     />
                  //     <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.email}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='email'
                  //       error={Boolean(errors.email && touched.email)}
                  //       fullWidth
                  //       label='Email Address'
                  //       placeholder='EMAIL ID'
                  //     />
                  //     <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.password}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='password'
                  //       error={Boolean(errors.password && touched.password)}
                  //       fullWidth
                  //       label='Password '
                  //       placeholder='Password'
                  //     />
                  //     <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.apmcConnectedFarmers}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='apmcConnectedFarmers'
                  //       error={Boolean(errors.apmcConnectedFarmers && touched.apmcConnectedFarmers)}
                  //       fullWidth
                  //       type='number'
                  //       label='How many farmers are connected with you'
                  //       placeholder='How many farmers are connected with you'
                  //     />
                  //     <ErrorMessage
                  //       name='apmcConnectedFarmers'
                  //       render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                  //     />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.apmcMajorCropsSelling}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='apmcMajorCropsSelling'
                  //       error={Boolean(errors.apmcMajorCropsSelling && touched.apmcMajorCropsSelling)}
                  //       fullWidth
                  //       label='What are the major crops you are selling'
                  //       placeholder='What are the major crops you are selling'
                  //     />
                  //     <ErrorMessage
                  //       name='apmcMajorCropsSelling'
                  //       render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                  //     />
                  //   </Grid>
                  //   <Grid item sm={6} xs={12}>
                  //     <TextField
                  //       value={values?.districtFarmerComingSellProduct}
                  //       onChange={handleChange}
                  //       InputLabelProps={{
                  //         shrink: true
                  //       }}
                  //       onBlur={handleBlur}
                  //       name='districtFarmerComingSellProduct'
                  //       error={Boolean(
                  //         errors.districtFarmerComingSellProduct && touched.districtFarmerComingSellProduct
                  //       )}
                  //       fullWidth
                  //       label='From which area of your districts farmers are coming to sell the products'
                  //       placeholder='From which area of your districts farmers are coming to sell the products'
                  //     />
                  //     <ErrorMessage
                  //       name='apmcMajorCropsSelling'
                  //       render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                  //     />
                  //   </Grid>
                  // </>
                  rolePrefill == 17 ? (
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
                    // <>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={values?.firstName}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //       name='firstName'
                    //       error={Boolean(errors.firstName && touched.firstName)}
                    //       fullWidth
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       label='First Name'
                    //       placeholder='First Name'
                    //     />
                    //     <ErrorMessage name='firstName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={values?.lastName}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //       name='lastName'
                    //       error={Boolean(errors.lastName && touched.lastName)}
                    //       fullWidth
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       label='Last Name'
                    //       placeholder='Last Name'
                    //     />
                    //     <ErrorMessage name='lastName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={values?.email}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //       name='email'
                    //       error={Boolean(errors.email && touched.email)}
                    //       fullWidth
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       label='Email'
                    //       placeholder='Email'
                    //     />
                    //     <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={values?.password}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //       name='password'
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       error={Boolean(errors.password && touched.password)}
                    //       fullWidth
                    //       label='Password'
                    //       placeholder='Password'
                    //     />
                    //     <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={values?.phone}
                    //       onChange={handleChange}
                    //       onBlur={handleBlur}
                    //       name='phone'
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       error={Boolean(errors.phone && touched.phone)}
                    //       fullWidth
                    //       label='Phone'
                    //       placeholder='Phone'
                    //     />
                    //     <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <FormControl fullWidth>
                    //       <InputLabel id='demo-simple-select-label'>State</InputLabel>
                    //       <Select
                    //         labelId='demo-simple-select-label'
                    //         id='demo-simple-select'
                    //         name='state'
                    //         value={STATE}
                    //         label='State'
                    //         onChange={(e: any) => {
                    //           setFieldValue('state', e?.target?.value)
                    //           setSTATE(e?.target?.value)
                    //         }}
                    //       >
                    //         {allState?.data?.map(name => (
                    //           <MenuItem key={name?.name} value={name?.name}>
                    //             {name?.name}
                    //           </MenuItem>
                    //         ))}
                    //       </Select>
                    //     </FormControl>
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <Tooltip title='Please select state first'>
                    //       <FormControl fullWidth>
                    //         <InputLabel id='demo-simple-select-label'>District</InputLabel>
                    //         <Select
                    //           labelId='demo-simple-select-label'
                    //           id='demo-simple-select'
                    //           name='district'
                    //           disabled={STATE.length <= 0}
                    //           value={district}
                    //           label='District'
                    //           onChange={e => {
                    //             setFieldValue('district', e?.target?.value)
                    //             setDistrict(e?.target?.value)
                    //           }}
                    //         >
                    //           {allDistrict?.map((name: any) => (
                    //             <MenuItem key={name?.name} value={name?.name}>
                    //               {name?.name}
                    //             </MenuItem>
                    //           ))}
                    //         </Select>
                    //       </FormControl>
                    //     </Tooltip>
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <TextField
                    //       value={pincode}
                    //       name='pinCode'
                    //       onChange={e => {
                    //         handlePincode(e.target.value)
                    //       }}
                    //       InputLabelProps={{
                    //         shrink: true
                    //       }}
                    //       fullWidth
                    //       label='Pin Code'
                    //       placeholder='Pin Code'
                    //     />
                    //   </Grid>
                    //   <Grid item sm={6} xs={12}>
                    //     <Tooltip
                    //       title='Please enter pincode first'
                    //       disableFocusListener={!(pincode?.length <= 0)}
                    //       disableHoverListener={!(pincode?.length <= 0)}
                    //       disableTouchListener={!(pincode?.length <= 0)}
                    //     >
                    //       <FormControl fullWidth>
                    //         <InputLabel id='demo-simple-select-label'>Taluka</InputLabel>
                    //         <Select
                    //           labelId='demo-simple-select-label'
                    //           id='demo-simple-select'
                    //           name='taluka'
                    //           disabled={pincode?.length <= 0}
                    //           value={taluka}
                    //           label='Taluka'
                    //           onChange={e => {
                    //             setFieldValue('taluka', e?.target?.value)
                    //             setTaluka(e?.target?.value)
                    //           }}
                    //         >
                    //           {getAddressByPinCodeData?.taluka?.map((name: any) => (
                    //             <MenuItem key={name} value={name}>
                    //               {name}
                    //             </MenuItem>
                    //           ))}
                    //         </Select>
                    //       </FormControl>
                    //     </Tooltip>
                    //   </Grid>

                    //   <Grid item sm={6} xs={12}>
                    //     <Tooltip
                    //       title='Please enter pincode first'
                    //       disableFocusListener={!(pincode.length <= 0)}
                    //       disableHoverListener={!(pincode.length <= 0)}
                    //       disableTouchListener={!(pincode.length <= 0)}
                    //     >
                    //       <FormControl fullWidth>
                    //         <InputLabel id='demo-simple-select-label'>Village Name</InputLabel>
                    //         <Select
                    //           labelId='demo-simple-select-label'
                    //           id='demo-simple-select'
                    //           name='villageName'
                    //           disabled={pincode.length <= 0}
                    //           value={values?.villageName && values?.villageName}
                    //           label='Village Name'
                    //           onChange={handleChange}
                    //         >
                    //           {getAddressByPinCodeData?.village?.map((name: any) => (
                    //             <MenuItem key={name} value={name}>
                    //               {name}
                    //             </MenuItem>
                    //           ))}
                    //         </Select>
                    //       </FormControl>
                    //     </Tooltip>
                    //   </Grid>

                    //   <Grid item sm={6} xs={12}>
                    //     <DemoSelect
                    //       data={categories?.data}
                    //       selectedCategory={categoryIdPrefill}
                    //       //@ts-ignore
                    //       setSelectedCategory={setCategoryIdPrefill}
                    //     />
                    //   </Grid>
                    //   <Grid
                    //     item
                    //     xs={12}
                    //     sm={12}
                    //     sx={{
                    //       marginTop: '20px',
                    //       display: 'flex'
                    //     }}
                    //   >
                    //     {/* <Grid item xs={6}> */}
                    //     <Box
                    //       sx={{
                    //         display: 'flex'
                    //       }}
                    //     >
                    //       <FilePreview file={values.vendorImage} />
                    //       <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    //         <Button
                    //           variant='contained'
                    //           component='label'
                    //           sx={{
                    //             mr: 1,
                    //             ml: 2,
                    //             '&:hover': {
                    //               backgroundColor: '#5E7954'
                    //             }
                    //           }}
                    //         >
                    //           Upload
                    //           <input
                    //             type='file'
                    //             hidden
                    //             onChange={e => {
                    //               setFieldValue('vendorImage', e.target?.files[0])
                    //             }}
                    //           />
                    //         </Button>
                    //       </Box>
                    //       <ErrorMessage name='brandLogo' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    //     </Box>
                    //     {/* </Grid> */}
                    //   </Grid>
                    // </>
                    <>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.firstName}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='phone'
                          error={Boolean(errors.phone && touched.phone)}
                          fullWidth
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
                            value={STATE}
                            label='State'
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
                            <InputLabel
                              sx={{
                                color: 'black',
                                '&.Mui-focused': {
                                  color: 'black' // Set the label color when focused
                                }
                              }}
                              id='demo-simple-select-label'
                            >
                              District
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='district'
                              disabled={STATE?.length <= 0}
                              value={district}
                              label='district'
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
                              value={taluka && taluka}
                              label='taluka'
                              onChange={e => {
                                setFieldValue('taluka', e?.target?.value)
                                setTaluka(e?.target?.value)
                              }}
                            >
                              {getAddressByPinCodeData?.taluka?.map((name: any) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                        {/* <TextField
                        value={values?.centerTaluka}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='centerTaluka'
                        error={Boolean(errors.centerTaluka && touched.centerTaluka)}
                        fullWidth
                        label='Taluka of center'
                        placeholder='Taluka of center'
                      />
                      centerTaluka
                      <ErrorMessage name='centerTaluka' render={msg => <div style={{ color: 'red' }}>{msg}</div>} /> */}
                      </Grid>
                      {/* <Grid item sm={6} xs={12}>
                      <TextFiel
                        value={values?.taluka}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                        onBlur={handleBlur}
                        name='taluka'
                        error={Boolean(errors.taluka && touched.taluka)}
                        fullWidth
                        label='Taluka'
                        placeholder='Taluka'
                      />
                      <ErrorMessage name='taluka' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </Grid> */}
                      {/* <Grid item sm={6} xs={12}>
                      <TextFiel
                        value={values?.villageName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='villageName'
                        InputLabelProps={{
                          shrink: true
                        }}
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
                              value={village}
                              label='villageName'
                              onChange={e => {
                                setFieldValue('villageName', e?.target?.value)
                                setVillage(e?.target?.value)
                              }}
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
