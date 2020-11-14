/**
 * This file contains valious validation functions.
 * Function schema
 * @param {any} args - any arguments function might use
 * @returns {function(): {result: boolean, message: string}}
 */
import operators from './operators';
import userVal from './UserValidators';
import generalVal from './General';
import constants from '../../utils/constants';

const {
  andSync, orSync, notSync, performSync,
} = operators;
const AD = constants.securities.APPRAISAL_DETAILS;
const ADO = constants.securities.APPRAISAL_DETAILS_OTHER;

const periodExists = (period) => () => ({
  result: Boolean(period),
  message: 'Period doesn\'t exist.',
});

const itemExists = (item) => () => ({
  result: Boolean(item),
  message: 'Item doesn\'t exist.',
});

const periodStatus = (period, status) => () => ({
  result: Boolean(period.status === status),
  message: `Period '${period.name}' status is not valid. Expected (${status})`,
});

const itemStatus = (item, status) => () => ({
  result: Boolean(item.status === status),
  message: `Item '${item.content}' status is not valid. Expected '${status}'.`,
});

const itemType = (item, type) => () => ({
  result: Boolean(item.type === type),
  message: `Item '${item.content}' type is not valid. Expected '${type}'.`,
});

const itemSameUser = (item, user) => () => ({
  result: Boolean(String(item.user) === String(user.id)),
  message: `Item '${item.content}'s user is not the same as '${user.username}'`,
});

const itemRelated = (item) => () => ({
  result: Boolean(item.relatedItemId),
  message: 'Item is related.',
});

const itemContentNotNull = (item) => () => ({
  result: Boolean(item.content.trim().length > 0),
  message: 'Item content is empty',
});

const canInsert = (context, period, userId) => () => {
  const result = performSync(orSync([
    andSync([
      periodStatus(period, 'Active'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.create),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.create),
        ]),
      ]),
    ]),
    andSync([
      periodStatus(period, 'Finished'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.createFinished),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.createFinished),
        ]),
      ]),
    ]),
  ]), false);
  return result;
};

const canUpdate = (context, period, userId) => () => {
  const result = performSync(orSync([
    andSync([
      periodStatus(period, 'Active'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.update),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.update),
        ]),
      ]),
    ]),
    andSync([
      periodStatus(period, 'Finished'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.updateFinished),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.updateFinished),
        ]),
      ]),
    ]),
  ]), false);
  return result;
};

const canDelete = (context, period, userId) => () => {
  const result = performSync(orSync([
    andSync([
      periodStatus(period, 'Active'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.delete),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.delete),
        ]),
      ]),
    ]),
    andSync([
      periodStatus(period, 'Finished'),
      orSync([
        andSync([
          notSync(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.deleteFinished),
        ]),
        andSync([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.deleteFinished),
        ]),
      ]),
    ]),
  ]), false);
  return result;
};

export default {
  periodExists,
  itemExists,
  periodStatus,
  itemStatus,
  itemType,
  itemSameUser,
  itemRelated,
  itemContentNotNull,
  canInsert,
  canUpdate,
  canDelete,
};
