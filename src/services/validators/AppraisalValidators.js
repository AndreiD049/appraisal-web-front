import BaseValidator from './BaseValidator';

/**
 * Check whether period is not finished, and if user has access
 * to update items
 */
class ValidateCanUpdateItems extends BaseValidator {
  constructor(period, context) {
    super();
    this.period = period;
    this.user = user;
  }

  async validate() {

  }
}