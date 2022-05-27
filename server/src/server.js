// Imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Constants
dotenv.config();
const ENV = process.env;
const DEFAULT_PORT = 8080;

// Setup app
const app = express();
console.log('Started server ...');

// Connect database
try {
  await mongoose.connect(ENV.MONGODB_URI).then(() => {
    console.log('Database is connecting ...');
  });
} catch (err) {
  console.error(err);
}

// Listen for error events on database
mongoose.connection.on('error', (err) => {
  console.error(err);
});

// Setup port (get from .env or use default 8080)
const port = ENV.PORT || DEFAULT_PORT;
app.listen(port, () => console.log(`Server is listening on port ${port} ...`));

// Dummy respomse
app.get('/', (req, res) => {
  res.send(`Hello World! Und Servus ${ENV.ADVISOR}!`);
});
