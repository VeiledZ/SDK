// sdk-client.js

(function () {
  const SDK_URL = 'http://localhost:3000/identity/verify';
  const TEMPO_INICIAL = Date.now();
  let movimentoMouseDetectado = false;

  // Marca movimento do mouse
  window.addEventListener('mousemove', () => {
    movimentoMouseDetectado = true;
  });

  // Coleta dados do navegador
  function coletarDados() {
    return {
      tempo_na_pagina: Math.floor((Date.now() - TEMPO_INICIAL) / 1000),
      movimento_mouse: movimentoMouseDetectado,
      dispositivo_novo: false, // ← por enquanto hardcoded
      ip_suspeito: false,      // ← opcional, podemos usar API depois
      resolucao: `${window.innerWidth}x${window.innerHeight}`,
      idioma: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent
    };
  }

  // Envia os dados pro back-end
  function enviar() {
    const dados = coletarDados();

    fetch(SDK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(res => res.json())
      .then(resposta => {
        console.log('[SDK] Resposta do servidor:', resposta);
      })
      .catch(err => {
        console.error('[SDK] Erro ao enviar dados:', err);
      });
  }

  // Aguarda 5 segundos e envia os dados
  window.addEventListener('load', () => {
    setTimeout(enviar, 5000);
  });
})();
