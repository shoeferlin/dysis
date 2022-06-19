import Perspective from 'perspective-api-client';
import {body} from 'express-validator';
import dotenv from 'dotenv';

import log from '../helpers/log.js';
import validate from '../helpers/validate.js';
import {respondWithSuccessAndData} from '../helpers/response.js';

// Get confif variables
dotenv.config();
const ENV = process.env;

const API_KEY = ENV.GOOGLE_API_KEY;


const perspective = new Perspective({
  apiKey: API_KEY,
});

/**
 * Text
 * @param {String} message
 * @return {Result}
 */
async function analyzeComment(message) {
  try {
    const result = await perspective.analyze({
      'comment': {
        'text': message,
      },
      'requestedAttributes': {
        'TOXICITY': {},
        'INSULT': {},
        'SPAM': {},
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * Controller for handling incoming requests to test the Perspective AP
 */
class PerspectiveController {
  /**
   * Perspective API Controller
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static analyzeComment = [
    // Validations using express-validator
    body('text')
        .exists().withMessage('text in request body required')
        .isString().withMessage('text must be a string'),
    // Using own helper to check for generated validation errors
    validate,
    // Actual controller method handling valid request
    async (req, res) => {
      const text = req.body.text;
      const analysis = await analyzeComment(text);
      try {
        const data = {
          perspective: analysis,
        };
        respondWithSuccessAndData(
            res,
            data,
            'Perspective API returned the following data',
        );
      } catch (e) {
        log.error(e);
      }
    },
  ];
}

export {perspective, PerspectiveController};
