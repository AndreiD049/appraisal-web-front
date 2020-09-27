import axios from 'axios';

const UserService = {
  getUserOrganizationsPath: `/api/users/organizations`,
  getUserTeamMembersPath: `/api/users/team-members`,

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
  }
}
export default UserService;