// regras.js

const regras = [
  {
    nome: 'tempo_na_pagina',
    condicao: (dados) => dados.tempo_na_pagina < 3,
    peso: 30,
  },
  {
    nome: 'movimento_mouse',
    condicao: (dados) => !dados.movimento_mouse,
    peso: 30,
  },
  {
    nome: 'dispositivo_novo',
    condicao: (dados) => dados.dispositivo_novo === true,
    peso: 20,
  },
  {
    nome: 'ip_suspeito',
    condicao: (dados) => dados.ip_suspeito === true,
    peso: 20,
  }
];

module.exports = regras;
