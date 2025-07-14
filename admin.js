// admin.js
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let config = JSON.parse(localStorage.getItem('config')) || {
  nome: 'Meu Restaurante',
  whatsapp: ''
};

function mostrarSecao(secao) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(`secao-${secao}`).style.display = 'block';
  if (secao === 'produtos') renderizarProdutos();
  if (secao === 'config') carregarConfiguracoes();
}

function renderizarProdutos() {
  const container = document.getElementById('lista-produtos');
  if (!container) return;
  container.innerHTML = '';

  produtos.forEach((produto, index) => {
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${produto.imagem || ''}" width="80" />
      <div>
        <strong>${produto.nome}</strong><br>
        ${produto.descricao || ''}<br>
        <strong>R$ ${produto.preco.toFixed(2)}</strong>
      </div>
      <div>
        <button onclick="pausarProduto(${index})">${produto.pausado ? 'Ativar' : 'Pausar'}</button>
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

document.addEventListener('DOMContentLoaded', () => {
  const formProduto = document.getElementById('form-produto');
  if (formProduto) {
    formProduto.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nomeProduto').value.trim();
      const descricao = document.getElementById('descricaoProduto').value.trim();
      const preco = parseFloat(document.getElementById('precoProduto').value);
      const imagemInput = document.getElementById('imagemProduto');

      if (!imagemInput.files.length) {
        alert('Escolha uma imagem.');
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
        formProduto.reset();
        mostrarSecao('produtos');
      };
      reader.readAsDataURL(imagemInput.files[0]);
    });
  }

  const formConfig = document.getElementById('form-config');
  if (formConfig) {
    formConfig.addEventListener('submit', function (e) {
      e.preventDefault();
      config.nome = document.getElementById('nomeEstabelecimento').value.trim();
      config.whatsapp = document.getElementById('numeroWhatsapp').value.trim();
      localStorage.setItem('config', JSON.stringify(config));
      alert('Configurações salvas com sucesso.');
    });
  }

  mostrarSecao('produtos');
});

function carregarConfiguracoes() {
  if (document.getElementById('nomeEstabelecimento')) {
    document.getElementById('nomeEstabelecimento').value = config.nome || '';
    document.getElementById('numeroWhatsapp').value = config.whatsapp || '';
  }
}

function obterConfiguracoes() {
  return config;
}
