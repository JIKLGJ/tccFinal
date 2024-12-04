
if (!localStorage.getItem('votes')) {
  initializeVotes();
}

function initializeVotes() {
  const initialVotes = { "chapa-A": 0, "chapa-B": 0, "chapa-C": 0 };
  localStorage.setItem('votes', JSON.stringify(initialVotes));
  localStorage.setItem('votedRAs', JSON.stringify([])); 
}


function updateResults() {
  const votes = JSON.parse(localStorage.getItem('votes') || "{}");
  document.getElementById('chapa-A-votes').textContent = votes["chapa-A"] || 0;
  document.getElementById('chapa-B-votes').textContent = votes["chapa-B"] || 0;
  document.getElementById('chapa-C-votes').textContent = votes["chapa-C"] || 0;
}


function showErrorModal(message) {
  const modal = document.getElementById('errorModal');
  document.getElementById('errorModalMessage').textContent = message; 
  modal.showModal();
}


function closeErrorModal() {
  const modal = document.getElementById('errorModal');
  modal.close();
}


function showVoteModal(message) {
  const modal = document.getElementById('voteModal');
  document.getElementById('modalMessage').textContent = message;
  modal.showModal();

  setTimeout(() => {
      const modal = document.getElementById('voteModal');
      modal.close();
      window.location.href = './tela de bem vindo.html';
  }, 4000);
}

function closeVoteModal() {
  const modal = document.getElementById('voteModal');
  modal.close();
}


function isValidRA(ra) {
  return ra && ra.length >= 9 && ra.length <= 12 && !isNaN(ra);
}

u
function hasVoted(ra) {
  const votedRAs = JSON.parse(localStorage.getItem('votedRAs') || "[]");
  return votedRAs.includes(ra);
}


function registerVote(ra) {
  const votedRAs = JSON.parse(localStorage.getItem('votedRAs') || "[]");
  votedRAs.push(ra);
  localStorage.setItem('votedRAs', JSON.stringify(votedRAs));
}


function vote(candidate) {
  const votes = JSON.parse(localStorage.getItem('votes') || "{}");
  votes[candidate] = (votes[candidate] || 0) + 1;
  localStorage.setItem('votes', JSON.stringify(votes));

  updateResults();
  showVoteModal(`Seu voto na ${candidate} foi confirmado!`);
}


function handleVote(candidate) {
  const raInput = document.getElementById('number1');
  const ra = raInput.value.trim();

 
  if (!isValidRA(ra)) {
      showErrorModal("Por favor, insira um RA válido ");
      return;
  }


  if (hasVoted(ra)) {
      showErrorModal("Este RA já foi utilizado para votar.");
      return;
  }

  registerVote(ra);
  vote(candidate);
}


updateResults();
