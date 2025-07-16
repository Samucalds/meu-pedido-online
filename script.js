import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let carrinho = [];

document.addEventListener("DOMContentLoaded", async () => {
  await carregarProdutos();
  atualizarCarrinho();
});

async function carregarProdutos() {
  const container = document.getElementById('cardapio');
  container.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "produtos"));
  querySnapshot.forEach((doc) => {
    const p = doc.data();
    if (p.pausado) return;

    const item = document.createElement("div");
    item.className = "produto";
    item.innerHTML = `
      <img src="${p.imagem}" />
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>
      <button onclick='adicionarCarrinho(${JSON.stringify(p)})'>Adicionar à sacola</button>
    `;
    container.appendChild(item);
  });
}

function adicionarCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  lista.innerHTML = '';

  let total = 0;

  carrinho.forEach((item, i) => {
    total += parseFloat(item.preco);
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${parseFloat(item.preco).toFixed(2)}`;
    lista.appendChild(li);
  });

  document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}
