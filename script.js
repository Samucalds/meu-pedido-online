function carregarConfig() {
  const config = JSON.parse(localStorage.getItem('configLoja')) || {};
  document.getElementById('nomeLoja').innerText = config.nome || 'Minha Loja';
  document.getElementById('statusLoja').innerText = config.funcionamento
    ? `Funcionamento: ${config.funcionamento}`
    : 'Funcionamento: --';
}

function carregarProdutos() {
  const lista = document.getElementById('produtos');
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  lista.innerHTML = '';

  produtos.forEach((p, index) => {
    if (p.pausado) return;

    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong><br>
      <button onclick="adicionarSacola(${index})">Adicionar</button>
    `;
    lista.appendChild(div);
  });
}

let sacola = [];

function adicionarSacola(index) {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const produto = produtos[index];

  const item = sacola.find(p => p.nome === produto.nome);
  if (item) {
    item.qtd += 1;
  } else {
    sacola.push({ ...produto, qtd: 1 });
  }

  atualizarSacola();
}

function atualizarSacola() {
  const contador = document.getElementById('contadorSacola');
  const totalItens = sacola.reduce((s, p) => s + p.qtd, 0);
  contador.innerText = `Sacola ${totalItens}`;
}

function abrirSacola() {
  const div = document.getElementById('sacola');
  div.innerHTML = '<h3>Sacola</h3>';
  sacola.forEach((p, i) => {
    div.innerHTML += `
      <p>${p.qtd}x ${p.nome} - R$ ${(p.qtd * parseFloat(p.preco)).toFixed(2)}
      <button onclick="removerItem(${i})">Remover</button></p>
    `;
  });
  div.style.display = 'block';
}

function removerItem(i) {
  sacola.splice(i, 1);
  atualizarSacola();
  abrirSacola();
}

function enviarPedido() {
  if (sacola.length === 0) {
    alert('Sua sacola está vazia!');
    return;
  }

  const nome = document.getElementById('nomeCliente').value.trim();
  const endereco = document.getElementById('enderecoCliente').value.trim();
  const pagamento = document.getElementById('pagamentoCliente').value;

  if (!nome || !endereco) {
    alert('Preencha seu nome e endereço!');
    return;
  }

  const config = JSON.parse(localStorage.getItem('configLoja')) || {};
  const numero = config.whatsapp?.replace(/\D/g, '');

  if (!numero) {
    alert('Número do WhatsApp da loja não configurado!');
    return;
  }

  let msg = `*Pedido para ${config.nome || 'Minha Loja'}*%0A`;
  msg += `👤 Nome: ${nome}%0A`;
  msg += `🏠 Endereço: ${endereco}%0A`;
  msg += `💳 Pagamento: ${pagamento}%0A`;
  msg += `%0A🛍️ *Itens:*%0A`;

  let total = 0;
  sacola.forEach(p => {
    msg += `- ${p.qtd}x ${p.nome} (R$ ${(p.qtd * parseFloat(p.preco)).toFixed(2)})%0A`;
    total += p.qtd * parseFloat(p.preco);
  });

  msg += `%0A💰 *Total:* R$ ${total.toFixed(2)}%0A`;
  msg += `%0A🕒 Pedido gerado em: ${new Date().toLocaleString('pt-BR')}`;

  const url = `https://wa.me/55${numero}?text=${msg}`;
  window.open(url, '_blank');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('nomeLoja')) {
    carregarConfig();
    carregarProdutos();
  }
});
