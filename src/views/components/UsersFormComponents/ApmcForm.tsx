import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import { ErrorMessage } from 'formik'

const ApmcForm = ({
  size,
  values,
  setSTATE,
  STATE,
  allState,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
  setDistrict,
  district,
  allDistrict,
  handlePincode,
  pincode,
  getAddressByPinCodeData,
  setTaluka,
  taluka,
  resetForm
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
          label='Name of the firm'
          placeholder='Name of the firm'
        />
        <ErrorMessage
          name='firstName'
          render={msg => <div style={{ color: 'red' }}>{'Name of the firm is required'}</div>}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.apmcAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          name='apmcAddress'
          error={Boolean(errors.apmcAddress && touched.apmcAddress)}
          fullWidth
          label='Address'
          placeholder='Address'
        />
        <ErrorMessage name='apmcAddress' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.apmcName}
          onChange={handleChange}
          onBlur={handleBlur}
          name='apmcName'
          error={Boolean(errors.apmcName && touched.apmcName)}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          label='Name of the apmc'
          placeholder='Name of the apmc'
        />
        <ErrorMessage name='apmcName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
              name='apmcDistrict'
              disabled={STATE.length <= 0}
              value={district}
              label='District'
              onChange={e => {
                setFieldValue('apmcDistrict', e?.target?.value)
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
          type='number'
          onBlur={handleBlur}
          fullWidth
          label='Pin Code'
          placeholder='Pin Code'
        />
        <ErrorMessage name='pinCode' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>

      <Grid item sm={6} xs={12}>
        <Tooltip
          title='Please enter pincode first'
          disableFocusListener={!(pincode.length <= 0)}
          disableHoverListener={!(pincode.length <= 0)}
          disableTouchListener={!(pincode.length <= 0)}
        >
          <FormControl fullWidth size={size ? size : 'medium'}>
            <InputLabel id='demo-simple-select-label'>taluka</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='apmcTaluka'
              disabled={pincode.length <= 0}
              value={taluka}
              label='Taluka'
              onChange={e => {
                setFieldValue('taluka', e?.target?.value)
                setTaluka(e?.target?.value)
              }}
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
        <TextField
          size={size ? size : 'medium'}
          value={values?.apmcPersonName}
          onChange={handleChange}
          onBlur={handleBlur}
          name='apmcPersonName'
          error={Boolean(errors.apmcPersonName && touched.apmcPersonName)}
          fullWidth
          label='Name of the person'
          placeholder='Name of the person'
        />
        <ErrorMessage name='apmcPersonName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
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
        <TextField
          size={size ? size : 'medium'}
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name='email'
          error={Boolean(errors.email && touched.email)}
          fullWidth
          label='Email Address'
          placeholder='EMAIL ID'
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
          label='Password '
          placeholder='Password'
        />
        <ErrorMessage name='password' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.apmcConnectedFarmers}
          onChange={handleChange}
          onBlur={handleBlur}
          name='apmcConnectedFarmers'
          error={Boolean(errors.apmcConnectedFarmers && touched.apmcConnectedFarmers)}
          fullWidth
          type='number'
          label='How many farmers are connected with you'
          placeholder='How many farmers are connected with you'
        />
        <ErrorMessage name='apmcConnectedFarmers' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.apmcMajorCropsSelling}
          onChange={handleChange}
          onBlur={handleBlur}
          name='apmcMajorCropsSelling'
          error={Boolean(errors.apmcMajorCropsSelling && touched.apmcMajorCropsSelling)}
          fullWidth
          label='What are the major crops you are selling'
          placeholder='What are the major crops you are selling'
        />
        <ErrorMessage name='apmcMajorCropsSelling' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.districtFarmerComingSellProduct}
          onChange={handleChange}
          onBlur={handleBlur}
          name='districtFarmerComingSellProduct'
          error={Boolean(errors.districtFarmerComingSellProduct && touched.districtFarmerComingSellProduct)}
          fullWidth
          label='From which area of your districts farmers are coming to sell the products'
          placeholder='From which area of your districts farmers are coming to sell the products'
        />
        <ErrorMessage name='apmcMajorCropsSelling' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
    </>
  )
}

export default ApmcForm
