// Description: This file contains the JavaScript code for the contact form.

// Declare the variables
const body = document.querySelector("body");
const modal = document.getElementById("contact-modal");
const modalClose = document.querySelector(".contact-modal__close");
const form = document.getElementById("contact-form");
const firstName = document.getElementById("name");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
// Regex for the name
const NamePattern = /^(?![\s])[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[\s-][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;

// This function sets the error message
function setErrorMessage(element, message) {
  const parent = element.parentElement;
  parent.setAttribute("data-error-visible", "true");
  parent.setAttribute("data-error", message);
  element.classList.add("error");
}

// This function removes the error message
function removeErrorMessage(element) {
  const parent = element.parentElement;
  parent.setAttribute("data-error-visible", "false");
  parent.removeAttribute("data-error");
  element.classList.remove("error");
}

// This function checks the name
function checkName() {
  const name = firstName.value.trim();
  if (name.length < 2) {
    setErrorMessage(
      firstName,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    return false;
  } else if (!NamePattern.test(name)) {
    setErrorMessage(firstName, "Veuillez saisir uniquement des lettres.");
    return false;
  } else {
    removeErrorMessage(firstName);
    return true;
  }
}

// This function checks the last name
function checkLastName() {
  const name = lastName.value.trim();
  if (name.length < 2) {
    setErrorMessage(
      lastName,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    return false;
  } else if (!NamePattern.test(name)) {
    setErrorMessage(lastName, "Veuillez saisir uniquement des lettres.");
    return false;
  } else {
    removeErrorMessage(lastName);
    return true;
  }
}

// This function checks the email
function checkEmail() {
  const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2}/; // Regex
  const emailValue = email.value.trim();
  if (!EmailPattern.test(emailValue)) {
    setErrorMessage(email, "Veuillez entrer une adresse e-mail valide.");
    return false;
  } else {
    removeErrorMessage(email);
    return true;
  }
}

// This function checks the message
function checkMessage() {
  const trimmedMessage = message.value.trim();
  if (trimmedMessage.length < 3) {
    setErrorMessage(message, "Le champ du message ne peut pas être vide.");
    return false;
  } else {
    removeErrorMessage(message);
    return true;
  }
}

// Event Listeners for Real-time Validation
function formFieldValidation(element, method, event) {
  element.addEventListener(event, method);
}

// Check the form fields to see if they are valid
formFieldValidation(firstName, checkName, "focusout");
formFieldValidation(lastName, checkLastName, "focusout");
formFieldValidation(email, checkEmail, "focusout");
formFieldValidation(message, checkMessage, "focusout");

// This function checks all the fields if they are valid
function validateForm() {
  const isNameValid = checkName();
  const isLastNameValid = checkLastName();
  const isEmailValid = checkEmail();
  const isMessageValid = checkMessage();

  return isNameValid && isLastNameValid && isEmailValid && isMessageValid;
}

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    console.log(
      `Prénom: ${firstName.value}\nNom: ${lastName.value}\nEmail: ${email.value}\nMessage: ${message.value}`
    );
    closeContactForm();
    form.reset();
  }
});

// Close the modal when the user clicks Escape
// If the Escape key is pressed, the modal window will close
// If the Tab key is pressed and the submit button is focused, the focus will be set on the close button (it's to avoid the focus trap)
function handleContactFormKey(e) {
  if (e.key === "Escape") {
    closeContactForm();
  } else if (
    e.key === "Tab" &&
    document.activeElement === document.querySelector(".form__submit")
  ) {
    e.preventDefault(); // Prevent the default action (focus transition)
    modalClose.focus(); // set focus on the first element of the form
  }
}

// Store the last focused element for modal open/close functions
let lastFocusedElement;

// Open the modal window and store the last focused element
export function openContactForm() {
  lastFocusedElement = document.activeElement;
  body.style.overflow = "hidden";
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.addEventListener("keydown", handleContactFormKey);
  modal.focus();
}

// Close the modal window and set focus on the last focused element
export function closeContactForm() {
  body.removeAttribute("style");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}
