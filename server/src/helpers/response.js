/* eslint-disable valid-jsdoc */

/**
 * Return successful response with status true and status code 200
 * @param {*} res
 * @param {*} msg
 * @param {*} data
 * @returns
 */
export function respondWithSuccess(res, msg, data = {}) {
  const response = {
    status: true,
    message: msg,
    data: data,
  };
  return res.status(200).json(response);
}

/**
 * Returns error response with status false and status code 500
 * @param {*} res
 * @returns
 */
export function respondWithError(res) {
  const response = {
    status: false,
    message: 'Internal server roor.',
  };
  return res.status(500).json(response);
}

/**
 * Returns not found error with status false and status code 404
 * @param {*} res
 * @param {*} msg
 */
export function respondWithNotFound(res, msg) {
  const response = {
    status: false,
    message: msg,
  };
  return res.status(404).json(response);
}
