const produtos = [
  // COMBINADOS
  { nome: "Combinado 1 (18 peças)", preco: 37.90, categoria: "Combinados" },
  { nome: "Combinado 2 (24 peças)", preco: 46.90, categoria: "Combinados" },
  { nome: "Combinado 3 (30 peças)", preco: 45.99, categoria: "Combinados" },
  { nome: "Combinado 4 (40 peças)", preco: 59.99, categoria: "Combinados" },
  { nome: "Combinado 5 (60 peças + 2 mini temakis)", preco: 95.99, categoria: "Combinados" },
  { nome: "Combinado 6 (21 peças)", preco: 47.90, categoria: "Combinados" },

  // ESPECIAIS
  { nome: "Niguiri Trufado (8 unid)", preco: 52.90, categoria: "Especiais" },
  { nome: "Temaki Flor de Sal", preco: 36.99, categoria: "Especiais" },
  { nome: "Sashimi Trufado (8 unid)", preco: 47.90, categoria: "Especiais" },

  // URAMAKIS
  { nome: "Uramaki Salmão (10 unid)", preco: 26.99, categoria: "Uramakis" },
  { nome: "Uramaki Califórnia (10 unid)", preco: 19.99, categoria: "Uramakis" },
  { nome: "Uramaki Grelhado (10 unid)", preco: 26.99, categoria: "Uramakis" },
  { nome: "Uramaki Skin (10 unid)", preco: 19.99, categoria: "Uramakis" },

  // HOSSOMAKIS
  { nome: "Hossomaki Salmão (10 unid)", preco: 19.99, categoria: "Hossomakis" },
  { nome: "Hossomaki Pepino (10 unid)", preco: 11.99, categoria: "Hossomakis" },
  { nome: "Hossomaki Califórnia (10 unid)", preco: 12.99, categoria: "Hossomakis" },

  // NIGUIRIS
  { nome: "Niguiri Salmão (10 unid)", preco: 31.99, categoria: "Niguiris" },
  { nome: "Niguiri Salmão Maçaricado (10 unid)", preco: 31.99, categoria: "Niguiris" },
  { nome: "Niguiri Skin (10 unid)", preco: 20.99, categoria: "Niguiris" },

  // JOES
  { nome: "Joe Salmão (10 unid)", preco: 31.99, categoria: "Joes" },
  { nome: "Joe Salmão Maçaricado (10 unid)", preco: 31.99, categoria: "Joes" },
  { nome: "Joe Chico César (10 unid)", preco: 31.99, categoria: "Joes" },
  { nome: "Joe Camarão (10 unid)", preco: 39.99, categoria: "Joes" },
  { nome: "Joe Camarão Especial (10 unid)", preco: 41.99, categoria: "Joes" },

  // SASHIMIS
  { nome: "Sashimi Salmão (10 unid)", preco: 30.99, categoria: "Sashimis" },
  { nome: "Sashimi Salmão Maçaricado (10 unid)", preco: 32.99, categoria: "Sashimis" },

  // HOT HOLLS
  { nome: "Hot Holl (10 unid)", preco: 19.99, categoria: "Hot Holls" },
  { nome: "Hot Holl (30 unid)", preco: 54.99, categoria: "Hot Holls" },
  { nome: "Hot Holl (60 unid)", preco: 95.99, categoria: "Hot Holls" },
  { nome: "Hot Holl Camarão (10 unid)", preco: 35.99, categoria: "Hot Holls" },
  { nome: "Big Hot", preco: 27.99, categoria: "Hot Holls" },

  // TEMAKIS
  { nome: "Temaki Salmão Completo", preco: 25.99, categoria: "Temakis" },
  { nome: "Temaki Salmão Grelhado", preco: 25.99, categoria: "Temakis" },
  { nome: "Temaki Hot", preco: 22.00, categoria: "Temakis" },
  { nome: "Temaki Skin", preco: 25.99, categoria: "Temakis" },
  { nome: "Temaki Chico César", preco: 26.99, categoria: "Temakis" },
  { nome: "Temaki Califórnia", preco: 20.99, categoria: "Temakis" },
  { nome: "Temaki Philadelphia", preco: 25.99, categoria: "Temakis" },
  { nome: "Temaki Las Vegas", preco: 26.99, categoria: "Temakis" },
  { nome: "Temaki Camarão 1", preco: 27.99, categoria: "Temakis" },
  { nome: "Temaki Camarão 2", preco: 27.99, categoria: "Temakis" },

  // YAKISSOBA
  { nome: "Yakisoba Completo", preco: 24.99, categoria: "Yakissobas" },
  { nome: "Yakisoba de Frango", preco: 23.99, categoria: "Yakissobas" },
  { nome: "Yakisoba de Carne", preco: 23.99, categoria: "Yakissobas" },
  { nome: "Yakisoba Vegetariano", preco: 22.99, categoria: "Yakissobas" },

  // DIVERSOS
  { nome: "Harumaki Queijo (10 unid)", preco: 16.00, categoria: "Diversos" },
  { nome: "Harumaki Chocolate (10 unid)", preco: 16.00, categoria: "Diversos" },
  { nome: "Harumaki Queijo (6 unid)", preco: 10.00, categoria: "Diversos" },
  { nome: "Harumaki Chocolate (6 unid)", preco: 10.00, categoria: "Diversos" },
  { nome: "Guioza Carne (6 unid)", preco: 10.00, categoria: "Diversos" },
  { nome: "Salmão Ball (10 unid)", preco: 19.99, categoria: "Diversos" },

  // SOBREMESAS
  { nome: "Hot Holl de Banana com Chocolate (10 unid)", preco: 10.00, categoria: "Sobremesas" },
  { nome: "Bananinha com Chocolate (10 unid)", preco: 10.00, categoria: "Sobremesas" }
];

