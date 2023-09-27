import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip
} from '@mui/material'
import { ErrorMessage } from 'formik'

const CentersForm = ({
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
  resetForm,
  size
}: any) => {
  return (
    <>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerName}
          onChange={handleChange}
          onBlur={handleBlur}
          name='centerName'
          error={Boolean(errors.centerName && touched.centerName)}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          label='Name of the center '
          placeholder='Center Name'
        />
        <ErrorMessage name='centerName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormControl fullWidth size={size ? size : 'medium'}>
          <InputLabel id='demo-simple-select-label'>Center registration under company registration date</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='centerRegisterUnderCompanyDate'
            value={values?.centerRegisterUnderCompanyDate}
            label='Center registration under company registration date'
            onChange={handleChange}
          >
            <MenuItem value={'PVT LTD '}>PVT LTD </MenuItem>
            <MenuItem value={'CO-OP'}>CO-OP</MenuItem>
            <MenuItem value={'PROP'}>PROP</MenuItem>
            <MenuItem value={'PARTNERSHIP'}>PARTNERSHIP</MenuItem>
            <MenuItem value={'FPO'}>FPO</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.firstName}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='firstName'
          error={Boolean(errors.firstName && touched.firstName)}
          fullWidth
          label='Name of key person'
          placeholder='Name of key person'
        />
        <ErrorMessage name='centerKeyPerson' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.phone}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='phone'
          type='number'
          error={Boolean(errors.phone && touched.phone)}
          fullWidth
          label='Center phone no'
          placeholder='Center phone no'
        />
        <ErrorMessage name='phone' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.email}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='email'
          type='email'
          error={Boolean(errors.email && touched.email)}
          fullWidth
          label='Center email'
          placeholder='Center email'
        />
        <ErrorMessage name='email' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.password}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
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
          value={values?.centerHandlingPersonName}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerHandlingPersonName'
          error={Boolean(errors.centerHandlingPersonName && touched.centerHandlingPersonName)}
          fullWidth
          label='Name of handling person'
          placeholder='Name of handling person'
        />
        <ErrorMessage name='centerHandlingPersonName' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormControl size={size ? size : 'medium'} fullWidth>
          <InputLabel id='demo-simple-select-label'>State</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='state'
            value={STATE}
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
              name='centerDistrict'
              disabled={STATE?.length <= 0}
              value={district && district}
              label='district'
              onChange={e => {
                setFieldValue('centerDistrict', e?.target?.value)
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
          disableFocusListener={!(pincode?.length <= 0)}
          disableHoverListener={!(pincode?.length <= 0)}
          disableTouchListener={!(pincode?.length <= 0)}
        >
          <FormControl fullWidth size={size ? size : 'medium'}>
            <InputLabel id='demo-simple-select-label'>Taluka</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='centerTaluka'
              disabled={pincode?.length <= 0}
              value={taluka}
              label='Taluka'
              onChange={e => {
                setFieldValue('centerTaluka', e?.target?.value)
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
        <FormControl fullWidth size={size ? size : 'medium'}>
          <InputLabel shrink htmlFor='auth-login-v2-password'>
            Turnover of center
          </InputLabel>
          <OutlinedInput
            label='Turnover of center'
            onChange={handleChange}
            onBlur={handleBlur}
            notched
            value={values?.centerTurnover}
            name='centerTurnover'
            type={'number'}
            endAdornment={
              <InputAdornment position='end'>
                <Box>Rs.</Box>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerMemberFarmer}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          type='number'
          name='centerMemberFarmer'
          error={Boolean(errors.centerMemberFarmer && touched.centerMemberFarmer)}
          fullWidth
          label='How many farmers are members'
          placeholder='How many farmers are members'
        />
        <ErrorMessage name='centerMemberFarmer' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth size={size ? size : 'medium'}>
          <InputLabel shrink htmlFor='auth-login-v2-password'>
            Total milk collection per day{' '}
          </InputLabel>
          <OutlinedInput
            label='Total  milk collection per day'
            onChange={handleChange}
            onBlur={handleBlur}
            notched
            value={values?.centerPerDayMilkCollection}
            name='centerPerDayMilkCollection'
            type={'number'}
            endAdornment={
              <InputAdornment position='end'>
                <Box>Ltr.</Box>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth size={size ? size : 'medium'}>
          <InputLabel
            sx={{
              color: 'black',
              '&.Mui-focused': {
                color: 'black' // Set the label color when focused
              }
            }}
            shrink
            htmlFor='auth-login-v2-password'
          >
            Milk collection storage capacity
          </InputLabel>
          <OutlinedInput
            label='Milk collection storage capacity'
            onChange={handleChange}
            onBlur={handleBlur}
            notched
            value={values?.centerMilkStorageCapacity}
            name='centerMilkStorageCapacity'
            type={'number'}
            endAdornment={
              <InputAdornment position='end'>
                <Box>Ltr.</Box>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerSellingMilkFor}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerSellingMilkFor'
          error={Boolean(errors.centerSellingMilkFor && touched.centerSellingMilkFor)}
          fullWidth
          label='To whom they are selling the milk'
          placeholder='To whom they are selling the milk'
        />
        <ErrorMessage name='centerSellingMilkFor' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerOtherCompetitors}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerOtherCompetitors'
          error={Boolean(errors.centerOtherCompetitors && touched.centerOtherCompetitors)}
          fullWidth
          label='Who are other competitors'
          placeholder='Who are other competitors'
        />
        <ErrorMessage name='centerOtherCompetitors' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerPaymentCycle}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerPaymentCycle'
          error={Boolean(errors.centerPaymentCycle && touched.centerPaymentCycle)}
          fullWidth
          label='What is the payment cycle'
          placeholder='What is payment cycle'
        />
        <ErrorMessage name='centerPaymentCycle' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerOtherFacltyByMilkAgency}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerOtherFacltyByMilkAgency'
          error={Boolean(errors.centerOtherFacltyByMilkAgency && touched.centerOtherFacltyByMilkAgency)}
          fullWidth
          label='Other faclity provided by milk collection agency'
          placeholder='Other faclity provided by milk collection agency'
        />
        <ErrorMessage name='centerPaymentCycle' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerFarmarPaymentProcess}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerFarmarPaymentProcess'
          error={Boolean(errors.centerFarmarPaymentProcess && touched.centerOtherFacltyByMilkAgency)}
          fullWidth
          label='How you make payment to farmers'
          placeholder='How you make payment to farmers'
        />
        <ErrorMessage name='centerFarmarPaymentProcess' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerMembersOnBoard}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerMembersOnBoard'
          error={Boolean(errors.centerMembersOnBoard && touched.centerMembersOnBoard)}
          fullWidth
          label='If CO-OP how many members on board'
          placeholder='If CO-OP how many members on board'
        />
        <ErrorMessage name='centerMembersOnBoard' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerCurrentHurdeles}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerCurrentHurdeles'
          error={Boolean(errors.centerCurrentHurdeles && touched.centerCurrentHurdeles)}
          fullWidth
          label='What are the hurdeles you are facing now'
          placeholder='What are the hurdeles you are facing now'
        />
        <ErrorMessage name='centerCurrentHurdeles' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerNeededFacultys}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerNeededFacultys'
          error={Boolean(errors.centerNeededFacultys && touched.centerNeededFacultys)}
          fullWidth
          label='What are the faclity you require to grow'
          placeholder='What are the faclity you require to grow'
        />
        <ErrorMessage name='centerNeededFacultys' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          size={size ? size : 'medium'}
          value={values?.centerAllFinancialAudits}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          onBlur={handleBlur}
          name='centerAllFinancialAudits'
          error={Boolean(errors.centerAllFinancialAudits && touched.centerAllFinancialAudits)}
          fullWidth
          label='Have all financial audits filed regularly'
          placeholder='Have all financial audits filed regularly'
        />
        <ErrorMessage name='centerAllFinancialAudits' render={msg => <div style={{ color: 'red' }}>{msg}</div>} />
      </Grid>
    </>
  )
}

export default CentersForm
