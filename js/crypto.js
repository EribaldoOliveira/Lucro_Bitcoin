document.getElementById('simulador-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const valorBtc = parseFloat(document.getElementById('valor-btc').value.replace(',', '.'));
    const tipoOperacao = document.getElementById('tipo-operacao').value;
    const taxa = 0.02; // 2% de taxa
    const resultadoDiv = document.getElementById('resultado');
  
    if (isNaN(valorBtc) || valorBtc <= 0) {
      resultadoDiv.textContent = 'Digite um valor válido.';
      return;
    }
  
    let valorFinal;
    if (tipoOperacao === 'venda') {
      valorFinal = valorBtc * (1 - taxa);
    } else {
      valorFinal = valorBtc * (1 - taxa);
    }
  
    resultadoDiv.textContent = `Valor após ${tipoOperacao === 'venda' ? 'venda' : 'saque'} com taxa de 2%: R$ ${valorFinal.toFixed(2)}`;
  });
  