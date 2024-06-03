// Description: This file contains the function that generates the DOM structure for the photographer header in the photographer page.
import { openContactForm, closeContactForm } from "../utils/contactForm.js";
// The function photographerHeader(data) takes the data of a photographer as an argument and returns the DOM structure of the header.
export function photographerHeader(data) {
  // Destructuring the data
  const { name, portrait, city, country, tagline, price } = data;
  // Path to the photographer's portrait
  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  // Generates the DOM structure for the photographer header
  function getHeaderCardDOM() {
    // Create the photographer header description
    const article = document.createElement("article");
    article.classList.add("photograph-header__description");

    // Name of the photographer
    const nameElement = document.createElement("h1");
    nameElement.textContent = name;
    nameElement.classList.add("description__name");
    nameElement.setAttribute("aria-label", name);
    nameElement.setAttribute("tabindex", "0");

    // Location of the photographer
    const locationElement = document.createElement("address");
    locationElement.textContent = location;
    locationElement.classList.add("description__location");
    locationElement.setAttribute(
      "aria-label",
      "Localisation de " + name + ":" + location
    );
    locationElement.setAttribute("tabindex", "0");

    // Tagline of the photographer
    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.classList.add("description__tagline");
    taglineElement.setAttribute(
      "aria-label",
      "Slogan de " + name + ":" + tagline
    );
    taglineElement.setAttribute("tabindex", "0");

    // Contact button
    const contactButton = document.createElement("button");
    contactButton.textContent = "Contactez-moi";
    contactButton.classList.add("photograph-header__contact-button");
    contactButton.setAttribute("aria-label", "Contactez " + name);
    contactButton.setAttribute("role", "button");
    contactButton.setAttribute("aria-haspopup", "dialog");
    contactButton.addEventListener("click", openContactForm);

    // contact name of the photographer in the modal
    const contactName = document.querySelector(".contact-modal__title");
    contactName.insertAdjacentHTML("beforeend", ` ${name}`);

    // close the modal
    const closeModal = document.querySelector(".contact-modal__close");
    closeModal.setAttribute("tabindex", "0");
    closeModal.addEventListener("click", closeContactForm);

    // Portrait of the photographer
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Portrait de " + name);
    img.setAttribute("aria-label", "Portrait de " + name);
    img.classList.add("photograph-header__image");

    // Add the elements to the article
    article.appendChild(nameElement);
    article.appendChild(locationElement);
    article.appendChild(taglineElement);

    // Append the elements to the section Photograph Header
    const sectionPhotographHeader =
      document.querySelector(".photograph-header");
    sectionPhotographHeader.appendChild(article);
    sectionPhotographHeader.appendChild(contactButton);
    sectionPhotographHeader.appendChild(img);

    return article;
  }
  return { name, picture, location, tagline, price, getHeaderCardDOM };
}
