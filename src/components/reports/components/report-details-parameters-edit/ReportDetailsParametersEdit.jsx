import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Delete } from '@material-ui/icons';
import {
  Button,
  Divider,
  IconButton,
  List, ListItem, ListItemSecondaryAction, MenuItem, TextField, Typography,
} from '@material-ui/core';
import ReportingService from '../../../../services/ReportingService';

const ReportDetailsParametersEdit = ({ template, params, handleUpdate }) => {
  const [possibleParams, setPossibleParams] = useState([]);
  const [newParam, setNewParam] = useState({
    name: '',
    defaultValue: '',
    path: '',
  });

  const handleChangeNewParam = (key) => (evt) => {
    const { value } = evt.target;
    setNewParam((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddParameter = () => {
    if (newParam.name === '' || newParam.path === '') return;
    handleUpdate((prev) => ({
      ...prev,
      parameters: prev.parameters.concat(newParam),
    }));
    setNewParam({
      name: '',
      defaultValue: '',
      path: '',
    });
  };

  const handleDeleteParameter = (path) => () => {
    handleUpdate((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((p) => p.path !== path),
    }));
  };

  const handleUpdateParameter = (path, key) => (evt) => {
    const { value } = evt.target;
    handleUpdate((prev) => ({
      ...prev,
      parameters: prev.parameters.map((p) => {
        if (p.path === path) {
          return {
            ...p,
            [key]: value,
          };
        }
        return p;
      }),
    }));
  };

  useEffect(() => {
    let mounted = true;
    async function run() {
      const resultParams = await ReportingService.getTempalteParameters(template.id);
      if (mounted) {
        setPossibleParams(resultParams);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [template.id]);

  return (
    <List dense className="owl fullWidth">
      {
      params.map((p) => (
        <>
          <ListItem>
            <div className="flexColumn owl">
              <TextField
                label="Name"
                variant="outlined"
                value={p.name}
                onChange={handleUpdateParameter(p.path, 'name')}
              />
              <TextField
                label="Default Value"
                variant="outlined"
                value={p.defaultValue}
                onChange={handleUpdateParameter(p.path, 'defaultValue')}
              />
              <TextField
                label="Path"
                variant="outlined"
                disabled
                value={p.path}
              />
            </div>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={handleDeleteParameter(p.path)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      ))
    }
      <ListItem className="flexColumn owl">
        <Typography variant="body1">Add new:</Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={newParam.name}
          onChange={handleChangeNewParam('name')}
        />
        <TextField
          label="Default value"
          variant="outlined"
          value={newParam.defaultValue}
          onChange={handleChangeNewParam('defaultValue')}
        />
        <TextField
          label="Parameter"
          variant="outlined"
          value={newParam.path}
          helperText="Select the path meant to be modified"
          onChange={handleChangeNewParam('path')}
          select
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {possibleParams.map((param) => param.paths.map((p) => (
            <MenuItem
              disabled={params.length && params.find((pr) => pr.path === `${param.name}.${p}`) !== -1}
              value={`${param.name}.${p}`}
            >
              {`${param.name}.${p}`}
            </MenuItem>
          )))}
        </TextField>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddParameter}
          disabled={!(newParam.name.length && newParam.path.length)}
        >
          Add
        </Button>
      </ListItem>
    </List>
  );
};

ReportDetailsParametersEdit.propTypes = {
  template: PropTypes.string.isRequired,
  params: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ReportDetailsParametersEdit;
