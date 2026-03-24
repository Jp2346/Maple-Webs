// ====== Elements ====== //
const heroElements = document.querySelectorAll('.hero h2, .hero p, .hero .hero-btn, .hero .scroll-indicator');
const fadeSections = document.querySelectorAll('.section, .card, .portfolio-item');

// ====== Initialize hidden state ====== //
const hideElements = (elements) => {
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
  });
};

hideElements(heroElements);
hideElements(fadeSections);

// ====== Animate elements sequentially ====== //
const animateElements = (elements, stagger = 250, horizontal = false) => { // stagger now 250ms
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = 1;
      if(horizontal) {
        const direction = i % 2 === 0 ? -20 : 20;
        el.style.transform = "translateX(0) translateY(0)";
      } else {
        el.style.transform = "translateY(0)";
      }
    }, i * stagger);
  });
};

// ====== Hero animation on page load ====== //
window.addEventListener('DOMContentLoaded', () => {
  animateElements(heroElements, 300); // Hero stagger 300ms for stronger effect
});

// ====== IntersectionObserver for sections ====== //
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate child cards with alternating horizontal movement
      if (entry.target.classList.contains('section')) {
        const children = entry.target.querySelectorAll('.card, .portfolio-item');
        children.forEach((child, i) => {
          child.style.opacity = 0;
          const direction = i % 2 === 0 ? -20 : 20;
          child.style.transform = `translateX(${direction}px) translateY(20px)`;
        });
        animateElements(children, 250, true); // Section child stagger 250ms
      }

      // Animate the section itself
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
}, { threshold: 0.1 });

// Observe all section-related elements
fadeSections.forEach(el => observer.observe(el));
