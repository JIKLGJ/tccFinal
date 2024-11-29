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

// Seleção de elementos
const nomeInput = document.querySelector("#nome");

const botao = document.querySelector("#botao");

const modalErro = document.querySelector("#modalErro");

const okButton = document.querySelector("#okButton");


const emailForm = document.querySelector("#emailForm");
// Adiciona um ouvinte de evento para o campo de entrada nomeInput
nomeInput.addEventListener("keypress", function(e) {
  
  // Obtém o código da tecla pressionada, usando keyCode ou which dependendo da compatibilidade do navegador
  const keyCode = (e.keyCode ? e.keyCode : e.which);
  
  // Verifica se o código da tecla está entre 48 e 57 (que são os códigos ASCII dos números 0 a 9)
  if (keyCode > 47 && keyCode < 58) {
    
    // Se for um número, impede que o número seja inserido no campo de texto
    e.preventDefault();
  }
});

// Função para exibir modal de erro
function exibirModalErro(mensagem) {
    const opsText = document.querySelector("#ops");
    opsText.textContent = mensagem;
    modalErro.showModal();
}

// Função POST para enviar ao Firebase
async function POST() {
    const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/tutoria.json";

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
        console.log("Enviado ao Firebase:", data);
    } catch (error) {
        console.error("Erro ao enviar ao Firebase:", error);
    }
}

// Função para verificar se o nome já existe no Firebase
async function verificarNomeExistente(nome) {
  // URL já está limitada à coleção "eletiva"
  const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/eletiva.json";

  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();

      if (!data) {
          // Caso a coleção "eletiva" esteja vazia
          return false;
      }

      // Verifica se algum item da coleção "eletiva" tem o nome igual
      return Object.values(data).some(entry => entry?.nome === nome);
  } catch (error) {
      console.error("Erro ao verificar nome na coleção 'eletiva':", error.message);
      return false; // Em caso de erro, considera que o nome não existe
  }
}

// Validação e envio
botao.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita envio do formulário

    // Validação do nome
    if (nomeInput.value.trim() === "" || nomeInput.value.length < 9) {
        exibirModalErro("Digite seu nome corretamente!");
        return;
    }

    try {
        // Verificar se o nome já existe
        const nomeExistente = await verificarNomeExistente(nomeInput.value);

        if (nomeExistente) {
            exibirModalErro("Sua escolha não pode ser alterada!");
            return;
        }

        // Enviar ao Firebase
        await POST();

        // Submeter o formulário após validação
        emailForm.submit();
    } catch (error) {
        console.error("Erro durante validação ou envio:", error);
        exibirModalErro("Ocorreu um erro. Tente novamente mais tarde.");
    }
});



okButton.addEventListener("click", () => modalErro.close());
