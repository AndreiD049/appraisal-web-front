import axios from 'axios';

const UserService = {
  getUserOrganizationsPath: `/api/users/organizations`,

  getUserOrganizations: async function(context) {
    try {
      const response = await axios.get(this.getUserOrganizationsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `UserService.getUserOrganizations: ${err.message}`);
    }
  }
}
export default UserService;