import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    const produtosContainer = document.getElementById("produtos");
    const carrinhoContainer = document.getElementById("carrinho-itens");
    const totalContainer = document.getElementById("carrinho-total");
    const finalizarBtn = document.getElementById("finalizar-pedido");
    const buscaInput = document.getElementById("busca");
    const filtroBtns = document.querySelectorAll(".filtro-btn");

    let produtos = [];
    let carrinho = [];

    // 🔄 Carregar produtos do Firebase
    async function carregarProdutos() {
        produtosContainer.innerHTML = `<p class="loading">Carregando cardápio...</p>`;
        try {
            const querySnapshot = await getDocs(collection(db, "produtos"));
            produtos = [];
            querySnapshot.forEach((doc) => {
                produtos.push({ id: doc.id, ...doc.data() });
            });
            renderizarProdutos(produtos);
        } catch (error) {
            produtosContainer.innerHTML = `<p class="erro">Erro ao carregar produtos.</p>`;
            console.error("Erro:", error);
        }
    }

    // 🖼️ Renderizar produtos no cardápio
    function renderizarProdutos(lista) {
        if (lista.length === 0) {
            produtosContainer.innerHTML = `<p class="vazio">Nenhum produto encontrado.</p>`;
            return;
        }
        produtosContainer.innerHTML = lista.map(produto => `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao || ""}</p>
                <span>R$ ${produto.preco.toFixed(2)}</span>
                <button onclick="adicionarCarrinho('${produto.id}')">Adicionar</button>
            </div>
        `).join("");
    }

    // 🛒 Adicionar item ao carrinho
    window.adicionarCarrinho = function (id) {
        const produto = produtos.find(p => p.id === id);
        if (!produto) return;

        carrinho.push(produto);
        renderizarCarrinho();
    };

    // 🛍️ Renderizar carrinho
    function renderizarCarrinho() {
        if (carrinho.length === 0) {
            carrinhoContainer.innerHTML = `<p class="vazio">Seu carrinho está vazio.</p>`;
            totalContainer.textContent = "R$ 0,00";
            return;
        }

        carrinhoContainer.innerHTML = carrinho.map((item, i) => `
            <div class="carrinho-item">
                <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
                <button onclick="removerCarrinho(${i})">❌</button>
            </div>
        `).join("");

        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        totalContainer.textContent = `R$ ${total.toFixed(2)}`;
    }

    // ❌ Remover item do carrinho
    window.removerCarrinho = function (index) {
        carrinho.splice(index, 1);
        renderizarCarrinho();
    };

    // 📲 Finalizar pedido via WhatsApp
    finalizarBtn.addEventListener("click", () => {
        if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

        let mensagem = "🛒 *Meu Pedido Online*%0A%0A";
        carrinho.forEach(item => {
            mensagem += `🍔 ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
        });

        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

        const numero = "5581999999999"; // <- ALTERAR NÚMERO DO WHATSAPP
        window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
    });

    // 🔍 Busca de produtos
    buscaInput.addEventListener("input", () => {
        const termo = buscaInput.value.toLowerCase();
        const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
        renderizarProdutos(filtrados);
    });

    // 🗂️ Filtros por categoria
    filtroBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const categoria = btn.dataset.categoria;
            if (categoria === "todos") {
                renderizarProdutos(produtos);
            } else {
                const filtrados = produtos.filter(p => p.categoria === categoria);
                renderizarProdutos(filtrados);
            }
        });
    });

    // 🚀 Inicializar
    carregarProdutos();
});
