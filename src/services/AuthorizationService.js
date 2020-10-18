import axios from 'axios';
import NotificationService from './NotificationService';

const AuthorizationService = {
  getRolesPath: '/api/security/roles',
  getCurrentUserSecuritiesPath: '/api/security/permissions/me',
  getUserSecuritiesPath: (id) => `/api/security/permissions/user/${id}`,
  getOrganizationUsersSecuritiesPath: '/api/security/permissions/organization',
  getRolesSecuritiesPath: '/api/security/permissions/role',
  getPermissionCodesPath: '/api/security/permissions/code',
  addPermissionPath: '/api/security/permissions',
  updatePermissionPath: (id) => `/api/security/permissions/${id}`,
  deletePermissionPath: (id) => `/api/security/permissions/${id}`,

  getRoles: async function() {
    try {
      const result = await axios.get(this.getRolesPath);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getSecurities: async function() {
    try {
      const result = await axios.get(this.getCurrentUserSecuritiesPath);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getUserSecurities: async function(id) {
    try {
      const result = await axios.get(this.getUserSecuritiesPath(id));
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getOrganizationUsersSecurities: async function() {
    try {
      const result = await axios.get(this.getOrganizationUsersSecuritiesPath);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getRolesSecurities: async function() {
    try {
      const result = await axios.get(this.getRolesSecuritiesPath);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getPermissionCodes: async function() {
    try {
      const result = await axios.get(this.getPermissionCodesPath);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  addPermission: async function(permission) {
    try {
      const result = await axios.post(this.addPermissionPath, permission);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  updatePermission: async function(id, permission) {
    try {
      const result = await axios.put(this.updatePermissionPath(id), permission);
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  deletePermission: async function(id) {
    try {
      const result = await axios.delete(this.deletePermissionPath(id));
      if (result.status === 200) {
        return result.data;
      } else {
        return null;
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  // this function is meant to be injected in the context in order to have access to 'this'
  Authorize: function(code, grant) {
    try {
      if (this.security) {
        const codes = this.security.map(el => el.code);
        const index = codes.indexOf(code);
        if (index !== -1) {
          return this.security[index].grants.indexOf(grant) !== -1;
        }
      }
      return false;
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      return false;
    }
  },
}

export default AuthorizationService;