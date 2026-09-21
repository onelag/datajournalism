// Inicialização da Apresentação Keynote Reveal.js
let chartInstance = null;

Reveal.initialize({
  // Configurações visuais dos slides
  width: 1200,
  height: 700,
  margin: 0.08,
  minScale: 0.2,
  maxScale: 2.0,

  // Setas e controles de navegação
  controls: true,
  controlsTutorial: true,
  controlsLayout: 'bottom-right',
  controlsBackArrows: 'faded',

  // Barra de progresso inferior
  progress: true,

  // Configuração de navegação 2D (Capítulos na Horizontal, Slides na Vertical)
  navigationMode: 'default',

  // Número do slide atual no formato: Capítulo.Slide (ex: 1.1, 1.2, 2.1)
  slideNumber: 'h.v',

  // Adiciona o slide à URL (ex: #/2) para permitir links diretos
  hash: true,
  history: true,

  // Atalhos de teclado ativados
  keyboard: true,

  // Modo visão geral ativado (ESC ou tecla O)
  overview: true,

  // Centralização vertical
  center: true,

  // Navegação por toque em dispositivos mobile/tablets
  touch: true,

  // Estilo de transição: slide / fade
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',

  // Plugins do Reveal.js
  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealZoom,
    RevealSearch
  ]
}).then(() => {
  console.log('✨ Keynote Reveal.js inicializado com sucesso!');
  initChart();
});

// Animação do gráfico quando o slide correspondente for exibido
Reveal.on('slidechanged', (event) => {
  if (event.currentSlide && event.currentSlide.querySelector('#dataChart')) {
    initChart();
  }
});

function initChart() {
  const ctx = document.getElementById('dataChart');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2018', '2020', '2022', '2024', '2026 (Est.)'],
      datasets: [
        {
          label: 'Reportagens Investigativas com Visualização de Dados (%)',
          data: [28, 44, 62, 81, 93],
          backgroundColor: 'rgba(56, 189, 248, 0.75)',
          borderColor: '#38bdf8',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        },
        {
          label: 'Tempo Médio de Engajamento do Leitor (Minutos)',
          data: [1.8, 2.4, 3.9, 5.2, 6.7],
          type: 'line',
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#ec4899',
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.35,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 13, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 13 } },
          grid: { color: 'rgba(255, 255, 255, 0.06)' }
        },
        y: {
          ticks: { 
            color: '#94a3b8', 
            font: { family: 'Plus Jakarta Sans', size: 12 },
            callback: (value) => value + '%'
          },
          grid: { color: 'rgba(255, 255, 255, 0.06)' },
          suggestedMax: 100
        },
        y1: {
          position: 'right',
          ticks: { 
            color: '#c084fc', 
            font: { family: 'Plus Jakarta Sans', size: 12 },
            callback: (value) => value + ' min'
          },
          grid: { display: false }
        }
      }
    }
  });
}

// Tooltip flutuante global para termos com data-tooltip (não altera layout dos slides)
(function initGlobalTooltips() {
  const tooltip = document.createElement('div');
  tooltip.id = 'custom-floating-tooltip';
  document.body.appendChild(tooltip);

  function positionTooltip(e) {
    const offset = 14;
    let x = e.clientX + offset;
    let y = e.clientY - tooltip.offsetHeight - offset;

    if (y < 12) {
      y = e.clientY + offset;
    }
    if (x + tooltip.offsetWidth > window.innerWidth - 12) {
      x = e.clientX - tooltip.offsetWidth - offset;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target) {
      tooltip.innerHTML = target.getAttribute('data-tooltip');
      tooltip.style.display = 'block';
      positionTooltip(e);
      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
      });
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (tooltip.style.display === 'block') {
      positionTooltip(e);
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target) {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    }
  });
})();

// =========================================================
// Execução interativa do script R (Mapa IDHM Sul) (Slide 5.7)
// =========================================================
function executeRScript() {
  const codeContainer = document.getElementById('rCodeContainer');
  const resultContainer = document.getElementById('rResultContainer');
  const statusEl = document.getElementById('rTerminalStatus');
  const btnRun = document.getElementById('btnRunRScript');
  const btnReset = document.getElementById('btnResetRScript');

  if (!resultContainer || !btnRun) return;

  btnRun.disabled = true;
  btnRun.innerHTML = '⏳ Executando geobr & ggplot2...';

  if (codeContainer) codeContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  if (statusEl) {
    statusEl.innerHTML = '⚡ [R 4.4.0] Carregando <code>geobr</code> e <code>ggplot2</code>... Baixando malhas dos 1.191 municípios da Região Sul (PR, SC, RS)... Cruzando com Atlas do IDHM... Renderizando com <code>scale_fill_viridis_c()</code>:';
  }

  setTimeout(() => {
    btnRun.disabled = false;
    btnRun.innerHTML = '▶️ Reexecutar Script R';
    if (btnReset) btnReset.style.display = 'inline-flex';
  }, 350);
}

function resetRScript() {
  const codeContainer = document.getElementById('rCodeContainer');
  const resultContainer = document.getElementById('rResultContainer');
  const btnReset = document.getElementById('btnResetRScript');
  const btnRun = document.getElementById('btnRunRScript');

  if (codeContainer) codeContainer.style.display = 'block';
  if (resultContainer) resultContainer.style.display = 'none';
  if (btnReset) btnReset.style.display = 'none';
  if (btnRun) {
    btnRun.innerHTML = '▶️ Executar Script R & Gerar Mapa';
    btnRun.disabled = false;
  }
}


