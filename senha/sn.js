import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

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
const db = getDatabase(app);


const ra = document.querySelector("#number1");
const senha = document.querySelector("#senha");
const botao = document.querySelector("#botao");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
const inputPass = document.getElementById('senha');
const bntShowpass = document.querySelector('#bnt-senha');
const okButton = document.querySelector('#okButton');
const okButton2 = document.querySelector('#okButton2');


botao.addEventListener("click", async () => {
 
  if (ra.value === '' || senha.value === '' || ra.value.length < 9 || senha.value.length < 6) {
    modal.showModal(); 
  } else if (isNaN(ra.value)) {
    modal.showModal(); 
  } else {
    
    const result = await updateItemByRa(ra.value, { senha: senha.value });

    if (result.success) {
      modal2.showModal(); 
    } else {
      modal.showModal();
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

      return { success: true }; // Retorna sucesso se a atualização for bem-sucedida
    } else {
     
      return { success: false }; // Retorna erro se o RA não for encontrado
    }
  } catch (error) {
   
    return { success: false }; // Retorna erro se ocorrer algum erro na requisição
  }
};


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


document.addEventListener('DOMContentLoaded', () => {
  okButton.addEventListener('click', () => {
    modal.close();
  });

  okButton2.addEventListener('click', () => {
    modal2.close();
  });

  bntShowpass.addEventListener('click', mostrarSenha); 
});
