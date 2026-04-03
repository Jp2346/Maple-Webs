const faders = document.querySelectorAll('.fade-in');
const staggerContainers = document.querySelectorAll('.stagger');

const observerOptions = { threshold: 0.2 };

const fadeInObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if(entry.target.classList.contains('stagger')) {
        const children = entry.target.children;
        for (let i = 0; i < children.length; i++) {
          setTimeout(() => children[i].classList.add('visible'), i * 150);
        }
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

faders.forEach(el => fadeInObserver.observe(el));
staggerContainers.forEach(el => fadeInObserver.observe(el));

window.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.hero .fade-in');
  heroElements.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 200);
  });
});

const toggle = document.getElementById("darkToggle");
if (toggle && localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if(toggle){
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}
