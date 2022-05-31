import {formatISO9075} from 'date-fns';

import log from '../helpers/log.js';

/**
 * Middleware to log all requests with a timestamp
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function requestLogger(req, res, next) {
  log.http(req.method + ' REQUEST', `${formatISO9075(Date.now())} ${req.path}`);
  next();
};

