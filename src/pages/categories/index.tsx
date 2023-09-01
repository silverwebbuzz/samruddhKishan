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
  MenuItem,
  Pagination,
  Select,
  Theme,
  createStyles,
  makeStyles
} from '@mui/material'

import { AppDispatch } from 'src/store/store'
import { Ref, forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { useRouter } from 'next/router'
import { ErrorMessage, Form, Formik } from 'formik'
import DeleteDialog from 'src/views/deleteDialogBox/deleteDialogBox'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import { getAllCategories, updateCategory } from 'src/slice/categoriesSlice'
import CategoryDialog from 'src/views/components/dialogBox/CategoryDialog'
import CollapsibleTable from 'src/views/demo/demo'

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
  const { categories, deleteCat, createCat } = useSelector((state: any) => state?.rootReducer?.categoriesReducer)
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
    dispatch(getAllCategories(payload)).then(response => {
      setPageCount(Math.ceil(response?.payload?.totalItems / pageLimit))
    })
  }, [page, pageCount, pageLimit, deleteCat, createCat])

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
    setSelectedRows(selection.selectionModel)
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
      field: 'categoryName',
      sortable: false,

      minWidth: 320,
      headerName: 'Category Name',
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
      field: 'categoryStatus',
      sortable: false,
      minWidth: 320,
      headerName: 'Category status',
      renderCell: ({ row }: any) => {
        const { categoryId, categoryStatus, categoryName, id } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Select
                size='small'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='categoryStatus'
                value={categoryStatus}
                sx={{
                  width: '6.25rem'
                }}
                onChange={e => {
                  let editPayload: any = {
                    categoryId: categoryId,
                    categoryName: categoryName,
                    categoryStatus: e?.target?.value,
                    id: id
                  }
                  dispatch(updateCategory(editPayload)).then(res => {
                    dispatch(getAllCategories({ page: 1, pageSize: 10 }))
                  })
                }}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>InActive</MenuItem>
              </Select>
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
                handleShow('category')
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
          <CardHeader title='All Categories' />
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
                handleShow('category')
              }}
            >
              Add Category
            </Button>
          </Box>

          <CollapsibleTable data={categories?.data} />
        </Card>
      </Grid>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        handleClickOpen={handleClickOpenDelete}
        handleClose={handleDeleteClose}
        type='categories'
        delelteField={delelteField}
        id={DeleteID}
      />
      {dialogName === 'category' && <CategoryDialog {...props} />}
    </Grid>
  )
}

export default allCategories
