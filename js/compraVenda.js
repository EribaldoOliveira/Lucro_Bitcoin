document.getElementById('compra-venda-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Obter valores do formulário
    const valorCompra = parseFloat(document.getElementById('valor-compra').value);
    const valorVenda = parseFloat(document.getElementById('valor-venda').value);
    const taxaCompra = parseFloat(document.getElementById('taxa-compra-simulador').value) / 100;
    const taxaVenda = parseFloat(document.getElementById('taxa-venda-simulador').value) / 100;
    const valorBitcoin = parseFloat(document.getElementById('valor-bitcoin').value);
  
    // Cálculos
    const valorCompraComTaxa = valorCompra + (valorCompra * taxaCompra);
    const valorVendaComTaxa = valorVenda - (valorVenda * taxaVenda);
    const lucroPrejuizo = valorVendaComTaxa - valorCompraComTaxa;
  
    // Obter data e hora atual
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleString();
  
    // Exibir resultados
    document.getElementById('data-transacao').innerText = dataFormatada;
    document.getElementById('compra-valor').innerText = valorCompraComTaxa.toFixed(2);
    document.getElementById('venda-valor').innerText = valorVendaComTaxa.toFixed(2);
    document.getElementById('lucro').innerText = lucroPrejuizo.toFixed(2);
  
    // Mostrar resultado
    document.getElementById('resultado-transacao').classList.remove('hidden');
  });
  