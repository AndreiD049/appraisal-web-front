const validItemTypes = [
  'Planned', 
  'Achieved', 
  'Training',
  'Training_Suggested',
  'SWOT_S',
  'SWOT_W',
  'SWOT_O',
  'SWOT_T'
];

const validItemStatuses = [
  'Active',
  'Finished',
  'InProgress'
];

export function Item(item) {
  this.id = item.id ? item.id : 0;
  this.type = item.type;
  this.status = item.status ? item.status : 'Active';
  this.content = item.content ? item.content : '';
  this.periodId = item.periodId;
  this.organizationId = item.organizationId ? item.organizationId : null;
  this.user = item.user;
  this.modifiedUser = item.modifiedUser ? item.modifiedUser : null;
  this.modifiedDate = item.modifiedDate ? item.modifiedDate : null;
  this.createdUser = item.createdUser ? item.createdUser : item.user;
  this.createdDate = item.createdDate ? item.createdDate : new Date();
}

export function validate(item) {
  if (validItemTypes.indexOf(item.type) === -1)
    throw new Error("Item type not valid: " + item.type);
  if (validItemStatuses.indexOf(item.status) === -1)
    throw new Error("Item status not valid: " + item.status);
  if (item.periodId === 0)
    throw new Error("Item periodId not valid: " + item.periodId);
  if (!item.user)
    throw new Error("Item user not valid: " + item.user);
}

export function validateId(item) {
  if (!item.id || item.id === 0)
    throw new Error("Item id not valid: " + item.type);
}

export default {
  Item,
  validate,
  validateId
};