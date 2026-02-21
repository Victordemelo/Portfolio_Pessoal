// =============================================
// FUNCIONALIDADE DE SCROLL SUAVE
// =============================================

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calcula o offset baseado no tamanho do header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = window.scrollY;
});

// =============================================
// ANIMAÇÃO FADE-IN AO SCROLLAR
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .card-projetos, .imagem-sobre').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// =============================================
// MODAL DE CONTATO
// =============================================

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

// =============================================
// VALIDAÇÃO DO FORMULÁRIO
// =============================================

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