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

  // Número do slide atual / total
  slideNumber: 'c/t',

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
