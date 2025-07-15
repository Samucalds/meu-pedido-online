import { db } from './firebase-config.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let carrinho = [];

onSnapshot(collection(db, 'produtos'), snapshot => {
  const cardapio = document.getElementById('cardapio');
  cardapio.innerHTML = '';
  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    if (!p.pausado) {
      const div = document.createElement('div');
      div.className = 'produto';
      div.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}" />
        <h3>${p.nome}</h3><p>${p.descricao}</p><strong>R$ ${p.preco.toFixed(2)}</strong>
        <button onclick="adicionarAoCarrinho('${p.nome}', ${p.preco})">Adicionar</button>
      `;
      cardapio.appendChild(div);
    }
  });
});

window.adicionarAoCarrinho = (nome, preco) => {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
};

function atualizarCarrinho() {
  document.getElementById('listaSacola').innerHTML = '';
  let total = 0;
  carrinho.forEach((item, i) => {
    total += item.preco;
    document.getElementById('listaSacola').innerHTML += `
      <li>${item.nome} - R$${item.preco.toFixed(2)}
      <button onclick="removerItem(${i})">x</button></li>`;
  });
  document.getElementById('quantidade-sacola').innerText = carrinho.length;
  document.getElementById('total-sacola').innerText = total.toFixed(2);
}

window.removerItem = i => { carrinho.splice(i,1); atualizarCarrinho(); };
window.esvaziarSacola = () => { carrinho = []; atualizarCarrinho(); };
window.toggleSacola = () => document.getElementById('sacola').classList.toggle('aberta');
window.finalizarPedido = () => {
  if (!carrinho.length) return alert('Sacola vazia!');
  const nome = nomeCliente.value.trim(), endereco = enderecoCliente.value.trim(), pag = pagamentoCliente.value;
  if (!nome || !endereco) return alert('Preencha nome e endereço!');
  let text = `Pedido de ${nome}%0A`;
  carrinho.forEach(item => { text += `${item.nome} - R$${item.preco.toFixed(2)}%0A`; });
  text += `%0APagamento: ${pag}%0AEnd: ${endereco}`;
  const numero = localStorage.getItem('whatsapp') || '5599999999999';
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(text)}`, '_blank');
};
