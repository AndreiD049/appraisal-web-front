import axios from 'axios';
import NotificationService from './NotificationService';

const UserService = {
  getUsersPath: `/api/users`,
  updateUsersPath: (id) => `/api/users/${id}`,
  getUserPath: (id) => `/api/users/user/${id}`,
  getUserOrganizationsPath: `/api/users/organizations`,
  getUserTeamMembersPath: `/api/users/team-members`,

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
      const response = await axios.put(this.updateUsersPath(id), user);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("trhrow");
        throw new Error(`Server response: ${response.status} - ${response.statusText}\n${response.data.error}`);
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