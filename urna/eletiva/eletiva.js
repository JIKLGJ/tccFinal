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
const modal2 = document.querySelector("#modal2");
var okButton2 = document.querySelector('#okButton2');
// Função POST
async function POST() {
  const url = "https://urna-ec7a7-default-rtdb.firebaseio.com/eletiva.json";
  
  const newData = {
    nome: nomeInput.value,
    serie: seriesInput.value,
    escolha: escolhaInput.value
    
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
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

// Validação dos dados e envio ao clicar no botão
botao.addEventListener('click', () => {
  // Verificação de dados vazios ou incompletos
  if (nomeInput.value === '' ||   nomeInput.value.length < 9) {
    // Exibir modal de erro
    modal.showModal(); 
    
  }
  
  
  else {
    // Exibir modal de sucesso
    modal2.showModal();
      POST(); // Chamar a função POST depois de fechar o modal
      botao.disabled = true;
      botao.style.backgroundColor = 'gray';
      botao.style.cursor = 'not-allowed';
  }
});
document.addEventListener('DOMContentLoaded', () => {
    // Fechar o primeiro modal
    okButton.addEventListener('click', () => {
      modal.close();
    });
  
    // Fechar o segundo modal corretamente
    okButton2.addEventListener('click', () => {
      modal2.close(); // Correção: agora fecha o modal2, não o modal
    });
  });
  
