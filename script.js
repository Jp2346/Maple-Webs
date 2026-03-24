function scrollToPortfolio() {
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
}

// Select all sections
const sections = document.querySelectorAll('.section');

// IntersectionObserver for sections
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const children = entry.target.querySelectorAll('.card, .portfolio-item');

        if (entry.isIntersecting) {
            // Fade in section itself (optional)
            entry.target.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";

            // Stagger children animations
            children.forEach((child, index) => {
                child.style.opacity = 0;
                child.style.transform = "translateY(20px)";
                setTimeout(() => {
                    child.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                    child.style.opacity = 1;
                    child.style.transform = "translateY(0)";
                }, index * 150); // 150ms delay between each child
            });
        } else {
            // Fade out when leaving viewport
            entry.target.style.opacity = 0;
            entry.target.style.transform = "translateY(20px)";
            children.forEach(child => {
                child.style.opacity = 0;
                child.style.transform = "translateY(20px)";
            });
        }
    });
}, {
    threshold: 0.1
});

// Initialize all sections with hidden state
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    sectionObserver.observe(section);
});
