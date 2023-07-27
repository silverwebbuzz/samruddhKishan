// ** React Imports
import { FormEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch } from 'react-redux'
import { createPermissions } from 'src/slice/farmers'
import { AppDispatch } from 'src/store/store'
import { ErrorMessage, Form, Formik } from 'formik'
import * as yup from 'yup'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter } = props
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const handleDialogToggle = () => setOpen(!open)
  const validationSchema = yup.object().shape({
    permissionName: yup.string().required('Permission Name is required')
  })
  const handleSubmit = (values: any) => {
    let payload = {
      moduleName: values?.permissionName
    }
    dispatch(createPermissions(payload))
    handleDialogToggle()
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button
          sx={{
            mb: 2,
            '&:hover': {
              backgroundColor: '#5E7954'
            }
          }}
          variant='contained'
          onClick={handleDialogToggle}
        >
          Add Permission
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Add New Permission
          </Typography>
          <Typography variant='body2'>Permissions you may use and assign to your users.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Formik
            initialValues={{ permissionName: '' }}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {({ values, errors, touched, handleChange, handleBlur }: any) => (
              <Form>
                <Box
                  sx={{
                    mt: 4,
                    mx: 'auto',
                    width: '100%',
                    maxWidth: 360,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <TextField
                    fullWidth
                    sx={{ mb: 1 }}
                    label='Permission Name'
                    name='permissionName'
                    value={values?.permissionName}
                    placeholder='Enter Permission Name'
                    onChange={handleChange}
                    error={Boolean(errors.permissionName && touched.permissionName)}
                  />
                  <ErrorMessage name='permissionName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />

                  <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
                    <Button
                      sx={{
                        '&:hover': {
                          backgroundColor: '#5E7954'
                        }
                      }}
                      size='large'
                      variant='contained'
                      type='submit'
                    >
                      Create Permission
                    </Button>
                    <Button type='reset' size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                      Discard
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
