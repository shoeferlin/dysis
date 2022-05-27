// Imports
import express from 'express';
import dotenv from 'dotenv';

// Constants
dotenv.config();
const ENV = process.env;
const DEFAULT_PORT = 8080;

// Setup app
const app = express();

// Setup port (get from .env file or use default 8080)
const port = ENV.PORT || DEFAULT_PORT;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

// Dummy respomse
app.get('/', (req, res) => {
  res.send(`Hello World! Und Servus ${ENV.ADVISOR}!`);
});
