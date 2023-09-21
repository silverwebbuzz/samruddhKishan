import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { ErrorMessage } from 'formik'
import DemoSelect from 'src/views/demo/demoSelect'

const VendorForm = ({
  size,
  values,
  setSTATE,
  STATE,
  allState,
  setDistrict,
  district,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
  allDistrict,
  handlePincode,
  pincode,
  getAddressByPinCodeData,
  categories,
  setCategoryIdPrefill,
  categoryIdPrefill,
  FilePreview
}: any) => {
  return (
    <>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          name='firstName'
          error={Boolean(errors.firstName && touched.firstName)}
          fullWidth
          label='First Name'
          placeholder='First Name'
        />
        <ErrorMessage name='firstName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          name='lastName'
          error={Boolean(errors.lastName && touched.lastName)}
          fullWidth
          label='Last Name'
          placeholder='Last Name'
        />
        <ErrorMessage name='lastName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name='email'
          error={Boolean(errors.email && touched.email)}
          fullWidth
          label='Email'
          placeholder='Email'
        />
        <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name='password'
          error={Boolean(errors.password && touched.password)}
          fullWidth
          label='Password'
          placeholder='Password'
        />
        <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          name='phone'
          error={Boolean(errors.phone && touched.phone)}
          fullWidth
          type='number'
          label='Phone'
          placeholder='Phone'
        />
        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth size={size ? size : 'medium'}>
          <InputLabel id='demo-simple-select-label'>State</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='state'
            value={values?.state}
            label='State'
            onChange={(e: any) => {
              setFieldValue('state', e?.target?.value)
              setSTATE(e?.target?.value)
            }}
          >
            {allState?.data?.map((name: any) => (
              <MenuItem key={name?.name} value={name?.name}>
                {name?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Tooltip title='Please select state first'>
          <FormControl fullWidth size={size ? size : 'medium'}>
            <InputLabel id='demo-simple-select-label'>District</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='district'
              disabled={STATE.length <= 0}
              value={district}
              label='District'
              onChange={(e: any) => {
                setFieldValue('district', e?.targe?.value)
                setDistrict(e?.target?.value)
              }}
            >
              {allDistrict?.map((name: any) => (
                <MenuItem key={name?.name} value={name?.name}>
                  {name?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={pincode}
          name='pinCode'
          onChange={e => {
            handlePincode(e.target.value)
            setFieldValue('pinCode', e?.target?.value)
          }}
          onBlur={handleBlur}
          type='number'
          fullWidth
          label='Pin Code'
          placeholder='Pin Code'
        />
        <ErrorMessage name='pinCode' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Tooltip
          title='Please enter pincode first'
          disableFocusListener={!(pincode?.length <= 0)}
          disableHoverListener={!(pincode?.length <= 0)}
          disableTouchListener={!(pincode?.length <= 0)}
        >
          <FormControl fullWidth size={size ? size : 'medium'}>
            <InputLabel id='demo-simple-select-label'>Taluka</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='taluka'
              disabled={pincode?.length <= 0}
              value={values?.taluka && values?.taluka}
              label='Taluka'
              onChange={handleChange}
            >
              {getAddressByPinCodeData?.taluka?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      </Grid>

      <Grid item sm={6} xs={12}>
        <Tooltip
          title='Please enter pincode first'
          disableFocusListener={!(pincode.length <= 0)}
          disableHoverListener={!(pincode.length <= 0)}
          disableTouchListener={!(pincode.length <= 0)}
        >
          <FormControl fullWidth size={size ? size : 'medium'}>
            <InputLabel id='demo-simple-select-label'>Village Name</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='villageName'
              disabled={pincode.length <= 0}
              value={values?.villageName && values?.villageName}
              label='Village Name'
              onChange={handleChange}
            >
              {getAddressByPinCodeData?.village?.map((name: any) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      </Grid>

      <Grid item sm={6} xs={12}>
        <DemoSelect
          data={categories?.data}
          //@ts-ignore
          size={'small'}
          selectedCategory={categoryIdPrefill}
          //@ts-ignore
          setSelectedCategory={setCategoryIdPrefill}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        sx={{
          marginTop: '20px',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            display: 'flex'
          }}
        >
          <FilePreview file={values.vendorImage} />
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              variant='contained'
              component='label'
              sx={{
                mr: 1,
                ml: 2,
                '&:hover': {
                  backgroundColor: '#5E7954'
                }
              }}
            >
              Upload
              <input
                type='file'
                hidden
                onChange={(e: any) => {
                  setFieldValue('vendorImage', e.target?.files[0])
                }}
              />
            </Button>
          </Box>
          <ErrorMessage name='brandLogo' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
        </Box>
      </Grid>
    </>
  )
}

export default VendorForm
