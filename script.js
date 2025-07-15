// Importar do firebase-config.js
import { db } from './firebase-config.js';
import { collection, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

let carrinho = [];

// Buscar produtos do Firestore em tempo real
function carregarProdutos() {
  const container = document.getElementById('lista-produtos');
  container.innerHTML = '';

  onSnapshot(collection(db, 'produtos'), (snapshot) => {
    container.innerHTML = '';
    snapshot.forEach(doc => {
      const p = doc.data();
      if (!p.pausado) {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
          <img src="${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong><br>
          <button onclick="adicionarAoCarrinho('${p.nome}', ${p.preco})">Adicionar à sacola</button>
        `;
        container.appendChild(div);
      }
    });
  });
}

// Adiciona item à sacola
window.adicionarAoCarrinho = function(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarSacola();
  abrirSacola();
}

// Atualiza o conteúdo da sacola
function atualizarSacola() {
  const lista = document.getElementById('itens-sacola');
  const totalSpan = document.getElementById('total-sacola');
  lista.innerHTML = '';

  let total = 0;
  carrinho.forEach((item, i) => {
    total += item.preco;
    const li = document.createElement('li');
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerItem(${i})">x</button>`;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
  document.getElementById('sacola-vazia').style.display = carrinho.length === 0 ? 'block' : 'none';
}

// Remove item da sacola
window.removerItem = function(index) {
  carrinho.splice(index, 1);
  atualizarSacola();
}

// Finaliza pedido e envia para WhatsApp
window.finalizarPedido = function() {
  if (carrinho.length === 0) {
    alert('Sua sacola está vazia!');
    return;
  }

  const nome = document.getElementById('nomeCliente').value.trim();
  const endereco = document.getElementById('enderecoCliente').value.trim();
  const pagamento = document.getElementById('pagamentoCliente').value.trim();

  if (!nome || !endereco || !pagamento) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  let mensagem = `📦 *Novo Pedido de ${nome}*\n\n`;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
  });

  let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  mensagem += `\n💰 *Total:* R$ ${total.toFixed(2)}\n\n`;
  mensagem += `📍 *Endereço:* ${endereco}\n💳 *Pagamento:* ${pagamento}`;

  const numero = localStorage.getItem('whatsapp') || '5599999999999'; // número padrão
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}

// Abrir e fechar sacola
function abrirSacola() {
  document.getElementById('sacola').classList.add('aberta');
}
window.toggleSacola = function() {
  document.getElementById('sacola').classList.toggle('aberta');
}
window.esvaziarCarrinho = function() {
  carrinho = [];
  atualizarSacola();
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  atualizarSacola();
});
