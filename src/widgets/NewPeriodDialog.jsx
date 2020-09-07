import React, { useState, useEffect } from 'react';
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
import UserService from '../services/UserService';

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
  const [status, setStatus] = useState(selectValues[0]);
  const [organizations, setOrganizations] = useState([]);
  const [org, setOrg] = useState('');

  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleOrgChange = (e) => {
    setOrg(e.target.value);
  }

  const closeDecorator = (e) => {
    setStatus(selectValues[0]);
    setOrg('');
    handleClose(e);
  }

  // Fetch organizations
  useEffect(() => {
    async function getInfo() {
      setOrganizations(await UserService.getUserOrganizations());
    }
    getInfo();
  }, [])

  return (
    <Dialog 
      open={open} 
      onClose={closeDecorator} 
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
              <Select id='new-period-organizatrion' name='organization' value={org} onChange={handleOrgChange}>
                {organizations.map(e => (
                  <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                ))}
              </Select>
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