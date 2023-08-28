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
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

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
  MenuItem,
  Pagination,
  Select,
  Toolbar
} from '@mui/material'

import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import { ErrorMessage, Form, Formik } from 'formik'
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import { getAllCategories } from 'src/slice/categoriesSlice'
import CategoryDialog from 'src/views/components/dialogBox/CategoryDialog'
import ProductDialog from 'src/views/components/dialogBox/ProductDialog'
import { getAllProducts } from 'src/slice/productSlice'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { getAllBrands } from 'src/slice/brandsSlice'
import DeleteMultiFieldsDialog from 'src/views/deleteDialogBox/deleteMultiFieldsDialog'
import { alpha } from '@mui/system'
import { getAllUsers } from 'src/slice/farmers'

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
const ContentPage = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { allProductsData, deleteProductData, createProductData } = useSelector(
    (state: any) => state?.rootReducer?.productReducer
  )
  const { getUsers } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const { categories } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
  const { brandsData } = useSelector((state: any) => state?.rootReducer?.brandsReducer)

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
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)
  const [categoryIdPrefill, setCategoryIdPrefill] = useState('')
  const [brandPrefill, setBrandPrefill] = useState('')
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false)
  const [vendorId, setVendorId] = useState('')
  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true)
  const handleMultiDeleteClickClose = () => setMultiFieldDeleteOpen(false)
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
    let payload: any = {
      page: page,
      pageSize: pageLimit,
      categoryId: categoryIdPrefill ? categoryIdPrefill : '',
      brandId: brandPrefill ? brandPrefill : '',
      vendorId: vendorId ? vendorId : ''
    }
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
    dispatch(getAllBrands({ page: 1, pageSize: 10 }))
    dispatch(getAllUsers({ page: 1, pageSize: 10 }))
    dispatch(getAllProducts(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }, [page, pageCount, pageLimit, deleteProductData, createProductData, categoryIdPrefill, brandPrefill, vendorId])

  const handleShow = (dialogName: string) => {
    setShow(true)
    setDialogName(dialogName)
  }
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
  useEffect(() => {
    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
    localStorage.removeItem('editProductID')
  }, [])
  const handleSearch = () => {}
  const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row?.productImage?.length) {
      return <CustomAvatar src={`${row?.productImage}`} sx={{ mr: 3, width: '2.575rem', height: '2.575rem' }} />
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
      minWidth: 190,
      field: 'productImage',
      headerName: 'product Image',
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
      }
    },
    {
      flex: 0.25,
      field: 'productName',
      sortable: false,
      minWidth: 220,
      headerName: 'Product Name',
      renderCell: ({ row }: any) => {
        const { productName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {productName}
              </Typography>
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
      headerName: 'Product Category',
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
        console.log('@@@@@@@@@@@@@@@', firstName + lastName)
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
      flex: 0.25,
      field: 'brandName',
      sortable: false,
      minWidth: 220,
      headerName: 'Brand Name',
      renderCell: ({ row }: any) => {
        const { brandName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {brandName}
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
          <Tooltip title='Delete'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleClickOpenDelete()
                setDeleteID(row?.id)
                setDelelteField(row?.categoryName)
              }}
            >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                setEditID(row?.id)
                setEditField(row)
                localStorage.setItem('editProductID', row?.id)
                router.push('/all-products/edit-product')
              }}
            >
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  const userFilter = (users: any) => {
    return users?.filter((user: any) => user.role === 'VENDORS')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='All Products' />

          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <Grid item sm={2} xs={12}>
              <FormControl size='small' fullWidth>
                <InputLabel id='demo-simple-select-label'> Category Name</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='categoryId'
                  value={categoryIdPrefill}
                  label='Category Name'
                  onChange={(e: any) => {
                    setCategoryIdPrefill(e?.target?.value)
                  }}
                >
                  {categories?.data?.map((Item: any) => (
                    <MenuItem key={Item?.categoryName} value={Item?.id}>
                      {Item?.categoryName}
                    </MenuItem>
                  ))}
                </Select>
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
              <FormControl fullWidth size='small'>
                <InputLabel id='demo-simple-select-label'> Brand Name</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='categoryId'
                  value={brandPrefill}
                  label='Brand Name'
                  onChange={(e: any) => {
                    setBrandPrefill(e?.target?.value)
                  }}
                >
                  {brandsData?.data?.map((Item: any) => (
                    <MenuItem key={Item?.categoryName} value={Item?.id}>
                      {Item?.brandName}
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
                  setVendorId('')
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
                router.push('/all-products/add-product')
              }}
            >
              Add Product
            </Button>
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
            rows={allProductsData?.data && allProductsData?.data ? allProductsData?.data : []}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            slots={{
              footer: CustomPagination
            }}
            //@ts-ignore
            hideFooterRowCount
            disableRowSelectionOnClick
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
        type='deleteProduct'
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type='products'
        id={selectedRows}
      />
    </Grid>
  )
}

export default ContentPage
