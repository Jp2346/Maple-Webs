// Smooth scroll button
function scrollToPortfolio() {
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
}

// Elements to animate
const fadeElements = document.querySelectorAll('.section, .card, .portfolio-item');

// Initialize all elements to hidden
fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
});

// IntersectionObserver for fade in/out
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            // Check if element has children we want to stagger
            if (entry.target.classList.contains('section')) {
                const staggerChildren = entry.target.querySelectorAll('.card, .portfolio-item');
                staggerChildren.forEach((child, index) => {
                    child.style.opacity = 0;
                    child.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        child.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                        child.style.opacity = 1;
                        child.style.transform = "translateY(0)";
                    }, index * 150);
                });
            }

            // Fade in the element itself
            entry.target.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            
        } else {
            // Fade out when leaving viewport
            if (!entry.target.classList.contains('section')) {
                entry.target.style.opacity = 0;
                entry.target.style.transform = "translateY(20px)";
            }
        }

    });
}, {
    threshold: 0.1
});

// Observe all elements
fadeElements.forEach(el => observer.observe(el));
