let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let config = JSON.parse(localStorage.getItem('config')) || {
  nome: 'Meu Restaurante',
  horario: '18h às 23h',
  whatsapp: ''
};

document.getElementById('tituloRestaurante').innerText = config.nome;
document.getElementById('horarioFuncionamento').innerText = `Funcionamento: ${config.horario}`;

const container = document.getElementById('produtos');

function renderizarProdutos() {
  container.innerHTML = '';
  produtos.filter(p => !p.pausado).forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'produto';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <strong>R$ ${produto.preco.toFixed(2)}</strong><br>
      <button onclick="adicionarSacola(${index})">Adicionar</button>
    `;
    container.appendChild(card);
  });
}

renderizarProdutos();

// SACOLA (carrinho)
let sacola = [];

function atualizarSacola() {
  document.getElementById('contadorSacola').innerText = sacola.length;
  const lista = document.getElementById('listaSacola');
  lista.innerHTML = '';
  let total = 0;

  sacola.forEach((item, i) => {
    total += item.preco;
    const div = document.createElement('div');
    div.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerSacola(${i})">Remover</button>`;
    lista.appendChild(div);
  });

  document.getElementById('totalSacola').innerText = total.toFixed(2);
}

function adicionarSacola(index) {
  const produto = produtos[index];
  sacola.push(produto);
  atualizarSacola();
}

function removerSacola(index) {
  sacola.splice(index, 1);
  atualizarSacola();
}

document.getElementById('sacolaBtn').addEventListener('click', () => {
  const sacolaEl = document.getElementById('sacola');
  sacolaEl.style.display = sacolaEl.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('enviarWhatsapp').addEventListener('click', () => {
  if (!sacola.length) {
    alert('Sua sacola está vazia.');
    return;
  }

  const nome = document.getElementById('nomeCliente').value.trim();
  const endereco = document.getElementById('enderecoCliente').value.trim();
  const pagamento = document.getElementById('pagamentoCliente').value;

  if (!nome || !endereco) {
    alert('Preencha todos os dados.');
    return;
  }

  let mensagem = `Pedido de ${nome}%0A`;
  mensagem += `Endereço: ${endereco}%0A`;
  mensagem += `Forma de pagamento: ${pagamento}%0A%0A`;

  sacola.forEach(item => {
    mensagem += `🛍️ ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });

  const total = sacola.reduce((acc, item) => acc + item.preco, 0);
  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  const numero = config.whatsapp.replace(/\D/g, '');
  window.open(`https://wa.me/55${numero}?text=${mensagem}`, '_blank');
});
