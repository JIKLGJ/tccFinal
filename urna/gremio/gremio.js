// Inicializa os votos no localStorage se ainda não existirem
if (!localStorage.getItem('votes')) {
  initializeVotes();
}

function initializeVotes() {
  const initialVotes = { "chapa-A": 0, "chapa-B": 0, "chapa-C": 0 };
  localStorage.setItem('votes', JSON.stringify(initialVotes));
  localStorage.setItem('votedRAs', JSON.stringify([])); // Armazena os RAs que já votaram
}

// Atualiza os resultados na tela
function updateResults() {
  const votes = JSON.parse(localStorage.getItem('votes') || "{}");
  document.getElementById('chapa-A-votes').textContent = votes["chapa-A"] || 0;
  document.getElementById('chapa-B-votes').textContent = votes["chapa-B"] || 0;
  document.getElementById('chapa-C-votes').textContent = votes["chapa-C"] || 0;
}

// Mostra o modal de erro com uma mensagem personalizada
function showErrorModal(message) {
  const modal = document.getElementById('errorModal');
  document.getElementById('errorModalMessage').textContent = message; // Define a mensagem do erro
  modal.showModal();
}

// Fecha o modal de erro
function closeErrorModal() {
  const modal = document.getElementById('errorModal');
  modal.close();
}

// Mostra o modal de confirmação
function showVoteModal(message) {
  const modal = document.getElementById('voteModal');
  document.getElementById('modalMessage').textContent = message;
  modal.showModal();

  // Fecha o modal e redireciona após 4 segundos
  setTimeout(() => {
      const modal = document.getElementById('voteModal');
      modal.close();
      window.location.href = './tela de bem vindo.html';
  }, 4000);
}

// Fecha o modal manualmente (caso necessário)
function closeVoteModal() {
  const modal = document.getElementById('voteModal');
  modal.close();
}

// Função para validar o RA
function isValidRA(ra) {
  return ra && ra.length >= 9 && ra.length <= 12 && !isNaN(ra);
}

// Verifica se o RA já votou
function hasVoted(ra) {
  const votedRAs = JSON.parse(localStorage.getItem('votedRAs') || "[]");
  return votedRAs.includes(ra);
}

// Registra o RA como votado
function registerVote(ra) {
  const votedRAs = JSON.parse(localStorage.getItem('votedRAs') || "[]");
  votedRAs.push(ra);
  localStorage.setItem('votedRAs', JSON.stringify(votedRAs));
}

// Processa o voto
function vote(candidate) {
  const votes = JSON.parse(localStorage.getItem('votes') || "{}");
  votes[candidate] = (votes[candidate] || 0) + 1;
  localStorage.setItem('votes', JSON.stringify(votes));

  // Atualiza os resultados e exibe o modal de confirmação
  updateResults();
  showVoteModal(`Seu voto na ${candidate} foi confirmado!`);
}

// Função principal para lidar com o voto
function handleVote(candidate) {
  const raInput = document.getElementById('number1');
  const ra = raInput.value.trim();

  // Valida o RA
  if (!isValidRA(ra)) {
      showErrorModal("Por favor, insira um RA válido ");
      return;
  }

  // Verifica se o RA já votou
  if (hasVoted(ra)) {
      showErrorModal("Este RA já foi utilizado para votar.");
      return;
  }

  // Registra o RA e processa o voto
  registerVote(ra);
  vote(candidate);
}

// Atualiza os resultados ao carregar a página
updateResults();
