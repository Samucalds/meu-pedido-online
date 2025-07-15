firebase.initializeApp({
  apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.appspot.com",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
});
const db = firebase.firestore();

const sacola = [];
function carregarProdutos() {
  const secao = document.getElementById('cardapio');
  secao.innerHTML = '';
  db.collection("produtos")
    .where("pausado", "==", false)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const p = doc.data();
        const div = document.createElement('div');
        div.className = 'produto-card';
        div.innerHTML = `
          <img src="${p.imagem}" />
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>
          <button onclick="adicionarAoCarrinho(${doc.id})">Adicionar</button>`;
        secao.appendChild(div);
      });
    });
}

function adicionarAoCarrinho(id) {
  db.collection("produtos").doc(id).get().then(doc => {
    sacola.push(doc.data());
    atualizarCarrinho();
  });
}

function atualizarCarrinho() {
  const cont = document.getElementById('contagem-carrinho');
  cont.textContent = sacola.length;
  // atualize também a lista do carrinho, total, etc.
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  atualizarCarrinho();
});
