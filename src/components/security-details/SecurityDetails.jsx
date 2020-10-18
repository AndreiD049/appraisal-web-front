import React, { useState } from 'react'
import SecurityInfoProvider from './components/security-info-provider';
import SecurityDetailsRoleDisplay from './components/security-details-role-display';
import { useEffect } from 'react';
import { AppBar, Tabs, Tab, TabP, Box } from '@material-ui/core';

const TabControl = ({value, setValue}) => {
  const handleChange = (e, newVal) => {
    setValue(newVal);
  }
  return (
    <Box mt={2}>
      <AppBar position='static' color='transparent' elevation={0}>
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
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const SecurityDetails = (props) => {
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
    setSelectedRole(prev => {
      if (prev === null && roles.length > 0)
        return roles[0];
      else 
        return prev;
    })
  }, [roles]);

  useEffect(() => {
    setSelectedUser(prev => {
      if (prev === null && users.length > 0)
        return users[0];
      else 
        return prev;
    })
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
        loaded ? 
        ( 
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
              <h1>Not implemented yet</h1>
            </TabPanel>
          </>
          ) :
        null
      }
    </>
  );
};

export default SecurityDetails