// Firebase SDK (garanta que o HTML carregue firebase-app.js e firebase-firestore.js)
firebase.initializeApp({
  apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.appspot.com",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
});
const db = firebase.firestore();

document.getElementById('form-produto').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = nomeProduto.value;
  const descricao = descricaoProduto.value;
  const preco = parseFloat(precoProduto.value);
  const imagemInput = imagemProduto;

  const reader = new FileReader();
  reader.onload = () => {
    db.collection("produtos").add({
      nome,
      descricao,
      preco,
      imagem: reader.result,
      pausado: false
    }).then(() => {
      alert("Produto salvo!");
      form-produto.reset();
      window.location.href = "admin.html";
    });
  };
  if (imagemInput.files[0]) reader.readAsDataURL(imagemInput.files[0]);
});
