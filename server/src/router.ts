import express from 'express';

import { requestLogger } from './middleware/requestLogger.js';
import { respondWithSuccess } from './helpers/response.js';

import moduleRouter from './modules/moduleRouter.js';
import participantRouter from './participant/participantRouter.js';

import AuthenticationController from './authentication/AuthenticationController.js';
import PushshiftRouter from './sources/reddit/PushshiftRouter.js';
import PerspectiveRouter from './analytics/toxicity/PerspectiveRouter.js';

const router = express();

// Middleware to log all requests
router.use(requestLogger);

// Default request
router.get('/', (_, res) => {
  res.send('Sever is running');
});

// Forward to module router
router.use('/api', moduleRouter);

// Forward to tracking router
router.use('/tracking', participantRouter);

// Receive authentication token by using .env environment user and password
router.get('', AuthenticationController.authenticate);

/**
 *  AUTHENTICATION REQUIRED
 *  Requests below  will need to be authenticated
 */
router.use(AuthenticationController.validateAuthentication);

router.get('/protectedContent', (_, res) => {
  respondWithSuccess(res, 'Content which needs authentication');
});

router.use('/api/pushshift', PushshiftRouter);
router.use('/api/perspective', PerspectiveRouter);

export default router;
