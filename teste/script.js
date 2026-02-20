// Rolagem suave para os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Compensa a altura do header fixo
                behavior: 'smooth'
            });
        }
    });
});

// Animação de Fade-In ao rolar a página (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara quando 15% do elemento estiver visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Anima apenas uma vez
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});