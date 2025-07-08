let carrinho = [];
let total = 0;

function adicionarCarrinho(produto) {
  carrinho.push(produto);
  total += produto.preco;

  const li = document.createElement("li");
  li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("itensCarrinho").appendChild(li);
  document.getElementById("total").textContent = total.toFixed(2);

  const noti = document.getElementById("notificacao");
  noti.style.opacity = "1";
  setTimeout(() => {
    noti.style.opacity = "0";
  }, 1000);
}

function limparCarrinho() {
  carrinho = [];
  total = 0;
  document.getElementById("itensCarrinho").innerHTML = "";
  document.getElementById("total").textContent = "0.00";
}

function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("oculto");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.add("oculto");
}

function alternarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  carrinhoDiv.classList.toggle("oculto");
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (!endereco || !pagamento) {
    alert("Por favor, preencha o endereço e a forma de pagamento.");
    return;
  }

  let mensagem = "*🛒 Novo Pedido - Jirê Sushi*%0A%0A";
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });
  mensagem += `%0ATotal: *R$ ${total.toFixed(2)}*%0A`;
  mensagem += `%0A📍 Endereço: ${encodeURIComponent(endereco)}%0A💳 Pagamento: ${encodeURIComponent(pagamento)}`;

  const telefone = "SEU_NUMERO_AQUI";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

// --- STATUS DA LOJA ---
const statusLoja = document.getElementById("statusLoja");
const hora = new Date().getHours();
statusLoja.textContent = (hora >= 18 && hora <= 23)
  ? "🟢 Estamos abertos!"
  : "🔴 Loja fechada (atendemos das 18h às 23h)";

// --- CARDÁPIO (exemplo) ---
const produtos = [
  { nome: "Combinado 1 (18 peças)", preco: 37.90, categoria: "Combinados" },
  { nome: "Combinado 2 (24 peças)", preco: 46.90, categoria: "Combinados" },
  { nome: "Sashimi Trufado", preco: 47.90, categoria: "Especiais" },
  { nome: "Temaki Flor de Sal", preco: 36.99, categoria: "Especiais" },
  { nome: "Hot Holl 10 unid", preco: 19.99, categoria: "Hot Holls" },
  { nome: "Temaki Salmão Completo", preco: 25.99, categoria: "Temakis" }
];

const cardapio = document.getElementById("cardapio");
const categorias = [...new Set(produtos.map(p => p.categoria))];

categorias.forEach(cat => {
  const catDiv = document.createElement("div");
  catDiv.classList.add("categoria");

  const h2 = document.createElement("h2");
  h2.textContent = cat;
  catDiv.appendChild(h2);

  produtos.filter(p => p.categoria === cat).forEach(produto => {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add("produto");
    prodDiv.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick='adicionarCarrinho(${JSON.stringify(produto)})'>Adicionar</button>
    `;
    catDiv.appendChild(prodDiv);
  });

  cardapio.appendChild(catDiv);
});
