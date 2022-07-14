/* eslint-disable require-jsdoc */

import {body} from 'express-validator';
import {Request, Response} from 'express';
import participantModel from './participantModel.js';

import validate from '../helpers/validate.js';
import {respondWithError, respondWithSuccess, respondWithSuccessAndData} from '../helpers/response.js';
import { is } from 'date-fns/locale';


export default class TrackingRouter {
  /**
   * Takes multiple identifiers in a post body and sends array of results
   * (array can be empty if no results are found)
   * Creates an reddit object
   * @param res response instance
   * @param res response instance
   */
  static create = [
    // Validations using express-validator
    body('participantName')
        .exists().withMessage('Value is required')
        .isString().withMessage('Value needs to be string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req: Request, res: Response) => {
      try {
        const participant = await participantModel.create({name: req.body.participantName})
        respondWithSuccess(res, `Created participant with name: ${participant.name}`)
      } catch (error) {
        console.log(error);
        respondWithError(res);
      }
    }
  ];

  static update = [
    body('participantName')
        .exists().withMessage('Value is required')
        .isString().withMessage('Value needs to be string'),
    body('usageTimeIncrement')
        .exists().withMessage('Value is required')
        .isNumeric().withMessage('Value needs to be UTC number'),
    validate,
    async (req: Request, res: Response) => {
      try {
        const participant = await participantModel.findOne({name: req.body.participantName});
        if (participant === null) {
          respondWithError(res, 'Could not find participant')
        } else {
          participant.totalUsageTime += req.body.usageTimeIncrement;
          participant.save();
          respondWithSuccessAndData(res, participant, 'Updated participant')
        }
      } catch (error) {
        console.log(error);
        respondWithError(res);
      }
    }
  ];
}