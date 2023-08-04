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
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const [pincode, setPincode] = useState('')
  const [STATE, setSTATE] = useState('')
  const [district, setDistrict] = useState('')
  const [village, setVillage] = useState('')
  const [rolePrefill, setRolePrefill] = useState('')

  // const [taluka, setTaluka] = useState('')

  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [editPrefillData, setEditPrefillData] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const handlePincode = e => {
    setPincode(e)
    let payload = {
      pincode: e
    }
    dispatch(getAdressByPincode(payload))
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

  // const handlePincode = (e: any) => {
  //   setPincode(e)
  //   let payload = {
  //     pincode: e
  //   }
  //   dispatch(getAdressByPincode(payload))
  // }
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

    //centers
    centerName: '',
    centerRegisterUnderCompanyDate: '',
    centerKeyPerson: '',
    centerHandlingPersonName: '',
    centerTaluka: '',
    centerDistrict: '',
    centerTurnover: '',
    centerMemberFarmer: '',
    centerPerDayMilkCollection: '',
    centerMilkStorageCapacity: '',
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
    apmcConnectedFarmers: '',
    apmcMajorCropsSelling: '',
    districtFarmerComingSellProduct: ''
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

  function removeDuplicatesTaluka(getAddressByPinCodeData: any) {
    const unique = getAddressByPinCodeData?.[0]?.PostOffice?.filter(
      (obj: any, index: any) =>
        getAddressByPinCodeData?.[0]?.PostOffice?.findIndex((item: any) => item.Block === obj.Block) === index
    )
    return unique
  }

  const handleSubmit = (values: any) => {
    let payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
      phone: values?.phone,
      state: values?.state,
      city: values?.district,
      taluka: values?.taluka,
      village: values?.villageName,
      pinCode: pincode,
      role: values?.role,
      //centers
      centerName: values?.centerName,
      centerRegisterUnderCompanyDate: values?.centerRegisterUnderCompanyDate,
      centerKeyPerson: values?.centerKeyPerson,
      centerHandlingPersonName: values?.centerHandlingPersonName,
      centerTaluka: values?.centerTaluka,
      centerDistrict: values?.centerDistrict,
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
      apmcDistrict: values?.apmcDistrict,
      apmcPersonName: values?.apmcPersonName,
      apmcConnectedFarmers: values?.apmcConnectedFarmers,
      apmcMajorCropsSelling: values?.apmcMajorCropsSelling,
      districtFarmerComingSellProduct: values?.districtFarmerComingSellProduct
    }
    dispatch(createUser1(payload)).then((res: any) => {
      if (res?.payload?.status === 200) {
        router.push('/users')
      }
    })
  }
  function removeDuplicatesTaluka(getAddressByPinCodeData) {
    const unique = getAddressByPinCodeData?.[0]?.PostOffice?.filter(
      (obj, index) => getAddressByPinCodeData?.[0]?.PostOffice?.findIndex(item => item.Block === obj.Block) === index
    )
    return unique
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
                          <MenuItem key={Item?.roleType} value={Item?.roleType}>
                            {Item?.roleType}
                          </MenuItem>
                        ))}
                      </Select>
                      <ErrorMessage name='role' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                    </FormControl>
                  </Grid>
                  {values?.role === 'CENTERS' ? (
                    <>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='centerName'
                          error={Boolean(errors.centerName && touched.centerName)}
                          fullWidth
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
                          onBlur={handleBlur}
                          name='firstName'
                          error={Boolean(errors.centerKeyPerson && touched.centerKeyPerson)}
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
                            sx={{
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black' // Set the label color when focused
                              }
                            }}
                            id='demo-simple-select-label'
                          >
                            state
                          </InputLabel>
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
                            {allState?.data?.map(name => (
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
                              name='district'
                              disabled={STATE.length <= 0}
                              value={values?.district}
                              label='district'
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
                          disableFocusListener={!(pincode.length <= 0)}
                          disableHoverListener={!(pincode.length <= 0)}
                          disableTouchListener={!(pincode.length <= 0)}
                        >
                          <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='centerTaluka'
                              disabled={pincode.length <= 0}
                              value={values?.centerTaluka && values?.centerTaluka}
                              label='taluka'
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
                              {getAddressByPinCodeData &&
                                removeDuplicatesTaluka(getAddressByPinCodeData)?.map(name => (
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

                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.centerTurnover}
                          onChange={handleChange}
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
                  ) : values?.role === 'APMC TRADERS' ? (
                    <>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='firstName'
                          error={Boolean(errors.apmcFirmName && touched.apmcFirmName)}
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
                            value={values?.state}
                            label='State'
                            onChange={(e: any) => {
                              setFieldValue('state', e?.target?.value)
                              setSTATE(e?.target?.value)
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
                            {allState?.data?.map(name => (
                              <MenuItem key={name?.name} value={name?.name}>
                                {name?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcDistrict}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='apmcDistrict'
                          error={Boolean(errors.apmcDistrict && touched.apmcDistrict)}
                          fullWidth
                          label='District'
                          placeholder='District'
                        />
                        <ErrorMessage name='apmcDistrict' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid> */}
                      <Grid item sm={6} xs={12}>
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
                              name='apmcDistrict'
                              disabled={STATE.length <= 0}
                              value={values?.apmcDistrict}
                              label='district'
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
                      {/* <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.apmcTaluka}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='apmcTaluka'
                          error={Boolean(errors.apmcTaluka && touched.apmcTaluka)}
                          fullWidth
                          label='Taluka'
                          placeholder='Taluka'
                        />
                        <ErrorMessage name='apmcTaluka' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid> */}
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
                              name='apmcTaluka'
                              disabled={pincode.length <= 0}
                              value={values?.apmcTaluka && values?.apmcTaluka}
                              label='taluka'
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
                        <TextField
                          value={values?.apmcPersonName}
                          onChange={handleChange}
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
                          label='Phone'
                          placeholder='Phone'
                        />
                        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        {/* <TextField
                          value={values?.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='state'
                          error={Boolean(errors.state && touched.state)}
                          fullWidth
                          label='State'
                          placeholder='State'
                        />

                        <ErrorMessag name='state' render={msg => <div style={{ color: 'red' }}>{msg}</div>} /> */}
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
                            value={values?.state}
                            label='State'
                            onChange={(e: any) => {
                              setFieldValue('state', e?.target?.value)
                              setSTATE(e?.target?.value)
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
                              name='district'
                              disabled={STATE.length <= 0}
                              value={values?.district}
                              label='district'
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
                      {/* <Grid item sm={6} xs={12}>
                        <TextField
                          value={values?.taluka}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name='taluka'
                          error={Boolean(errors.taluka && touched.taluka)}
                          fullWidth
                          label='Taluka'
                          placeholder='Taluka'
                        />
                        <ErrorMessage name='taluka' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                      </Grid> */}
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
                              label='villageName'
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
                              {getAddressByPinCodeData?.[0]?.PostOffice?.map(name => (
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
