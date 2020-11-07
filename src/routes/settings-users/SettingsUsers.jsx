import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table';
import materialTableUtils from '../../utils/material-table-utils';
import UserService from '../../services/UserService';
import TeamService from '../../services/TeamService';
import GlobalContext from '../../services/GlobalContext';
import AuthorizationService from '../../services/AuthorizationService';
import TeamsEditComponent from './components/TeamsEditComponent';
import OrganizationEditComponent from './components/OrganizationEditComponent';
import RoleEditComponent from './components/RoleEditComponent';

const SettingsUsers = () => {
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
      render: (rowData) => rowData.teams.map((t) => t.name).join(', '),
      // eslint-disable-next-line react/prop-types
      editComponent: ({ rowData, onChange }) => (
        <TeamsEditComponent rowData={rowData} onChange={onChange} teams={teams} />
      ),
    },
    {
      title: 'Organizations',
      field: 'organizations',
      render: (rowData) => (rowData.organizations ? rowData.organizations.map((o) => o.name).join(', ') : null),
      customFilterAndSearch: (filterValue, rowData) => {
        const fl = filterValue.toLowerCase();
        return rowData
          .organizations
          .filter((o) => o.name.toLowerCase().indexOf(fl) !== -1).length > 0;
      },
      // eslint-disable-next-line react/prop-types
      editComponent: ({ rowData, onChange }) => (
        <OrganizationEditComponent rowData={rowData} onChange={onChange} global={global} />
      ),
    },
    {
      title: 'Role',
      field: 'role',
      render: (rowData) => rowData.role && rowData.role.name,
      // eslint-disable-next-line react/prop-types
      editComponent: ({ rowData, onChange }) => (
        <RoleEditComponent rowData={rowData} onChange={onChange} roles={roles} />
      ),
    },
  ];

  const editable = {
    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
      async function run() {
        try {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          let organization = oldData.organization || null;
          if (!oldData.organization && newData.organizations.length) {
            organization = newData.organizations[0].id;
          } else if (newData.organizations.length === 0) {
            organization = null;
          }
          const result = await UserService.updateUser(newData.id, {
            ...newData,
            teams: newData.teams.map((t) => t.id),
            organizations: newData.organizations.map((o) => o.id),
            organization,
          });
          dataUpdate[index] = result;
          setData(() => dataUpdate);
          resolve();
        } catch (err) {
          reject(err);
        }
      }
      run();
    }).catch((err) => {
      throw err;
    }),
  };

  /**
   * Retrieve the users list
   */
  useEffect(() => {
    async function run() {
      const [users, _teams, _roles] = await Promise.all(
        [
          UserService.getUsers(),
          TeamService.getTeams(),
          AuthorizationService.getRoles(),
        ],
      );
      setData(() => users);
      setTeams(() => _teams);
      setRoles(() => _roles);
    }
    run();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Users Settings</h1>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable
          icons={materialTableUtils.tableIcons}
          title="Users"
          columns={columns}
          data={data}
          options={{
            searchFieldAlignment: 'left',
          }}
          editable={editable}
        />
      </Grid>
    </Grid>
  );
};

export default SettingsUsers;
