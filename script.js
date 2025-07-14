// script.js
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let carrinho = [];

function renderizarCardapio() {
  const container = document.getElementById('produtos');
  if (!container) return;
  container.innerHTML = '';

  produtos.filter(p => !p.pausado).forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'card-produto';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <strong>R$ ${produto.preco.toFixed(2)}</strong>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
    `;
    container.appendChild(card);
  });
}

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarSacola();
}

function atualizarSacola() {
  const sacola = document.getElementById('sacola');
  const contador = document.getElementById('contadorSacola');
  if (!sacola) return;

  sacola.innerHTML = '';
  let total = 0;
  carrinho.forEach((item, i) => {
    total += item.preco;
    sacola.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerDoCarrinho(${i})">x</button></p>`;
  });

  sacola.innerHTML += `<hr><p><strong>Total: R$ ${total.toFixed(2)}</strong></p>
  <button onclick="esvaziarCarrinho()">Esvaziar</button>`;

  contador.textContent = carrinho.length;
}

function removerDoCarrinho(i) {
  carrinho.splice(i, 1);
  atualizarSacola();
}

function esvaziarCarrinho() {
  carrinho = [];
  atualizarSacola();
}

function toggleSacola() {
  const sacola = document.getElementById('sacola');
  sacola.style.display = sacola.style.display === 'none' ? 'block' : 'none';
}

function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    alert('A sacola está vazia.');
    return;
  }

  const nome = document.getElementById('nomeCliente').value;
  const endereco = document.getElementById('enderecoCliente').value;
  const pagamento = document.getElementById('pagamentoCliente').value;
  const config = JSON.parse(localStorage.getItem('config')) || {};
  const numero = config.numero || 'SEUNUMEROAQUI';

  let mensagem = `*Pedido de ${nome}*\n`;
  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
  });
  mensagem += `\n*Endereço:* ${endereco}\n*Pagamento:* ${pagamento}\n*Total:* R$ ${carrinho.reduce((t, p) => t + p.preco, 0).toFixed(2)}`;

  const url = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url);
}

renderizarCardapio();
