// index.js
const express = require('express');
const app = express();
const analisarRisco = require('./analiseRisco');

app.use(express.json());

app.post('/identity/verify', (req, res) => {
  const dados = req.body;

  if (!dados) {
    return res.status(400).json({ erro: 'Dados ausentes ou inválidos' });
  }

  const resultado = analisarRisco(dados);
  res.json(resultado);
});

app.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000');
});
