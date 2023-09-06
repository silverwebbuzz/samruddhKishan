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
import { deleteFarmer, deletePermissions, deleteRole, deleteUser, getRoleAndPermissions } from 'src/slice/farmers'
import { toast } from 'react-hot-toast'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const RoleDeleteDialog = ({ open, type, id, handleClose, delelteField }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    const payload = {
      id: id
    }

    switch (type) {
      case 'role':
        dispatch(deleteRole(payload)).then(res => {
          if (res?.payload?.status === 400) {
            toast.error('This role is assigned to another users')
          } else if (res?.payload?.status === 200) {
            toast.success('Role has been deleted successfully')
            dispatch(getRoleAndPermissions())
          }
        })
        break

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
          <Button variant='contained' onClick={handleClose}>
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

export default RoleDeleteDialog
