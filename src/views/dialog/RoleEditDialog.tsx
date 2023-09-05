import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup'

import AddRole from '../apps/roles/AddRole'
import EditRole from '../apps/roles/EditRole'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import { useEffect, useState } from 'react'
import { getRoleAndPermissions, updateRoles } from 'src/slice/farmers'

const RoleEditDialog = ({
  selectedCheckbox,
  setSelectedCheckbox,
  setOpen,
  handleClose,
  open,
  roleEditValue,
  handleClickOpen
}: any) => {
  const { getPermission } = useSelector((state: any) => state?.rootReducer?.farmerReducer)
  //   const [selectedCheckbox, setSelectedCheckbox] = useState<any[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const validationSchema = yup.object().shape({
    roleName: yup.string().required('Role Name is required')
  })

  const removeDuplicates = (arr: any) => {
    return arr.filter((item: any, index: any) => arr.indexOf(item) === index)
  }

  const onSubmitClick = (values: any) => {
    let payload = {
      id: roleEditValue?.id,
      roleType: values.roleName?.toUpperCase(),
      rolePermission: selectedCheckbox
    }
    dispatch(updateRoles(payload)).then((res: any) => {
      setSelectedCheckbox([])
      handleClose()
      if (res) {
        dispatch(getRoleAndPermissions())
        setSelectedCheckbox([])
      }
    })
  }
  //   if (getPermission?.length > 0) {
  //     const FilterdArray = () => {
  //       let Fi: Array<any>[]
  //       getPermission?.map((Item: any) => {
  //         removeDuplicates(selectedCheckbox)?.some((ID: any) => {
  //           if (Item?.id == ID) {
  //             let finalItem = { ...Item, action: 1 }
  //             return finalItem
  //           }
  //         })
  //         Fi = removeDuplicates(selectedCheckbox)
  //       })
  //       //@ts-ignore
  //       return Fi
  //     }
  //     let payload = {
  //       roleType: values.roleName?.toUpperCase(),
  //       //@ts-ignore
  //       rolePermission: removeDuplicates(FilterdArray())
  //     }
  //     dispatch(createRoleAndPermission(payload)).then(res => {
  //       setSelectedCheckbox([])
  //       handleClose()
  //       if (res) {
  //         dispatch(getRoleAndPermissions())
  //         setSelectedCheckbox([])
  //       }
  //     })
  //   }

  const togglePermission = (id: string) => {
    const arr = removeDuplicates(selectedCheckbox)
    if (arr.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      setSelectedCheckbox(prev => [...prev, id])
      // selectedCheckbox.push(id)
    }
  }

  const checkedCheckbox = () => {
    roleEditValue?.rolePermission &&
      JSON.parse(roleEditValue?.rolePermission)?.map((Item: any) => {
        // setSelectedCheckbox(prev => [...prev, Item])
        selectedCheckbox.push(Item)
      })
  }
  //   useEffect(() => {
  //     checkedCheckbox()
  //   }, [open])
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      onClose={() => {
        handleClose()
        setSelectedCheckbox([])
      }}
      open={open}
    >
      <Formik
        initialValues={{
          roleName: roleEditValue?.roleType
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onSubmitClick(values)
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <Form>
            <DialogTitle
              sx={{
                textAlign: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Typography variant='h5' component='span'>
                Edit Role
              </Typography>
              <Typography variant='body2'>Set Role Permissions</Typography>
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(5)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <Box sx={{ my: 4 }}>
                <FormControl fullWidth>
                  <TextField
                    label='Role Name'
                    name='roleName'
                    value={values?.roleName}
                    error={Boolean(errors.roleName && touched.roleName)}
                    placeholder='Enter Role Name'
                    onChange={handleChange}
                  />
                  <ErrorMessage name='roleName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
                </FormControl>
              </Box>
              <Typography variant='h6'>Role Permissions</Typography>
              <TableContainer>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' }
                          }}
                        >
                          Administrator Access
                          <Tooltip placement='top' title='Allows a full access to the system'>
                            <Box sx={{ display: 'flex' }}>
                              <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' }
                          }}
                        >
                          Access
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* {dialogTitle === 'Add' ? (
                    <AddRole
                      getPermission={getPermission}
                      togglePermission={togglePermission}
                      selectedCheckbox={selectedCheckbox}
                      removeDuplicates={removeDuplicates}
                    />
                  ) : ( */}
                  <EditRole
                    getPermission={getPermission}
                    selectedCheckbox={selectedCheckbox}
                    togglePermission={togglePermission}
                    removeDuplicates={removeDuplicates}
                  />
                  {/* )} */}
                </Table>
              </TableContainer>
            </DialogContent>

            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Box className='demo-space-x'>
                <Button
                  variant='contained'
                  sx={{
                    '&:hover': {
                      backgroundColor: '#5E7954'
                    }
                  }}
                  type='submit'
                >
                  Submit
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  onClick={() => {
                    handleClose()
                    setSelectedCheckbox([])
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default RoleEditDialog
