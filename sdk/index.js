// index.js
const express = require('express');
const app = express();
const logsRoute = require('./routes/logs');
const analisarRisco = require('./analiseRisco');

// 👉 Serve os arquivos da pasta 'public'
app.use(express.static('public'));

app.use('/logs', logsRoute);

app.use(express.json());

app.post('/identity/verify', (req, res) => {
  const dados = req.body;

  if (!dados) {
    return res.status(400).json({ erro: 'Dados ausentes ou inválidos' });
  }

  const resultado = analisarRisco(dados);
  res.json(resultado);
});

// Rota raiz opcional (se quiser mostrar algo direto no GET /)
app.get('/', (req, res) => {
  res.send('✅ SDK Antifraude rodando! Acesse /index.html');
});

app.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000');
});
