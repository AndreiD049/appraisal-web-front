/**
 * This file contains valious validation functions.
 * Function schema
 * @param {any} args - any arguments function might use
 * @returns {function(): {result: boolean, message: string}}
 */

const userExists = (user) => async () => ({
  result: Boolean(user),
  message: 'User doesn\'t exist.',
});

const userAuthorized = (context, code, grant) => async () => ({
  result: context.Authorize(code, grant),
  message: `Access denied. Code: ${code}, Grant: ${grant}`,
});

export default {
  userExists,
  userAuthorized,
};
