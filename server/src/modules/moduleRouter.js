import express from 'express';

const moduleRouter = new express.Router;

// Register modules below

import redditRouter from './reddit/redditRouter.js';
moduleRouter.use('/reddit', redditRouter);

import zeitRouter from './zeit/zeitRouter.js';
moduleRouter.use('/zeit', zeitRouter);

export default moduleRouter;
