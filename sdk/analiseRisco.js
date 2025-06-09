// analiseRisco.js
const regras = require('./regras');
const registrarEvento = require('./logger');

function analisarRisco(dados) {
  let score = 0;

  regras.forEach(regra => {
    if (regra.condicao(dados)) {
      score += regra.peso;
    }
  });

  const action = score > 75 ? 'deny'
               : score > 30 ? 'review'
               : 'allow';

  const resultado = { score, action };
  registrarEvento({ ...dados, ...resultado });

  return resultado;
}

module.exports = analisarRisco;
