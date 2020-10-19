import axios from 'axios';
import NotificationService from './NotificationService';

const UserService = {
  getUsersPath: `/api/users`,
  updateUsersPath: (id) => `/api/users/${id}`,
  getUserPath: (id) => `/api/users/user/${id}`,
  getUserOrganizationsPath: `/api/users/organizations`,
  getUserTeamMembersPath: `/api/users/team-members`,

  normalizeUser: function(user) {
    if (user.role && user.role.id) {
      user.role = user.role.id
    };
    if (user.organization && user.organization.id) {
      user.organization = user.organization.id
    };
    user.organizations = user.organizations.map(o => o.id || o)
    return user;
  },

  getUsers: async function() {
    try {
      const response = await axios.get(this.getUsersPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch(err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getUser: async function(id) {
    try {
      const response = await axios.get(this.getUserPath(id));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
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

  updateUser: async function(id, user) {
    try {
      const response = await axios.put(this.updateUsersPath(id), this.normalizeUser(user));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}\n`);
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

  getUserOrganizations: async function() {
    try {
      const response = await axios.get(this.getUserOrganizationsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
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

  getUserTeamMembers: async function() {
    try {
      const response = await axios.get(this.getUserTeamMembersPath);
      return response.data;
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  }, 
  
}
export default UserService;