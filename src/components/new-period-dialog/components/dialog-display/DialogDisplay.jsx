import React, { useState, useContext } from 'react';
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
import GlobalContext from '../../../../services/GlobalContext';

const DialogDisplay = ({
    open,
    selectValues,
    handleSubmit,
    handleClose,
    ...props
}) => {
  const global = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [status, setStatus] = useState(selectValues[0]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

	const handleSubmitWrapper = async (e) => {
    e.persist();
    e.preventDefault();
		await handleSubmit(name, status, global.user.organization.id);
	}

  const handleCloseWrapper = (e) => {
    setStatus(selectValues[0]);
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
              <FormControl style={{margin: 20}}>
                <Button type='submit' color='primary' variant='contained' >
                  Save
                </Button>
              </FormControl>
            </FormGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );

};

export default DialogDisplay;