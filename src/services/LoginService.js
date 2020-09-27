import axios from 'axios';

const LoginService = {
  currentUserPath: `/api/me`,
  getCurrentUser: async function() {
    try {
      const response = await axios.get(this.currentUserPath);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }
}

export default LoginService;