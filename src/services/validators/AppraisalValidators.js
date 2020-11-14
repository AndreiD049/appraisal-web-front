/* eslint-disable max-classes-per-file */
import BaseValidator from './BaseValidator';
import constants from '../../utils/constants';

class PeriodStatus extends BaseValidator {
  constructor(period, status) {
    super();
    this.period = period;
    this.status = status;
  }

  validate() {
    if (this.period.status && this.period.status !== this.status) {
      this.result.valid = false;
      this.result.error = `Period Status is not valid - ${this.period.status}`;
    }
    return this.advance(this.result);
  }
}

class ItemStatus extends BaseValidator {
  constructor(item, status) {
    super();
    this.item = item;
    this.status = status;
  }

  validate() {
    if (this.item.status && this.item.status !== this.status) {
      this.result.valid = false;
      this.result.error = `Item Status is not valid - ${this.item.status}`;
    }
    return this.advance(this.result);
  }
}

/**
 * Check whether period is not finished, and if user has access
 * to update items
 */
class CanUpdateItems extends BaseValidator {
  constructor(period, context, otherUser) {
    super();
    this.period = period;
    this.context = context;
    this.otherUser = otherUser;
  }

  validate() {
    if (this.otherUser) {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS_OTHER.code,
        constants.securities.APPRAISAL_DETAILS_OTHER.grants.update,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot update items';
    } else {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS.code,
        constants.securities.APPRAISAL_DETAILS.grants.update,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot update items';
    }
    return this.advance(this.result);
  }
}

class CanUpdateFinishedItems extends BaseValidator {
  constructor(period, context, otherUser) {
    super();
    this.period = period;
    this.context = context;
    this.otherUser = otherUser;
  }

  validate() {
    if (this.otherUser) {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS_OTHER.code,
        constants.securities.APPRAISAL_DETAILS_OTHER.grants.updateFinished,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot update finished items';
    } else {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS.code,
        constants.securities.APPRAISAL_DETAILS.grants.updateFinished,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot update finished items';
    }
    return this.advance(this.result);
  }
}

/**
 * Assumes user has access to update items
 * Checks are done only on item type and other User
 */
class ItemInputEnabled extends BaseValidator {
  constructor(item, otherUser) {
    super();
    this.item = item;
    this.otherUser = otherUser;
  }

  validate() {
    if (this.item.type === 'Training_Suggested' && !this.otherUser) {
      this.result = false;
      this.error = 'Cannot update Training Suggested items';
    }
    return this.advance(this.result);
  }
}

class CanDeleteItems extends BaseValidator {
  constructor(period, context, otherUser) {
    super();
    this.period = period;
    this.context = context;
    this.otherUser = otherUser;
  }

  validate() {
    if (this.otherUser) {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS_OTHER.code,
        constants.securities.APPRAISAL_DETAILS_OTHER.grants.delete,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot delete items';
    } else {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS.code,
        constants.securities.APPRAISAL_DETAILS.grants.delete,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot delete items';
    }
    return this.advance(this.result);
  }
}

class CanDeleteFinishedItems extends BaseValidator {
  constructor(period, context, otherUser) {
    super();
    this.period = period;
    this.context = context;
    this.otherUser = otherUser;
  }

  validate() {
    if (this.otherUser) {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS_OTHER.code,
        constants.securities.APPRAISAL_DETAILS_OTHER.grants.deleteFinished,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot delete finished items';
    } else {
      const valid = this.context.Authorize(
        constants.securities.APPRAISAL_DETAILS.code,
        constants.securities.APPRAISAL_DETAILS.grants.deleteFinished,
      );
      this.result.valid = valid;
      this.result.error = valid ? '' : 'Access denied. Cannot delete finished items';
    }
    return this.advance(this.result);
  }
}

class ItemIsRelated extends BaseValidator {
  constructor(item) {
    super();
    this.item = item;
  }

  validate() {
    if (!this.item.relatedItemId) {
      this.result.valid = false;
      this.result.error = 'Item is not related';
    }
    return this.advance(this.result);
  }
}

class ItemIsNotRelated extends BaseValidator {
  constructor(item) {
    super();
    this.item = item;
  }

  validate() {
    if (this.item.relatedItemId) {
      this.result.valid = false;
      this.result.error = 'Item is related';
    }
    return this.advance(this.result);
  }
}

export default {
  ItemStatus,
  PeriodStatus,
  CanUpdateItems,
  CanUpdateFinishedItems,
  CanDeleteItems,
  CanDeleteFinishedItems,
  ItemIsRelated,
  ItemIsNotRelated,
  ItemInputEnabled,
};
