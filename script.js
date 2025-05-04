// Imports Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getDatabase, ref, push, onValue
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import {
  getAuth, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Configuração do Firebase
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
  // Sorteio de 1 a 500 (total de cupons)
  const numero = Math.floor(Math.random() * 500) + 1;

  // Array de participantes:
  const pessoas = [
    { numero: 1, nome: "Miria antune otega", telefone: "67992250526" },
    { numero: 2, nome: "Miria antune otega", telefone: "67992250526" },
    { numero: 3, nome: "Pe Alexandro", telefone: "67981544994" },
    { numero: 4, nome: "Pe Alexandro", telefone: "67981544994" },
    { numero: 5, nome: "Pe Alexandro", telefone: "67981544994" },
    { numero: 6, nome: "Pe Alexandro", telefone: "67981544994" },
    { numero: 7, nome: "Pe Alexandro", telefone: "67981544994" },
    { numero: 8, nome: "Neusa Maria De Jesus", telefone: "67992429485" },
    { numero: 9, nome: "Neusa Maria De Jesus", telefone: "67992429485" },
    { numero: 10, nome: "Lena Projeto", telefone: "" },
    { numero: 11, nome: "Solange Inocência", telefone: "" },
    { numero: 12, nome: "Solange Inocência", telefone: "" },
    { numero: 13, nome: "Solange Inocência", telefone: "" },
    { numero: 14, nome: "Solange Inocência", telefone: "" },
    { numero: 15, nome: "Solange Inocência", telefone: "" },
    { numero: 16, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 17, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 18, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 19, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 20, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 21, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 22, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 23, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 24, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 25, nome: "Andriana Cassia", telefone: "(67)99219-8499" },
    { numero: 26, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 27, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 28, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 29, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 30, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 31, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 32, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 33, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 34, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 35, nome: "Amaral", telefone: "(67)99109-6898" },
    { numero: 36, nome: "Sebastiana pastoral crianças", telefone: "67981251878" },
    { numero: 37, nome: "Sebastiana pastoral crianças", telefone: "67981251878" },
    { numero: 38, nome: "Sebastiana pastoral crianças", telefone: "67981251878" },
    { numero: 39, nome: "Auria de Sá", telefone: "18991078822" },
    { numero: 40, nome: "Auria de Sá", telefone: "18991078822" },
    { numero: 41, nome: "Eduardo Machado", telefone: "67991547408" },
    { numero: 42, nome: "Eduardo Machado", telefone: "67991547408" },
    { numero: 43, nome: "Leonardo de Sá", telefone: "18991078822" },
    { numero: 44, nome: "Odimar Buono", telefone: "" },
    { numero: 45, nome: "Clenilda", telefone: "67981288170" },
    { numero: 46, nome: "Vando", telefone: "18991045158" },
    { numero: 47, nome: "Lurdes (Ditão)", telefone: "67991993434" },
    { numero: 48, nome: "Elenilda", telefone: "67981288170" },
    { numero: 49, nome: "Gleide", telefone: "67984848209" },
    { numero: 50, nome: "Layane de Sá", telefone: "18991078822" },
    { numero: 97, nome: "Sem Nome", telefone: "Sem Número" },
    { numero: 98, nome: "Cristiano dos Reis", telefone: "Sem Número" },
    { numero: 100, nome: "Cristiano dos Reis", telefone: "Sem Número" },
    { numero: 101, nome: "Nilce", telefone: "67992474100" },
    { numero: 102, nome: "Joao Claudio Domingues Bezera", telefone: "67992474100" },
    { numero: 103, nome: "Suely Oliveira", telefone: "67992120903" },
    { numero: 104, nome: "José Aristone", telefone: "67992157101" },
    { numero: 105, nome: "Fran Missionaria", telefone: "91992755287" },
    { numero: 106, nome: "Fran Missionaria", telefone: "91992755287" },
    { numero: 107, nome: "Cristiane Comunidade", telefone: "67991450298" },
    { numero: 108, nome: "Cristiane Comunidade", telefone: "67991450298" },
    { numero: 109, nome: "Osmar Damasceno", telefone: "67991502818" },
    { numero: 110, nome: "Lidiane Gonsales", telefone: "67991239720" },
    { numero: 111, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 112, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 113, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 114, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 115, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 116, nome: "Lidiane Gonsales", telefone: "67991239720" },
    { numero: 117, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 118, nome: "Keilane São pedro", telefone: "" },
    { numero: 119, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 120, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 121, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 122, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 123, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 124, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 125, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 126, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 127, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 128, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 129, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 130, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 131, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 132, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 133, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 134, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 135, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 136, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 137, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 138, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 139, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 140, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 141, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 142, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 143, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 144, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 145, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 146, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 147, nome: "Elisabete Ana de Jesus", telefone: "" },
    { numero: 148, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 149, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 150, nome: "Edivaldo de Souza", telefone: "67984441663" },
    { numero: 151 ,nome: "Magareth Lopes", telefone: "67992239614"},
    { numero: 152, nome: "Magareth Lopes", telefone: "67992239614"},
    { numero: 153, nome: "Magareth Lopes", telefone: "67992239614"},
    { numero: 154, nome: "Favio Compos", telefone: "67998500011"},
    { numero: 155, nome: "Adriana Sto. Expedito", telefone: ""},
    { numero: 156, nome: "Layane de Sá ", telefone: "18991078822"},
    { numero: 157, nome: "mano vender mulh Vando", telefone: "67999652319"},
    { numero: 158, nome: "Marcio Xavier ", telefone: "6799653801"},
    { numero: 159, nome: "Leonardo de Sá", telefone: "18991078822"},
    { numero: 160, nome: "Luana de Sá", telefone: "18988255144"},
    { numero: 161, nome: "Luana de Sá", telefone: "18988255144"},
    { numero: 164, nome: "Fabio Campos", telefone: "67998500011"},
    { numero: 165, nome: "Fabio Jubior Campo", telefone: "67992540900"}, 
    { numero: 251, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 252, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 253, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 254, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 255, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 256, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 257, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 258, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 259, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 260, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 261, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 262, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 263, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 264, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 265, nome: "Vanessa Barros", telefone: "73999984206" },
    { numero: 266, nome: "Fabiana Ranunci", telefone: "67992332236" },
    { numero: 267, nome: "Reviane", telefone: "67991546814" },
    { numero: 268, nome: "Mariana", telefone: "67999275220" },
    { numero: 269, nome: "Carla Paro", telefone: "67981113559" },
    { numero: 270, nome: "Carla Paro", telefone: "67981113559" },
    { numero: 271, nome: "Edineia Dias", telefone: "67992806669" },
    { numero: 272, nome: "Waldir Nascimento", telefone: "67981452541" },
    { numero: 273, nome: "Waldir Nascimento", telefone: "67981452541" },
    { numero: 274, nome: "Waldir Nascimento", telefone: "67981452541" },
    { numero: 275, nome: "Waldir Nascimento", telefone: "67981452541" },
    { numero: 276, nome: "Waldir Nascimento", telefone: "67981452541" },
    { numero: 277, nome: "Maria Luiza", telefone: "67992920152" },
    { numero: 278, nome: "Ludimila Cavallini", telefone: "67981238483" },
    { numero: 279, nome: "Ludimila Cavallini", telefone: "67981238483" },
    { numero: 280, nome: "Ludimila Cavallini", telefone: "67981238483" },
    { numero: 281, nome: "Ludimila Cavallini", telefone: "67981238483" },
    { numero: 282, nome: "Sergio Caitano", telefone: "67992310823" },
    { numero: 283, nome: "Regina Celia Nunes Caitano", telefone: "67992310823" },
    { numero: 284, nome: "Regina Celia Nunes Caitano", telefone: "67992310823" },
    { numero: 285, nome: "Vinicius S. Santos", telefone: "67998642823" },
    { numero: 286, nome: "Vinicius S. Santos", telefone: "67998642823" },
    { numero: 287, nome: "Beatriz S. Santos", telefone: "67998102698" },
    { numero: 288, nome: "Beatriz S. Santos", telefone: "67998102698" },
    { numero: 289, nome: "Cristiane Silva", telefone: "67996522818" },
    { numero: 301, nome: "Lurde R. Silva", telefone: "(67)99201-2546" },
    { numero: 302, nome: "Celia Garcia Furia", telefone: "18 997572109" },
    { numero: 303, nome: "Celia Garcia Furia", telefone: "18 997572109" },
    { numero: 304, nome: "Patricia Fernandes", telefone: "67 999633155" },
    { numero: 305, nome: "Patricia Fernandes", telefone: "67 999633155" },
    { numero: 306, nome: "Aladir dos Santos Rocha", telefone: "67992239002" },
    { numero: 307, nome: "Beatriz capucho", telefone: "67 992096251" },
    { numero: 308, nome: "Beatriz capucho", telefone: "67 992096251" },
    { numero: 309, nome: "Beatriz capucho", telefone: "67 992096251" },
    { numero: 310, nome: "Beatriz capucho", telefone: "67 992096251" },
    { numero: 311, nome: "Beatriz capucho", telefone: "67 992096251" },
    { numero: 312, nome: "Juliana Graciele Moreira", telefone: "67999136227" },
    { numero: 313, nome: "Ana Pauloa Araíjo", telefone: "67991416223" },
    { numero: 314, nome: "Dilsa Castro", telefone: "67992268345" },
    { numero: 315, nome: "Aladir dos Santos Rocha", telefone: "67992239002" },
    { numero: 316, nome: "Ana Alice Faria de Assis Oliveira", telefone: "67991285609" },
    { numero: 317, nome: "Perpetuo Eraldo Mattoso", telefone: "67993300412" },
    { numero: 318, nome: "Edma Assis", telefone: "67992778185" },
    { numero: 319, nome: "Anderson de O. Mattoso", telefone: "67992294089" },
    { numero: 320, nome: "Claudete Mattoso", telefone: "67992844162" },
    { numero: 321, nome: "Rogerio Madeforro", telefone: "67991722352" },
    { numero: 322, nome: "Paulo Mello Madeforro", telefone: "67993327731" },
    { numero: 323, nome: "Marlene Marino", telefone: "67992962011" },
    { numero: 324, nome: "Roseney Brunelli", telefone: "67992684147" },
    { numero: 325, nome: "Marcos Ponta Porã", telefone: "67999941428" },
    { numero: 326, nome: "Rafael iembo madeforro", telefone: "67984444445" },
    { numero: 327, nome: "Rafael iembo madeforro", telefone: "67984444445" },
    { numero: 328, nome: "Nene Mademinas", telefone: "67998171242" },
    { numero: 329, nome: "Ademir Cesar Mattoso", telefone: "67996171973" },
    { numero: 330, nome: "Ademir Cesar Mattoso", telefone: "67996171973" },
    { numero: 332, nome: "Marcos Ponta Porã", telefone: "67999941428" },
    { numero: 401, nome: "Sérgio", telefone: "67991374933"},
    { numero: 402, nomr: "Alvina Silva", telefone: "67991439509"},
    { numero: 412, nome: "Elci Lopes da Silva", telefone: "67991299316"},
    { numero: 451, nome: "Maciel", telefone: "67981017944" },
    { numero: 452, nome: "Suely F. Oliveira", telefone: "67999001641" },
    { numero: 453, nome: "Higor F. Oliveira", telefone: "67999001641" },
    { numero: 454, nome: "Higor F. Oliveira", telefone: "67999001641" },
    { numero: 455, nome: "Suely F. Oliveira", telefone: "67999001641" },
    { numero: 456, nome: "Suely F. Oliveira", telefone: "67999001641" },
    { numero: 457, nome: "Joselma Viana", telefone: "67999320332" },
    { numero: 458, nome: "Selma", telefone: "67991931624" },
    { numero: 459, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 460, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 461, nome: "Lira", telefone: "67999001651" },
    { numero: 462, nome: "Lira", telefone: "67991992378" },
    { numero: 463, nome: "Lira", telefone: "67991992378" },
    { numero: 464, nome: "Joise", telefone: "67999001651" },
    { numero: 465, nome: "Joise", telefone: "67999001651" },
    { numero: 466, nome: "Lorenzo", telefone: "67999001651" },
    { numero: 467, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 468, nome: "Lorenzo", telefone: "67999001651" },
    { numero: 469, nome: "Reginaldo Pereira", telefone: "67992395690" },
    { numero: 470, nome: "Reginaldo Pereira", telefone: "67992395690" },
    { numero: 471, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 472, nome: "Higor F. Oliveira", telefone: "67999001641" },
    { numero: 473, nome: "Conrado", telefone: "67999001651" },
    { numero: 474, nome: "Conrado", telefone: "67999001651" },
    { numero: 475, nome: "Beatriz", telefone: "67999001651" },
    { numero: 476, nome: "Beatriz", telefone: "67999001651" },
    { numero: 477, nome: "Beatriz", telefone: "67999001651" },
    { numero: 478, nome: "Suely F. Oliveira", telefone: "67999001651" },
    { numero: 479, nome: "Murilo", telefone: "67999001651" },
    { numero: 480, nome: "Murilo", telefone: "67999001651" },
    { numero: 481, nome: "Rafael", telefone: "67999001651" },
    { numero: 482, nome: "Lurde", telefone: "67999001651" },
    { numero: 483, nome: "Simone", telefone: "67999001651" },
    { numero: 484, nome: "Vania", telefone: "67999001651" },
    { numero: 485, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 486, nome: "Quenedy", telefone: "67999001651" },
    { numero: 487, nome: "Antônio", telefone: "67999001651" },
    { numero: 488, nome: "Cicera", telefone: "67999001651" },
    { numero: 489, nome: "Jucilene", telefone: "67999001651" },
    { numero: 490, nome: "Eliana", telefone: "67999001651" },
    { numero: 491, nome: "Higor F. Oliveira", telefone: "67999001651" },
    { numero: 492, nome: "Suely F. Oliveira", telefone: "67999001651" },
    { numero: 493, nome: "Higor F. Oliveira", telefone: "67999001651" },
    { numero: 494, nome: "Joyse", telefone: "67999001651" },
    { numero: 495, nome: "Beatriz", telefone: "67999001651" },
    { numero: 496, nome: "Higor F. Oliveira", telefone: "67999001651" },
    { numero: 497, nome: "Higor F. Oliveira", telefone: "67999001651" },
    { numero: 498, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 499, nome: "Fernando Ribeiro", telefone: "67999001651" },
    { numero: 500, nome: "Fernando Ribeiro", telefone: "67999001651" },





    // ... (continue list até o cupom 500, mantendo a mesma formatação)
  ];

  const sorteado = pessoas.find(p => p.numero === numero);

  // Exibe resultado
  document.getElementById("contador").textContent = "";
  if (!sorteado) {
    document.getElementById("resultado").innerHTML = "<p>Nenhum participante para esse número.</p>";
    return;
  }
  document.getElementById("resultado").innerHTML = `
    <div class="explosao">🎉 PARABÉNS! 🎉</div>
    <h2>Número: ${sorteado.numero}</h2>
    <p><strong>${sorteado.nome}</strong></p>
    <p>Telefone: ${sorteado.telefone}</p>
  `;

  // Salva no Firebase
  push(ref(db, "ganhadores"), {
    numero: sorteado.numero,
    nome: sorteado.nome,
    telefone: sorteado.telefone,
    data: new Date().toISOString()
  });
}

// Carrega e exibe ganhadores (admin)
function carregarGanhadores() {
  const listaEl = document.getElementById("listaGanhadores");
  listaEl.innerHTML = "";
  onValue(ref(db, "ganhadores"), snapshot => {
    listaEl.innerHTML = "";
    snapshot.forEach(doc => {
      const g = doc.val();
      const li = document.createElement("li");
      li.textContent = `${g.numero} – ${g.nome} (${g.telefone})`;
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
      li.innerHTML = `🎉 <strong>${g.numero} – ${g.nome}</strong> (${g.telefone})`;
      lista.appendChild(li);
    });
  });
}
carregarGanhadoresPublicos(); // chama automaticamente ao carregar a página
