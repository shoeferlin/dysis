// ZEIT.de could be a future example

import express from 'express';

const zeitRouter = new express.Router;

zeitRouter.get('/', (_, res) => {
  res.send(`Zeit here`);
});

export default zeitRouter;
