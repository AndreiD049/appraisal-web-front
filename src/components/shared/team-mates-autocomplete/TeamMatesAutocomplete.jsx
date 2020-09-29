import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core';
import UserService from '../../../services/UserService';

const TeamMatesAutocomplete = ({ onUserSelect, defValue, ...props }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function run() {
            setUsers(await UserService.getUserTeamMembers());
        }
        run();
    }, []);

    const handleSelect = (event, value) => {
        if (onUserSelect)
            onUserSelect(value);
    }

    const autocomplete = (
        <Autocomplete
            {...props}
            id="users-autocomplete"
            options={users}
            getOptionLabel={(option) => option.id}
            getOptionSelected={(option, value) => value && option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Team-members" variant="outlined" />}
            onChange={handleSelect}
            value={users.length ? defValue : null}
        />
    );

    return (
        autocomplete
    );
};

export default TeamMatesAutocomplete;