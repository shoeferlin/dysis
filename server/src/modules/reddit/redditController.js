import log from '../../helpers/log.js';
import {body} from 'express-validator';

import {
  respondWithSuccessAndData,
  respondWithNotFound,
  respondWithError,
} from '../../helpers/response.js';
import {getRandomInt} from '../../helpers/utils.js';
import validate from '../../helpers/validate.js';
import redditModel from './redditModel.js';

/**
 * Controller class managing incoming requests to the respective model
 * each controller function is actually an array of functions to be plugged into
 * the router with validations by express-validator before as well as
 * the validate helper to check for detected validation errors
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export default class RedditController {
  static getOne = [
    // Validations using express-validator
    body('identifier')
        .exists().withMessage('Value is required')
        .isString().withMessage('Value needs to be string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const identifier = req.body.identifier;
      const data = await redditModel
          .findOne({identifier: identifier}).exec();
      if (data !== null) {
        respondWithSuccessAndData(
            res,
            data,
        );
      } else {
        respondWithNotFound(res);
      }
    },
  ];

  /**
   * Creates an reddit object
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static createOne = [
    body('identifier')
        .exists().withMessage('Value is required')
        .isString().withMessage('Value needs to be string'),
    validate,
    async (req, res) => {
      const identifier = req.body.identifier;
      try {
        const data = await redditModel.create(
            {
              identifier: identifier,
              liwcAnalytical: getRandomInt(99),
            },
        );
        respondWithSuccessAndData(
            res,
            data,
            'Created new element',
        );
      } catch (err) {
        if (err?.code === 11000) {
          respondWithError(res, 'Identifier already exists');
        } else {
          log.error('DATABASE ERROR', err);
          respondWithError(res);
        }
      }
    },
  ];
}
