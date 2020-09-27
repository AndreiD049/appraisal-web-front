import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core';
import UserService from '../services/UserService';

const TeamMatesAutocomplete = ({ onUserSelect, ...props }) => {
    const [users, setUsers] = useState([]);

    if (!onUserSelect) {
        throw new Error("onUserSelect function was not provided");
    }

    useEffect(() => {
        async function run() {
            setUsers(await UserService.getUserTeamMembers());
        }
        run();
    }, []);

    const handleSelect = (event, value) => {
        onUserSelect(value);
    }

    const autocomplete = (
        <Autocomplete
            {...props}
            id="users-autocomplete"
            options={users}
            getOptionLabel={(option) => option.id}
            renderInput={(params) => <TextField {...params} label="Team-members" variant="outlined" />}
            onChange={handleSelect}
        />
    );

    return (
        autocomplete
    );
};

export default TeamMatesAutocomplete;