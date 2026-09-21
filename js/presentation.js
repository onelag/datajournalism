// Initialize Reveal.js Keynote Deck
let chartInstance = null;

Reveal.initialize({
  // Presentation display settings
  width: 1200,
  height: 700,
  margin: 0.08,
  minScale: 0.2,
  maxScale: 2.0,

  // Display presentation control arrows
  controls: true,
  controlsTutorial: true,
  controlsLayout: 'bottom-right',
  controlsBackArrows: 'faded',

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  slideNumber: 'c/t',

  // Add the current slide number to the URL hash so that reloading the
  // page/sharing links goes directly to that slide
  hash: true,

  // Push each slide change to the browser history
  history: true,

  // Enable keyboard shortcuts
  keyboard: true,

  // Enable the slide overview mode
  overview: true,

  // Vertical centering of slides
  center: true,

  // Enables touch navigation on devices with touch input
  touch: true,

  // Transition style: none/fade/slide/convex/concave/zoom
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',

  // Plugins
  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealZoom,
    RevealSearch
  ]
}).then(() => {
  console.log('✨ Keynote Reveal.js initialized successfully!');
  initChart();
});

// Animate Chart when entering the data slide
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
          label: 'Investigative Articles with Data Visualizations (%)',
          data: [28, 44, 62, 81, 93],
          backgroundColor: 'rgba(56, 189, 248, 0.75)',
          borderColor: '#38bdf8',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        },
        {
          label: 'Reader Engagement Index (Minutes)',
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
            callback: (value) => value + 'm'
          },
          grid: { display: false }
        }
      }
    }
  });
}
