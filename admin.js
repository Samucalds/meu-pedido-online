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

function carregarProdutos() {
  const container = document.getElementById('listaProdutos');
  db.collection("produtos").get().then(snapshot => {
    container.innerHTML = '';
    snapshot.forEach(doc => {
      const p = doc.data();
      const div = document.createElement('div');
      div.className = 'produto';
      div.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>
        <div class="botoes">
          <button class="btn-pausar" onclick="alternarPausado('${doc.id}', ${p.pausado})">${p.pausado ? 'Ativar' : 'Pausar'}</button>
          <button class="btn-excluir" onclick="excluirProduto('${doc.id}')">Excluir</button>
        </div>
      `;
      container.appendChild(div);
    });
  });
}

function excluirProduto(id) {
  if (confirm('Deseja excluir este produto?')) {
    db.collection('produtos').doc(id).delete().then(carregarProdutos);
  }
}

function alternarPausado(id, pausadoAtual) {
  db.collection('produtos').doc(id).update({ pausado: !pausadoAtual }).then(carregarProdutos);
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
