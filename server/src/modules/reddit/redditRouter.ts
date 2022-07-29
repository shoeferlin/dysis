import * as express from 'express';

import redditController from './redditController.js';
import AuthenticationController from '../../authentication/AuthenticationController.js';

const redditRouter: express.Router = express.Router();

redditRouter.get('/', redditController.analyze);
redditRouter.get('/detailed', redditController.analyzeDetailed);

redditRouter.use(AuthenticationController.validateAuthentication);
/** Authentication required for routes below */

redditRouter.get('/highest', redditController.highest);
redditRouter.get('/average', redditController.average);
redditRouter.get('/all', redditController.all);

export default redditRouter;
