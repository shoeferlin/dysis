import express from 'express';

import requestLogger from './middleware/requestLogger.js';
import moduleRouter from './modules/moduleRouter.js';
import {respondWithSuccess} from './helpers/response.js';
import {
  validateAuthentication,
  AuthenticationController,
} from './helpers/authenticate.js';

const router = express();

// Middleware to log all requests
router.use(requestLogger);

// Default request
router.get('/', (_, res) => {
  res.send(`Sever is running`);
});

// Forward to module router
router.use('/api', moduleRouter);

// Possibility to extend with authentication
router.get('/authenticate', AuthenticationController.authenticate);

/**
 *  AUTHENTICATION REQUIRED
 *  Requests below  will need to be authenticated
 */
router.use(validateAuthentication);

router.get('/protectedContent', (_, res) => {
  respondWithSuccess(res, 'Content which needs authentication');
});


export default router;

