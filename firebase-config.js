// firebase-config.js
// Arquivo de configuração do Firebase

// Importando módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArGMJgRxw3qUkQcv6vVur_o921vCbJIFI",
  authDomain: "meu-pedido-online-c2ff1.firebaseapp.com",
  projectId: "meu-pedido-online-c2ff1",
  storageBucket: "meu-pedido-online-c2ff1.firebasestorage.app",
  messagingSenderId: "949953908074",
  appId: "1:949953908074:web:8f34ddb9af67a07db1a913",
  measurementId: "G-B99PGCNDTT"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando Firestore
const db = getFirestore(app);

// Exportando para usar nos outros arquivos
export { db };
