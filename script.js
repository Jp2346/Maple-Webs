function scrollToPortfolio() {
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
}

// Fade-in animations on scroll
const elements = document.querySelectorAll('.card, .portfolio-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    observer.observe(el);
});
