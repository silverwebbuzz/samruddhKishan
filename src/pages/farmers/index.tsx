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
import { Button, FormControl, MenuItem, Pagination } from '@mui/material'
import Select from '@mui/material/Select'

import { getAllFarmers } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'

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
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
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
  useEffect(() => {
    // @ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    const payload = {
      page: page,
      pageSize: pageLimit
    }
    if (userData?.role === 'admin') {
      payload.adminId = userData?.id
      dispatch(getAllFarmers(payload)).then(response => {
        setPageCount(Math.ceil(response?.payload?.totalFilterCount / pageLimit))
      })
    } else {
      payload.referralId = userData?.id
      dispatch(getAllFarmers(payload)).then(response => {
        setPageCount(Math.ceil(response?.payload?.totalFilterCount / pageLimit))
      })
    }

    localStorage.removeItem('FarmerData')
  }, [createFarmer, deleteFarmer, page, pageCount, pageLimit])

  const handleSearch = () => {}
  const handleEdit = (row: any) => {
    localStorage.setItem('FarmerData', JSON.stringify(row?.id))
    router.push('/edit-farmer')
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
          {/* <Tooltip title='View'>
            <IconButton
              size='small'
              // component={Link}
              sx={{ color: 'text.secondary' }}
              // href={`/apps/all-company/view/${row?.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip> */}
        </Box>
      )
    }
  ]

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
              onClick={() => router.push('/add-farmer')}
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
          />
        </Card>
      </Grid>
    </Grid>
  )
}
// action: 'read',
// subject: 'acl-page',
allFarmers.acl = {
  action: 'read',
  subject: 'farmers'
}
export default allFarmers
