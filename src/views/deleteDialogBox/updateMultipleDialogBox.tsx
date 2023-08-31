// ** React Imports
import { forwardRef, ReactElement, Ref } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide, { SlideProps } from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import { AppDispatch } from 'src/store/store'
import { useDispatch } from 'react-redux'
import {
  deleteFarmer,
  deleteMultipleFarmer,
  deleteMultipleUsers,
  deletePermissions,
  deleteUser,
  getAllFarmers,
  getAllUsers
} from 'src/slice/farmers'
import { deleteCategory, getAllCategories, updateMultipleCategoryStatus } from 'src/slice/categoriesSlice'
import { deleteMultipleProduct, deleteProduct, getAllProducts } from 'src/slice/productSlice'
import {
  deleteMultipleServices,
  deleteService,
  getAllServices,
  updateMultipleServiceStatus
} from 'src/slice/servicesSlice'
import { deleteBrands, getAllBrands } from 'src/slice/brandsSlice'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const UpdateMultiFieldsDialog = ({ open, status, type, id, handleClose, setSelectedRows }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    const payload: any = {
      ids: id,
      categoryStatus: status
    }
    // console.log(payload, 'payload')

    switch (type) {
      case 'services':
        dispatch(updateMultipleServiceStatus(payload)).then(res => {
          dispatch(getAllServices({ page: 1, pageSize: 10 }))
        })
        break

      case 'category':
        dispatch(updateMultipleCategoryStatus(payload)).then(res => {
          dispatch(getAllCategories({ page: 1, pageSize: 10 }))
        })
        break

      default:
        console.log('Does not exist UPDATE ID!')
        break
    }
  }

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>Update Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to Update all record?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            // color='error'
            onClick={() => {
              handleDelete()
              handleClose()
              setSelectedRows([])
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateMultiFieldsDialog
