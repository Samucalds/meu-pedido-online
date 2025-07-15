import { db, collection, addDoc, getDocs } from './firebase-config.js';

const form = document.getElementById('form-produto');
const lista = document.getElementById('lista-produtos');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeProduto').value;
  const descricao = document.getElementById('descricaoProduto').value;
  const preco = parseFloat(document.getElementById('precoProduto').value);
  const imagemInput = document.getElementById('imagemProduto');

  const reader = new FileReader();
  reader.onload = async function () {
    const imagemBase64 = reader.result;
    await addDoc(collection(db, "produtos"), {
      nome,
      descricao,
      preco,
      imagem: imagemBase64,
      pausado: false
    });
    alert("Produto adicionado com sucesso!");
    form.reset();
    mostrarSecao('produtos');
    renderizarProdutos();
  };
  reader.readAsDataURL(imagemInput.files[0]);
});

async function renderizarProdutos() {
  lista.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, "produtos"));
  querySnapshot.forEach((doc) => {
    const produto = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${produto.imagem}" width="80" />
      <div>
        <strong>${produto.nome}</strong><br>
        ${produto.descricao}<br>
        R$ ${produto.preco.toFixed(2)}
      </div>
    `;
    lista.appendChild(div);
  });
}

function mostrarSecao(secao) {
  document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');
  document.getElementById(`secao-${secao}`).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', renderizarProdutos);
