import { Checkbox, FormControlLabel, TableBody, TableCell, TableRow } from '@mui/material'

const AddRole = ({ getPermission, togglePermission, removeDuplicates, selectedCheckbox }: any) => {
  return (
    <TableBody>
      {getPermission?.map((i: any, index: number) => {
        const id = i?.id

        return (
          <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
            <TableCell
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: theme => `${theme.palette.text.primary} !important`
              }}
            >
              {i?.moduleName}
            </TableCell>
            <TableCell>
              <FormControlLabel
                // label='Access'
                control={
                  <Checkbox
                    size='small'
                    id={`${id}`}
                    onChange={() => togglePermission(`${id}`)}
                    checked={removeDuplicates(selectedCheckbox).includes(`${id}`)}
                  />
                }
              />
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AddRole
