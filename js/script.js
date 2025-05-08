
    document.getElementById('calc-form').addEventListener('submit', function(e) {
      e.preventDefault();

      // Coleta os valores dos campos
      const valorInvestido = parseFloat(document.getElementById('valor-investido').value);
      const taxaCompra = parseFloat(document.getElementById('taxa-compra').value) / 100;
      const taxaVenda = parseFloat(document.getElementById('taxa-venda').value) / 100;
      const taxaIR = parseFloat(document.getElementById('taxa-ir').value) / 100;
      const valorizacaoBitcoin = parseFloat(document.getElementById('valorizacao-bitcoin').value) / 100;
      const lucroDesejado = parseFloat(document.getElementById('lucro-desejado').value);

      // Calcula o valor de venda necessário
      const valorCompraComTaxa = valorInvestido * (1 + taxaCompra); // Inclui taxa de compra
      const valorVendaComTaxa = valorCompraComTaxa * (1 + taxaVenda); // Inclui taxa de venda
      const valorVendaFinal = valorVendaComTaxa * (1 + valorizacaoBitcoin); // Valorização do Bitcoin
      const valorFinalComImposto = valorVendaFinal * (1 - taxaIR); // Deduz imposto de renda
      const valorVendaNecessario = valorFinalComImposto + lucroDesejado; // Adiciona lucro desejado

      // Exibe o resultado
      document.getElementById('resultado').classList.remove('hidden');
      document.getElementById('valor-venda').textContent = valorVendaNecessario.toFixed(2);
    });
