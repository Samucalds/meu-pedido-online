const produtos = [
  { nome: "Combinado 1 (18 peças)", preco: 37.90, categoria: "Combinados" },
  { nome: "Combinado 2 (24 peças)", preco: 46.90, categoria: "Combinados" },
  { nome: "Combinado 3 (30 peças)", preco: 45.99, categoria: "Combinados" },
  { nome: "Combinado 4 (40 peças)", preco: 59.99, categoria: "Combinados" },
  { nome: "Combinado 5 (60 peças + 2 mini temakis)", preco: 95.99, categoria: "Combinados" },
  { nome: "Combinado 6 (21 peças)", preco: 47.90, categoria: "Combinados" },

  { nome: "Niguiri Trufado (8 unid)", preco: 52.90, categoria: "Especiais" },
  { nome: "Temaki Flor de Sal", preco: 36.99, categoria: "Especiais" },
  { nome: "Sashimi Trufado (8 unid)", preco: 47.90, categoria: "Especiais" },

  { nome: "Uramaki Salmão (10 unid)", preco: 26.99, categoria: "Uramakis" },
  { nome: "Uramaki Califórnia (10 unid)", preco: 19.99, categoria: "Uramakis" },
  { nome: "Uramaki Grelhado (10 unid)", preco: 26.99, categoria: "Uramakis" },
  { nome: "Uramaki Skin (10 unid)", preco: 19.99, categoria: "Uramakis" },

  { nome: "Hossomaki Salmão (10 unid)", preco: 19.99, categoria: "Hossomakis" },
  { nome: "Hossomaki Pepino (10 unid)", preco: 11.99, categoria: "Hossomakis" },
  { nome: "Hossomaki Califórnia (10 unid)", preco: 12.99, categoria: "Hossomakis" },
];

let carrinho = [];
let total = 0;

const cardapio = document.getElementById("cardapio");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalSpan = document.getElementById("total");

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

function adicionarCarrinho(produto) {
  carrinho.push(produto);
  total += produto.preco;

  const li = document.createElement("li");
  li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
  itensCarrinho.appendChild(li);

  totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "*🛒 Novo Pedido - Jirê Sushi*%0A%0A";

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });

  mensagem += `%0ATotal: *R$ ${total.toFixed(2)}*%0A`;

  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (!endereco || !pagamento) {
    alert("Por favor, preencha o endereço e selecione a forma de pagamento.");
    return;
  }

  mensagem += `%0A📍 Endereço: ${encodeURIComponent(endereco)}`;
  mensagem += `%0A💳 Pagamento: ${encodeURIComponent(pagamento)}`;

  const telefone = "5511967245949"; // Ex: 5511912345678
  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(url, "_blank");
}

// Horário da loja
const statusLoja = document.getElementById("statusLoja");
const hora = new Date().getHours();
statusLoja.textContent = (hora >= 18 && hora <= 23)
  ? "🟢 Estamos abertos!"
  : "🔴 Loja fechada (atendemos das 18h às 23h)";
