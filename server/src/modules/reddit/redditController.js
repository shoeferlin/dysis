import log from '../../helpers/log.js';
import {body, query} from 'express-validator';

import {
  respondWithSuccessAndData,
  respondWithErrorNotFound,
  respondWithError,
  respondWithSuccess,
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
  /**
   * Takes multiple identifiers in a post body and sends array of results
   * (array can be empty if no results are found)
   * Creates an reddit object
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static get = [
    // Validations using express-validator
    body('identifiers')
        .exists().withMessage('identifiers in request body required')
        .isArray().withMessage('identifiers must be an array'),
    body('identifiers.*')
        .isString().withMessage('identifier must be of type string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const identifiers = req.body.identifiers;
      const data = await redditModel.find({identifier: identifiers});
      if (data !== null) {
        respondWithSuccessAndData(
            res,
            data,
        );
      } else {
        respondWithNotErrorNotFound(res);
      }
    },
  ];

  /**
   * Gets one reddit instance
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static getOne = [
    // Validations using express-validator
    query('identifier')
        .exists().withMessage('Value is required')
        .isString().withMessage('Value needs to be string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const identifier = req.query.identifier;
      const data = await redditModel
          .findOne({identifier: identifier}).exec();
      if (data !== null) {
        respondWithSuccessAndData(
            res,
            data,
        );
      } else {
        respondWithSuccessAndData(
            res,
            data,
            'No information for given identifier',
        );
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
              liwcEmotionalTone: getRandomInt(99),
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
