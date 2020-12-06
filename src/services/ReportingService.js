import axios from 'axios';
import { downloadBlob } from 'download.js';
import NotificationService from './NotificationService';

const ReportingService = {
  notify(type, header, content) {
    NotificationService.notify({ type, header, content });
  },
  /**
   * Templates
   */
  templatesPath: '/api/reporting/templates',
  templatePath: (id) => `/api/reporting/templates/${id}`,
  templateDownloadPath: (id) => `/api/reporting/templates/${id}/download`,
  templateParametersPath: (id) => `/api/reporting/templates/${id}/parameters`,
  generateTemplatePath: '/api/reporting/templates/generate',
  templateSamplePath: '/api/reporting/templates/sample',

  async getTemplates() {
    try {
      const response = await axios.get(this.templatesPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getTemplate(id) {
    try {
      const response = await axios.get(this.templatePath(id));
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
      const response = await axios.post(this.templatesPath, formdata, {
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

  async updateTemplate(id, update) {
    try {
      const response = await axios.put(this.templatePath(id), update);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async downloadTemplate(id, filename) {
    try {
      const response = await axios.post(this.templateDownloadPath(id), null, {
        responseType: 'blob',
      });
      if (response.status === 200) {
        await downloadBlob(filename, response.data);
      }
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async getTempalteParameters(id) {
    try {
      const response = await axios.get(this.templateParametersPath(id));
      if (response.status === 200) {
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
      const response = await axios.post(this.generateTemplatePath, formdata, {
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
      const response = await axios.post(this.templateSamplePath, { aggregation });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  /**
   * Reports
   */
  reportPath: (id) => `/api/reporting/reports/${id}`,
  postReportGeneratePath: (id) => `/api/reporting/reports/${id}/generate`,
  reportsPath: '/api/reporting/reports',

  async getReports() {
    try {
      const response = await axios.get(this.reportsPath);
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
      const response = await axios.get(this.reportPath(id));
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
      const result = await axios.post(this.reportsPath, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return result.data;
    } catch (err) {
      this.notify('error', 'Error', (err.response && err.response.data && err.response.data.error));
      throw err;
    }
  },

  async updateReport(id, update) {
    try {
      const result = await axios.put(this.reportPath(id), update);
      return result.data;
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
};

export default ReportingService;
