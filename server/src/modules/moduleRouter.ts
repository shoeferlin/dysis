import express from 'express';

import RedditRouter from './reddit/RedditRouter.js';
import ZeitRouter from './zeit/ZeitRouter.js';

const ModuleRouter = express();

ModuleRouter.get('', (_, res) => {
  res.send('Module API is running');
});

// Register modules below
ModuleRouter.use('/reddit', RedditRouter);
ModuleRouter.use('/zeit', ZeitRouter);

export default ModuleRouter;
