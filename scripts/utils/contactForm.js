const body = document.querySelector('body');
const modal = document.getElementById('contact-modal');
const modalClose = document.querySelector('.contact-modal__close');
const form = document.getElementById('contact-form');
const firstName = document.getElementById('name');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');
const NamePattern = /^(?![\s])[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[\s-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

let lastFocusedElement;

function checkName() {
  const trimmedName = firstName.value.trim();
  if (trimmedName.length < 2) {
    firstName.parentElement.setAttribute('data-error-visible', 'true');
    firstName.parentElement.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    firstName.classList.add('error');
    return false;
  } else if (!trimmedName.match(NamePattern)) {
    firstName.parentElement.setAttribute('data-error-visible', 'true');
    firstName.parentElement.setAttribute('data-error', 'Veuillez saisir uniquement des lettres.');
    firstName.classList.add('error');
    return false;
  } else {
    firstName.parentElement.setAttribute('data-error-visible', 'false');
    firstName.classList.remove('error');
    return true;
  }
}

function checkLastName() {
  const trimmedLastName = lastName.value.trim();
  if (trimmedLastName.length < 2) {
    lastName.parentElement.setAttribute('data-error-visible', 'true');
    lastName.parentElement.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    lastName.classList.add('error');
    return false;
  } else if (!trimmedLastName.match(NamePattern)) {
    lastName.parentElement.setAttribute('data-error-visible', 'true');
    lastName.parentElement.setAttribute('data-error', 'Veuillez saisir uniquement des lettres.');
    lastName.classList.add('error');
    return false;
  } else {
    lastName.parentElement.setAttribute('data-error-visible', 'false');
    lastName.classList.remove('error');
    return true;
  }
}

function checkEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2}/; // Regex
  if (!email.value.match(emailPattern)) {
    email.parentElement.setAttribute('data-error-visible', 'true');
    email.parentElement.setAttribute('data-error', 'Veuillez entrer une adresse e-mail valide.');
    email.classList.add('error');
    return false;
  } else {
    email.parentElement.setAttribute('data-error-visible', 'false');
    email.classList.remove('error');
    return true;
  }
}

function checkMessage() {
  const trimmedMessage = message.value.trim();
  if (trimmedMessage.length < 3) {
    message.parentElement.setAttribute('data-error-visible', 'true');
    message.parentElement.setAttribute('data-error', 'Le champ du message ne peut pas être vide.');
    message.classList.add('error');
    return false;
  } else {
    message.parentElement.setAttribute('data-error-visible', 'false');
    message.classList.remove('error');
    return true;
  }
}

function formFieldValidation(element, method, event) {
  element.addEventListener(event, method);
}

formFieldValidation(firstName, checkName, 'focusout');
formFieldValidation(lastName, checkLastName, 'focusout');
formFieldValidation(email, checkEmail, 'focusout');
formFieldValidation(message, checkMessage, 'focusout');

function forAllFieldsValidation() {
  const isNameValid = checkName();
  const isLastNameValid = checkLastName();
  const isEmailValid = checkEmail();
  const isMessageValid = checkMessage();
  
  return isNameValid && isLastNameValid && isEmailValid && isMessageValid;
}

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  if (forAllFieldsValidation()) {
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const messageValue = message.value;
    console.log(`Prénom: ${firstNameValue}\nNom: ${lastNameValue}\nEmail: ${emailValue}\nMessage: ${messageValue}`);
    closeContactForm();
    document.querySelector('form[name="contact"]').reset();
    firstName.focus(); // Set focus back to the first input field in the form
  }
});

// Close the modal when the user clicks Escape
function handleContactFormKey(e) {
  // If the Escape key is pressed, we close the modal window
  if (e.key === 'Escape') {
    closeContactForm();
  } else if (e.key === 'Tab' && document.activeElement === document.querySelector('.form__submit')) {
    e.preventDefault(); // Prevent the default action (focus transition)
    modalClose.focus(); // set focus on the first element of the form
  }
}

export function openContactForm() {
  lastFocusedElement = document.activeElement;

  body.style.overflow = 'hidden';
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  modal.addEventListener('keydown', handleContactFormKey)
  modal.focus();
};

// const contactButton = document.querySelector('.photograph-header__contact-button');

export function closeContactForm() {
  body.style.overflow = 'auto';
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};
