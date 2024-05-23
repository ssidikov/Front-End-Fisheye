const modal = document.getElementById('contact-modal');
const body = document.querySelector('body');

function openContactForm() {
  body.style.overflow = 'hidden';
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  modal.focus();
};

function closeContactForm() {
  body.style.overflow = 'auto';
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
};

modal.addEventListener('submit', (e) => {
  e.preventDefault();
  closeContactForm();
});