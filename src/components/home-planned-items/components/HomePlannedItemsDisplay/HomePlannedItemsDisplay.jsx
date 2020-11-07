import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Checkbox,
  Grid,
  FormControlLabel,
  Box,
  TextField,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import {
  Clear,
} from '@material-ui/icons';

import clsx from 'clsx';
import useStyles from './styles';
import AppraisalService from '../../../../services/AppraisalService';

const HomePlannedItemsDisplay = ({ items, setItems }) => {
  const classes = useStyles();
  const [newItemVal, setNewItemVal] = useState('');

  const handleInputChange = (e) => {
    setNewItemVal(e.target.value);
  };

  const setType = async (item, type) => {
    const result = await AppraisalService.updateItem({ ...item, type });
    setItems((prev) => {
      const copy = { ...item, type: result.type };
      return prev.map((i) => (i.id === item.id ? copy : i));
    });
  };

  const checkboxChangeHandler = (item) => (e) => {
    if (e.target.checked) {
      setType(item, 'Achieved');
    } else {
      setType(item, 'Planned');
    }
  };

  const addItem = async (content) => {
    if (content !== '') {
      const item = {
        content,
        createdDate: new Date(),
        modifiedDate: new Date(),
        status: 'Active',
        type: 'Planned',
        periodId: null,
        relatedItemId: null,
      };
      const result = await AppraisalService.addOrphan(item);
      setItems((prev) => prev.concat(result));
      setNewItemVal('');
    }
  };

  const removeItem = async (item) => {
    await AppraisalService.deleteItem(item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <Box border={1} borderColor="secondary.main" borderRadius={3} p={3}>
      <List>
        {
          items.map((item) => (
            <ListItem dense>
              <FormControlLabel
                className={clsx({
                  [classes.itemAchievedText]: item.type === 'Achieved',
                })}
                control={<Checkbox name={item.content} checked={item.type === 'Achieved'} onChange={checkboxChangeHandler(item)} />}
                label={item.content}
              />
              <ListItemSecondaryAction>
                <IconButton
                  disabled={item.relatedItemId !== null}
                  onClick={() => removeItem(item)}
                >
                  <Clear />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <Grid container className={classes.grid}>
        <Grid item xs={6}>
          <TextField className={classes.addInput} variant="filled" size="small" label="Add New" color="secondary" value={newItemVal} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" disabled={newItemVal === ''} onClick={() => addItem(newItemVal)}>Add</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

HomePlannedItemsDisplay.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setItems: PropTypes.func.isRequired,
};

export default HomePlannedItemsDisplay;
