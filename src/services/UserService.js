import axios from 'axios';
import NotificationService from './NotificationService';

const UserService = {
  getUsersPath: '/api/users',
  updateUsersPath: (id) => `/api/users/${id}`,
  getUserPath: (id) => `/api/users/user/${id}`,
  getUserOrganizationsPath: '/api/users/organizations',
  getUserTeamMembersPath: '/api/users/team-members',
  getSettingsUsersPath: '/api/settings/users',
  putSettingsUsersPath: (id) => `/api/settings/users/${id}`,

  normalizeUser(user) {
    const u = user;
    if (u.role && u.role.id) {
      u.role = u.role.id;
    }
    if (u.organization && u.organization.id) {
      u.organization = u.organization.id;
    }
    u.organizations = u.organizations.map((o) => o.id || o);
    return u;
  },

  async getUsers() {
    try {
      const response = await axios.get(this.getUsersPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getSettingsUsers() {
    try {
      const response = await axios.get(this.getSettingsUsersPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getUser(id) {
    try {
      const response = await axios.get(this.getUserPath(id));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateUser(id, user) {
    try {
      const response = await axios.put(this.updateUsersPath(id), this.normalizeUser(user));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}\n`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateSettingsUser(id, user) {
    try {
      const response = await axios.put(this.putSettingsUsersPath(id), this.normalizeUser(user));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}\n`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getUserOrganizations() {
    try {
      const response = await axios.get(this.getUserOrganizationsPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getUserTeamMembers() {
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

};
export default UserService;
