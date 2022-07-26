import express from 'express';

import redditRouter from './reddit/redditRouter.js';
import zeitRouter from './zeit/zeitRouter.js';

const moduleRouter = express();

moduleRouter.get('', (_, res) => {
  res.send('Module API is running');
});

// Register modules below
moduleRouter.use('/reddit', redditRouter);
moduleRouter.use('/zeit', zeitRouter);

export default moduleRouter;
