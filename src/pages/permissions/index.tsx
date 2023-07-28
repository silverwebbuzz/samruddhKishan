// ** React Imports
import { useState, useEffect, useCallback, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

import { PermissionRowType } from 'src/types/apps/permissionTypes'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { getAllPermission, updatePermissions } from 'src/slice/farmers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import { useSelector } from 'react-redux'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup'
import { FormControl, MenuItem, Pagination, Select } from '@mui/material'

interface Colors {
  [key: string]: ThemeColor
}

interface CellType {
  row: PermissionRowType
}

const colors: Colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 210,
    field: 'id',
    headerName: 'id',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.id}</Typography>
  },
  {
    flex: 0.25,
    field: 'moduleName',
    minWidth: 240,
    headerName: 'Permission Name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.moduleName}</Typography>
  }
]

const PermissionsTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [editValue, setEditValue] = useState<any>('')
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { createPermission, getPermission, updatePermission } = useSelector(
    (state: any) => state?.rootReducer?.farmerReducer
  )
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = yup.object().shape({
    permissionName: yup.string().required('Permission Name is required')
  })
  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
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
  const handleEditPermission = (row: any) => {
    setEditValue(row)
    setEditDialogOpen(true)
  }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const handleSubmit = (values: any) => {
    let payload = {
      id: editValue?.id,
      moduleName: values?.permissionName
    }
    dispatch(updatePermissions(payload))
    getAllPermitionApiCall()
    setEditDialogOpen(false)
  }
  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditPermission(row)}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Box>
      )
    }
  ]
  const getAllPermitionApiCall = () => {
    let payload = {
      // adminId: userData?.id,
      page: page,
      pageSize: pageLimit
    }
    dispatch(getAllPermission(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }
  useEffect(() => {
    getAllPermitionApiCall()
  }, [page, pageCount, pageLimit, createPermission, updatePermission])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant='h5' sx={{ mb: 6 }}>
                Permissions List
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} />
            <DataGrid
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#a4be9b'
                  // color: "red"
                }
              }}
              autoHeight
              rows={getPermission?.data ? getPermission?.data : []}
              columns={columns}
              disableRowSelectionOnClick
              slots={{
                footer: CustomPagination
              }}
              hideFooterRowCount
              hideFooterSelectedRowCount
              hideFooterPagination
            />
          </Card>
        </Grid>
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit Permission
          </Typography>
          <Typography variant='body2'>Edit permission as per your requirements.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the permission name, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </Alert>
          <Formik
            initialValues={{ permissionName: editValue?.moduleName }}
            validationSchema={validationSchema}
            onSubmit={values => {
              handleSubmit(values)
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }: any) => (
              <Form>
                <Box sx={{ mt: 8 }}>
                  <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
                    <TextField
                      fullWidth
                      size='small'
                      value={values?.permissionName}
                      label='Permission Name'
                      name='permissionName'
                      sx={{ mr: [0, 4], mb: [3, 0] }}
                      placeholder='Enter Permission Name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.permissionName && touched.permissionName)}
                    />
                    <ErrorMessage name='permissionName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />

                    <Button
                      sx={{
                        '&:hover': {
                          backgroundColor: '#5E7954'
                        }
                      }}
                      type='submit'
                      variant='contained'
                    >
                      Update
                    </Button>
                  </FormGroup>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PermissionsTable
