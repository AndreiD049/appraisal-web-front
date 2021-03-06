import axios from 'axios';
import NotificationService from './NotificationService';

const LoginService = {
  currentUserPath: '/api/me',
  async getCurrentUser() {
    try {
      const response = await axios.get(this.currentUserPath);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: `Not logged in. ${(err.response.data && err.response.data.error) || err.message}`,
      });
      return null;
    }
  },
};

export default LoginService;
