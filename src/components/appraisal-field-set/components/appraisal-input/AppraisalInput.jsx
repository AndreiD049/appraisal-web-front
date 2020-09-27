import React, { useState } from 'react';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%'
  }
}))

const AppraisalInput = ({item, idx, label, changeHandler, blurHandler, removeHandler}) => {
  const classes = useStyles();
  const [value, setValue] = useState({...item});
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setValue({...item});
  }, [item]);

  const handleBlur = async (e) => {
    e.persist();
    await blurHandler(value, idx, modified);
    setModified(false);
  }

  const handleChange = (e) => {
    setValue({...item, content: e.target.value});
    changeHandler({...value, content: e.target.value}, idx, !modified);
    setModified(true);
  }

  const handleDelete = async (e) => {
    e.persist();
    setValue({...item, content: ''});
    await removeHandler(value, idx);
    setModified(false);
  }

  return (
    <FormControl className={classes.root}>
        <InputLabel htmlFor={`app-item-${item.type.toLowerCase()}-${idx}`}>{label}</InputLabel>
        <Input 
        id={`app-item-${item.type.toLowerCase()}-${idx}`} 
        value={value.content} 
        size='small'
        multiline
        // readOnly={item.status === "Finished" ? true : false}
        onChange={handleChange} 
        onBlur={ handleBlur } 
        endAdornment={
          <InputAdornment position='end'>
            <IconButton tabIndex={-1} aria-label='delete appraisal item' onClick={handleDelete}>
              <Delete />
            </IconButton>
          </InputAdornment>
        } />
    </FormControl>
  );
};

export default AppraisalInput;