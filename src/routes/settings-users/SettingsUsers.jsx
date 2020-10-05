import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../components/shared/material-table-utils';
import UserService from '../../services/UserService';
import AutocompleteChip from '../../components/shared/autocomplete-chip';
import GlobalContext from '../../services/GlobalContext';

const SettingsUsers = (props) => {
  const [data, setData] = useState([]);
  const global = useContext(GlobalContext);
  const optionsTeams = global.context.user && global.context.user.teams;
  const optionsOrganizations = global.context.user && global.context.user.organizations.map(o => o.name);

  const columns = [
    {
      title: 'id',
      field: 'id',
      editable: 'never',
    },
    {
      title: 'teams',
      field: 'teams',
      render: rowData => rowData.teams.join(', '),
      editComponent: props => (
        <AutocompleteChip
          multiple
          options={optionsTeams}
          data={props}
          defaultValue={props.value}
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
    }
  ];

  const editable = {
    onRowUpdate: (newData, oldData) =>
      new Promise(async (resolve, reject) => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        console.log(newData);
        setData(oldData => dataUpdate);
        // TODO: Add database sync
        resolve();
      }).catch(err => {
        console.error(err);
      }),
    onRowDelete: (oldData) => 
      new Promise((resolve, reject) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        // TODO: Add database sync
        resolve();
      }).catch(err => {
        console.error(err);
      })
  }

  /**
   * Retrieve the users list
   */
  useEffect(() => {
    async function run() {
      const users = await UserService.getUsers();
      setData(oldData => users);
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