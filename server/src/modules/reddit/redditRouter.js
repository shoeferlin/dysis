import express from 'express';

import redditController from './redditController.js';

const redditRouter = new express.Router;

// redditRouter.get('/', (req, res) => redditController.getOne(req, res));
redditRouter.get('/', (req, res) => redditController.createOne(req, res));

export default redditRouter;
