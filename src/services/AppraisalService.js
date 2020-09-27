import axios from 'axios';
import { Item, validate, validateId } from '../models/AppraisalItemModel';

const AppraisalService = {
  getPeriodsPath: `/api/periods`,
  addPeriodsPath: `/api/periods`,
  getItemsPath: (id) => `/api/periods/${id}`,
  getItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  addItemPath: (periodId) => `/api/periods/${periodId}/items`,
  updateItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  deleteItemPath: (periodId, itemId) => `/api/periods/${periodId}/items/${itemId}`,
  finishPeriodPath: (periodId) => `/api/periods/${periodId}/finish`,

  getPeriods: async function() {
    try {
      const response = await axios.get(this.getPeriodsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
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
    // array of em,pty indexes ex: [1, 4, 5]
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

  // Get the element index
  getIndex: function(el) {
    const attr = el.getAttribute('data-index');
    if (attr === '' || isNaN(Number(attr)))
      throw new Error(`Attribute is not valid: ${attr}`);
    else 
      return Number(attr);
  },

  addItemToSet: async function(periodId, item) {
    try {
      const result = await this.addItem(periodId, item);
      return {
        value: result,
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  },

  deleteItemFromSet: async function(periodId, item) {
    try {
      const result = await this.deleteItem(periodId, item.id);
      return {
        value: result,
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  },

  updateItemInSet: async function(periodId, item) {
    try {
      const result = await this.updateItem(periodId, item);
      return {
        value: result,
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  }
}

export default AppraisalService;