import express from 'express';

import requestLogger from './middleware/requestLogger.js';
import moduleRouter from './modules/moduleRouter.js';
import {respondWithSuccess} from './helpers/response.js';
import {
  validateAuthentication,
  AuthenticationController,
} from './helpers/authenticate.js';
import {PerspectiveController} from './analytics/perspective.js';

const router = express();

// Middleware to log all requests
router.use(requestLogger);

// Default request
router.get('/', (_, res) => {
  res.send(`Sever is running`);
});

// Forward to module router
router.use('/api', moduleRouter);

// Receive authentication token by using .env environment user and password
router.get('/authenticate', AuthenticationController.authenticate);

/**
 *  AUTHENTICATION REQUIRED
 *  Requests below  will need to be authenticated
 */
router.use(validateAuthentication);

router.get('/protectedContent', (_, res) => {
  respondWithSuccess(res, 'Content which needs authentication');
});

router.post('/api/perspective', PerspectiveController.analyzeComment);

export default router;

