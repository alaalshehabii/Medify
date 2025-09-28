// Minimal UI helpers

// Show/Hide password for buttons with .js-toggle-pass
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.js-toggle-pass');
  if (!btn) return;

  // Prefer the sibling input; fallback to nearest input in the same container
  const container = btn.parentElement || document;
  const input = container.querySelector('input[type="password"], input[type="text"]');
  if (!input) return;

  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
});
