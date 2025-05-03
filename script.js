import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY_DO_FIREBASE",
    authDomain: "sua_auth_domain_do_firebase",
    projectId: "seu_project_id_do_firebase",
    storageBucket: "seu_storage_bucket_do_firebase",
    messagingSenderId: "seu_messaging_sender_id_do_firebase",
    appId: "seu_app_id_do_firebase",
    measurementId: "seu_measurement_id_do_firebase"
  };
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// Login provisório
const loginProvisorio = {
  email: "admin@teste.com",
  senha: "123456"
};

// Função de login com verificação local e Firebase
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Primeiro tenta login local (provisório)
  if (email === loginProvisorio.email && password === loginProvisorio.senha) {
    document.getElementById("sorteio-area").style.display = "block";
    document.getElementById("login-error").textContent = "";
    carregarGanhadores();
    return;
  }

  // Caso contrário, tenta login no Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("sorteio-area").style.display = "block";
      document.getElementById("login-error").textContent = "";
      carregarGanhadores();
    })
    .catch(error => {
      document.getElementById("login-error").textContent = "Erro ao fazer login.";
      console.error(error);
    });
}

// Sorteio de número e gravação no Firebase
window.sortearNumero = function () {
  const numero = Math.floor(Math.random() * 100) + 1;
  document.getElementById("resultado").textContent = `Número sorteado: ${numero}`;

  const ganhadorRef = ref(db, "ganhadores");
  push(ganhadorRef, numero);
}

// Mostrar ganhadores gravados
function carregarGanhadores() {
  const ganhadorRef = ref(db, "ganhadores");
  onValue(ganhadorRef, snapshot => {
    const lista = document.getElementById("ganhadores");
    lista.innerHTML = "";
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.textContent = `Ganhador: ${child.val()}`;
      lista.appendChild(li);
    });
  });
}
