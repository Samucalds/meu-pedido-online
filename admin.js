import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, onSnapshot, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const lista = document.getElementById('lista-produtos');
const form = document.getElementById('form-produto');

function mostrarSecao(secao) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(`secao-${secao}`).style.display = 'block';
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const nome = nomeProduto.value, descricao = descricaoProduto.value;
  const preco = parseFloat(precoProduto.value);
  const imagemFile = imagemProduto.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    await addDoc(collection(db, 'produtos'), { nome, descricao, preco, imagem: reader.result, pausado: false });
    alert('Produto salvo!');
    form.reset(); mostrarSecao('produtos');
  };
  reader.readAsDataURL(imagemFile);
});

function renderizarProdutos(snapshot) {
  lista.innerHTML = '';
  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const div = document.createElement('div');
    div.className = 'produto';
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" />
      <div><strong>${p.nome}</strong><p>${p.descricao}</p><strong>R$ ${p.preco.toFixed(2)}</strong></div>
      <div class="botoes">
        <button class="btn-pausar">${p.pausado ? 'Ativar' : 'Pausar'}</button>
        <button class="btn-excluir">Excluir</button>
      </div>
    `;
    div.querySelector('.btn-pausar').onclick = async () => {
      await updateDoc(doc(db, 'produtos', docSnap.id), { pausado: !p.pausado });
    };
    div.querySelector('.btn-excluir').onclick = async () => {
      if (confirm('Excluir produto?')) await deleteDoc(doc(db, 'produtos', docSnap.id));
    };
    lista.appendChild(div);
  });
}

onSnapshot(collection(db, 'produtos'), renderizarProdutos);
mostrarSecao('produtos');
