Scrpit
const cardapio = document.getElementById("cardapio");
const sacolaToggle = document.getElementById("sacolaToggle");
const sacola = document.getElementById("sacola");
const itensSacola = document.getElementById("itensSacola");
const totalSpan = document.getElementById("total");
const contadorItens = document.getElementById("contadorItens");

let sacolaItens = [];

function carregarProdutos() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  cardapio.innerHTML = "";

  produtos.forEach((p, i) => {
    if (p.ativo) {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <div class="info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong>
        </div>
        <button onclick="adicionarSacola(${i})">+</button>
      `;
      cardapio.appendChild(div);
    }
  });
}

function adicionarSacola(i) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const produto = produtos[i];
  sacolaItens.push(produto);
  atualizarSacola();
}

function atualizarSacola() {
  itensSacola.innerHTML = "";
  let total = 0;
  sacolaItens.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.nome} - R$ ${parseFloat(item.preco).toFixed(2)}
      <button onclick="removerItem(${i})">x</button>
    `;
    itensSacola.appendChild(div);
    total += parseFloat(item.preco);
  });
  totalSpan.textContent = total.toFixed(2);
  contadorItens.textContent = sacolaItens.length;
}

function removerItem(i) {
  sacolaItens.splice(i, 1);
  atualizarSacola();
}

function esvaziarCarrinho() {
  sacolaItens = [];
  atualizarSacola();
}

function enviarPedido() {
  const nome = document.getElementById("nomeCliente").value;
  const pagamento = document.getElementById("pagamento").value;
  const endereco = document.getElementById("enderecoCliente").value;

  if (!nome || !endereco) {
    alert("Preencha nome e endereço!");
    return;
  }

  let mensagem = `Olá! Gostaria de fazer um pedido:%0A`;
  sacolaItens.forEach((item) => {
    mensagem += `- ${item.nome} (R$ ${parseFloat(item.preco).toFixed(2)})%0A`;
  });
  mensagem += `Total: R$ ${totalSpan.textContent}%0A`;
  mensagem += `Nome: ${nome}%0A`;
  mensagem += `Forma de pagamento: ${pagamento}%0A`;
  mensagem += `Endereço: ${endereco}`;

  const url = `https://wa.me/55967245949?text=${mensagem}`;
  window.open(url, "_blank");
}

sacolaToggle.addEventListener("click", () => {
  sacola.classList.toggle("sacola-fechada");
});

carregarProdutos();
