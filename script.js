// Carrega Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = { /* seu config aqui */ };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Carrega configurações
const nomeRest = document.getElementById('nomeRestaurante');
const horarioRest = document.getElementById('horarioRestaurante');
const logoEl = document.getElementById('logoRestaurante');
onValue(ref(db, 'config/'), snap => {
  const conf = snap.val() || {};
  nomeRest.textContent = conf.nome || "Meu Restaurante";
  horarioRest.textContent = `Horário: ${conf.horario || "--:-- às --:--"}`;
  if (conf.logo) {
    logoEl.src = conf.logo;
    logoEl.style.display = 'inline-block';
  }
});

// Carrega produtos
const container = document.getElementById('container-produtos');
onValue(ref(db, 'produtos/'), snap => {
  const data = snap.val() || {};
  container.innerHTML = '';
  Object.entries(data).forEach(([id, p]) => {
    if (!p.pausado) {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${p.imagem}" />
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <strong>R$ ${p.preco.toFixed(2)}</strong>
        <button class="btn-adicionar" data-id="${id}">Adicionar</button>`;
      container.appendChild(div);
      div.querySelector('.btn-adicionar').onclick = () => adicionarCarrinho(id, p);
    }
  });
});

// Carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
function adicionarCarrinho(id, p) {
  carrinho[id] = carrinho[id] + 1 || 1;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}
function atualizarCarrinho() {
  const totalEl = document.getElementById('contador-sacola');
  const count = Object.values(carrinho).reduce((a,b)=>a+b,0);
  totalEl.textContent = count;
}
atualizarCarrinho();

// Carrinho popup
const botaoCarrinho = document.getElementById('botao-carrinho');
const painel = document.getElementById('painel-carrinho');
botaoCarrinho.onclick = () => painel.classList.toggle('mostrar');

function mostrarItensCarrinho() {
  const cont = document.getElementById('itens-carrinho');
  cont.innerHTML = '';
  let total = 0;
  Object.entries(carrinho).forEach(([id, qty]) => {
    onValue(ref(db, `produtos/${id}`), snap => {
      const p = snap.val();
      if (p) {
        cont.innerHTML += `<p>${p.nome} x ${qty} = R$ ${(p.preco * qty).toFixed(2)}</p>`;
        total += p.preco * qty;
      }
      document.getElementById('total-carrinho').textContent = total.toFixed(2);
    }, {onlyOnce:true});
  });
}

// Lógica de enviar para WhatsApp
document.getElementById('enviar-whatsapp').onclick = () => {
  // verifica campos, monta mensagem...
};

// Atualiza carrinho exibido
setInterval(mostrarItensCarrinho, 1000);
