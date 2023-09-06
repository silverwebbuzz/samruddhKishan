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
import { deleteFarmer, deletePermissions, deleteUser } from 'src/slice/farmers'
import { deleteCategory } from 'src/slice/categoriesSlice'
import { deleteProduct } from 'src/slice/productSlice'
import { deleteService, getAllServices } from 'src/slice/servicesSlice'
import { deleteBrands, getAllBrands } from 'src/slice/brandsSlice'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const DeleteDialog = ({ open, type, id, handleClose, delelteField }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    const payload: any = {
      id: id
    }

    switch (type) {
      case 'farmer':
        dispatch(deleteFarmer(payload))
        break
      case 'users':
        dispatch(deleteUser(payload))
        break
      case 'permissions':
        dispatch(deletePermissions(payload))
        break
      case 'categories':
        dispatch(deleteCategory(payload))
        break
      case 'deleteProduct':
        dispatch(deleteProduct(payload))
        break

      case 'services':
        dispatch(deleteService(payload)).then(res => {
          if (res) {
            //@ts-ignore
            dispatch(getAllServices())
          }
        })
      case 'brands':
        dispatch(deleteBrands(payload)).then(res => {
          if (res) {
            //@ts-ignore
            dispatch(getAllBrands())
          }
        })

      default:
        console.log('Does not exist DELETE ID!')
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
        <DialogTitle id='alert-dialog-slide-title'>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure you want to delete this <strong>{delelteField}</strong> record?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleDelete()
              handleClose()
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteDialog
