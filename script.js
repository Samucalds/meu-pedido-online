// script.js

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let carrinho = [];

function carregarProdutos() {
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';

  produtos
    .filter(p => !p.pausado)
    .forEach((produto, index) => {
      const div = document.createElement('div');
      div.className = 'produto-card';
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <strong>R$ ${produto.preco.toFixed(2)}</strong>
        <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
      `;
      container.appendChild(div);
    });
}

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
  alert("Produto adicionado à sacola!");
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total-carrinho');
  lista.innerHTML = '';

  let soma = 0;
  carrinho.forEach((item, i) => {
    soma += item.preco;
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
  });

  total.textContent = `R$ ${soma.toFixed(2)}`;
}

function toggleCarrinho() {
  const carrinhoEl = document.getElementById('carrinho');
  carrinhoEl.classList.toggle('oculto');
}

function esvaziarCarrinho() {
  carrinho = [];
  atualizarCarrinho();
}

function enviarPedidoWhatsApp() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const nome = document.getElementById('nomeCliente').value.trim();
  const endereco = document.getElementById('enderecoCliente').value.trim();
  const pagamento = document.getElementById('pagamentoCliente').value;

  if (!nome || !endereco) {
    alert("Preencha todos os campos!");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome}%0AEndereço: ${endereco}%0AForma de Pagamento: ${pagamento}%0A%0APedido:%0A`;
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} R$ ${item.preco.toFixed(2)}%0A`;
    total += item.preco;
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  const numero = '5511967245949'; // Substitua pelo seu número
  window.open(`https://wa.me/${5511967245949}?text=${mensagem}`, '_blank');
}

carregarProdutos();
