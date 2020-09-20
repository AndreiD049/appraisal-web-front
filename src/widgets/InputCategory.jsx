import React from 'react';
import {makeStyles, Box, List, ListItem } from '@material-ui/core';
import AppraisalInput from '../components/AppraisalInput';

const useStyles = makeStyles({
    header: {
        textAlign: 'center'
    },
    border: {
        border: '1px solid black'
    },
    listItem: {
        justifyContent: 'center',
        padding: 0
    }
})

const InputCategory = ({ctx, items, min, label, handleChange, handleBlur, handleRemove, setFunc}) => {
  const classes = useStyles();
  return (
    <Box>
        <h3 className={classes.header}>{label}</h3>
        <List>
            {items.map((i, idx) => (
                <ListItem className={classes.listItem} key={idx}>
                    <AppraisalInput 
                        item={i} 
                        idx={idx} 
                        label={label} 
                        changeHandler={handleChange(items, setFunc, min, i.type)} 
                        blurHandler={handleBlur(items, setFunc, min, i.type)}
                        clickHandler={handleRemove(items, setFunc, min, i.type)}/>
                </ListItem>
            ))}
        </List>
    </Box>
  );
};

export default InputCategory;