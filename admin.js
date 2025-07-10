// admin.js

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function mostrarSecao(secao) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(`secao-${secao}`).style.display = 'block';

  if (secao === 'produtos') renderizarProdutos();
}

function renderizarProdutos() {
  const container = document.getElementById('lista-produtos');
  container.innerHTML = '';

  produtos.forEach((produto, index) => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${produto.imagem || ''}" width="80" />
      <div>
        <strong>${produto.nome}</strong><br>
        ${produto.descricao || ''}<br>
        <strong>R$ ${parseFloat(produto.preco).toFixed(2)}</strong>
      </div>
      <div>
        <button onclick="pausarProduto(${index})">
          ${produto.pausado ? 'Ativar' : 'Pausar'}
        </button>
        <button onclick="excluirProduto(${index})">Excluir</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function pausarProduto(index) {
  produtos[index].pausado = !produtos[index].pausado;
  salvarProdutos();
  renderizarProdutos();
}

function excluirProduto(index) {
  if (confirm('Tem certeza que deseja excluir?')) {
    produtos.splice(index, 1);
    salvarProdutos();
    renderizarProdutos();
  }
}

function salvarProdutos() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

document.getElementById('form-produto').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nomeProduto').value;
  const descricao = document.getElementById('descricaoProduto').value;
  const precoRaw = document.getElementById('precoProduto').value;
  const preco = parseFloat(precoRaw.replace(',', '.'));
  const imagemInput = document.getElementById('imagemProduto');

  if (!imagemInput.files.length) {
    alert("Selecione uma imagem do produto.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    produtos.push({
      nome,
      descricao,
      preco,
      imagem: reader.result,
      pausado: false
    });
    salvarProdutos();
    document.getElementById('form-produto').reset();
    mostrarSecao('produtos');
  };
  reader.readAsDataURL(imagemInput.files[0]);
});

// Iniciar com a seção de produtos visível
if (window.location.pathname.includes('admin.html')) {
  mostrarSecao('produtos');
}
