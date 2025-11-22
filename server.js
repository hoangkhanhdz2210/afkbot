const express = require('express');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.get('/start-bot', (req, res) => {
  const host = req.query.host || 'localhost';
  const port = req.query.port || '25565';
  const username = req.query.username || 'AFKBot_' + Math.floor(Math.random() * 1000);

  spawn('node', ['bots.js', host, port, username], {
    stdio: 'inherit'
  });

  res.send(`Bot ${username} is starting on ${host}:${port}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
