// Utilitário: converte string para número, removendo ponto de milhar e usando vírgula como decimal
function parseValor(valor) {
  return parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
}

// FORMULÁRIO 1
document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const valorInvestido = parseValor(document.getElementById('valor-investido').value);
  const taxaCompra = parseValor(document.getElementById('taxa-compra').value) / 100;
  const taxaVenda = parseValor(document.getElementById('taxa-venda').value) / 100;
  const taxaIR = parseValor(document.getElementById('taxa-ir').value) / 100;
  const valorizacao = parseValor(document.getElementById('valorizacao-bitcoin').value) / 100;
  const lucroDesejado = parseValor(document.getElementById('lucro-desejado').value);

  const valorCompraComTaxa = valorInvestido * (1 + taxaCompra);
  const valorVendaComTaxa = valorCompraComTaxa * (1 + taxaVenda);
  const valorFinal = valorVendaComTaxa * (1 + valorizacao);
  const valorFinalComImposto = valorFinal * (1 - taxaIR);
  const valorVendaNecessario = valorFinalComImposto + lucroDesejado;

  document.getElementById('valor-venda').textContent = valorVendaNecessario.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  document.getElementById('resultado').classList.remove('hidden');
});

// FORMULÁRIO 2
document.getElementById('saque-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const valorDesejado = parseValor(document.getElementById('valor-desejado').value);
  const taxaCompra = parseValor(document.getElementById('taxa-compra-saque').value) / 100;
  const taxaVenda = parseValor(document.getElementById('taxa-venda-saque').value) / 100;
  const taxaIR = parseValor(document.getElementById('taxa-ir-saque').value) / 100;

  const valorBruto = valorDesejado / ((1 - taxaCompra) * (1 - taxaVenda) * (1 - taxaIR));

  document.getElementById('valor-bruto-saque').textContent = valorBruto.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  document.getElementById('resultado-saque').classList.remove('hidden');
});
