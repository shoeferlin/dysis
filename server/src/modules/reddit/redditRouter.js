import express from 'express';

import redditController from './redditController.js';

const redditRouter = new express.Router;

redditRouter.get('/', (req, res) => redditController.getForMuliple(req, res));

export default redditRouter;
