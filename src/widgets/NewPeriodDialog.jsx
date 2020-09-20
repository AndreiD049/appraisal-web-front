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
import AppraisalService from '../services/AppraisalService';

const NewPeriodDialog = ({
    ctx, 
    setCtx,
    open,
    handleClose,
    ...props
  }) => {

  const selectValues = [
    'Active',
    'Finished'
  ];
  const [name, setName] = useState('');
  const [status, setStatus] = useState(selectValues[0]);
  const [organizations, setOrganizations] = useState([]);
  const [org, setOrg] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleOrgChange = (e) => {
    setOrg(e.target.value);
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    e.persist();
    let result = await AppraisalService.addPeriod(ctx, { name, status, organizationId: org, createdUser: ctx.user.id });
    console.log(result);
  }

  const closeDecorator = (e) => {
    setStatus(selectValues[0]);
    setOrg('');
    handleClose(e);
  }

  // Fetch organizations
  useEffect(() => {
    async function getInfo() {
      setOrganizations(await UserService.getUserOrganizations(ctx));
    }
    getInfo();
  }, [ctx])

  return (
    <>
      <Dialog 
        open={open} 
        onClose={closeDecorator} 
        aria-labelledby="new-period-dialog"
        >
        <DialogTitle id="new-period-dialog">Create new period</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormGroup >
              <FormControl color='primary' required={true}>
                <InputLabel htmlFor="new-period-name">Period name</InputLabel>
                <Input id='new-period-name' name='name' value={name} onChange={handleNameChange}/>
              </FormControl>
              <FormControl color='primary' required={true}>
                <InputLabel htmlFor="new-period-status">Status</InputLabel>
                <Select id='new-period-status' name='status' value={status} onChange={handleStatusChange}>
                  {
                    selectValues ?
                    selectValues.map(e => (
                      <MenuItem key={e} value={e}>{e}</MenuItem>
                    )) :
                    null
                  }
                </Select>
              </FormControl>
              <FormControl color='primary' required={true}>
                <InputLabel htmlFor="new-period-organization">Organization</InputLabel>
                <Select id='new-period-organizatrion' name='organization' value={org} onChange={handleOrgChange}>
                  {organizations ? 
                    organizations.map(e => (
                      <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                    )) : 
                    null
                  }
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
      </Dialog> : 
    </>
  );
};

export default NewPeriodDialog;