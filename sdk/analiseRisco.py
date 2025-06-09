// analiseRisco.js

function analisarRisco(dados) {
  let score = 0;

  if (dados.tempo_na_pagina < 3) score += 30;
  if (!dados.movimento_mouse) score += 30;
  if (dados.dispositivo_novo) score += 20;
  if (dados.ip_suspeito) score += 20;

  let action = 'allow';
  if (score > 75) action = 'deny';
  else if (score > 30) action = 'review';

  return { score, action };
}

module.exports = analisarRisco;
