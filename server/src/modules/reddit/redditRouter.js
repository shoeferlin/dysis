import express from 'express';

import redditController from './redditController.js';

const redditRouter = new express.Router;

redditRouter.get('/', redditController.getOne);
redditRouter.post('/', (req, res) => redditController.createOne(req, res));

export default redditRouter;
