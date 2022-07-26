import { Response } from 'express';
import log from '../helpers/log.js';

import errorHandler from './errorHandler.js';

/**
 * Middleware to log errors
 * @param error
 * @param res
 */
export default function errorLogger(error: Error, res: Response) {
  log.error('SERVER ERROR', error.stack ? error.stack : error.toString());
  errorHandler(res);
}
