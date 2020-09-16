import axios from 'axios';

const LoginService = {
  currentUserPath: `/api/me`,
  getCurrentUser: async function(context) {
    try {
      const response = await axios.get(this.currentUserPath);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      context.showAlert('error', 'Error fetching user info');
      return null;
    }
  }
}

export default LoginService;