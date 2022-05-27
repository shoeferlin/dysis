// Imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import npmlog from 'npmlog';
import cors from 'cors';

// Constants
dotenv.config();
const ENV = process.env;
const DEFAULT_PORT = 8080;

// Setup logger
const log = npmlog;
log.enableColor();

// Create debug level (use 'log.debug(Prefix, Msg)' instead of 'console.log()')
log.addLevel(
    'debug',
    10,
    {bg: 'yellow', fg: 'white', bold: true, bell: true},
    ' DEBUG ',
);
log.level = 'debug';

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

// Default request
app.get('/', (req, res) => {
  res.send(`Sever is running`);
});

// Forward requests to routes

// Catch all resources not found
app.all('*', function(_, res) {
  return res.status(404).send('Requested resource not found');
});
