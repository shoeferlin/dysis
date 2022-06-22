import express from 'express';

import redditController from './redditController.js';

const redditRouter = express();

redditRouter.post('/get', redditController.get);
redditRouter.post('/analyze', redditController.analyze);
redditRouter.get('/', redditController.getOne);
redditRouter.post('/', redditController.createOne);

export default redditRouter;
