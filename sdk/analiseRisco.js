// analiseRisco.js
const regras = require('./regras');

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

  return { score, action };
}

module.exports = analisarRisco;
