function scrollToPortfolio() {
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
}

// Select all elements to animate
const sections = document.querySelectorAll('.section');

// Function to animate child elements staggered
function animateStaggered(section) {
    const children = section.querySelectorAll('.card, .portfolio-item');
    children.forEach((child, index) => {
        child.style.opacity = 0;
        child.style.transform = "translateY(20px)";
        setTimeout(() => {
            child.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            child.style.opacity = 1;
            child.style.transform = "translateY(0)";
        }, index * 150); // 150ms delay between each
    });
}

// IntersectionObserver for sections
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStaggered(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Observe each section
sections.forEach(section => sectionObserver.observe(section));
