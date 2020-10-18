import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../utils/material-table-utils';
import UserService from '../../services/UserService';
import TeamService from '../../services/TeamService';
import { Autocomplete } from '@material-ui/lab';
import GlobalContext from '../../services/GlobalContext';

const SettingsUsers = (props) => {
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const global = useContext(GlobalContext);

  const columns = [
    {
      title: 'username',
      field: 'username',
      editable: 'never',
    },
    {
      title: 'teams',
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
      title: 'organizations',
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
          options={global.context.user.organizations}
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
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      )
    }
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
          });
          dataUpdate[index] = result;
          setData(oldData => dataUpdate);
          resolve();
        } catch (err) {
          reject(err);
        }
      }).catch(err => {
        throw err;
      }),
    // onRowDelete: (oldData) => 
    //   new Promise((resolve, reject) => {
    //     const dataDelete = [...data];
    //     const index = oldData.tableData.id;
    //     dataDelete.splice(index, 1);
    //     setData([...dataDelete]);
    //     // TODO: Add database sync
    //     resolve();
    //   }).catch(err => {
    //     console.error(err);
      // })
  }

  /**
   * Retrieve the users list
   */
  useEffect(() => {
    async function run() {
      const users = await UserService.getUsers();
      const teams = await TeamService.getTeams();
      setData(oldData => users);
      setTeams(prev => teams);
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