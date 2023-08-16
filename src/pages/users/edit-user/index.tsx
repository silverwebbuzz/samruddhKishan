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
  const [STATE, setSTATE] = useState('')
  const [rolePrefill, setRolePrefill] = useState('')
  const [userData, setUserData] = useState<any>({})
  const [district, setDistrict] = useState('')
  const [taluka, setTaluka] = useState('')
  const [village, setVillage] = useState('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [pincode, setPincode] = useState('')
  const [pinCodeAddress, setPinCodeAddress] = useState('')
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
  const validationSchema = yup.object().shape({
    role: yup.string().required('Role is required'),
    firstName: yup
      .string()
      // .label('role')
      .when('role', {
        is: (role: any) => role !== 'APMC TRADERS' && role !== 'CENTERS',
        then: yup => yup.required('First Name is required for this role'),
        otherwise: yup => yup.optional()
      }),
    lastName: yup.string().when('role', {
      is: (role: any) => role !== 'APMC TRADERS' && role !== 'CENTERS',
      then: yup => yup.required('First Name is required for this role'),
      otherwise: yup => yup.optional()
    }),
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
    role: userData?.role,
    roleId: userData?.roleId,
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
    districtFarmerComingSellProduct: userData?.districtFarmerComingSellProduct
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
    dispatch(getRoleAndPermissions())
  }, [])
  useEffect(() => {
    if (userData && userData?.pinCode) {
      const res = axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/GetPinCode/${userData?.pinCode}`, {
          headers
        })
        .then(response => {
          setPinCodeAddress(response?.data?.[0]?.PostOffice)
        })
      return res?.data
    }
  }, [userData?.pinCode])
  const handlePincode = e => {
    setPincode(e)
    let payload = {
      pincode: e ? e : ''
    }
    const res = axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/GetPinCode/${payload?.pincode}`, {
        headers
      })
      .then(response => {
        setPinCodeAddress(response?.data?.[0]?.PostOffice)
      })
    return res?.data
    // dispatch(getAdressByPincode(payload))
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
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])
  const setPincodeprefill = (state: any) => {
    setPincode(state)
  }
  useEffect(() => {
    let payload = {
      pincode: userData?.pinCode
    }
    getAdressByPincode(payload)
  }, [userData?.pinCode])
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        setRolePrefill(userData?.role)
        setSTATE(userData?.state && userData?.state)
        setDistrict(userData?.city && userData?.city)
        setPincodeprefill(userData?.pinCode)
        setTaluka(userData?.taluka && userData?.taluka)
        setVillage(userData?.village && userData?.village)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [userData?.state, userData?.city, userData?.pinCode, userData?.role])
  const findRoleId = ros => {
    let RFD = ''
    const RoID = getRoles?.map(ro => {
      if (ro.roleType?.includes(ros)) {
        RFD = ro?.id
      }
    })
    return RFD
  }
  const handleSubmit = (values: any) => {
    let payload = {
      id: userData?.id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
      phone: values?.phone,
      state: values?.state,
      city: district,
      taluka: values?.taluka,
      village: village,
      pinCode: pincode,
      role: rolePrefill,
      roleId: findRoleId(values?.role),
      //centers
      centerName: values?.centerName,
      centerRegisterUnderCompanyDate: values?.centerRegisterUnderCompanyDate,
      centerKeyPerson: values?.centerKeyPerson,
      centerHandlingPersonName: values?.centerHandlingPersonName,
      centerTaluka: values?.centerTaluka,
      centerDistrict: district,
      centerTurnover: values?.centerTurnover,
      centerMemberFarmer: values?.centerMemberFarmer,
      centerPerDayMilkCollection: values?.centerPerDayMilkCollection,
      centerMilkStorageCapacity: values?.centerMilkStorageCapacity,
      centerSellingMilkFor: values?.centerSellingMilkFor,
      centerOtherCompetitors: values?.centerOtherCompetitors,
      centerPaymentCycle: values?.centerPaymentCycle,
      centerOtherFacltyByMilkAgency: values?.centerOtherFacltyByMilkAgency,
      centerFarmarPaymentProcess: values?.centerFarmarPaymentProcess,
      centerMembersOnBoard: values?.centerMembersOnBoard,
      centerCurrentHurdeles: values?.centerCurrentHurdeles,
      centerNeededFacultys: values?.centerNeededFacultys,
      centerAllFinancialAudits: values?.centerAllFinancialAudits,
      // apmc traders
      apmcFirmName: values?.apmcFirmName,
      apmcAddress: values?.apmcAddress,
      apmcName: values?.apmcName,
      apmcTaluka: values?.apmcTaluka,
      apmcDistrict: district,
      apmcPersonName: values?.apmcPersonName,
      apmcConnectedFarmers: values?.apmcConnectedFarmers,
      apmcMajorCropsSelling: values?.apmcMajorCropsSelling,
      districtFarmerComingSellProduct: values?.districtFarmerComingSellProduct
    }
    dispatch(updateUser1(payload)).then((res: any) => {
      if (res?.payload?.status === 200) {
        router.push('/users')
      }
    })
  }
  function removeDuplicatesTaluka(getAddressByPinCodeData: any) {
    if (getAddressByPinCodeData) {
      const unique = getAddressByPinCodeData?.[0]?.PostOffice?.filter(
        (obj, index) => getAddressByPinCodeData?.[0]?.PostOffice?.findIndex(item => item.Block === obj.Block) === index
      )
      return unique
    }
  }
  function removeDuplicatesTalukaS(getAddressByPinCodeData: any) {
    if (getAddressByPinCodeData) {
      const unique = getAddressByPinCodeData?.filter(
        (obj, index) => getAddressByPinCodeData?.findIndex(item => item.Block === obj.Block) === index
      )
      return unique
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
                        value={rolePrefill && rolePrefill}
                        error={Boolean(errors.role && touched.role)}
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
                          <MenuItem key={Item?.roleType} value={Item?.roleType}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name='role' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </FormControl>
                  </Grid>
                  {rolePrefill === 'CENTERS' ? (
                    <>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='centerName'
                          error={Boolean(errors.centerName && touched.centerName)}
                          fullWidth
                          InputLabelProps={{
                            shrink: true
                          }}
                          label='Name of the center '
                          placeholder='Center Name'
                        />
                        <ErrorMessage name='centerName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Center registration under company registration date
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            name='centerRegisterUnderCompanyDate'
                            value={values?.centerRegisterUnderCompanyDate}
                            label='Center registration under company registration date'
                            onChange={(e: any) => {
                              setFieldValue('centerRegisterUnderCompanyDate', e?.target?.value)
                            }}
                          >
                            <MenuItem value={'PVT LTD '}>PVT LTD </MenuItem>
                            <MenuItem value={'CO-OP'}>CO-OP</MenuItem>
                            <MenuItem value={'PROP'}>PROP</MenuItem>
                            <MenuItem value={'PARTNERSHIP'}>PARTNERSHIP</MenuItem>
                            <MenuItem value={'FPO'}>FPO</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
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
                          label='Name of key person'
                          placeholder='Name of key person'
                        />
                        <ErrorMessage
                          name='centerKeyPerson'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
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
                          label='Center phone no'
                          placeholder='Center phone no'
                        />
                        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
                          label='Center email'
                          placeholder='Center email'
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
                          label='Password '
                          placeholder='Password'
                        />
                        <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerHandlingPersonName}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerHandlingPersonName'
                          error={Boolean(errors.centerHandlingPersonName && touched.centerHandlingPersonName)}
                          fullWidth
                          label='Name of handling person'
                          placeholder='Name of handling person'
                        />
                        <ErrorMessage
                          name='centerHandlingPersonName'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
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
                            State
                          </InputLabel>
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
                        {/* <Grid item sm={6} xs={12}> */}
                        <Tooltip title='Please select state first'>
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
                              District
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='centerDistrict'
                              disabled={STATE?.length <= 0}
                              value={district && district}
                              label='district'
                              onChange={e => {
                                setFieldValue('centerDistrict', e?.target?.value)
                                setDistrict(e?.target?.value)
                              }}
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
                              {allDistrict?.map(name => (
                                <MenuItem key={name?.name} value={name?.name}>
                                  {name?.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                        {/* </Grid> */}
                        {/* <TextField
                          value={values?.centerDistrict}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerDistrict'
                          error={Boolean(errors.centerDistrict && touched.centerDistrict)}
                          fullWidth
                          label='District of center'
                          placeholder='District of center'
                        />
                        <ErrorMessage name='centerDistrict' render={msg => <div style={{ color: 'red' }}>{msg}</div>} /> */}
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
                            <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='centerTaluka'
                              disabled={pincode?.length <= 0}
                              value={taluka}
                              label='taluka'
                              onChange={e => {
                                setTaluka(e?.target?.value)
                              }}
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
                              {pinCodeAddress &&
                                removeDuplicatesTalukaS(pinCodeAddress)?.map(name => (
                                  <MenuItem key={name?.Block} value={name?.Block}>
                                    {name?.Block}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                        {/* <TextField
                          value={values?.centerTaluka}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerTaluka'
                          error={Boolean(errors.centerTaluka && touched.centerTaluka)}
                          fullWidth
                          label='Taluka of center'
                          placeholder='Taluka of center'
                        />
                        <ErrorMessage name='centerTaluka' render={msg => <div style={{ color: 'red' }}>{msg}</div>} /> */}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerTurnover}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerTurnover'
                          error={Boolean(errors.centerTurnover && touched.centerTurnover)}
                          fullWidth
                          label='Turnover of center'
                          placeholder='Turnover of center'
                        />
                        <ErrorMessage name='centerTurnover' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerMemberFarmer}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerMemberFarmer'
                          error={Boolean(errors.centerMemberFarmer && touched.centerMemberFarmer)}
                          fullWidth
                          label='How many farmers are members'
                          placeholder='How many farmers are members'
                        />
                        <ErrorMessage
                          name='centerMemberFarmer'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerPerDayMilkCollection}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerPerDayMilkCollection'
                          error={Boolean(errors.centerPerDayMilkCollection && touched.centerPerDayMilkCollection)}
                          fullWidth
                          label='Total  milk collection per day'
                          placeholder='Total  milk collection per day'
                        />
                        <ErrorMessage
                          name='centerPerDayMilkCollection'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerMilkStorageCapacity}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerMilkStorageCapacity'
                          error={Boolean(errors.centerMilkStorageCapacity && touched.centerMilkStorageCapacity)}
                          fullWidth
                          label='Milk collection storage capacity'
                          placeholder='Milk collection storage capacity'
                        />
                        <ErrorMessage
                          name='centerPerDayMilkCollection'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerSellingMilkFor}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerSellingMilkFor'
                          error={Boolean(errors.centerSellingMilkFor && touched.centerSellingMilkFor)}
                          fullWidth
                          label='To whom they are selling the milk'
                          placeholder='To whom they are selling the milk'
                        />
                        <ErrorMessage
                          name='centerSellingMilkFor'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerOtherCompetitors}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerOtherCompetitors'
                          error={Boolean(errors.centerOtherCompetitors && touched.centerOtherCompetitors)}
                          fullWidth
                          label='Who are other competitors'
                          placeholder='Who are other competitors'
                        />
                        <ErrorMessage
                          name='centerOtherCompetitors'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerPaymentCycle}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerPaymentCycle'
                          error={Boolean(errors.centerPaymentCycle && touched.centerPaymentCycle)}
                          fullWidth
                          label='What is the payment cycle'
                          placeholder='What is payment cycle'
                        />
                        <ErrorMessage
                          name='centerPaymentCycle'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerOtherFacltyByMilkAgency}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerOtherFacltyByMilkAgency'
                          error={Boolean(errors.centerOtherFacltyByMilkAgency && touched.centerOtherFacltyByMilkAgency)}
                          fullWidth
                          label='Other faclity provided by milk collection agency'
                          placeholder='Other faclity provided by milk collection agency'
                        />
                        <ErrorMessage
                          name='centerPaymentCycle'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerFarmarPaymentProcess}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerFarmarPaymentProcess'
                          error={Boolean(errors.centerFarmarPaymentProcess && touched.centerOtherFacltyByMilkAgency)}
                          fullWidth
                          label='How you make payment to farmers'
                          placeholder='How you make payment to farmers'
                        />
                        <ErrorMessage
                          name='centerFarmarPaymentProcess'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerMembersOnBoard}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerMembersOnBoard'
                          error={Boolean(errors.centerMembersOnBoard && touched.centerMembersOnBoard)}
                          fullWidth
                          label='If CO-OP how many members on board'
                          placeholder='How you make payment to farmers'
                        />
                        <ErrorMessage
                          name='centerMembersOnBoard'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerCurrentHurdeles}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerCurrentHurdeles'
                          error={Boolean(errors.centerCurrentHurdeles && touched.centerCurrentHurdeles)}
                          fullWidth
                          label='What are the hurdeles you are facing now'
                          placeholder='What are the hurdeles you are facing now'
                        />
                        <ErrorMessage
                          name='centerCurrentHurdeles'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerNeededFacultys}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerNeededFacultys'
                          error={Boolean(errors.centerNeededFacultys && touched.centerNeededFacultys)}
                          fullWidth
                          label='What are the faclity you require to grow'
                          placeholder='What are the faclity you require to grow'
                        />
                        <ErrorMessage
                          name='centerNeededFacultys'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerAllFinancialAudits}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='centerAllFinancialAudits'
                          error={Boolean(errors.centerAllFinancialAudits && touched.centerAllFinancialAudits)}
                          fullWidth
                          label='Have all financial audits filed regularly'
                          placeholder='Have all financial audits filed regularly'
                        />
                        <ErrorMessage
                          name='centerAllFinancialAudits'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                    </>
                  ) : rolePrefill === 'APMC TRADERS' ? (
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
                          label='Name of the firm'
                          placeholder='Name of the firm'
                        />
                        <ErrorMessage name='apmcFirmName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcAddress}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='apmcAddress'
                          error={Boolean(errors.apmcAddress && touched.apmcAddress)}
                          fullWidth
                          label='Address'
                          placeholder='Address'
                        />
                        <ErrorMessage name='apmcAddress' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcName}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='apmcName'
                          error={Boolean(errors.apmcName && touched.apmcName)}
                          fullWidth
                          label='Name of the apmc'
                          placeholder='Name of the apmc'
                        />
                        <ErrorMessage name='apmcName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
                              name='apmcDistrict'
                              disabled={STATE.length <= 0}
                              value={values?.apmcDistrict}
                              label='district'
                              onChange={handleChange}
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
                            <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='taluka'
                              disabled={pincode?.length <= 0}
                              value={taluka}
                              label='taluka'
                              onChange={e => {
                                setFieldValue('taluka', e?.target?.value)
                                setTaluka(e?.target?.value)
                              }}
                            >
                              {pinCodeAddress &&
                                removeDuplicatesTalukaS(pinCodeAddress)?.map((name: any) => (
                                  <MenuItem key={name?.Block} value={name?.Block}>
                                    {name?.Block}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcPersonName}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='apmcPersonName'
                          error={Boolean(errors.apmcPersonName && touched.apmcPersonName)}
                          fullWidth
                          label='Name of the person'
                          placeholder='Name of the person'
                        />
                        <ErrorMessage name='apmcPersonName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
                          label='Cell No.'
                          placeholder='Cell No.'
                        />
                        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
                          label='Email Address'
                          placeholder='EMAIL ID'
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
                          label='Password '
                          placeholder='Password'
                        />
                        <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcConnectedFarmers}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='apmcConnectedFarmers'
                          error={Boolean(errors.apmcConnectedFarmers && touched.apmcConnectedFarmers)}
                          fullWidth
                          type='number'
                          label='How many farmers are connected with you'
                          placeholder='How many farmers are connected with you'
                        />
                        <ErrorMessage
                          name='apmcConnectedFarmers'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcMajorCropsSelling}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='apmcMajorCropsSelling'
                          error={Boolean(errors.apmcMajorCropsSelling && touched.apmcMajorCropsSelling)}
                          fullWidth
                          label='What are the major crops you are selling'
                          placeholder='What are the major crops you are selling'
                        />
                        <ErrorMessage
                          name='apmcMajorCropsSelling'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.districtFarmerComingSellProduct}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                          onBlur={handleBlur}
                          name='districtFarmerComingSellProduct'
                          error={Boolean(
                            errors.districtFarmerComingSellProduct && touched.districtFarmerComingSellProduct
                          )}
                          fullWidth
                          label='From which area of your districts farmers are coming to sell the products'
                          placeholder='From which area of your districts farmers are coming to sell the products'
                        />
                        <ErrorMessage
                          name='apmcMajorCropsSelling'
                          render={msg => <div style={{ color: 'red' }}>{msg}</div>}
                        />
                      </Grid>
                    </>
                  ) : (
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
                              {pinCodeAddress &&
                                removeDuplicatesTalukaS(pinCodeAddress)?.map((name: any) => (
                                  <MenuItem key={name?.Block} value={name?.Block}>
                                    {name?.Block}
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
                              disabled={pincode?.length <= 0}
                              value={village}
                              label='villageName'
                              onChange={e => {
                                setFieldValue('villageName', e?.target?.value)
                                setVillage(e?.target?.value)
                              }}
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
                              {pinCodeAddress &&
                                pinCodeAddress?.map((name: any) => (
                                  <MenuItem key={name?.Name} value={name?.Name}>
                                    {name?.Name}
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
