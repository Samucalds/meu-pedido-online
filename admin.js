import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', carregarProdutos);

async function carregarProdutos() {
  const container = document.getElementById('listaProdutos');
  container.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "produtos"));
  querySnapshot.forEach((docSnap) => {
    const p = docSnap.data();
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${p.imagem}" />
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>
      <div class="botoes">
        <button onclick="togglePausar('${docSnap.id}', ${p.pausado})">${p.pausado ? 'Ativar' : 'Pausar'}</button>
        <button onclick="excluirProduto('${docSnap.id}')">Excluir</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function excluirProduto(id) {
  await deleteDoc(doc(db, "produtos", id));
  carregarProdutos();
}

async function togglePausar(id, estadoAtual) {
  const ref = doc(db, "produtos", id);
  await updateDoc(ref, { pausado: !estadoAtual });
  carregarProdutos();
}
