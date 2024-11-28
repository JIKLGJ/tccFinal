const form = document.getElementById('formSuporte');
const modal = document.getElementById('modal');
const modal2 = document.getElementById('modal2');
const okButton = document.getElementById('okButton');
const okButton2 = document.getElementById('okButton2');
const erroMensagem = document.getElementById('erroMensagem');
const mensagemInput = document.getElementById('mensagem');

form.addEventListener('submit', function (event) {
    
    event.preventDefault();

    const mensagem = mensagemInput.value.trim();

    if (!mensagem) {
        erroMensagem.style.display = 'block';
        modal.showModal(); 
    } else {
        erroMensagem.style.display = 'none';
        modal2.showModal(); 
    }
});

// Fechar o modal de erro
okButton.addEventListener('click', function () {
    modal.close();
});

// Fechar o modal de sucesso e redirecionar
okButton2.addEventListener('click', function () {
    modal2.close();
    window.location.href = "../index.html"; 
});

mensagemInput.addEventListener('input', function () {
    if (erroMensagem.style.display === 'block') {
        erroMensagem.style.display = 'none';
    }
});
