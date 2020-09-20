import React from 'react';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%'
  }
}))

const AppraisalInput = ({item, idx, label, changeHandler, blurHandler, clickHandler}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.root}>
        <InputLabel htmlFor={`app-item-${item.type.toLowerCase()}-${idx}`}>{label}</InputLabel>
        <Input 
        id={`app-item-${item.type.toLowerCase()}-${idx}`} 
        value={item.content} 
        inputProps={{'data-index': idx}} 
        size='small'
        multiline
        // readOnly={item.status === "Finished" ? true : false}
        onChange={changeHandler} 
        onBlur={ blurHandler } 
        endAdornment={
          <InputAdornment position='end'>
            <IconButton tabIndex={-1} aria-label='delete appraisal item' onClick={clickHandler} data-index={idx}>
              <Delete />
            </IconButton>
          </InputAdornment>
        } />
    </FormControl>
  );
};

export default AppraisalInput;