import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const OrganizationEditComponent = ({ rowData, onChange, global }) => (
  <Autocomplete
    multiple
    id="tags-standard-organizations"
    options={global.user.organizations}
    getOptionLabel={(option) => option.name}
    getOptionSelected={(option, value) => option.name === value.name}
    value={rowData.organizations}
    onChange={(e, newVal) => {
      onChange(newVal);
    }}
    renderInput={(params) => (
      <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        variant="standard"
        label="Organizaions"
        placeholder="Organizations"
      />
    )}
  />
);

OrganizationEditComponent.propTypes = {
  rowData: PropTypes.shape({
    organizations: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  global: PropTypes.shape({
    user: PropTypes.shape({
      organizations: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export default OrganizationEditComponent;
