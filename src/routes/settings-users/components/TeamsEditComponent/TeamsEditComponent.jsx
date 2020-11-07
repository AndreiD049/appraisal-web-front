import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const TeamsEditComponent = ({ rowData, onChange, teams }) => (
  <Autocomplete
    multiple
    id="tags-standard"
    options={teams}
    getOptionLabel={(option) => option.name}
    getOptionSelected={(option, value) => option.name === value.name}
    value={rowData.teams}
    onChange={(e, newVal) => {
      onChange(newVal);
    }}
    renderInput={(params) => (
      <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        variant="standard"
        label="Multiple values"
        placeholder="Favorites"
      />
    )}
  />
);

TeamsEditComponent.propTypes = {
  rowData: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TeamsEditComponent;
