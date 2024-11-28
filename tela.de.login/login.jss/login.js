import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

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
const db = getDatabase(app);

const ra = document.querySelector("#number1");
const senha = document.querySelector("#senha");
const digito = document.querySelector("#digito");

const botao = document.querySelector("#abrirModal");
const modal = document.querySelector("#modal");
var inputPass = document.getElementById('senha');
var bntShowpass = document.querySelector('#bnt-senha');
var okButton = document.querySelector('#okButton');

// Função para obter o item por RA
const getItemByRa = async (raValue) => {
  const itemsRef = ref(db, 'cadastro'); // Refere-se à coleção 'cadastro'
  try {
      const snapshot = await get(itemsRef);
      if (snapshot.exists()) {
          const items = snapshot.val();
          let foundItem = null;

          // Percorre os itens para encontrar pelo RA
          Object.keys(items).forEach((key) => {
              if (items[key].ra === raValue) {
                  foundItem = { key, ...items[key] };
              }
          });

          return foundItem; // Retorna o item encontrado ou null se não encontrar
      } else {
          return null; // Caso não encontre nada
      }
  } catch (error) {
      console.error('Erro ao obter documentos: ', error);
      return null;
  }
};

// Verificar se os campos estão preenchidos e se as credenciais estão corretas
botao.addEventListener('click', async function () {
  if (ra.value === '' || senha.value === '' || ra.value.length < 9) {
    modal.showModal(); // Mostrar modal se os campos estiverem vazios ou incorretos
  } else if (isNaN(ra.value)) {
    modal.showModal(); // Mostrar modal se o RA não for numérico
  } else {
    const foundItem = await getItemByRa(ra.value);
    if (foundItem && foundItem.senha === senha.value && foundItem.digito===digito.value) {
      // Credenciais corretas, redirecionar para outra página
      window.location.href = "./tela de bem vindo.html";
    } else {
      // Senha ou RA incorretos, mostrar modal de erro
      modal.showModal();
    }
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
