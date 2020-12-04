import axios from 'axios';
import NotificationService from './NotificationService';

const ReportingService = {
  getTempaltesPath: '/api/reporting/templates',
  getReportPath: (id) => `/api/reporting/reports/${id}`,
  postReportGeneratePath: (id) => `/api/reporting/reports/${id}/generate`,
  getReportsPath: '/api/reporting/reports',
  getTemplateParametersPath: (id) => `/api/reporting/templates/${id}/parameters`,
  postTemplatePath: '/api/reporting/templates',
  GenerateTemplatePath: '/api/reporting/templates/generate',
  postGetSamplePath: '/api/reporting/templates/sample',
  postReportPath: '/api/reporting/reports',

  notify(type, header, content) {
    NotificationService.notify({ type, header, content });
  },

  async getTemplates() {
    try {
      const response = await axios.get(this.getTempaltesPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getTempalteParameters(id) {
    try {
      const response = await axios.get(this.getTemplateParametersPath(id));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

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
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async generateTemplate(formdata) {
    try {
      const response = await axios.post(this.GenerateTemplatePath, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
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
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getSample(aggregation) {
    try {
      const response = await axios.post(this.postGetSamplePath, { aggregation });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
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
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getReport(id) {
    try {
      const response = await axios.get(this.getReportPath(id));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async generateReport(id, params) {
    try {
      const response = await axios.post(this.postReportGeneratePath(id), params, {
        responseType: 'blob',
      });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getReports() {
    try {
      const response = await axios.get(this.getReportsPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async addReport(formData) {
    try {
      const result = await axios.post(this.postReportPath, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return result;
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

};

export default ReportingService;
