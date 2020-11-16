import appraisalValidators from './AppraisalValidators';
import userValidators from './UserValidators';
import generalValidators from './General';
import operators from './operators';

const {
  and, andSync, or, orSync, not, notSync, perform, performSync,
} = operators;

const validate = {
  ...appraisalValidators,
  ...userValidators,
  ...generalValidators,
};

export {
  and,
  andSync,
  or,
  orSync,
  not,
  notSync,
  perform,
  performSync,
  validate,
};
