import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.appspot.com",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elementos
const abas = document.querySelectorAll('.tab-btn');
const conteudos = document.querySelectorAll('.tab-conteudo');
const listaProdutos = document.getElementById('lista-produtos');
const form = document.getElementById('form-produto');
const inputNome = document.getElementById('inputNomeRestaurante');
const inputHorario = document.getElementById('inputHorarioRestaurante');
const inputLogo = document.getElementById('inputLogoRestaurante');
const btnSalvarConf = document.getElementById('salvar-config');

// troca de abas
abas.forEach(btn => btn.onclick = () => {
  abas.forEach(b => b.classList.remove('ativo'));
  conteudos.forEach(c => c.style.display='none');
  btn.classList.add('ativo');
  document.getElementById(`tab-${btn.dataset.tab}`).style.display = 'block';
});

// inicializa com aba produtos
abas[0].click();

// produtos
onValue(ref(db, 'produtos/'), snap => {
  const data = snap.val() || {};
  listaProdutos.innerHTML = '';
  Object.entries(data).forEach(([id,p]) => {
    const div = document.createElement('div');
    div.className = 'admin-card';
    div.innerHTML = `
      <img src="${p.imagem}" />
      <h3>${p.nome}</h3><p>${p.descricao}</p>
      <strong>R$ ${p.preco.toFixed(2)}</strong>
      <div><button onclick="togglePause('${id}', ${p.pausado})">${p.pausado ? 'Despausar' : 'Pausar'}</button>
      <button onclick="deleteProd('${id}')">Excluir</button></div>`;
    listaProdutos.appendChild(div);
  });
});

// salvar produto
form.onsubmit = e => {
  e.preventDefault();
  const file = document.getElementById('imagemProduto').files[0];
  const reader = new FileReader();
  reader.onload = () => {
    push(ref(db,'produtos/'), {
      nome: document.getElementById('nomeProduto').value,
      descricao: document.getElementById('descricaoProduto').value,
      preco: parseFloat(document.getElementById('precoProduto').value),
      imagem: reader.result,
      pausado: false
    });
    form.reset();
    abas[0].click();
  };
  reader.readAsDataURL(file);
};

// salvar configurações
btnSalvarConf.onclick = () => {
  const conf = {
    nome: inputNome.value,
    horario: inputHorario.value
  };
  const file = inputLogo.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = () => {
      set(ref(db,'config/'), {...conf, logo: r.result});
    };
    r.readAsDataURL(file);
  } else {
    set(ref(db,'config/'), conf);
  }
};

// funções globais para pausar/excluir
window.togglePause = (id, atual) =>
  set(ref(db, `produtos/${id}/pausado`), !atual);
window.deleteProd = id =>
  set(ref(db, `produtos/${id}`), null);
