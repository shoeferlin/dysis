import express from 'express';

import redditController from './redditController.js';

const redditRouter = new express.Router;

redditRouter.get('/', redditController.getForMuliple);

export default redditRouter;
