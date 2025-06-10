(function () {
  const SDK_URL = 'http://localhost:3000/identity/verify';
  const TEMPO_INICIAL = Date.now();
  let movimentoMouseDetectado = false;

  // Detecta movimento de mouse
  window.addEventListener('mousemove', () => {
    movimentoMouseDetectado = true;
  });

  // Coleta dados do ambiente
  function coletarDados() {
    const tempo_na_pagina = Math.floor((Date.now() - TEMPO_INICIAL) / 1000);
    return {
      tempo_na_pagina,
      movimento_mouse: movimentoMouseDetectado,
      dispositivo_novo: false,
      ip_suspeito: false,
      resolucao: `${window.innerWidth}x${window.innerHeight}`,
      idioma: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent
    };
  }

  // Simulação de verificação de e-mail/senha
  function verificarLogin(email, senha) {
    const emailCorreto = "admin@teste.com";
    const senhaCorreta = "123456";
    return email === emailCorreto && senha === senhaCorreta;
  }

  // Função chamada ao clicar em "Entrar"
  window.enviarLogin = function () {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const div = document.getElementById('resultado');

    if (!email || !senha) {
      div.innerHTML = '<p style="color: red;">⚠️ Preencha e-mail e senha!</p>';
      return;
    }

    const dados = coletarDados();

    fetch(SDK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(res => res.json())
      .then(resposta => {
        div.innerHTML = '';

        if (resposta.action === 'deny') {
          div.innerHTML += `<p style="color:red;">⛔ Acesso bloqueado por comportamento suspeito</p>`;
        } else if (resposta.action === 'review') {
          div.innerHTML += `<p style="color:orange;">⚠️ Acesso sob revisão manual</p>`;
        } else {
          // Ação = allow → verificar se credenciais estão corretas
          if (verificarLogin(email, senha)) {
            div.innerHTML += `<p style="color:green;">✅ Login bem-sucedido! Redirecionando...</p>`;
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 2000);
          } else {
            div.innerHTML += `<p style="color:red;">❌ E-mail ou senha inválidos</p>`;
          }
        }
      })
      .catch(err => {
        console.error('[SDK] Erro ao enviar dados:', err);
        div.innerHTML = '<p style="color:red;">Erro ao validar. Tente novamente.</p>';
      });
  };
})();
