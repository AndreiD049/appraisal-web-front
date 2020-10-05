import React from 'react'
import  { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const AutocompleteChip = ({options, data, ...props}) => {

  return (
    <>
      <Autocomplete
        options={options}
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
    </>
  );
};

export default AutocompleteChip;