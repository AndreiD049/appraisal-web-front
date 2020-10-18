import { useEffect } from 'react'
import AuthorizationService from '../../../../services/AuthorizationService';
import UserService from '../../../../services/UserService';

const SecurityInfoProvider = ({setLoaded, setPermissionCodes, setRoles, setUsers, setRolePermissions, setUserPermissions,...props}) => {
  useEffect(() => {
    async function run() {
      // Get Permission Codes
      const codes = await AuthorizationService.getPermissionCodes();
      setPermissionCodes(codes.sort((a, b) => a.code < b.code ? -1 : 1));

      // get all roles
      const rolesInfo = await AuthorizationService.getRoles();
      setRoles(rolesInfo.sort((a, b) => a.name < b.name ? -1 : 1));

      // get all users
      const userInfo = await UserService.getUsers();
      setUsers(userInfo.sort((a, b) => a.username < b.username ? -1 : 1));

      // get All role permissions
      const roles = await AuthorizationService.getRolesSecurities();
      const rolesMap = {}
      roles.forEach(role => {
        rolesMap[role.reference.name] = {...rolesMap[role.reference.name], [role.code.code]: role};
      });
      setRolePermissions(rolesMap);

      // get my organization's user permission
      const userPermissions = await AuthorizationService.getOrganizationUsersSecurities();
      const userPermMap = {}
      userPermissions.forEach(user => {
        userPermMap[user.reference.username] = {...userPermMap[user.reference.username], [user.code.code]: user};
      })
      setUserPermissions(userPermMap);

      // Confirm information was loaded      
      setLoaded(true);
    }
    run();
  }, [
    setPermissionCodes, 
    setLoaded, 
    setRoles,
    setUsers,
    setRolePermissions,
    setUserPermissions
  ]);
  return null;
};

export default SecurityInfoProvider