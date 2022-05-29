/* eslint-disable require-jsdoc */

import {respondWithSuccess} from '../../helpers/response.js';
export default class RedditController {
  static getForMuliple(req, res) {
    const data = {
      itsdino: {
        liwcAnalytical: 80,
      },
    };
    respondWithSuccess(
        res,
        'Found data for the following reddit users',
        data,
    );
  }
}
