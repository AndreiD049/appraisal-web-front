import axios from 'axios';
import { Item } from '../models/AppraisalItemModel';
import NotificationService from './NotificationService';
import {
  and, perform, validate,
} from './validators';

const AppraisalService = {
  getPeriodsPath: '/api/periods',
  addPeriodsPath: '/api/periods',
  getItemsPath: (id) => `/api/periods/${id}`,
  getUserItemsPath: (id, userId) => `/api/periods/${id}/users/${userId}`,
  toggleLockPeriodPath: (id, userId) => `/api/periods/${id}/users/${userId}/toggle-lock`,
  getItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  getOrphansPath: '/api/appraisal-items',
  addItemPath: '/api/appraisal-items',
  updateItemPath: (id) => `/api/appraisal-items/${id}`,
  deleteItemPath: (id) => `/api/appraisal-items/${id}`,
  addItemToPeriodPath: (periodId) => `/api/periods/${periodId}/items`,
  addUserItemPath: (periodId, userId) => `/api/periods/${periodId}/users/${userId}/items`,
  updateItemInPeriodPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  updateUserItemPath: (periodId, userId, itemId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}`,
  deleteItemFromPeriodPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  deleteUserItemPath: (periodId, userId, itemId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}`,
  finishPeriodPath: (periodId) => `/api/periods/${periodId}/finish`,
  updateItemTypePath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}/change-type`,
  updateUserItemTypePath: (periodId, userId, itemId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}/change-type`,

  async getPeriods() {
    try {
      const response = await axios.get(this.getPeriodsPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getItems(periodId) {
    try {
      const response = await axios.get(this.getItemsPath(periodId));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getOrphans() {
    try {
      const response = await axios.get(this.getOrphansPath);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getUserItems(periodId, userId) {
    try {
      const response = await axios.get(this.getUserItemsPath(periodId, userId));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async getItem(periodId, itemId) {
    try {
      const response = await axios.get(this.getItemPath(periodId, itemId));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async addItem(periodId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.post(this.addItemToPeriodPath(periodId), { ...item });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async addOrphan(item) {
    try {
      const response = await axios.post(this.addItemPath, item);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async addUserItem(periodId, userId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.post(this.addUserItemPath(periodId, userId), { ...item });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateItemInPeriod(periodId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
        validate.isTruthy(item.periodId),
      ]);
      await perform(validations);
      const response = await axios.put(this.updateItemInPeriodPath(periodId, item.id), { ...item });
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateItem(item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.put(this.updateItemPath(item.id), item);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateUserItem(periodId, userId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.put(
        this.updateUserItemPath(periodId, userId, item.id), { ...item },
      );
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateItemType(periodId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.post(
        this.updateItemTypePath(periodId, item.id), { type: item.type },
      );
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async updateUserItemType(periodId, userId, item) {
    try {
      const validations = and([
        validate.itemContentNotNull(item),
        validate.isTruthy(item.user),
      ]);
      await perform(validations);
      const response = await axios.post(
        this.updateUserItemTypePath(periodId, userId, item.id), { type: item.type },
      );
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async deleteItemFromPeriod(periodId, itemId) {
    try {
      const response = await axios.delete(this.deleteItemFromPeriodPath(periodId, itemId));
      if (response.status === 204) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async deleteItem(itemId) {
    try {
      const response = await axios.delete(this.deleteItemPath(itemId));
      if (response.status === 204) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async deleteUserItem(periodId, userId, itemId) {
    try {
      const response = await axios.delete(this.deleteUserItemPath(periodId, userId, itemId));
      if (response.status === 204) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async addPeriod(body) {
    try {
      const response = await axios.post(this.addPeriodsPath, body);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  async finishPeriod(periodId) {
    try {
      const response = await axios.post(this.finishPeriodPath(periodId));
      if (response.status === 200) {
        return true;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  /**
   *
   * @param {String} periodId
   * @param {String} userId
   * @returns {any} the updated period
   */
  async toggleLockPeriod(periodId, userId) {
    try {
      if (!userId) throw new Error('User is unknown');
      const response = await axios.post(this.toggleLockPeriodPath(periodId, userId));
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`Server response: ${response.status} - ${response.statusText}`);
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  blankItem(periodId, user, type, status = 'Active') {
    return new Item({
      type,
      status,
      periodId,
      user: user ? user.id : null,
    });
  },

  /*
   * Given the items, minimum amount and their type:
   * this function should return back the adjusted items collection:
   * 1. if number of items < min => add blank items to fullfil the list
   * 2. if number of items > min and blank items > 1 => remove blank items until
   * blank items = 1 or number of items = min
   */
  normalizeSet(periodId, user, items, min, type) {
    const copy = items.slice().filter((i) => i.user !== null);
    if (!user) {
      return copy;
    } if (type === 'Feedback' && items.length > 0) {
      return copy;
    }
    // array of empty indexes ex: [1, 4, 5]
    const empty = copy.map((i, idx) => idx).filter((i) => copy[i].content === '');
    if (empty.length === 0) {
      copy.push(this.blankItem(periodId, user, type));
    }
    let dif = min - copy.length;
    while (dif > 0) {
      copy.push(this.blankItem(periodId, user, type));
      dif -= 1;
    }
    return copy;
  },

  async addItemToSet(periodId, item) {
    try {
      const result = await this.addItem(periodId, item);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: null,
        error: err,
      };
    }
  },

  async addUserItemToSet(periodId, userId, item) {
    try {
      const result = await this.addUserItem(periodId, userId, item);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: null,
        error: err,
      };
    }
  },

  async deleteItemFromSet(periodId, item) {
    try {
      const result = await this.deleteItemFromPeriod(periodId, item.id);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },

  async deleteUserItemFromSet(periodId, userId, item) {
    try {
      const result = await this.deleteUserItem(periodId, userId, item.id);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },

  async updateItemInSet(periodId, item) {
    try {
      const result = await this.updateItemInPeriod(periodId, item);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },

  async updateUserItemInSet(periodId, userId, item) {
    try {
      const result = await this.updateUserItem(periodId, userId, item);
      return {
        value: result,
        error: null,
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },
};

export default AppraisalService;
