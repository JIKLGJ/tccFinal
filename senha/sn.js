import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbQH9lRIEfYeXGA92QWVIkZ0No6-5xrio",
  authDomain: "urna-ec7a7.firebaseapp.com",
  databaseURL: "https://urna-ec7a7-default-rtdb.firebaseio.com",
  projectId: "urna-ec7a7",
  storageBucket: "urna-ec7a7.appspot.com",
  messagingSenderId: "153920023241",
  appId: "1:153920023241:web:35473099846372372ffb18"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Seleção de elementos DOM
const ra = document.querySelector("#number1");
const senha = document.querySelector("#senha");
const botao = document.querySelector("#botao");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
const inputPass = document.getElementById('senha');
const bntShowpass = document.querySelector('#bnt-senha');
const okButton = document.querySelector('#okButton');
const okButton2 = document.querySelector('#okButton2');

// Adiciona um evento ao botão de atualização
botao.addEventListener("click", async () => {
  // Validação dos campos de entrada
  if (ra.value === '' || senha.value === '' || ra.value.length < 9 || senha.value.length < 6) {
    modal.showModal(); // Mostra o modal se os campos estiverem vazios ou inválidos
  } else if (isNaN(ra.value)) {
    modal.showModal(); // Mostra o modal se o RA não for numérico
  } else {
    // Chama a função para atualizar a senha
    const result = await updateItemByRa(ra.value, { senha: senha.value });

    if (result.success) {
      modal2.showModal(); // Mostra o modal de sucesso, se a atualização for bem-sucedida
    } else {
      modal.showModal(); // Caso ocorra um erro, exibe o modal de erro
    }
  }
});

// Função para atualizar o item pelo RA
const updateItemByRa = async (ra, data) => {
  const itemsRef = ref(db, 'cadastro'); // Referência à coleção 'cadastro'
  
  try {
    const snapshot = await get(itemsRef); // Obtém todos os itens da coleção
    let foundDoc = null;

    // Percorre os documentos para encontrar pelo RA
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.ra === ra) {
        foundDoc = childSnapshot; // Armazena a referência do documento encontrado
      }
    });

    if (foundDoc) {
      // Atualiza o documento encontrado com os novos dados
      await update(ref(db, `cadastro/${foundDoc.key}`), data);
      console.log('Documento atualizado com sucesso!');
      return { success: true }; // Retorna sucesso se a atualização for bem-sucedida
    } else {
      console.log('Nenhum documento encontrado com o RA:', ra);
      return { success: false }; // Retorna erro se o RA não for encontrado
    }
  } catch (error) {
    console.error('Erro ao atualizar documento: ', error);
    return { success: false }; // Retorna erro se ocorrer algum erro na requisição
  }
};

// Função para mostrar/ocultar a senha
function mostrarSenha() {
  if (inputPass.type === 'password') {
    inputPass.setAttribute('type', 'text');
    bntShowpass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    bntShowpass.style.opacity = 1; // Mostra o ícone de olho fechado
  } else {
    inputPass.setAttribute('type', 'password');
    bntShowpass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    bntShowpass.style.opacity = 0.5; // Mostra o ícone de olho aberto
  }
}

// Adiciona eventos para os modais e a visibilidade da senha
document.addEventListener('DOMContentLoaded', () => {
  okButton.addEventListener('click', () => {
    modal.close(); // Fecha o primeiro modal
  });

  okButton2.addEventListener('click', () => {
    modal2.close(); // Fecha o segundo modal
  });

  bntShowpass.addEventListener('click', mostrarSenha); // Adiciona o evento para mostrar a senha
});
