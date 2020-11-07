import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const RoleEditComponent = ({ rowData, onChange, roles }) => (
  <Autocomplete
    id="tags-standard-role"
    options={roles}
    getOptionLabel={(option) => option.name}
    getOptionSelected={(option, value) => option.name === value.name}
    value={rowData.role}
    onChange={(e, newVal) => {
      onChange(newVal);
    }}
    renderInput={(params) => (
      <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        variant="standard"
        label="Roles"
        placeholder="Roles"
      />
    )}
  />
);

RoleEditComponent.propTypes = {
  rowData: PropTypes.shape({
    role: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RoleEditComponent;
