async function carregarLogs() {
  const res = await fetch('/logs');
  const logs = await res.json();

  const tbody = document.getElementById('conteudo-tabela');
  tbody.innerHTML = '';

  logs.forEach(log => {
    const tr = document.createElement('tr');
    tr.classList.add(log.action);

    tr.innerHTML = `
      <td>${new Date(log.timestamp).toLocaleString()}</td>
      <td>${log.score}</td>
      <td>${log.action}</td>
      <td>${log.tempo_na_pagina}s</td>
      <td>${log.movimento_mouse ? 'Sim' : 'Não'}</td>
      <td>${log.resolucao}</td>
      <td>${log.idioma}</td>
    `;

    tbody.appendChild(tr);
  });
}

function exportarCSV() {
  fetch('/logs')
    .then(res => res.json())
    .then(logs => {
      const header = ['timestamp', 'score', 'action', 'tempo_na_pagina', 'movimento_mouse', 'resolucao', 'idioma'];
      const linhas = logs.map(log =>
        [log.timestamp, log.score, log.action, log.tempo_na_pagina, log.movimento_mouse, log.resolucao, log.idioma].join(',')
      );
      const csv = [header.join(','), ...linhas].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'eventos-antifraude.csv';
      a.click();
    });
}

// carrega ao abrir
carregarLogs();
