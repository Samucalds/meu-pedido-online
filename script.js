const cardapio = document.getElementById("cardapio");
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

produtos.filter(p => p.ativo).forEach(produto => {
  const div = document.createElement("div");
  div.className = "produto";
  div.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}" />
    <div class="produto-info">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <strong>R$ ${produto.preco.toFixed(2)}</strong><br>
      <button onclick='adicionarCarrinho(${JSON.stringify(produto)})'>Adicionar</button>
    </div>
  `;
  cardapio.appendChild(div);
});

let carrinho = [];
function adicionarCarrinho(produto) {
  carrinho.push(produto);
  alert(`${produto.nome} adicionado à sacola!`);
}

function finalizarPedido() {
  if (carrinho.length === 0) return alert("Sacola vazia!");

  const mensagem = carrinho.map(p => `• ${p.nome} - R$ ${p.preco.toFixed(2)}`).join("%0A");
  const total = carrinho.reduce((t, p) => t + p.preco, 0).toFixed(2);
  const texto = `*Pedido Jirê Sushi*%0A%0A${mensagem}%0A%0ATotal: R$ ${total}`;
  window.open(`https://wa.me/5511967245949?text=${texto}`, "_blank");
}
