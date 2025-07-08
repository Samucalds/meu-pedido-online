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
  }, 1200);
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

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (!endereco || !pagamento) {
    alert("Por favor, preencha o endereço e selecione a forma de pagamento.");
    return;
  }

  let mensagem = "*🛒 Novo Pedido - Jirê Sushi*%0A%0A";
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
  });
  mensagem += `%0ATotal: *R$ ${total.toFixed(2)}*%0A`;
  mensagem += `%0A📍 Endereço: ${encodeURIComponent(endereco)}`;
  mensagem += `%0A💳 Pagamento: ${encodeURIComponent(pagamento)}`;

  const telefone = "SEU_NUMERO_AQUI";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

// Produtos aqui (mantém seus produtos atuais)
