import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteDialog from '../deleteDialogBox/deleteDialogBox'
import CategoryDialog from '../components/dialogBox/CategoryDialog'
import Icon from 'src/@core/components/icon'
import { getAllCategories, updateCategory } from 'src/slice/categoriesSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import DeleteMultiFieldsDialog from '../deleteDialogBox/deleteMultiFieldsDialog'
import UpdateMultiFieldsDialog from '../deleteDialogBox/updateMultipleDialogBox'
import { alpha } from '@mui/system'

interface Category {
  id: number
  categoryName: string
  categoryStatus?: string | number
  children?: Category[]
}

interface Props {
  data: Category[]
}

const CollapsibleTable = ({ data, pageLimit, setPageLimit, page, setPage, setPageCount, pageCount }: any) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [DeleteID, setDeleteID] = useState<number | undefined>()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [delelteField, setDelelteField] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [dialogName, setDialogName] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [editID, setEditID] = useState<number | string>('')
  const [editField, setEditField] = useState<Category | number>()
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuRow, setMenuRow] = useState<any>(null)
  const [categoryStatus, setCategoryStatus] = useState<string | number>(0)
  const dispatch = useDispatch<AppDispatch>()
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleDeleteClose = () => setOpenDelete(false)
  const [multiFieldDeleteOpen, setMultiFieldDeleteOpen] = useState(false)
  const [multiFieldUpdateOpen, setMultiFieldUpdateOpen] = useState(false)
  const handleMultiDeleteClickOpen = () => setMultiFieldDeleteOpen(true)
  const handleMultiUpdateClickOpen = () => setMultiFieldUpdateOpen(true)

  const handleMultiUpdateClickClose = () => {
    setMultiFieldUpdateOpen(false)
  }
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setSelectedRows([])
  }
  const handleMultiDeleteClickClose = () => {
    setMultiFieldDeleteOpen(false)
    setSelectedRows([])
  }
  const handleShow = (dialogName: string) => {
    setShow(true)
    setDialogName(dialogName)
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
  const handleCancel = () => {
    setShow(false)
    setDialogName('')
  }

  const toggleRow = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id))
    } else {
      setExpandedRows([...expandedRows, id])
    }
  }

  const handleSelectAll = () => {
    const allRowIds = getAllChildIds(data || [])
    if (selectedRows?.length === allRowIds?.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(allRowIds)
    }
  }

  const getAllChildIds = (categories: Category[]): number[] => {
    if (!categories) return []

    let allIds: number[] = []
    for (const category of categories) {
      allIds.push(category.id)
      if (category.children) {
        allIds = [...allIds, ...getAllChildIds(category.children)]
      }
    }
    return allIds
  }

  let props = {
    editField: editField,
    show: show,
    edit: edit,
    editID: editID,
    setEdit: setEdit,
    handleCancel: handleCancel
  }
  const handleCheckboxClick = (id: any) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }
  const renderRows = (
    categories: Category[],
    parentName: string | null = null,
    parentId: number | null = null,
    level: number = 0
  ) => {
    const startIndex = (page - 1) * pageLimit
    const endIndex = startIndex + pageLimit
    if (1 < page) {
      return categories?.map(category => (
        <React.Fragment key={category.id}>
          <TableRow>
            <TableCell
              style={{
                padding: '8px',
                borderRight: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Checkbox
                checked={selectedRows.includes(category.id)}
                onChange={e => {
                  e.stopPropagation()
                  handleCheckboxClick(category.id)
                }}
              />{' '}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                borderTop: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Button onClick={() => toggleRow(category.id)}>{expandedRows.includes(category.id) ? '▼' : '►'}</Button>
              {category?.categoryName}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                borderTop: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              {category?.categoryStatus === 1 ? (
                <Badge color='primary' overlap='circular' badgeContent='Active' />
              ) : (
                <Badge color='error' overlap='circular' badgeContent='InActive' />
              )}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size='small'
                  aria-controls={`menu-${category.id}`} // Unique ID for each row's menu
                  aria-haspopup='true'
                  sx={{ color: 'text.secondary' }}
                  onClick={event => {
                    // @ts-ignore
                    setAnchorEl(event.currentTarget)
                    setMenuRow(category)
                  }}
                >
                  <Icon icon='tabler:menu' />
                </IconButton>
                <Menu
                  id={`menu-${category.id}`} // Unique ID for each row's menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && category.id === menuRow?.id}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      handleClickOpenDelete()
                      setDeleteID(category.id)
                      setDelelteField(category.categoryName)
                      setAnchorEl(null)
                    }}
                  >
                    <Icon icon='tabler:trash' />
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleShow('category')
                      setEdit(true)
                      setEditID(category.id)
                      setEditField(category)
                      setAnchorEl(null)
                    }}
                  >
                    <Icon icon='tabler:edit' /> Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let payload = {
                        id: category?.id,
                        categoryStatus: category?.categoryStatus === 1 ? 0 : 1
                      }
                      dispatch(updateCategory(payload)).then(() => {
                        dispatch(getAllCategories({ page: 1, pageSize: 10 }))
                      })
                      setAnchorEl(null)
                    }}
                  >
                    {category?.categoryStatus === 0 ? 'Set Active' : 'Set Inactive'}
                  </MenuItem>
                </Menu>
              </Box>
            </TableCell>
          </TableRow>
          {expandedRows.includes(category.id) && category.children && (
            <TableRow>
              <TableCell colSpan={4} style={{ padding: '0', borderBottom: 'none' }}>
                <div style={{ paddingLeft: '20px' }}>
                  <Table>
                    <TableBody>
                      {' '}
                      {renderRows(category.children, category?.categoryName, category?.id, level + 1)}
                    </TableBody>
                  </Table>
                </div>
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))
    } else {
      return categories?.slice(startIndex, endIndex).map(category => (
        <React.Fragment key={category.id}>
          <TableRow>
            <TableCell
              style={{
                padding: '8px',
                borderRight: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Checkbox
                checked={selectedRows.includes(category.id)}
                onChange={e => {
                  e.stopPropagation()
                  handleCheckboxClick(category.id)
                }}
              />{' '}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                borderTop: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Button onClick={() => toggleRow(category.id)}>{expandedRows.includes(category.id) ? '▼' : '►'}</Button>
              {category.categoryName}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                borderTop: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              {category?.categoryStatus === 1 ? (
                <Badge color='primary' overlap='circular' badgeContent='Active' />
              ) : (
                <Badge color='error' overlap='circular' badgeContent='InActive' />
              )}
            </TableCell>
            <TableCell
              style={{
                padding: '8px',
                borderLeft: 'none',
                marginLeft: `${level + 20}px` // Adjust the margin as needed
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size='small'
                  aria-controls={`menu-${category.id}`} // Unique ID for each row's menu
                  aria-haspopup='true'
                  sx={{ color: 'text.secondary' }}
                  onClick={event => {
                    // @ts-ignore
                    setAnchorEl(event.currentTarget)
                    setMenuRow(category)
                  }}
                >
                  <Icon icon='tabler:menu' />
                </IconButton>
                <Menu
                  id={`menu-${category.id}`} // Unique ID for each row's menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && category.id === menuRow?.id}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      handleClickOpenDelete()
                      setDeleteID(category.id)
                      setDelelteField(category.categoryName)
                      setAnchorEl(null)
                    }}
                  >
                    <Icon icon='tabler:trash' />
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleShow('category')
                      setEdit(true)
                      setEditID(category.id)
                      setEditField(category)
                      setAnchorEl(null)
                    }}
                  >
                    <Icon icon='tabler:edit' /> Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      let payload = {
                        id: category?.id,
                        categoryStatus: category?.categoryStatus === 1 ? 0 : 1
                      }
                      dispatch(updateCategory(payload)).then(() => {
                        dispatch(getAllCategories({ page: 1, pageSize: 10 }))
                      })
                      setAnchorEl(null)
                    }}
                  >
                    {category?.categoryStatus === 0 ? 'Set Active' : 'Set Inactive'}
                  </MenuItem>
                </Menu>
              </Box>
            </TableCell>
          </TableRow>
          {expandedRows.includes(category.id) && category.children && (
            <TableRow>
              <TableCell colSpan={4} style={{ padding: '0', borderBottom: 'none' }}>
                <div style={{ paddingLeft: '20px' }}>
                  <Table>
                    <TableBody>
                      {' '}
                      {renderRows(category.children, category?.categoryName, category?.id, level + 1)}
                    </TableBody>
                  </Table>
                </div>
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))
    }
  }

  return (
    <>
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
                    value={categoryStatus}
                    sx={{
                      width: '6.25rem'
                    }}
                    onChange={e => {
                      setCategoryStatus(e?.target?.value)
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
      <Table>
        <TableHead
          sx={{
            backgroundColor: '#f6f6f7'
          }}
        >
          <TableRow>
            <TableCell style={{ padding: '8px', borderRight: 'none', borderTop: 'none' }}>
              <Checkbox
                checked={selectedRows?.length === getAllChildIds(data || [])?.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell style={{ padding: '8px', borderLeft: 'none', borderTop: 'none' }}>Category Name</TableCell>

            <TableCell style={{ padding: '8px', borderLeft: 'none', borderTop: 'none' }}>Status</TableCell>

            <TableCell style={{ padding: '8px', borderLeft: 'none', borderTop: 'none' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(data || [])}</TableBody>

        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          handleClickOpen={handleClickOpenDelete}
          handleClose={handleDeleteClose}
          type='categories'
          delelteField={delelteField}
          id={DeleteID}
        />
        <DeleteMultiFieldsDialog
          open={multiFieldDeleteOpen}
          setOpen={setMultiFieldDeleteOpen}
          handleClickOpen={handleMultiDeleteClickOpen}
          handleClose={handleMultiDeleteClickClose}
          type='category'
          id={selectedRows}
        />
        <UpdateMultiFieldsDialog
          open={multiFieldUpdateOpen}
          setOpen={setMultiFieldUpdateOpen}
          handleClickOpen={handleMultiUpdateClickOpen}
          handleClose={handleMultiUpdateClickClose}
          status={categoryStatus}
          type='category'
          id={selectedRows}
          setSelectedRows={setSelectedRows}
        />
        {dialogName === 'category' && <CategoryDialog {...props} />}
      </Table>
      <CustomPagination />
    </>
  )
}

export default CollapsibleTable
