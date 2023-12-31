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
import BrandsDialog from 'src/views/components/dialogBox/BrandsDialog'
import { getAllBrands } from 'src/slice/brandsSlice'
import { ThemeColor } from 'src/@core/layouts/types'
import DeleteMultiFieldsDialog from 'src/views/deleteDialogBox/deleteMultiFieldsDialog'
import { alpha } from '@mui/system'

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
const brands = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
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
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false)

  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true)
  const handleMultiDeleteClickClose = () => setMultiFieldDeleteOpen(false)

  const handleClickOpen = () => {
    setEditPrefillData('')
    setOpen(true)
  }

  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)

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
            //@ts-ignore
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
      pageSize: pageLimit
    }
    dispatch(getAllBrands(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }, [page, pageCount, pageLimit])

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
  const handleSearch = () => {}
  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection)
  }
  const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row?.brandLogo?.length) {
      return (
        <img
          src={`${row?.brandLogo}`}
          style={{
            mr: 3,
            width: '2.575rem',
            height: '2.575rem'
          }}
        />
      )
    } else {
      return <></>
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
      field: 'brandLogo',
      sortable: false,
      minWidth: 320,
      headerName: 'brand Logo',
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
      }
    },
    {
      flex: 0.25,
      field: 'brandName',
      sortable: false,
      minWidth: 320,
      headerName: 'Brand Name',
      renderCell: ({ row }: any) => {
        const { brandName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <p
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  handleShow('brands')
                  setEdit(true)
                  setEditID(row?.id)
                  setEditField(row)
                }}
              >
                {brandName}
              </p>
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
                setDelelteField(row?.brandName)
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
                handleShow('brands')
                setEdit(true)
                setEditID(row?.id)
                setEditField(row)
              }}
            >
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
          <CardHeader title='All Brands' />
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'end',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            {/* <TextField
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
            /> */}
            <Button
              variant='contained'
              sx={{
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
              onClick={() => {
                handleShow('brands')
              }}
            >
              Add Brands
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
                      <IconButton
                        sx={{ color: 'error' }}
                        onClick={() => {
                          handleMultiDeleteClickOpen()
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
              }
            }}
            autoHeight
            pagination
            rows={brandsData?.data && brandsData?.data ? brandsData?.data : []}
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
        type='brands'
        delelteField={delelteField}
        id={DeleteID}
      />
      <DeleteMultiFieldsDialog
        open={multiFieldDeleteOpen}
        setOpen={setMultiFieldDeleteOpen}
        handleClickOpen={handleMultiDeleteClickOpen}
        handleClose={handleMultiDeleteClickClose}
        type='brands'
        id={selectedRows}
      />
      {dialogName === 'brands' && <BrandsDialog {...props} />}
    </Grid>
  )
}

export default brands
