const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! Und Servus Franz!');
});

let port = process.env.PORT || 8080
app.listen(port, () =>
  console.log('Example app listening on port 8080!'),
);