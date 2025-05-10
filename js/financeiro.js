document.getElementById('finance-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor').value.replace(',', '.'));
    const listaFinanceiro = document.getElementById('lista-financeiro');
  
    if (descricao === '' || isNaN(valor) || valor <= 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }
  
    const li = document.createElement('li');
    li.textContent = `${tipo === 'receita' ? '+' : '-'} R$ ${valor.toFixed(2)} - ${descricao}`;
    li.classList.add(tipo === 'receita' ? 'receita' : 'despesa');
  
    listaFinanceiro.appendChild(li);
  
    // Limpa campos
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
  });
  