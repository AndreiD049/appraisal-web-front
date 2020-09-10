import axios from 'axios';
import config from '../config';
import { Item, validate, validateId } from '../models/AppraisalItemModel';

const AppraisalService = {
  getPeriodsPath: `${config.serverURL}/api/periods`,
  getItemsPath: (id) => `${config.serverURL}/api/periods/${id}`,
  getItemPath: (periodId, itemId) => `${config.serverURL}/api/periods/${periodId}/items/${itemId}`,
  addItemPath: (periodId) => `${config.serverURL}/api/periods/${periodId}/items`,
  updateItemPath: (periodId, itemId) => `${config.serverURL}/api/periods/${periodId}/items/${itemId}`,
  deleteItemPath: (periodId, itemId) => `${config.serverURL}/api/periods/${periodId}/items/${itemId}`,

  getPeriods: async function(context) {
    try {
      const response = await axios.get(this.getPeriodsPath);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.getPeriods: Error fetching periods: ${err.message}`);
      throw err;
    }
  },

  getItems: async function(context) {
    try {
      const response = await axios.get(this.getItemsPath(context.periodId));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.getItems: Error fetching periods: ${err.message}`);
      throw err;
    }
  }, 

  getItem: async function(context, itemId) {
    try {
      const response = await axios.get(this.getItemPath(context.periodId, itemId));
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.getItem: Error fetching periods: ${err.message}`);
      throw err;
    }
  }, 

  addItem: async function(context, item) {
    try {
      validate(item);
      const response = await axios.post(this.addItemPath(context.periodId), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.addItem: Error fetching periods: ${err.message}`);
      throw err;
    }
  },
  
  updateItem: async function(context, item) {
    try {
      validate(item);
      validateId(item);
      const response = await axios.put(this.updateItemPath(context.periodId, item.id), {...item});
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.updateItem: Error fetching periods: ${err.message}`);
      throw err;
    }
  },

  deleteItem: async function(context, itemId) {
    try {
      const response = await axios.delete(this.deleteItemPath(context.periodId, itemId));
      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(`Server response: ${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      context.showAlert('error', `AppraisalService.deleteItem: Error fetching periods: ${err.message}`);
      throw err;
    }
  },

  blankItem: function(context, type, status = 'Active') {
    return new Item ({
      type: type,
      status: status,
      periodId: context.periodId,
      user: context.user ? context.user.id : null,
    });
  },
  
  /*
   * Given the items, minimum amount and their type:
   * this function should return back the adjusted items collection:
   * 1. if number of items < min => add blank items to fullfil the list
   * 2. if number of items > min and blank items > 1 => remove blank items until
   * blank items = 1 or number of items = min
   */
  normalizeSet: function(context, items, min, type) {
    const copy = items.slice();
    // array of em,pty indexes ex: [1, 4, 5]
    const empty = copy.map((i, idx) => idx).filter(i => copy[i].content === '');
    if (empty.length === 0) {
      copy.push(this.blankItem(context, type));
    }
    let dif = min - copy.length;
    while (dif > 0) {
      copy.push(this.blankItem(context, type));
      dif--;
    }
    return copy;
  },

  // Get the element index
  getIndex: function(context, el) {
    const attr = el.getAttribute('data-index');
    if (attr === '' || isNaN(Number(attr)))
      throw new Error(`Attribute is not valid: ${attr}`);
    else 
      return Number(attr);
  },

  addItemToSet: async function(context, items, item, idx) {
    const copy = items.slice();
    try {
      copy[idx] = await this.addItem(context, item);
    } catch (err) {
      copy[idx].content = '';
    }
    return copy;
  },

  deleteItemFromSet: async function(context, items, item, idx) {
    const copy = items.slice();
    try {
      await this.deleteItem(context, item.id);
      copy.splice(idx, 1);
    } catch (err) {
      copy[idx] = await this.getItem(context, item.id);
    }
    return copy;
  },

  updateItemInSet: async function(context, items, item, idx) {
    const copy = items.slice();
    try {
      const response = await this.updateItem(context, item);
      copy[idx] = response;
    } catch (err) {
      copy[idx] = await this.getItem(context, item.id);
    }
    return copy;
  }
}

export default AppraisalService;