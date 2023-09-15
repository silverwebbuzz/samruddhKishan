// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  setROLEID: (val: string | number) => void
  ROLEID: string | number
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, setROLEID, ROLEID } = props
  const { getRoles } = useSelector((state: any) => state?.rootReducer?.farmerReducer)

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search User'
          sx={{ mr: 4, mb: 2 }}
          onChange={e => handleFilter(e.target.value)}
        />

        <FormControl size='small' sx={{ mr: 4, mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='role'
            value={ROLEID}
            label='Role'
            onChange={(e: any) => {
              setROLEID(e?.target?.value)
            }}
          >
            {getRoles?.map((Item: any) => (
              <MenuItem key={Item?.id} value={Item?.id}>
                {Item?.roleType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            setROLEID(0)
            handleFilter('')
          }}
        >
          {' '}
          Clear
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
