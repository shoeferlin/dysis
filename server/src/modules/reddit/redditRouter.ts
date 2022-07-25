import * as express from 'express';

import redditController from './redditController.js';
import {validateAuthentication} from './../../helpers/authenticate.js';

const redditRouter: express.Router = express.Router();

redditRouter.get('/', redditController.analyze);
redditRouter.get('/detailed', redditController.analyzeDetailed);

redditRouter.use(validateAuthentication);
/** Authentication required for routes below */

redditRouter.get('/highest', redditController.highest);
redditRouter.get('/average', redditController.average);
redditRouter.get('/all', redditController.all);

export default redditRouter;
