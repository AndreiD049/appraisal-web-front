import axios from 'axios';
import config from '../config';

const LoginService = {
  currentUserPath: `${config.serverURL}/api/me`,
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