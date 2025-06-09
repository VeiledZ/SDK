// logger.js
const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, 'logs.json');

function registrarEvento(evento) {
  const registro = {
    ...evento,
    timestamp: new Date().toISOString()
  };

  let logs = [];
  if (fs.existsSync(LOG_PATH)) {
    const conteudo = fs.readFileSync(LOG_PATH, 'utf-8');
    logs = conteudo ? JSON.parse(conteudo) : [];
  }

  logs.push(registro);

  fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2));
}

module.exports = registrarEvento;
