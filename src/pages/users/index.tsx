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
import { Button, Chip, Dialog, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAdressByPincode, getAllDistrict, getAllState, getAllUsers, getRoleAndPermissions } from 'src/slice/farmers'
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
const allUsers = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { getUsers, getRoles, getAddressByPinCodeData, allDistrict, allState } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const [pincode, setPincode] = useState('')
  const [STATE, setSTATE] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    district: '',
    taluka: '',
    villageName: '',
    roleType: ''
  }

  useEffect(() => {
    //@ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    let payload = {
      //   adminId: userData?.id,
      page: paginationModel?.page + 1,
      pageSize: paginationModel?.pageSize
    }
    //@ts-ignore
    dispatch(getAllUsers(payload))
    // localStorage.removeItem('FarmerData')
  }, [paginationModel?.page, paginationModel?.pageSize])

  const handleSearch = () => {}
  const handleEdit = (row: any) => {
    // localStorage.setItem('FarmerData', JSON.stringify(row?.id))
    // router.push('/edit-farmer')
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handlePincode = (e: any) => {
    setPincode(e)
    let payload = {
      pincode: e
    }
    dispatch(getAdressByPincode(payload))
  }
  useEffect(() => {
    dispatch(getAllState())
    dispatch(getRoleAndPermissions())
  }, [])
  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])
  function removeDuplicatesTaluka(getAddressByPinCodeData: any) {
    const unique = getAddressByPinCodeData?.[0]?.PostOffice?.filter(
      (obj: any, index: any) =>
        getAddressByPinCodeData?.[0]?.PostOffice?.findIndex((item: any) => item.Block === obj.Block) === index
    )
    return unique
  }
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      field: 'firstName',
      minWidth: 320,
      headerName: 'Name',
      renderCell: ({ row }: any) => {
        const { firstName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {firstName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'mobileNumber',
      headerName: 'Phone'
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'villageName',
      headerName: 'Village Name'
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete'>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => handleEdit(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Users' />
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <TextField
              size='small'
              value={search}
              onChange={handleSearch}
              placeholder='Search…'
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>
                    <Icon icon='tabler:search' fontSize={20} />
                  </Box>
                ),
                endAdornment: (
                  <IconButton size='small' title='Clear' aria-label='Clear'>
                    <Icon icon='tabler:x' fontSize={20} />
                  </IconButton>
                )
              }}
              sx={{
                width: {
                  xs: 1,
                  sm: 'auto'
                },
                '& .MuiInputBase-root > svg': {
                  mr: 2
                }
              }}
            />
            <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => handleClickOpen()}
            >
              Add User
            </Button>
          </Box>

          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
                // color: "red"
              }
            }}
            autoHeight
            pagination
            rowHeight={62}
            rowCount={getUsers?.totalItems}
            rows={getUsers && getUsers ? getUsers : []}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            disableRowSelectionOnClick
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
        <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={values => {
              console.log('object', values)
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
                              disabled={STATE.length <= 0}
                              value={values?.district}
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
                            name='district'
                            value={values?.district}
                            label='district'
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
      </Grid>
    </Grid>
  )
}

export default allUsers
