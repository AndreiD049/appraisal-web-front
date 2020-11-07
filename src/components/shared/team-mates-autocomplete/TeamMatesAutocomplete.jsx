import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import UserService from '../../../services/UserService';

const TeamMatesAutocomplete = ({ onUserSelect, defaultValue, className }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function run() {
      setUsers(await UserService.getUserTeamMembers());
    }
    run();
  }, []);

  const handleSelect = (event, value) => {
    if (onUserSelect) { onUserSelect(value); }
  };

  const autocomplete = (
    <Autocomplete
      defaultValue={defaultValue}
      className={className}
      id="users-autocomplete"
      options={users}
      getOptionLabel={(option) => option.username}
      getOptionSelected={(option, value) => value && option.id === value.id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField {...params} label="Team-members" variant="outlined" />}
      onChange={handleSelect}
    />
  );

  return (
    autocomplete
  );
};

export default TeamMatesAutocomplete;
