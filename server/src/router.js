import express from 'express';

import requestLogger from './middleware/requestLogger.js';
import moduleRouter from './modules/moduleRouter.js';
import {respondWithNotFound} from './helpers/response.js';

const router = express();

// Middleware to log all requests
router.use(requestLogger);

// Default request
router.get('/', (req, res) => {
  res.send(`Sever is running`);
});

// Forward to module router
router.use('/api', moduleRouter);

// Catch all resources not found
router.all('*', function(_, res) {
  respondWithNotFound(res);
});

export default router;

