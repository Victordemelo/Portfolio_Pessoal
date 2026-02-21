const modal = document.getElementById('modal-contato');
const btnAbrir = document.getElementById('btn-contato');
const btnFechar = document.querySelector('.close-btn');
const formContato = document.getElementById('form-contato');
const inputTelefone = document.getElementById('telefone');

btnAbrir.addEventListener('click', function () {
    modal.style.display = 'flex';
});

btnFechar.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

inputTelefone.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    e.target.value = value;
});

formContato.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = inputTelefone.value.trim();

    const regexNome = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    if (!regexNome.test(nome)) {
        alert("Ops! Por favor, insira um nome válido (apenas letras, mínimo de 3 caracteres).");
        document.getElementById('nome').focus();
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Por favor, insira um e-mail válido (exemplo: seu@email.com).");
        document.getElementById('email').focus();
        return;
    }

    if (telefone.length !== 11) {
        alert("Por favor, insira um telefone celular válido com DDD (exemplo: 48988078888).");
        inputTelefone.focus();
        return;
    }

    alert(`Tudo certo, ${nome}! Sua mensagem passou na validação e foi simulada com sucesso.`);
    formContato.reset();
    modal.style.display = 'none';
});