const carrinho = [];

function carregarCardapio() {
  const cardapio = document.getElementById('cardapio');
  cardapio.innerHTML = '';

  const categorias = {};
  produtos.forEach(produto => {
    if (!categorias[produto.categoria]) {
      categorias[produto.categoria] = [];
    }
    categorias[produto.categoria].push(produto);
  });

  for (const categoria in categorias) {
    const secao = document.createElement('div');
    secao.className = 'categoria';

    const titulo = document.createElement('h2');
    titulo.textContent = categoria;
    secao.appendChild(titulo);

    categorias[categoria].forEach(produto => {
      const div = document.createElement('div');
      div.className = 'produto';
      div.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinhoPorNome('${produto.nome}')">Adicionar</button>
      `;
      secao.appendChild(div);
    });

    cardapio.appendChild(secao);
  }
}

function adicionarAoCarrinhoPorNome(nome) {
  const item = produtos.find(p => p.nome === nome);
  if (item) {
    carrinho.push(item);
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById('itensCarrinho');
  const total = document.getElementById('total');
  lista.innerHTML = '';
  let soma = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    soma += item.preco;
  });

  total.textContent = soma.toFixed(2);
}

function finalizarPedido() {
  const numeroWhatsApp = "5511977965556";
  const texto = carrinho.map(item => `• ${item.nome} - R$ ${item.preco.toFixed(2)}`).join('%0A');
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0).toFixed(2);
  const link = `https://wa.me/${numeroWhatsApp}?text=Olá! Quero fazer um pedido:%0A${texto}%0ATotal: R$ ${total}`;
  window.open(link, '_blank');
}

function verificarHorario() {
  const status = document.getElementById('statusLoja');
  const agora = new Date();
  const hora = agora.getHours();
  const aberto = hora >= 18 && hora < 23;
  status.textContent = aberto ? "🟢 Estamos abertos!" : "🔴 Estamos fechados!";
}

carregarCardapio();
verificarHorario();
