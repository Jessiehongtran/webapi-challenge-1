const express = require('express');

const server = express();

const port = 3300;
server.listen(port, () => console.log(`API on port ${port}`))

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's rock!</h2>`)
});