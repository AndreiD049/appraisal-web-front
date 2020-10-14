import axios from 'axios';
import NotificationService from './NotificationService';

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
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: err.message,
      });
      return null;
    }
  }
}

export default LoginService;