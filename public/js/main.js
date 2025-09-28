// Show/Hide password buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.js-toggle-pass');
  if (!btn) return;
  const input = btn.parentElement.querySelector('input');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
});

// Scroll-reveal for sections marked with [data-animate]
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el));
