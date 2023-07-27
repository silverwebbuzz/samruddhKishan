// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { UsersType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import { AppDispatch } from 'src/store/store'
import { getAllUsers } from 'src/slice/farmers'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** Vars
const userRoleObj: UserRoleType = {
  editor: { icon: 'tabler:edit', color: 'info' },
  author: { icon: 'tabler:user', color: 'warning' },
  admin: { icon: 'tabler:device-laptop', color: 'error' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'success' },
  subscriber: { icon: 'tabler:circle-check', color: 'primary' }
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'firstName',
    headerName: 'UserName',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'roleType',
    minWidth: 170,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.roleType}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'City',
    field: 'city',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row?.city}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row?.phone}
        </Typography>
      )
    }
  }
]

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const dispatch = useDispatch<AppDispatch>()
  const { createURole, getUsers, updateRole } = useSelector((state: any) => state?.rootReducer?.farmerReducer)

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const getUserRolesApiCall = () => {
    let payload = {
      page: paginationModel?.page,
      pageSize: paginationModel?.pageSize
    }
    dispatch(getAllUsers(payload))
  }
  useEffect(() => {
    getUserRolesApiCall()
  }, [paginationModel?.page, paginationModel?.pageSize, createURole, updateRole])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
              }
            }}
            autoHeight
            rowHeight={62}
            rows={getUsers ? getUsers : []}
            columns={columns}
            // checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
