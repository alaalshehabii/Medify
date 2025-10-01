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

// --- Doctors search: autosubmit on input/change with a tiny debounce
(function () {
  const form = document.querySelector('#doctor-search-form');
  if (!form) return;

  const input = form.querySelector('#doctor-search');
  const select = form.querySelector('#doctor-specialty');

  const debouncedSubmit = (() => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(() => form.submit(), 300);
    };
  })();

  if (input) input.addEventListener('input', debouncedSubmit);
  if (select) select.addEventListener('change', () => form.submit());
})();

