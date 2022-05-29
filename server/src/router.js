import express from 'express';
import {formatISO9075} from 'date-fns';

import log from './helpers/log.js';
import moduleRouter from './modules/moduleRouter.js';

const router = new express.Router;

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  log.http(req.method, `${formatISO9075(Date.now())} ${req.path}`);
  next();
});

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

