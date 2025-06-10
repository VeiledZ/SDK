// routes/logs.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const LOG_PATH = path.join(__dirname, '..', 'logs.json');

router.get('/', (req, res) => {
  if (!fs.existsSync(LOG_PATH)) {
    return res.json([]);
  }

  const conteudo = fs.readFileSync(LOG_PATH, 'utf-8');
  const logs = conteudo ? JSON.parse(conteudo) : [];

  res.json(logs);
});

module.exports = router;
