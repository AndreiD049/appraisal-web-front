/**
 * @param {Array.<function(): {result: boolean, message: string}>} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const and = (validations) => async () => {
  try {
    if (validations.length === 0) {
      throw new Error('No validations provided');
    }
    const results = await Promise.all(validations.map((v) => v()));
    if (results.every((v) => v.result)) {
      return results[0];
    }
    return results.find((v) => v.result === false);
  } catch (err) {
    return {
      result: false,
      message: err.message,
    };
  }
};

/**
 * @param {Array.<function(): {result: boolean, message: string}>} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const andSync = (validations) => () => {
  try {
    const l = validations.length;
    if (l === 0) {
      throw new Error('No validations provided');
    }
    let last;
    for (let i = 0; i < l; i += 1) {
      last = validations[i]();
      if (!last.result) break;
    }
    return last;
  } catch (err) {
    return {
      result: false,
      message: 'error',
    };
  }
};

/**
 * @param {Array.<function(): {result: boolean, message: string}>} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const or = (validations) => async () => {
  try {
    if (validations.length === 0) {
      throw new Error('No validations provided');
    }
    const results = await Promise.all(validations.map((v) => v()));
    if (results.some((v) => v.result)) {
      return results.find((v) => v.result);
    }
    return results[results.length - 1];
  } catch (err) {
    return {
      result: false,
      message: 'error',
    };
  }
};

/**
 * @param {Array.<function(): {result: boolean, message: string}>} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const orSync = (validations) => () => {
  try {
    const l = validations.length;
    if (l === 0) {
      throw new Error('No validations provided');
    }
    let last;
    for (let i = 0; i < l; i += 1) {
      last = validations[i]();
      if (last.result) break;
    }
    return last;
  } catch (err) {
    return {
      result: false,
      message: 'error',
    };
  }
};

/**
 * @param {function(): {result: boolean, message: string}} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const not = (validation) => async () => {
  try {
    const val = await validation();
    val.result = !val.result;
    val.message = `Not - ${val.message}`;
    return val;
  } catch (err) {
    return {
      result: false,
      message: 'error',
    };
  }
};

/**
 * @param {function(): {result: boolean, message: string}} validations
 * @return {function(): {result: boolean, message: string}} validations
 */
const notSync = (validation) => () => {
  try {
    const val = validation();
    val.result = !val.result;
    return val;
  } catch (err) {
    return {
      result: false,
      message: 'error',
    };
  }
};

/**
 *
 * @param {function(): {result: boolean, message: string}} validation
 * @param {boolean} throwExceptions
 * @returns {Promise<{result: boolean, message: string}>}
 */
const perform = async (validation, throwExceptions = true) => {
  const v = await validation();
  if (!v.result) {
    if (throwExceptions) {
      throw new Error(v.message);
    } else {
      return v;
    }
  } else {
    return v;
  }
};

/**
 *
 * @param {function(): {result: boolean, message: string}} validation
 * @param {boolean} throwExceptions
 * @returns {{ result: boolean, message: string }}
 */
const performSync = (validation, throwExceptions = true) => {
  const v = validation();
  if (!v.result) {
    if (throwExceptions) {
      throw new Error(v.message);
    } else {
      return v;
    }
  } else {
    return v;
  }
};

export default {
  and,
  andSync,
  or,
  orSync,
  not,
  notSync,
  perform,
  performSync,
};
