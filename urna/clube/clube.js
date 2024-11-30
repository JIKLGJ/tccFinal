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
nomeInput.addEventListener("keypress", (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode >= 48 && keyCode <= 57) {
        e.preventDefault();
    }
});

// Função para exibir modal de erro
function exibirModalErro(mensagem) {
    const opsText = document.querySelector("#ops");
    if (opsText) {
        opsText.textContent = mensagem;
    }
    if (modalErro) {
        modalErro.showModal();
    } else {
        alert(mensagem); // Fallback caso o modal não exista
    }
}

// Função POST para enviar ao Firebase
async function POST(nomeSanitizado) {
    const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/clube/.json";

    const newData = { nome: nomeSanitizado };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar dados: ${response.status}`);
        }

        console.log("Enviado ao Firebase:", await response.json());
    } catch (error) {
        console.error("Erro ao enviar ao Firebase:", error);
    }
}

// Função para verificar se o nome já existe na coleção 'eletiva'
async function verificarNomeExistente(nome) {
    const nomeSanitizado = nome.trim();
    const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/clube.json";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            return Object.values(data).some((entry) => entry.nome === nomeSanitizado);
        }

        return false;
    } catch (error) {
        console.error("Erro ao verificar nome:", error.message);
        return false; // Considera que o nome não existe em caso de erro
    }
}

// Validação e envio
botao.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeSanitizado = nomeInput.value.trim();

    if (!nomeSanitizado || nomeSanitizado.length < 9) {
        exibirModalErro("Digite seu nome corretamente!");
        return;
    }

    try {
        const nomeExistente = await verificarNomeExistente(nomeSanitizado);

        if (nomeExistente) {
            exibirModalErro(" Não é possível enviar uma nova escolha!");
            return;
        }

        await POST(nomeSanitizado);
        emailForm.submit();
    } catch (error) {
        console.error("Erro durante validação ou envio:", error);
        exibirModalErro("Ocorreu um erro. Tente novamente mais tarde.");
    }
});

// Fechar o modal de erro
okButton.addEventListener("click", () => {
    if (modalErro) {
        modalErro.close();
    }
});
