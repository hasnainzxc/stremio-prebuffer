const express = require('express');
const path = require('path');
const app = express();

const CACHE_DIR = path.join(__dirname, 'cache');

app.get('/episode_:num.mp4', (req, res) => {
  const file = path.join(CACHE_DIR, `episode_${req.params.num}.mp4`);
  res.sendFile(file);
});

function startServer() {
  app.listen(3000, () => {
    console.log("Buffer Server running at http://localhost:3000");
  });
}

module.exports = { startServer };
