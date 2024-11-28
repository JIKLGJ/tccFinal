import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbQH9lRIEfYeXGA92QWVIkZ0No6-5xrio",
  authDomain: "urna-ec7a7.firebaseapp.com",
  databaseURL: "https://urna-ec7a7-default-rtdb.firebaseio.com",
  projectId: "urna-ec7a7",
  storageBucket: "urna-ec7a7.appspot.com",
  messagingSenderId: "153920023241",
  appId: "1:153920023241:web:35473099846372372ffb18"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Seleção dos elementos
const seriesInput = document.querySelector("#series");
const nomeInput = document.querySelector("#nome");

const escolhaInput = document.querySelector("#escolha");
const botao = document.querySelector("#botao");

var okButton = document.querySelector('#okButton');
const modal = document.querySelector("#modal");


const emailForm = document.querySelector("#emailForm");
const emailNome = document.querySelector("#emailNome");
const emailSeries = document.querySelector("#emailSeries");
const emailEscolha = document.querySelector("#emailEscolha");

// Função POST
async function POST() {
  const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/clube.json";

  const newData = {
    nome: nomeInput.value,
    
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await response.json();
    console.log("Dados enviados ao Firebase:", data);
  } catch (error) {
    console.error("Erro ao enviar ao Firebase:", error);
  }
}

// Verificar se o nome já existe no Firebase
async function verificarNomeExistente(nome) {
  const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/clube.json";

  try {
    const response = await fetch(url);
    const data = await response.json();

    for (const key in data) {
      if (data[key].nome === nome) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar nome:", error);
    return false;
  }
}

// Ação do botão de envio
botao.addEventListener("click", async () => {
  if (nomeInput.value === "" || nomeInput.value.length < 9) {
    modal.showModal();
  } else {
    const nomeExistente = await verificarNomeExistente(nomeInput.value);

    if (nomeExistente) {
      // Nome já existe: exibe modal de erro
      modal.showModal();
    } else {
      // Nome não existe: executa POST e envia e-mail
      await POST();

      // Preenche os campos ocultos do formulário de e-mail
      emailNome.value = nomeInput.value;
      emailSeries.value = seriesInput.value;
      emailEscolha.value = escolhaInput.value;

      // Submete o formulário ao e-mail
      emailForm.submit();

      // Exibe modal de sucesso
      modal2.showModal();
      botao.disabled = true;
      botao.style.backgroundColor = "gray";
      botao.style.cursor = "not-allowed";
      setTimeout(() => {
   
        window.location.href = "./tela de bem vindo.html"; 
      }, 2000); // 5000 ms = 5 segundos
    }
      
    }
  }
);

// Fechar modais
okButton.addEventListener("click", () => modal.close());

