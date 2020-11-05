import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../utils/material-table-utils';
import UserService from '../../services/UserService';
import TeamService from '../../services/TeamService';
import { Autocomplete } from '@material-ui/lab';
import GlobalContext from '../../services/GlobalContext';
import AuthorizationService from '../../services/AuthorizationService';

const SettingsUsers = (props) => {
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [roles, setRoles] = useState([]);
  const global = useContext(GlobalContext);

  const columns = [
    {
      title: 'Username',
      field: 'username',
      editable: 'never',
    },
    {
      title: 'Teams',
      field: 'teams',
      render: rowData => rowData.teams.map(t => t.name).join(', '),
      editComponent: props => (
        <Autocomplete
          multiple
          id="tags-standard"
          options={teams}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => {
            return option.name === value.name;
          }}
          value={props.rowData.teams}
          onChange={(e, newVal) => {
            props.onChange(newVal)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      )
    },
    {
      title: 'Organizations',
      field: 'organizations',
      render: rowData => rowData.organizations ? rowData.organizations.map(o => o.name).join(', '): console.log(data),
      customFilterAndSearch: (filterValue, rowData, columnDef) => {
        const fl = filterValue.toLowerCase();
        return rowData.organizations.filter(o => o.name.toLowerCase().indexOf(fl) !== -1).length > 0
      }, 
      editComponent: props => (
        <Autocomplete
          multiple
          id="tags-standard-organizations"
          options={global.user.organizations}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => {
            return option.name === value.name;
          }}
          value={props.rowData.organizations}
          onChange={(e, newVal) => {
            props.onChange(newVal)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Organizaions"
              placeholder="Organizations"
            />
          )}
        />
      )
    },
    {
      title: 'Role',
      field: 'role',
      render: rowData => rowData.role && rowData.role.name,
      editComponent: props => (
        <Autocomplete
          id="tags-standard-role"
          options={roles}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => {
            return option.name === value.name;
          }}
          value={props.rowData.role}
          onChange={(e, newVal) => {
            props.onChange(newVal)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Roles"
              placeholder="Roles"
            />
          )}
        />
      )
    }, 
  ];

  const editable = {
    onRowUpdate: (newData, oldData) =>
      new Promise(async (resolve, reject) => {
        try {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          const result = await UserService.updateUser(newData.id, {
            ...newData,
            teams: newData.teams.map(t => t.id),
            organizations: newData.organizations.map(o => o.id),
            organization: oldData.organization ||
              newData.organizations.length ? 
              newData.organizations[0].id : 
              null
          });
          console.log(oldData);
          dataUpdate[index] = result;
          setData(prev => dataUpdate);
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }).catch(err => {
        throw err;
      }),
  }

  /**
   * Retrieve the users list
   */
  useEffect(() => {
    async function run() {
      const [ users, teams, roles ] = await Promise.all(
        [
          UserService.getUsers(), 
          TeamService.getTeams(), 
          AuthorizationService.getRoles()
        ]);
      setData(oldData => users);
      setTeams(prev => teams);
      setRoles(prev => roles);
    }
    run();
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Users Settings</h1>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable 
          icons={tableIcons}
          title="Users"
          columns={columns}
          data={data}
          options={{
            searchFieldAlignment: 'left'
          }}
          editable={editable}
        />
      </Grid>
    </Grid>
  );
}

export default SettingsUsers;