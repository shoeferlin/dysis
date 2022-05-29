import {formatISO9075} from 'date-fns';

import log from '../helpers/log.js';

/**
 * Logs all requests in middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function requestLogger(req, res, next) {
  log.debug(formatISO9075(Date.now()));
  log.http(req.method, `${formatISO9075(Date.now())} ${req.path}`);
  next();
}

export default requestLogger();
