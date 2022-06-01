/**
 * Return successful response with status true and status code 204
 * @param {Request} res
 * @param {String} msg optional
 * @return {Response}
 */
export function respondWithSuccess(
    res,
    msg = 'Request successfull',
) {
  const response = {
    status: true,
    message: msg,
  };
  return res.status(204).json(response);
};

/**
 * Return successful response with data and status true and status code 200
 * @param {Response} res
 * @param {Object} data
 * @param {String} msg optional
 * @return {Response}
 */
export function respondWithSuccessAndData(
    res,
    data,
    msg = 'Request successfull with data response',
) {
  const response = {
    status: true,
    message: msg,
    data: data,
  };
  return res.status(200).json(response);
}

/**
 * Returns not found error with status false and status code 404
 * @param {Request} res
 * @param {String} msg optional
 * @return {Response}
 */
export function respondWithNotFound(res, msg = 'Resource not found') {
  const response = {
    status: false,
    message: msg,
  };
  return res.status(404).json(response);
};

/**
 * Returns validation error response with status false and status code 400
 * @param {Response} res
 * @param {Object} validationErrors
 * @param {String} msg optional
 * @return {Response}
 */
export function respondWithValidationError(
    res,
    validationErrors,
    msg = 'Request not valid',
) {
  const response = {
    status: false,
    message: msg,
    validationErrors,
  };
  return res.status(400).json(response);
};

/**
 * Returns error response with status false and status code 500
 * @param {Response} res
 * @param {String} msg optional
 * @return {Response}
 */
export function respondWithError(res, msg = 'Internal server error') {
  const response = {
    status: false,
    message: msg,
  };
  return res.status(500).json(response);
};

/**
 * @param {Response} res
 * @param {String} msg
 * @return {Response}
 */
export function respondWithUnauthorized(res, msg = 'Unauthorized request') {
  const response = {
    status: false,
    message: msg,
  };
  return res.status(401).json(response);
};
