import {google} from 'googleapis';
import dotenv from 'dotenv';

import log from '../helpers/log.js';

// Get confif variables
dotenv.config();
const ENV = process.env;

const API_KEY = ENV.GOOGLE_API_KEY;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

/**
 * Call Perspective API
 */
export default function perspective() {
  google.discoverAPI(DISCOVERY_URL)
      .then((client) => {
        const analyzeRequest = {
          comment: {
            text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
          },
          requestedAttributes: {
            TOXICITY: {},
          },
        };

        client.comments.analyze(
            {
              key: API_KEY,
              resource: analyzeRequest,
            },
            (err, response) => {
              if (err) throw err;
              console.log(JSON.stringify(response.data, null, 2));
            });
      })
      .catch((err) => {
        throw err;
      });
}
