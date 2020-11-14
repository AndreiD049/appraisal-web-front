/**
 * This file contains valious validation functions.
 * Function schema
 * @param {any} args - any arguments function might use
 * @returns {function(): {result: boolean, message: string}}
 */

/**
 * @param {any} obj
 * @returns {function(): {result: boolean, message: string}} validation result
 */
const isTruthy = (obj) => () => ({
  result: Boolean(obj),
  message: `${obj} is not true`,
});

export default {
  isTruthy,
};