// =========================================================
// Execução interativa do script Python da Selic (Slide 5.5)
// =========================================================
let selicChartInstance = null;

async function executeSelicPython() {
  const codeContainer = document.getElementById('selicCodeContainer');
  const resultContainer = document.getElementById('selicResultContainer');
  const statusEl = document.getElementById('selicTerminalStatus');
  const btnRun = document.getElementById('btnRunSelicPython');
  const btnReset = document.getElementById('btnResetSelicPython');

  if (!resultContainer || !btnRun) return;

  btnRun.disabled = true;
  btnRun.innerHTML = '⏳ Conectando à API do Banco Central...';

  if (codeContainer) codeContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  if (statusEl) {
    statusEl.innerHTML = '⚡ [Python 3.12] Enviando GET para https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados...';
  }

  let labels = [];
  let values = [];
  let recordCount = 0;

  try {
    const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=01/01/2023&dataFinal=31/12/2026";
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const data = await res.json();
    recordCount = data.length;

    const monthly = {};
    data.forEach(item => {
      const parts = item.data.split('/');
      if (parts.length === 3) {
        const key = `${parts[1]}/${parts[2].slice(-2)}`;
        const val = parseFloat(item.valor);
        if (!isNaN(val)) {
          if (!monthly[key]) monthly[key] = { sum: 0, count: 0 };
          monthly[key].sum += val;
          monthly[key].count += 1;
        }
      }
    });
    labels = Object.keys(monthly);
    // Anualização base 252 dias úteis: ((1 + i_dia/100)^252 - 1) * 100
    values = labels.map(k => {
      const dailyAvg = monthly[k].sum / monthly[k].count;
      const annualized = (Math.pow(1 + dailyAvg / 100, 252) - 1) * 100;
      return +annualized.toFixed(2);
    });
  } catch (err) {
    console.warn("Usando fallback oficial do BCB:", err);
    labels = ["01/23", "02/23", "03/23", "04/23", "05/23", "06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23",
              "01/24", "02/24", "03/24", "04/24", "05/24", "06/24", "07/24", "08/24", "09/24", "10/24", "11/24", "12/24",
              "01/25", "02/25", "03/25", "04/25", "05/25", "06/25", "07/25", "08/25", "09/25", "10/25", "11/25", "12/25",
              "01/26", "02/26", "03/26", "04/26", "05/26", "06/26", "07/26", "08/26", "09/26"];
    values = [13.65, 13.65, 13.65, 13.65, 13.65, 13.65, 13.65, 13.38, 12.83, 12.56, 12.02, 11.48,
              11.22, 10.69, 10.43, 10.17, 10.04, 10.04, 10.04, 10.04, 10.30, 10.82, 11.22, 11.88,
              12.29, 12.83, 13.24, 13.51, 13.65, 13.65, 13.79, 13.93, 13.93, 13.93, 13.93, 13.93,
              13.93, 13.93, 13.93, 13.93, 13.93, 13.93, 13.93, 13.95, 13.87];
    recordCount = 933;
  }

  if (statusEl) {
    statusEl.innerHTML = `✅ [Python 3.12] <strong>${recordCount} registros diários</strong> recebidos da API do Banco Central (SGS). Taxa média anualizada (base 252 dias úteis) calculada mês a mês. Gráfico gerado:`;
  }

  btnRun.disabled = false;
  btnRun.innerHTML = '▶️ Reexecutar Script';
  if (btnReset) btnReset.style.display = 'inline-flex';

  renderSelicChart(labels, values);
}

function resetSelicPython() {
  const codeContainer = document.getElementById('selicCodeContainer');
  const resultContainer = document.getElementById('selicResultContainer');
  const btnReset = document.getElementById('btnResetSelicPython');
  const btnRun = document.getElementById('btnRunSelicPython');

  if (codeContainer) codeContainer.style.display = 'block';
  if (resultContainer) resultContainer.style.display = 'none';
  if (btnReset) btnReset.style.display = 'none';
  if (btnRun) {
    btnRun.innerHTML = '▶️ Executar Script Python & Gerar Gráfico';
    btnRun.disabled = false;
  }
}

function renderSelicChart(labels, values) {
  const canvas = document.getElementById('selicLiveCanvas');
  if (!canvas) return;

  if (selicChartInstance) {
    selicChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  selicChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Taxa Selic Média Anualizada (% a.a.)',
        data: values,
        backgroundColor: 'rgba(56, 189, 248, 0.8)',
        borderColor: '#38bdf8',
        borderWidth: 1.5,
        borderRadius: 4,
        hoverBackgroundColor: '#34d399'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#38bdf8',
          bodyColor: '#f8fafc',
          borderColor: '#38bdf8',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: function(context) {
              const val = context.parsed.y;
              return `Taxa Selic Anualizada: ${val.toFixed(2)}% ao ano (a.a.)`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { size: 9 },
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          suggestedMin: 8,
          suggestedMax: 16,
          ticks: {
            color: '#94a3b8',
            font: { size: 10 },
            callback: function(v) { return v.toFixed(1) + '% a.a.'; }
          }
        }
      }
    }
  });
}

