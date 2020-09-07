import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  FormControl, 
  InputLabel, 
  Input, 
  FormGroup,
  Select,  
  MenuItem,
  Button
} from '@material-ui/core';
import { useState } from 'react';

const NewPeriodDialog = ({
    context, 
    open,
    handleClose,
    ...props
  }) => {

  const selectValues = [
    'Active',
    'Finished'
  ];
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const [status, setStatus] = useState(selectValues[0]);
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="new-period-dialog"
      >
      <DialogTitle id="new-period-dialog">Create new period</DialogTitle>
      <DialogContent>
        <form>
          <FormGroup >
            <FormControl color='primary' required={true}>
              <InputLabel htmlFor="new-period-name">Period name</InputLabel>
              <Input id='new-period-name' name='name' />
            </FormControl>
            <FormControl color='primary' required={true}>
              <InputLabel htmlFor="new-period-status">Status</InputLabel>
              <Select id='new-period-status' name='status' value={status} onChange={handleStatusChange}>
                {selectValues.map(e => (
                  <MenuItem key={e} value={e}>{e}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl color='primary' required={true}>
              <InputLabel htmlFor="new-period-organization">Organization</InputLabel>
              <Input id='new-period-organization' name='organization' />
            </FormControl>
            <FormControl style={{margin: 20}}>
              <Button type='submit' color='primary' variant='contained' >
                Save
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPeriodDialog;