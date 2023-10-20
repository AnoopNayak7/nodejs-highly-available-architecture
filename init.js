const express = require('express');
const app = express();
const port = 3006;

app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js App!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
