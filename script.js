// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.appspot.com",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Sacola
let sacola = JSON.parse(localStorage.getItem('sacola')) || [];

function salvarSacola() {
  localStorage.setItem('sacola', JSON.stringify(sacola));
  document.getElementById("quantidade-sacola").innerText = sacola.length;
}

function renderizarProdutos(produtos) {
  const container = document.getElementById('cardapio');
  container.innerHTML = '';
  produtos.forEach(prod => {
    if (prod.pausado) return;
    const item = document.createElement('div');
    item.className = 'produto';
    item.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}" style="width: 100%; border-radius: 8px;">
      <h3>${prod.nome}</h3>
      <p>${prod.descricao}</p>
      <strong>R$ ${parseFloat(prod.preco).toFixed(2)}</strong><br>
      <button onclick='adicionarSacola(${JSON.stringify(prod)})'>Adicionar</button>
    `;
    container.appendChild(item);
  });
}

function adicionarSacola(produto) {
  sacola.push(produto);
  salvarSacola();
  alert('Adicionado à sacola!');
}

function abrirSacola() {
  const div = document.getElementById('sacola');
  div.style.display = div.style.display === 'none' ? 'block' : 'none';
  atualizarSacola();
}

function atualizarSacola() {
  const lista = document.getElementById('itens-sacola');
  lista.innerHTML = '';
  sacola.forEach((item, i) => {
    const div = document.createElement('div');
    div.innerHTML = `${item.nome} - R$ ${parseFloat(item.preco).toFixed(2)} <button onclick="removerItem(${i})">❌</button>`;
    lista.appendChild(div);
  });
}

function removerItem(i) {
  sacola.splice(i, 1);
  salvarSacola();
  atualizarSacola();
}

function esvaziarSacola() {
  sacola = [];
  salvarSacola();
  atualizarSacola();
}

function enviarPedido() {
  if (sacola.length === 0) {
    alert('Sua sacola está vazia!');
    return;
  }
  const nome = document.getElementById('nomeCliente').value;
  const endereco = document.getElementById('enderecoCliente').value;
  const pagamento = document.getElementById('pagamentoCliente').value;

  let texto = `*Pedido:*%0A`;
  sacola.forEach((p, i) => {
    texto += `${i + 1}. ${p.nome} - R$ ${parseFloat(p.preco).toFixed(2)}%0A`;
  });
  texto += `%0A*Nome:* ${nome}%0A*Endereço:* ${endereco}%0A*Pagamento:* ${pagamento}`;

  const numero = 'SEUNUMEROAQUI'; // substitua pelo seu número com DDI (ex: 5581999999999)
  window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

// Carregar produtos do Firestore
firebase.firestore().collection('produtos').onSnapshot(snapshot => {
  const produtos = [];
  snapshot.forEach(doc => produtos.push(doc.data()));
  renderizarProdutos(produtos);
});

salvarSacola();
