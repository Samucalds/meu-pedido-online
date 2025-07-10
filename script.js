let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function carregarProdutos() {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  produtos.forEach((produto, index) => {
    if (produto.pausado) return;

    const div = document.createElement('div');
    div.className = 'produto';

    const img = document.createElement('img');
    img.src = produto.imagem || '';
    img.alt = 'Imagem do produto';

    const info = document.createElement('div');
    info.innerHTML = `<strong>${produto.nome}</strong><br>${produto.descricao}<br><strong>R$ ${produto.preco.toFixed(2)}</strong>`;

    const botao = document.createElement('button');
    botao.textContent = 'Adicionar';
    botao.onclick = () => adicionarAoCarrinho(index);

    div.appendChild(img);
    div.appendChild(info);
    div.appendChild(botao);

    container.appendChild(div);
  });
}

let carrinho = [];

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('itens-carrinho');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item) => {
    total += parseFloat(item.preco);
    const p = document.createElement('p');
    p.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(p);
  });

  totalSpan.textContent = total.toFixed(2);
}

function esvaziarCarrinho() {
  carrinho = [];
  atualizarCarrinho();
}

document.getElementById('formulario-pedido').addEventListener('submit', function (e) {
  e.preventDefault();
  if (carrinho.length === 0) return alert('Carrinho vazio');

  const nome = document.getElementById('nomeCliente').value;
  const pagamento = document.getElementById('formaPagamento').value;
  const endereco = document.getElementById('endereco').value;

  let mensagem = `*Pedido Jirê Sushi*%0A`;
  carrinho.forEach((item) => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });

  mensagem += `%0ATotal: R$ ${document.getElementById('total').textContent}%0A`;
  mensagem += `%0A*Nome:* ${nome}%0A*Pagamento:* ${pagamento}%0A*Endereço:* ${endereco}`;

  const url = `https://wa.me/SEUNUMEROAQUI?text=${mensagem}`;
  window.open(url, '_blank');
});
