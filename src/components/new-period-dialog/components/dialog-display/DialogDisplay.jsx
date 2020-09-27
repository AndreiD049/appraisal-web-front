import React, { useState } from 'react';
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

const DialogDisplay = ({
    open,
    organizations,
    selectValues,
    handleSubmit,
    handleClose,
    ...props
}) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(selectValues[0]);
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

	const handleSubmitWrapper = async (e) => {
		e.persist();
		await handleSubmit(name, status, org);
	}

  const handleCloseWrapper = (e) => {
    setStatus(selectValues[0]);
    setOrg('');
    handleClose(e);
  }

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleCloseWrapper} 
        aria-labelledby="new-period-dialog"
        >
        <DialogTitle id="new-period-dialog">Create new period</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitWrapper}>
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

export default DialogDisplay;