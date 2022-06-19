import {google} from 'googleapis';
import {body} from 'express-validator';
import dotenv from 'dotenv';

import log from '../helpers/log.js';
import validate from '../helpers/validate.js';
import {respondWithSuccessAndData} from '../helpers/response.js';

// Get confif variables
dotenv.config();
const ENV = process.env;

const API_KEY = ENV.GOOGLE_API_KEY;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

/**
 * Call Perspective API
 * Code taken from documentation page
 * @param {String} text
 */
async function perspective(text) {
  log.info(
      'PERSPECTIVE API',
      `Requesting perspective API for the following text:\n${text}`,
  );
  google.discoverAPI(DISCOVERY_URL)
      .then((client) => {
        const analyzeRequest = {
          comment: {
            text: text,
          },
          // Add more if necessary
          requestedAttributes: {
            TOXICITY: {},
            INSULT: {},
          },
        };

        client.comments.analyze(
            {
              key: API_KEY,
              resource: analyzeRequest,
            },
            (err, response) => {
              if (err) throw err;
              log.info(
                  'PERSPECTIVE API',
                  JSON.stringify(response.data, null, 2),
              );
              return response.data;
            },
        );
      })
      .catch((err) => {
        throw err;
      });
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
      const analysis = await perspective(text);
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
