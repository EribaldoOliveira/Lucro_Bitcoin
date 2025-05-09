document.addEventListener('DOMContentLoaded', async function () {
  const valorCaixaInput = document.getElementById('valor-caixa');
  const valorBitcoinInput = document.getElementById('valor-bitcoin');
  const btcCompradoInput = document.getElementById('btc-comprado');
  const valorAtualizadoBox = document.getElementById('valor-atualizado');
  const lucroBox = document.getElementById('lucro-prejuizo');
  const errorMessage = document.getElementById('error-message');
  const ctx = document.getElementById('grafico-btc').getContext('2d');

  let chart;

  async function buscarCotacaoAtual() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
    const data = await response.json();
    return data.bitcoin.brl;
  }

  async function buscarHistorico7Dias() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=7');
    const data = await response.json();
    return data.prices;
  }

  async function atualizarDados() {
    try {
      const cotacaoAtual = await buscarCotacaoAtual();

      const valorCaixa = parseFloat(valorCaixaInput.value);
      const btcComprado = parseFloat(btcCompradoInput.value);

      if (!isNaN(valorCaixa) && !isNaN(btcComprado) && btcComprado > 0) {
        const valorAtual = btcComprado * cotacaoAtual;
        valorAtualizadoBox.textContent = `R$ ${valorAtual.toFixed(2)}`;

        const diferenca = valorAtual - valorCaixa;
        const sinal = diferenca >= 0 ? '+' : '-';
        lucroBox.textContent = `${sinal}R$ ${Math.abs(diferenca).toFixed(2)}`;
        lucroBox.style.color = diferenca >= 0 ? 'green' : 'red';

        const btcAtual = valorCaixa / cotacaoAtual;
        valorBitcoinInput.value = btcAtual.toFixed(6);
      } else {
        valorBitcoinInput.value = '';
        valorAtualizadoBox.textContent = '--';
        lucroBox.textContent = '--';
      }

      errorMessage.classList.add('hidden');
    } catch (err) {
      console.error(err);
      errorMessage.classList.remove('hidden');
    }
  }

  async function gerarGrafico() {
    try {
      const historico = await buscarHistorico7Dias();
      const labels = historico.map(item => {
        const data = new Date(item[0]);
        return `${data.getDate()}/${data.getMonth() + 1}`;
      });
      const valores = historico.map(item => item[1]);

      if (chart) chart.destroy();

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cotação BTC (R$)',
            data: valores,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              title: { display: true, text: 'Preço (R$)' }
            },
            x: {
              title: { display: true, text: 'Dia' }
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao gerar gráfico:', error);
    }
  }

  // Eventos e inicialização
  setInterval(atualizarDados, 5000);
  valorCaixaInput.addEventListener('input', atualizarDados);
  btcCompradoInput.addEventListener('input', atualizarDados);

  await atualizarDados();
  await gerarGrafico();
});
