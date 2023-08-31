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
import {
  Badge,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Toolbar
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
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import DeleteMultiFieldsDialog from 'src/views/deleteDialogBox/deleteMultiFieldsDialog'
import { alpha } from '@mui/system'
import { getAllInquiry, updateInquiry } from 'src/slice/inquirySlice'

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
const allInquiry = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { allInquiries, deleteInq, multiDelteInq, updateInq } = useSelector(
    (state: any) => state?.rootReducer?.inquiryReducer
  )
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [editPrefillData, setEditPrefillData] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [DeleteID, setDeleteID] = useState()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [delelteField, setDelelteField] = useState<string>('')
  const handleClickOpen = () => {
    setEditPrefillData('')
    setPincode('')
    setOpen(true)
  }
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  //   console.log(selectedRows, 'dfdfdfdfdf')
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false)
  const [userSearch, setUserSearch] = useState('')
  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true)
  const handleMultiDeleteClickClose = () => setMultiFieldDeleteOpen(false)

  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuRow, setMenuRow] = useState(null)
  const handleChange = (event: any, value: number) => {
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

  useEffect(() => {
    //@ts-ignore
    const userData: any = JSON.parse(localStorage.getItem('userData'))
    let payload = {
      page: page,
      pageSize: pageLimit
      //   fullName: userSearch ? userSearch : ''
    }
    //@ts-ignore
    dispatch(getAllInquiry(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }, [page, pageCount, pageLimit, deleteInq, multiDelteInq, updateInq])

  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection)
  }
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      sortable: false,
      headerName: 'ID'
    },
    {
      flex: 0.25,
      field: 'fullName',
      sortable: false,
      minWidth: 320,
      headerName: 'Name',
      renderCell: ({ row }: any) => {
        const { fullName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {fullName}
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
      sortable: false,
      headerName: 'Mobile Number'
    },
    {
      flex: 0.25,
      minWidth: 100,
      sortable: false,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: any) => {
        const { email } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'status',
      sortable: false,
      minWidth: 100,
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        const { status } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Select
                size='small'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='status'
                value={status}
                sx={{
                  width: '8rem'
                }}
                onChange={e => {
                  let editPayload: any = {
                    id: row?.id,
                    status: e?.target?.value
                  }
                  dispatch(updateInquiry(editPayload)).then(res => {
                    dispatch(getAllInquiry({ page: 1, pageLimit: 10 }))
                  })
                }}
              >
                <MenuItem value={'pending'}>Pending</MenuItem>
                <MenuItem value={'progress'}>Progress</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
              </Select>
              {/* <Chip label={status} /> */}
              <Badge />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            aria-controls={`menu-${row.id}`} // Unique ID for each row's menu
            aria-haspopup='true'
            sx={{ color: 'text.secondary' }}
            onClick={event => {
              // @ts-ignore
              setAnchorEl(event.currentTarget)
              setMenuRow(row)
            }}
          >
            <Icon icon='tabler:menu' /> {/* Use an appropriate icon for the menu */}
          </IconButton>
          <Menu
            id={`menu-${row.id}`} // Unique ID for each row's menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && row.id === menuRow?.id}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                handleClickOpenDelete()
                setDeleteID(row?.id)
                setDelelteField(row?.fullName)
              }}
            >
              <Icon icon='tabler:trash' />
              Delete
            </MenuItem>
            {/* <MenuItem
              value='pending'
              onClick={() => {
                const payload: any = {
                  id: row?.id
                }

                dispatch(updateInquiry(payload)).then(res => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }))
                })
              }}
            >
              {row?.status === 'completed' ? 'In complete' : 'completed'}
            </MenuItem> */}
            {/* <MenuItem
              onClick={() => {
                let formdata = new FormData()
                formdata.append('id', row?.id)
                formdata.append('status', row?.status === 'completed' ? 'completed' : 'In complete')
                let payload = formdata
                dispatch(updateInquiry(payload)).then(res => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }))
                })
              }}
            >
              {row?.status === 'completed' ? 'In complete' : 'completed'}
            </MenuItem>
            <MenuItem
              onClick={() => {
                let formdata = new FormData()
                formdata.append('id', row?.id)
                formdata.append('status', row?.status === 'completed' ? 'completed' : 'In complete')
                let payload = formdata
                dispatch(updateInquiry(payload)).then(res => {
                  dispatch(getAllInquiry({ page: 1, pageSize: 10 }))
                })
              }}
            >
              {row?.status === 'completed' ? 'In complete' : 'completed'}
            </MenuItem> */}
          </Menu>
        </Box>
        // <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //   <Tooltip title='Delete'>
        //     <IconButton
        //       size='small'
        //       sx={{ color: 'text.secondary' }}
        //       onClick={() => {
        //         handleClickOpenDelete()
        //         setDeleteID(row?.id)
        //         setDelelteField(row?.fullName)
        //       }}
        //     >
        //       <Icon icon='tabler:trash' />
        //     </IconButton>
        //   </Tooltip>
        //   <Tooltip title='Edit'>
        //     <IconButton
        //       size='small'
        //       sx={{ color: 'text.secondary' }}
        //       onClick={() => {
        //         localStorage.setItem('editUserId', row?.id)
        //         router.push('/users/edit-user')
        //       }}
        //     >
        //       <Icon icon='tabler:edit' />
        //     </IconButton>
        //   </Tooltip>
        // </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Inquiry' />
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
              value={userSearch}
              onChange={e => setUserSearch(e?.target?.value)}
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
            {/* <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => {
                router.push('/users/add-user')
              }}
            >
              Add User
            </Button> */}
          </Box>
          {selectedRows?.length > 0 ? (
            <>
              <Grid xs={12} sm={12}>
                {/* <Typography variant='body'>Delete all selected farmers:</Typography> */}
                {/* <Button variant='outlined' color='error'>
              Delete All Selected Farmers
            </Button> */}

                <Toolbar
                  sx={{
                    px: theme => `${theme.spacing(5)} !important`,
                    ...(selectedRows?.length > 0 && {
                      bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                    })
                  }}
                >
                  <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                    {selectedRows?.length} selected
                  </Typography>
                  {selectedRows?.length > 0 ? (
                    <Tooltip title='Delete'>
                      <IconButton
                        sx={{ color: 'error' }}
                        onClick={() => {
                          handleMultiDeleteClickOpen()
                          setDeleteID(selectedRows)
                        }}
                      >
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </Toolbar>
              </Grid>
            </>
          ) : null}
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
                // color: "red"
              }
            }}
            autoHeight
            pagination
            // rowHeight={62}
            // rowCount={getUsers?.totalItems}
            rows={allInquiries?.data && allInquiries?.data ? allInquiries?.data : []}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            slots={{
              footer: CustomPagination
            }}
            //@ts-ignore
            hideFooterRowCount
            hideFooterSelectedRowCount
            hideFooterPagination
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
          />
        </Card>
      </Grid>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type='inquiry'
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type='inquiry'
        id={selectedRows}
      />
    </Grid>
  )
}

export default allInquiry
