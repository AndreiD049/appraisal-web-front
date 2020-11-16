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
  and, or, not, perform,
} = operators;
const AD = constants.securities.APPRAISAL_DETAILS;
const ADO = constants.securities.APPRAISAL_DETAILS_OTHER;

const periodExists = (period) => async () => ({
  result: Boolean(period),
  message: 'Period doesn\'t exist.',
});

const itemExists = (item) => async () => ({
  result: Boolean(item),
  message: 'Item doesn\'t exist.',
});

const periodStatus = (period, status) => async () => ({
  result: Boolean(period.status === status),
  message: `Period '${period.name}' status is not valid. Expected (${status})`,
});

const itemStatus = (item, status) => async () => ({
  result: Boolean(item.status === status),
  message: `Item '${item.content}' status is not valid. Expected '${status}'.`,
});

const itemType = (item, type) => async () => ({
  result: Boolean(item.type === type),
  message: `Item '${item.content}' type is not valid. Expected '${type}'.`,
});

const itemSameUser = (item, user) => async () => ({
  result: Boolean(String(item.user) === String(user.id)),
  message: `Item '${item.content}'s user is not the same as '${user.username}'`,
});

const itemRelated = (item) => async () => ({
  result: Boolean(item.relatedItemId),
  message: 'Item is related.',
});

const itemContentNotNull = (item) => async () => ({
  result: Boolean(item.content.trim().length > 0),
  message: 'Item content is empty',
});

const canInsert = (context, period, userId) => async () => {
  const result = perform(or([
    and([
      periodStatus(period, 'Active'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.create),
        ]),
        and([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.create),
        ]),
      ]),
    ]),
    and([
      periodStatus(period, 'Finished'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.createFinished),
        ]),
        and([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.createFinished),
        ]),
      ]),
    ]),
  ]), false);
  return result;
};

const canUpdate = (context, period, userId) => async () => {
  const result = perform(or([
    and([
      periodStatus(period, 'Active'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.update),
        ]),
        and([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.update),
        ]),
      ]),
    ]),
    and([
      periodStatus(period, 'Finished'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.updateFinished),
        ]),
        and([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.updateFinished),
        ]),
      ]),
    ]),
  ]), false);
  return result;
};

const canDelete = (context, period, userId) => async () => {
  const result = await perform(or([
    and([
      periodStatus(period, 'Active'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.delete),
        ]),
        and([
          generalVal.isTruthy(userId),
          userVal.userAuthorized(context, ADO.code, ADO.grants.delete),
        ]),
      ]),
    ]),
    and([
      periodStatus(period, 'Finished'),
      or([
        and([
          not(generalVal.isTruthy(userId)),
          userVal.userAuthorized(context, AD.code, AD.grants.deleteFinished),
        ]),
        and([
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
