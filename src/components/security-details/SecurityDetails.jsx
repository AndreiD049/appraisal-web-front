import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Tabs, Tab, Box,
} from '@material-ui/core';
import SecurityInfoProvider from './components/security-info-provider';
import SecurityDetailsRoleDisplay from './components/security-details-role-display';
import SecurityDetailsUserDisplay from './components/security-details-user-display';

const TabControl = ({ value, setValue }) => {
  const handleChange = (e, newVal) => {
    setValue(newVal);
  };
  return (
    <Box mt={2}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          mt={5}
        >
          <Tab label="Roles" />
          <Tab label="Users" />
        </Tabs>
      </AppBar>
    </Box>
  );
};

TabControl.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

function TabPanel({
  children, value, index,
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.shape({}).isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const SecurityDetails = () => {
  const [permissionCodes, setPermissionCodes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [userPermissions, setUserPermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTab, setSetlectedTab] = useState(0);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelectedRole((prev) => {
      if (prev === null && roles.length > 0) return roles[0];
      return prev;
    });
  }, [roles]);

  useEffect(() => {
    setSelectedUser((prev) => {
      if (prev === null && users.length > 0) return users[0];
      return prev;
    });
  }, [users]);

  return (
    <>
      <SecurityInfoProvider
        setLoaded={setLoaded}
        setPermissionCodes={setPermissionCodes}
        setRoles={setRoles}
        setUsers={setUsers}
        setRolePermissions={setRolePermissions}
        setUserPermissions={setUserPermissions}
      />
      {
        loaded
          ? (
            <>
              <TabControl value={selectedTab} setValue={setSetlectedTab} />
              <TabPanel value={selectedTab} index={0}>
                <SecurityDetailsRoleDisplay
                  codes={permissionCodes}
                  roles={roles}
                  rolePermissions={rolePermissions}
                  setRolePermissions={setRolePermissions}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <SecurityDetailsUserDisplay
                  codes={permissionCodes}
                  users={users}
                  userPermissions={userPermissions}
                  setUserPermissions={setUserPermissions}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </TabPanel>
            </>
          )
          : null
      }
    </>
  );
};

export default SecurityDetails;
