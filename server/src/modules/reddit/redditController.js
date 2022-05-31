import log from '../../helpers/log.js';

import {
  respondWithNotFound,
  respondWithSuccess,
} from '../../helpers/response.js';
import {getRandomInt} from '../../helpers/utils.js';
import redditModel from './redditModel.js';

/**
 * Controller managing incoming requests to the respective model
 */
export default class RedditController {
  /**
   * Get data for one identifier
   * @param {Request} req
   * @param {Response} res
   */
  static async getOne(req, res) {
    const data = await redditModel.find({username: 'also_awesome'}).exec();
    if (data.length > 0) {
      respondWithSuccess(
          res,
          'Found the following elements',
          data,
      );
    } else {
      respondWithNotFound(
          res,
          'Could not find an element',
      );
    }
  }

  /**
   * Creates an reddit object
   * @param {Request} req request instance
   * @param {Response} res response instance
   */
  static createOne(req, res) {
    redditModel.create(
        {
          identifier: 'also_awesome',
          liwcAnalytical: getRandomInt(99),
        },
        function(err, awesomeInstance) {
          if (err) return log.error(err);
          log.debug(awesomeInstance);
        },
    );
    respondWithSuccess(
        res,
        'Created one element',
    );
  }
}
