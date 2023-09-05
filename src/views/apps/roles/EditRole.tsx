import { Checkbox, FormControlLabel, TableBody, TableCell, TableRow } from '@mui/material'

const EditRole = ({ togglePermission, removeDuplicates, getPermission, selectedCheckbox }: any) => {
  return (
    <TableBody>
      {getPermission?.map((I: any, Index: number) => {
        const ID = I?.id
        return (
          <TableRow key={Index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
            <TableCell
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: theme => `${theme.palette.text.primary} !important`
              }}
            >
              {I?.moduleName}
            </TableCell>
            <TableCell>
              <FormControlLabel
                // label='Access'
                control={
                  <Checkbox
                    size='small'
                    id={`${ID}`}
                    onChange={() => togglePermission(`${ID}`)}
                    //@ts-ignore
                    // checked={checkedCheckbox(ID)}
                    checked={removeDuplicates(selectedCheckbox).includes(`${ID}`)}
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

export default EditRole
