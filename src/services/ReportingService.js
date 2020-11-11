import axios from 'axios';
import NotificationService from './NotificationService';

const ReportingService = {
  postTemplatePath: '/api/reporting/templates',
  GenerateTemplatePath: '/api/reporting/template/generate',

  async createTemplate(formdata) {
    try {
      const response = await axios.post(this.postTemplatePath, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        NotificationService.notify({
          type: 'success',
          header: 'Created',
          content: 'Tempalte successfully created',
        });
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async generateTemplate(formdata) {
    try {
      const response = await axios.post(this.GenerateTemplatePath, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        NotificationService.notify({
          type: 'success',
          header: 'Generated',
          content: 'Tempalte successfully generated',
        });
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async downloadTemplate(path) {
    try {
      const response = await axios.get(this.GenerateTemplatePath, {
        params: {
          filepath: path,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

};

export default ReportingService;
