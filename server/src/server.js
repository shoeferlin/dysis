// External imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Internal improts
import log from './helpers/log.js';
import router from './router.js';

// Constants
dotenv.config();
const ENV = process.env;
const DEFAULT_PORT = 8080;

// Setup app
const app = express();
log.info('SERVER START');
log.info('SERVER START', 'Started server ...');

// Connect database
try {
  await mongoose.connect(ENV.MONGODB_URI).then(() => {
    log.info('SERVER START', 'Database is connecting ...');
  });
} catch (err) {
  log.error(err);
}

// Listen for error events on database
mongoose.connection.on('error', (err) => {
  log.error(err);
});

// Setup security
app.use(cors());

// Setup port (get from .env or use default 8080)
const port = ENV.PORT || DEFAULT_PORT;
app.listen(port, () => {
  log.info('SERVER START', `Server is listening on port ${port} ...`);
});

// Forward requests to router
app.get('*', router);
