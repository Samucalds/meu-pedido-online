// firebase-config.js

// Configuração do Firebase - substitua com as suas credenciais
const firebaseConfig = {
   apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.firebasestorage.app",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Ativar Firestore
const db = firebase.firestore();
