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

// Impedir a inserção de números no campo de nome
nomeInput.addEventListener("keypress", function(e) {
  const keyCode = (e.keyCode ? e.keyCode : e.which);
  if (keyCode > 47 && keyCode < 58) {
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
async function POST(nomeSanitizado) {
    const url = `https://urna-ec7a7-default-rtdb.firebaseio.com/tutoria/.json`;

    const newData = {
        nome: nomeSanitizado,
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

// Função para verificar se o nome já existe na coleção 'tutoria'
async function verificarNomeExistente(nome) {
    const nomeSanitizado = nome.trim();
    const url = `https://urna-ec7a7-default-rtdb.firebaseio.com/tutoria.json`; // Verifica toda a coleção

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        // Se os dados não estiverem vazios, verificamos se o nome já existe na coleção
        if (data) {
            for (const key in data) {
                if (data[key].nome === nomeSanitizado) {
                    return true; // Nome já existe na coleção
                }
            }
        }

        return false; // Nome não existe
    } catch (error) {
        console.error("Erro ao verificar nome na coleção 'tutoria':", error.message);
        return false; // Em caso de erro, considera que o nome não existe
    }
}

// Validação e envio
botao.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita envio do formulário

    // Validação do nome
    const nomeSanitizado = nomeInput.value.trim();
    if (nomeSanitizado === "" || nomeSanitizado.length < 9) {
        exibirModalErro("Digite seu nome corretamente!");
        return;
    }

    try {
        // Verificar se o nome já existe na coleção 'tutoria'
        const nomeExistente = await verificarNomeExistente(nomeSanitizado);

        if (nomeExistente) {
            exibirModalErro("Não é possível enviar uma nova escolha!");
            return;
        }

        // Enviar ao Firebase
        await POST(nomeSanitizado);

        // Submeter o formulário após validação
        emailForm.submit();
    } catch (error) {
        console.error("Erro durante validação ou envio:", error);
        exibirModalErro("Ocorreu um erro. Tente novamente mais tarde.");
    }
});

// Fechar o modal de erro
okButton.addEventListener("click", () => modalErro.close());
