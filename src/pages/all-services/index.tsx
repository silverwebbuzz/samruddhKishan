// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams } from '@mui/x-data-grid'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Third Party Imports
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  Badge,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Toolbar
} from '@mui/material'
import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import { getAllCategories } from 'src/slice/categoriesSlice'
import { getAllServices, updateService } from 'src/slice/servicesSlice'
import { getAllBrands } from 'src/slice/brandsSlice'
import DeleteMultiFieldsDialog from 'src/views/deleteDialogBox/deleteMultiFieldsDialog'
import { alpha } from '@mui/system'
import UpdateMultiFieldsDialog from 'src/views/deleteDialogBox/updateMultipleDialogBox'
import styled from '@emotion/styled'
import { getAllUsers } from 'src/slice/farmers'
import DemoSelect from 'src/views/demo/demoSelect'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'

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
const allCategories = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { servicesData, deleteServiceData } = useSelector((state: any) => state?.rootReducer?.servicesReducer)
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
  const [show, setShow] = useState<boolean>(false)
  const [dialogName, setDialogName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [editID, setEditID] = useState<string | number>('')
  const [editField, setEditField] = useState<string | number>('')
  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { brandsData } = useSelector((state: any) => state?.rootReducer?.brandsReducer)
  const { getUsers } = useSelector((state: any) => state?.rootReducer?.farmerReducer)

  const [categoryIdPrefill, setCategoryIdPrefill] = useState(0)
  const [brandPrefill, setBrandPrefill] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false)
  const [multiFieldUpdateOpen, setMultiFieldUpdateOpen] = useState(false)
  const [serviceStatus, setServiceStatus] = useState('')
  const [vendorId, setVendorId] = useState(0)

  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true)
  const handleMultiUpdateClickOpen = () => setMultiFieldUpdateOpen(true)
  const handleMultiUpdateClickClose = () => {
    setMultiFieldUpdateOpen(false)
  }

  const handleMultiDeleteClickClose = () => {
    setMultiFieldDeleteOpen(false)
  }

  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)
  const handleChange = (event: any, value: number) => {
    setPage(value)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuRow, setMenuRow] = useState(null)
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
    localStorage.removeItem('serviceID')
  }, [])
  useEffect(() => {
    let payload: any = {
      page: page,
      pageSize: pageLimit,
      categoryId: categoryIdPrefill ? categoryIdPrefill : '',
      vendorId: vendorId ? vendorId : ''
    }
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
    dispatch(getAllBrands({ page: 1, pageSize: 10 }))
    dispatch(getAllUsers({ page: 1, pageSize: 10 }))

    dispatch(getAllServices(payload)).then((response: any) => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }, [page, pageCount, pageLimit, categoryIdPrefill, vendorId])
  const handleCancel = () => {
    setShow(false)
    setDialogName('')
  }
  let props = {
    editField: editField,
    show: show,
    edit: edit,
    editID: editID,
    setEdit: setEdit,
    handleCancel: handleCancel
  }

  const userFilter = (users: any) => {
    return users?.filter((user: any) => user.role === 'VENDORS')
  }
  const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row?.serviceBannerImage?.length) {
      return <CustomAvatar src={`${row?.serviceBannerImage}`} sx={{ mr: 3, width: '2.575rem', height: '2.575rem' }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={color as ThemeColor}
          sx={{ mr: 3, fontSize: '.8rem', width: '2.575rem', height: '2.575rem' }}
        >
          {/* {getInitials(row.full_name ? row.full_name : 'John Doe')} */}
        </CustomAvatar>
      )
    }
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
      minWidth: 190,
      field: 'serviceBannerImage',
      headerName: 'Image',
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
      }
    },

    {
      flex: 0.25,
      field: 'serviceName',
      sortable: false,
      minWidth: 220,
      headerName: 'Name',
      renderCell: ({ row }: any) => {
        const { serviceName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {serviceName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.25,
      field: 'status',
      sortable: false,
      minWidth: 120,
      headerName: 'status',
      renderCell: ({ row }: any) => {
        const { status } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Chip label={status === 1 ? 'Active' : 'Inactive'} color={status === 1 ? 'primary' : 'error'} />
              <Badge />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'categoryName',
      sortable: false,
      minWidth: 220,
      headerName: 'Category',
      renderCell: ({ row }: any) => {
        const { categoryName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {categoryName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'firstName',
      sortable: false,
      minWidth: 220,
      headerName: 'Vendor Name',
      renderCell: ({ row }: any) => {
        const { firstName, lastName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {`${firstName ? firstName : ''}${''}${lastName ? lastName : ''}`}
              </Typography>
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
                setDelelteField(row?.serviceName)
              }}
            >
              <Icon icon='tabler:trash' />
              Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.setItem('serviceID', row?.id)
                router.push('/all-services/edit-services')
              }}
            >
              <Icon icon='tabler:edit' /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                let formdata = new FormData()

                formdata.append('id', row?.id)
                formdata.append('status', row?.status === 0 ? 1 : 0)
                let payload = formdata
                dispatch(updateService(payload)).then(res => {
                  dispatch(getAllServices({ page: 1, pageSize: 10 }))
                })
              }}
            >
              {row?.status === 0 ? 'Set Active' : 'Set Inactive'}
            </MenuItem>
          </Menu>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Services' />
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
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth>
                <DemoSelect
                  data={categories?.data}
                  size={'small'}
                  //@ts-ignore
                  selectedCategory={categoryIdPrefill}
                  //@ts-ignore
                  setSelectedCategory={setCategoryIdPrefill}
                />
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'>Vendor Name</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='vendorId'
                  value={vendorId}
                  label='Vendor Name'
                  onChange={(e: any) => {
                    setVendorId(e?.target?.value)
                  }}
                >
                  {userFilter(getUsers?.data)?.map((Item: any) => (
                    <MenuItem key={Item?.id} value={Item?.id}>
                      {Item?.firstName} {Item?.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={2} xs={12}>
              <Button
                onClick={() => {
                  setCategoryIdPrefill('')
                  setBrandPrefill('')
                  setVendorId(0)
                }}
              >
                {' '}
                Clear
              </Button>
            </Grid>
            <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => {
                router.push('all-services/add-services')
              }}
            >
              Add Services
            </Button>
          </Box>
          {selectedRows?.length > 0 ? (
            <>
              <Grid xs={12} sm={12}>
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
                      <Button
                        onClick={() => {
                          handleMultiDeleteClickOpen()
                        }}
                        variant='outlined'
                        startIcon={<Icon icon='tabler:trash' />}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  ) : null}
                </Toolbar>
              </Grid>
            </>
          ) : null}
          {selectedRows?.length > 0 ? (
            <>
              <Grid xs={12} sm={12}>
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        variant='body'
                        sx={{
                          minWidth: '126px'
                        }}
                      >
                        Select status :{' '}
                      </Typography>
                      <Select
                        size='small'
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        name='Status'
                        value={serviceStatus}
                        sx={{
                          width: '6.25rem'
                        }}
                        onChange={e => {
                          setServiceStatus(e?.target?.value)
                        }}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </Select>
                    </Box>
                  ) : null}
                  <Button
                    variant='outlined'
                    sx={{
                      marginLeft: 4
                    }}
                    onClick={() => {
                      handleMultiUpdateClickOpen()
                    }}
                  >
                    Update
                  </Button>
                </Toolbar>
              </Grid>
            </>
          ) : null}
          <DataGrid
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#a4be9b'
              }
            }}
            autoHeight
            pagination
            rows={servicesData?.data && servicesData?.data ? servicesData?.data : []}
            columns={columns}
            slots={{
              footer: CustomPagination
            }}
            disableRowSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(selection: any) => setSelectedRows(selection)}
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
        type='services'
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type='services'
        id={selectedRows}
      />
      <UpdateMultiFieldsDialog
        open={multiFieldUpdateOpen}
        setOpen={setMultiFieldUpdateOpen}
        handleClickOpen={handleMultiUpdateClickOpen}
        handleClose={handleMultiUpdateClickClose}
        status={serviceStatus}
        type='services'
        id={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </Grid>
  )
}

export default allCategories
