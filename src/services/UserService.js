import axios from 'axios';

const UserService = {
  getUserPath: (id) => `/api/users/user/${id}`,
  getUserOrganizationsPath: `/api/users/organizations`,
  getUserTeamMembersPath: `/api/users/team-members`,

  getUser: async function(id) {
    try {
      const response = await axios.get(this.getUserPath(id));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
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
      throw err;
    }
  },

  getUserTeamMembers: async function() {
    try {
      const response = await axios.get(this.getUserTeamMembersPath);
      return response.data;
    } catch (err) {
        throw err;
    }
  }, 
  
}
export default UserService;