import express from 'express';

import requestLogger from './middleware/requestLogger.js';
import moduleRouter from './modules/moduleRouter.js';

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
  return res.status(404).send('Requested resource not found');
});

export default router;

