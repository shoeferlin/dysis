import * as express from 'express';

import redditController from './redditController.js';

const redditRouter: express.Router = express.Router();

redditRouter.get('/', redditController.analyze);

export default redditRouter;
