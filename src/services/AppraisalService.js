import axios from 'axios';
import { Item, validate, validateId } from '../models/AppraisalItemModel';
import NotificationService from './NotificationService';

const AppraisalService = {
  getPeriodsPath: `/api/periods`,
  addPeriodsPath: `/api/periods`,
  getItemsPath: (id) => `/api/periods/${id}`,
  getUserItemsPath: (id, userId) => `/api/periods/${id}/users/${userId}`,
  getItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  addItemPath: (periodId) => `/api/periods/${periodId}/items`,
  addUserItemPath: (periodId, userId) => `/api/periods/${periodId}/users/${userId}/items`,
  updateItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  updateUserItemPath: (periodId, userId, itemId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}`,
  deleteItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  deleteUserItemPath: (periodId, userId, itemId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}`,
  finishPeriodPath: (periodId) => `/api/periods/${periodId}/finish`,
  updateItemTypePath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}/change-type`,
  updateUserItemTypePath: (periodId, itemId, userId) => `/api/periods/${periodId}/users/${userId}/items/${itemId}/change-type`,

  getPeriods: async function() {
    try {
      const response = await axios.get(this.getPeriodsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getItems: async function(periodId) {
    try {
      const response = await axios.get(this.getItemsPath(periodId));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  }, 

  getUserItems: async function(periodId, userId) {
    try {
      const response = await axios.get(this.getUserItemsPath(periodId, userId));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  getItem: async function(periodId, itemId) {
    try {
      const response = await axios.get(this.getItemPath(periodId, itemId));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  }, 

  addItem: async function(periodId, item) {
    try {
      validate(item);
      const response = await axios.post(this.addItemPath(periodId), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  addUserItem: async function(periodId, userId, item) {
    try {
      validate(item);
      const response = await axios.post(this.addUserItemPath(periodId, userId), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  updateItem: async function(periodId, item) {
    try {
      validate(item);
      validateId(item);
      const response = await axios.put(this.updateItemPath(periodId, item.id), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  }, 
  
  updateItemType: async function(periodId, item) {
    try {
      validate(item);
      validateId(item);
      const response = await axios.post(this.updateItemTypePath(periodId, item.id), {type: item.type});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  updateUserItem: async function(periodId, userId, item) {
    try {
      validate(item);
      validateId(item);
      const response = await axios.put(this.updateUserItemPath(periodId, userId, item.id), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  updateUserItemType: async function(periodId, userId, item) {
    try {
      validate(item);
      validateId(item);
      const response = await axios.post(this.updateUserItemTypePath(periodId, item.id, userId), {type: item.type});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  deleteItem: async function(periodId, itemId) {
    try {
      const response = await axios.delete(this.deleteItemPath(periodId, itemId));
      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  deleteUserItem: async function(periodId, userId, itemId) {
    try {
      const response = await axios.delete(this.deleteUserItemPath(periodId, userId, itemId));
      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  addPeriod: async function(body) {
    try {
      const response = await axios.post(this.addPeriodsPath, body);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  finishPeriod: async function(periodId) {
    try {
      const response = await axios.post(this.finishPeriodPath(periodId));
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      NotificationService.notify({
        type: 'error',
        header: 'Error',
        content: (err.response.data && err.response.data.error) || err.message,
      });
      throw err;
    }
  },

  blankItem: function(periodId, user, type, status = 'Active') {
    return new Item ({
      type: type,
      status: status,
      periodId: periodId,
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
  normalizeSet: function(periodId, user, items, min, type, period) {
    const copy = items.slice().filter(i => i.user !== null);
    if ((period && period.status !== 'Active') || !user) {
      return copy
    }
    // array of empty indexes ex: [1, 4, 5]
    const empty = copy.map((i, idx) => idx).filter(i => copy[i].content === '');
    if (empty.length === 0) {
      copy.push(this.blankItem(periodId, user, type));
    }
    let dif = min - copy.length;
    while (dif > 0) {
      copy.push(this.blankItem(periodId, user, type));
      dif--;
    }
    return copy;
  },

  addItemToSet: async function(periodId, item) {
    try {
      const result = await this.addItem(periodId, item);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: null,
        error: err
      };
    }
  },

  addUserItemToSet: async function(periodId, userId, item) {
    try {
      const result = await this.addUserItem(periodId, userId, item);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: null,
        error: err
      };
    }
  },

  deleteItemFromSet: async function(periodId, item) {
    try {
      const result = await this.deleteItem(periodId, item.id);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },

  deleteUserItemFromSet: async function(periodId, userId, item) {
    try {
      const result = await this.deleteUserItem(periodId, userId, item.id);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err,
      };
    }
  },

  updateItemInSet: async function(periodId, item) {
    try {
      const result = await this.updateItem(periodId, item);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err
      };
    }
  },

  updateUserItemInSet: async function(periodId, userId, item) {
    try {
      const result = await this.updateUserItem(periodId, userId, item);
      return {
        value: result,
        error: null
      };
    } catch (err) {
      return {
        value: await this.getItem(periodId, item.id),
        error: err
      };
    }
  },
}

export default AppraisalService;