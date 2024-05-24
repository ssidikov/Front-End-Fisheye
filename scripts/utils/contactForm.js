const modal = document.getElementById('contact-modal');
const body = document.querySelector('body');
const submit = document.getElementById('form__submit');

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

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  closeContactForm();
});