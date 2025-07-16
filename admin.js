// admin.js
import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.mostrarSecao = function(sec) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(`secao-${sec}`).style.display = 'block';
};

function renderizarProdutos(snapshot) {
  const lista = document.getElementById('lista-produtos');
  lista.innerHTML = '';
  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" />
      <div>
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <strong>R$ ${p.preco.toFixed(2)}</strong>
      </div>
      <div class="botoes">
        <button onclick="toggleAtivo('${docSnap.id}', ${p.pausado})">
          ${p.pausado ? 'Ativar' : 'Pausar'}
        </button>
        <button onclick="removerProduto('${docSnap.id}')">Excluir</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

window.toggleAtivo = async (id, atual) => {
  await updateDoc(doc(db, 'produtos', id), { pausado: !atual });
};

window.removerProduto = async (id) => {
  if (confirm("Deseja excluir este produto?")) {
    await deleteDoc(doc(db, 'produtos', id));
  }
};

onSnapshot(collection(db, 'produtos'), renderizarProdutos);

document.getElementById('form-produto').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = nomeProduto.value.trim();
  const descricao = descricaoProduto.value.trim();
  const preco = parseFloat(precoProduto.value);
  const file = imagemProduto.files[0];
  if (!file) return alert("Escolha uma imagem!");

  const reader = new FileReader();
  reader.onload = async () => {
    await addDoc(collection(db, 'produtos'), {
      nome, descricao, preco, imagem: reader.result, pausado: false
    });
    form.produto.reset();
    mostrarSecao('produtos');
  };
  reader.readAsDataURL(file);
});

mostrarSecao('produtos');
