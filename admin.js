// Importando módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Configuração do Firebase (do seu firebase-config.js)
import { firebaseConfig } from "./firebase-config.js";

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const listaProdutos = document.getElementById("lista-produtos");
const formProduto = document.getElementById("form-produto");
const btnSalvarProduto = document.getElementById("btn-salvar-produto");
const inputImagem = document.getElementById("imagem");
const loader = document.getElementById("loader");

let imagemSelecionada = null;

// Pré-visualização da imagem
inputImagem.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        imagemSelecionada = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("preview-imagem").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Carregar lista de produtos
async function carregarProdutos() {
    listaProdutos.innerHTML = "";
    loader.style.display = "block";

    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((docSnap) => {
        const produto = docSnap.data();
        const div = document.createElement("div");
        div.classList.add("produto-item");
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p>${produto.descricao}</p>
            </div>
            <div class="produto-acoes">
                <button onclick="alterarStatus('${docSnap.id}', ${produto.ativo})">
                    ${produto.ativo ? "Pausar" : "Ativar"}
                </button>
                <button onclick="removerProduto('${docSnap.id}')">Excluir</button>
            </div>
        `;
        listaProdutos.appendChild(div);
    });

    loader.style.display = "none";
}
window.carregarProdutos = carregarProdutos;

// Adicionar produto
btnSalvarProduto.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || isNaN(preco) || preco <= 0 || !descricao) {
        alert("Preencha todos os campos corretamente!");
        return;
    }
    if (!imagemSelecionada) {
        alert("Selecione uma imagem para o produto!");
        return;
    }

    loader.style.display = "block";

    try {
        // Upload da imagem no Firebase Storage
        const storageRef = ref(storage, "produtos/" + Date.now() + "-" + imagemSelecionada.name);
        await uploadBytes(storageRef, imagemSelecionada);
        const imagemURL = await getDownloadURL(storageRef);

        // Salvando no Firestore
        await addDoc(collection(db, "produtos"), {
            nome,
            preco,
            descricao,
            imagem: imagemURL,
            ativo: true
        });

        formProduto.reset();
        document.getElementById("preview-imagem").src = "";
        imagemSelecionada = null;

        alert("Produto adicionado com sucesso!");
        carregarProdutos();
    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        alert("Erro ao salvar o produto. Verifique o console.");
    } finally {
        loader.style.display = "none";
    }
});

// Alterar status (pausar/ativar)
window.alterarStatus = async (id, statusAtual) => {
    await updateDoc(doc(db, "produtos", id), { ativo: !statusAtual });
    carregarProdutos();
};

// Remover produto
window.removerProduto = async (id) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        await deleteDoc(doc(db, "produtos", id));
        carregarProdutos();
    }
};

// Carregar produtos na inicialização
carregarProdutos();
