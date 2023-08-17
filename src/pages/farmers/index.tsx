//@ts-nocheck
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
import { GridColDef, GridRowId } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Pagination } from '@mui/material'
import Select from '@mui/material/Select'

import { getAllDistrict, getAllFarmers, getAllState } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import CustomTextField from 'src/@core/components/mui/text-field'
import { getAllUsers } from 'src/slice/users'
import axios from 'axios'

export type Payload = {
  id?: number
  search?: string
  page?: number
  limit?: number
}
const defaultColumns: GridColDef[] = []
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const allFarmers = () => {
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const { allFarmers, createFarmer, deleteFarmer } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const [page, setPage] = useState<number>(1)
  const [DeleteID, setDeleteID] = useState()
  const [open, setOpen] = useState<boolean>(false)
  const [delelteField, setDelelteField] = useState<string>('')
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [taluka, setTaluka] = useState('')
  const [STATE, setSTATE] = useState('Gujarat')
  const [district, setDistrict] = useState('')
  const userData: any = JSON.parse(localStorage.getItem('userData'))
  const [usersData, setUsersData] = useState([])
  const [referalNames, setReferalName] = useState('')

  const { allDistrict, allState, getUsers, getAddressByPinCodeData } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const [roleValue, setRoleValue] = useState<string>([])
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const ROLE = JSON.parse(localStorage.getItem('role'))
  const CustomPagination = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          padding: '1rem'
        }}
      >
        <label>Row per page</label>
        <FormControl sx={{ m: 1, width: '60px' }}>
          <Select
            size='small'
            defaultValue='10'
            value={pageLimit}
            onChange={(e: any) => {
              setPageLimit(e?.target?.value)
              setPage(1)
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>

        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Box>
    )
  }
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }
  const handleDropdownChange = (event: any) => {
    const {
      target: { value }
    } = event
    console.log(value)
    setRoleValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    }
  }

  useEffect(() => {
    // @ts-ignore
    const payload = {
      page: page,
      pageSize: pageLimit,
      state: STATE ? STATE : '',
      district: district ? district : '',
      taluka: taluka ? taluka : '',
      referralId: roleValue?.map(role => role?.id),
      referralName: roleValue === '' ? '' : referalNames ? referalNames : ''
    }
    if (userData?.role === 'admin') {
      payload.adminId = userData?.id
      dispatch(getAllFarmers(payload)).then(response => {
        setPageCount(Math.ceil(response?.payload?.totalFilterCount / pageLimit))
      })
    } else {
      payload.referralId = userData?.id
      payload.referralName = userData?.role
      dispatch(getAllFarmers(payload)).then(response => {
        setPageCount(Math.ceil(response?.payload?.totalFilterCount / pageLimit))
      })
    }
    localStorage.removeItem('FarmerData')
  }, [createFarmer, deleteFarmer, page, pageCount, pageLimit, STATE, district, taluka, roleValue])

  const userApiCall = async () => {
    let headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    let res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getAllUsers`, {
      headers
    })
    setUsersData(res?.data)
    return res?.data
  }

  useEffect(() => {
    dispatch(getAllState())
    userApiCall()
  }, [])

  useEffect(() => {
    dispatch(getAllDistrict({ state: STATE }))
  }, [STATE])

  const handleSearch = () => {}

  const handleEdit = (row: any) => {
    localStorage.setItem('FarmerData', JSON.stringify(row?.id))
    router.push('/farmers/edit-farmer')
  }
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      sortable: false,
      filter: false,

      minWidth: 100,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      field: 'firstName',
      minWidth: 320,
      sortable: false,
      headerName: 'Full Name',
      renderCell: ({ row }: any) => {
        const { firstName, lastName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {firstName} {lastName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: 'state',
      headerName: 'State'
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'district',
      sortable: false,
      headerName: 'District'
    },
    {
      flex: 0.2,
      minWidth: 100,
      sortable: false,
      field: 'villageName',
      headerName: 'Village Name'
    },
    {
      flex: 0.2,
      sortable: false,
      minWidth: 100,
      field: 'mobileNumber',
      headerName: 'Phone'
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
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleClickOpen()
                setDeleteID(row?.id)
                setDelelteField(row?.firstName + ' ' + row?.lastName)
              }}
            >
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
  const findUserRoleByID = id => {
    usersData?.data?.filter(user => {
      if (user.id === id) {
        setReferalName(user?.role)
      }
    })
  }
  const handleRolechange = id => {
    setRoleValue(id)
    findUserRoleByID(id)
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Farmers' />
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
            {userData?.role === 'admin' ? (
              <>
                <Grid item sm={2} xs={12}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='demo-multiple-chip-label'>Role</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={roleValue}
                      onChange={handleDropdownChange}
                      input={<OutlinedInput id='select-multiple-chip' label='Role' />}
                      renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(selectedItem => (
                            <Chip
                              key={selectedItem?.value}
                              label={`${selectedItem?.firstName}${selectedItem?.lastName}`}
                            />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {usersData?.data?.map(name => (
                        <MenuItem key={name} value={name}>
                          {name?.firstName} {name?.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={2} xs={12}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>State</InputLabel>
                    <Select
                      id='demo-simple-select'
                      name='state'
                      value={STATE}
                      label='State'
                      onChange={(e: any) => {
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
                <Grid item sm={2} xs={12}>
                  <Tooltip title='Please select state first'>
                    <FormControl fullWidth size='small'>
                      <InputLabel id='demo-simple-select-label'>District</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='district'
                        disabled={STATE.length <= 0}
                        value={district}
                        label='district'
                        onChange={e => {
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
                </Grid>{' '}
                <Grid item sm={2} xs={12}>
                  <TextField
                    size='small'
                    value={taluka}
                    onChange={e => {
                      setTaluka(e.target?.value)
                    }}
                    label='Taluka'
                    placeholder='Taluka'
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
                </Grid>
                <Grid item sm={2} xs={12}>
                  <Button
                    onClick={() => {
                      setSTATE('')
                      setTaluka('')
                      setDistrict('')
                      setRoleValue([])
                      setReferalName('')
                    }}
                  >
                    {' '}
                    Clear
                  </Button>
                </Grid>
              </>
            ) : null}
            <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => router.push('/farmers/add-farmer')}
            >
              Add farmer
            </Button>
          </Box>

          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
              }
            }}
            autoHeight
            rows={allFarmers?.data && allFarmers?.data ? allFarmers.data : []}
            columns={columns}
            slots={{
              footer: CustomPagination
            }}
            hideFooterRowCount
            hideFooterSelectedRowCount
            hideFooterPagination
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
          />
        </Card>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          type='farmer'
          delelteField={delelteField}
          id={DeleteID}
        />
      </Grid>
    </Grid>
  )
}

export default allFarmers
