// Imports Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getDatabase, ref, push, onValue
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import {
  getAuth, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Configuração do Firebase (cole aqui sua configuração do console)
const firebaseConfig = {
  apiKey: "AIzaSyD53Q80biaZ_cYKRYcFi4iObGNAHEtcctc",
  authDomain: "sorteio-app-ce9ef.firebaseapp.com",
  projectId: "sorteio-app-ce9ef",
  storageBucket: "sorteio-app-ce9ef.appspot.com",
  messagingSenderId: "955968484049",
  appId: "1:955968484049:web:3a927bde6732f26f448db0",
  measurementId: "G-5GGN6FPR55",
  databaseURL: "https://sorteio-app-ce9ef-default-rtdb.firebaseio.com"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// Função de login
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const erroEl = document.getElementById("login-error");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("login").classList.remove("visible");
      document.getElementById("sorteio").classList.add("visible");
      erroEl.textContent = "";
      carregarGanhadores();
    })
    .catch(() => {
      erroEl.textContent = "Email ou senha incorretos.";
    });
};

// Contagem regressiva e disparo do sorteio
window.iniciarSorteio = function () {
  let contador = 10;
  const contadorEl = document.getElementById("contador");
  const resultadoEl = document.getElementById("resultado");
  resultadoEl.innerHTML = "";

  const interval = setInterval(() => {
    contadorEl.textContent = `Sorteando em: ${contador}...`;
    contador--;
    if (contador < 0) {
      clearInterval(interval);
      sortearNumero();
    }
  }, 1000);
};

// Sorteia e salva no Firebase
function sortearNumero() {
  const numero = Math.floor(Math.random() * 10) + 1; // entre 1 e 10
  const pessoas = [
    { numero: 1, nome: "Ana Paula", endereco: "Rua A, 123", cambista: "Marcos" },
    { numero: 2, nome: "João Pedro", endereco: "Rua B, 456", cambista: "Cláudio" },
    { numero: 3, nome: "Mariana Souza", endereco: "Rua C, 789", cambista: "Marlene" },
    { numero: 4, nome: "Carlos Henrique", endereco: "Rua D, 321", cambista: "Marcos" },
    { numero: 5, nome: "Fernanda Lima", endereco: "Rua E, 654", cambista: "Cláudio" },
    { numero: 6, nome: "Lucas Oliveira", endereco: "Rua F, 987", cambista: "Marlene" },
    { numero: 7, nome: "Bruna Silva", endereco: "Rua G, 111", cambista: "Marcos" },
    { numero: 8, nome: "Ricardo Mendes", endereco: "Rua H, 222", cambista: "Cláudio" },
    { numero: 9, nome: "Camila Torres", endereco: "Rua I, 333", cambista: "Marlene" },
    { numero: 10, nome: "Felipe Rocha", endereco: "Rua J, 444", cambista: "Marcos" }
  ];
  const sorteado = pessoas.find(p => p.numero === numero);

  // Exibe resultado
  document.getElementById("contador").textContent = "";
  document.getElementById("resultado").innerHTML = `
    <div class="explosao">🎉 PARABÉNS! 🎉</div>
    <h2>Número: ${sorteado.numero}</h2>
    <p><strong>${sorteado.nome}</strong></p>
    <p>${sorteado.endereco}</p>
    <p><em>${sorteado.cambista}</em></p>
  `;

  // Salva no Firebase
  push(ref(db, "ganhadores"), {
    numero: sorteado.numero,
    nome: sorteado.nome,
    endereco: sorteado.endereco,
    cambista: sorteado.cambista,
    data: new Date().toISOString()
  });
}

// Carrega e exibe ganhadores
function carregarGanhadores() {
  const listaEl = document.getElementById("listaGanhadores");
  listaEl.innerHTML = "";
  onValue(ref(db, "ganhadores"), snapshot => {
    listaEl.innerHTML = "";
    snapshot.forEach(doc => {
      const g = doc.val();
      const li = document.createElement("li");
      li.textContent = `${g.numero} – ${g.nome} (${g.cambista})`;
      listaEl.appendChild(li);
    });
  });
}

// Exibe ganhadores para o público (fora do login)
function carregarGanhadoresPublicos() {
  const lista = document.getElementById("ganhadoresPublico");
  if (!lista) return;

  onValue(ref(db, "ganhadores"), snapshot => {
    lista.innerHTML = "";
    snapshot.forEach(doc => {
      const g = doc.val();
      const li = document.createElement("li");
      li.innerHTML = `🎉 <strong>${g.numero} – ${g.nome}</strong> (${g.cambista})`;
      lista.appendChild(li);
    });
  });
}
carregarGanhadoresPublicos(); // chama automaticamente ao carregar a página
