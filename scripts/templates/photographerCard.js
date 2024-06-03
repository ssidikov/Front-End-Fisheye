// Description: This file contains the function that generates the DOM structure for the photographer card in Main page.

// The function createUserCard(data) takes the data of a photographer as an argument and returns an object with the data and the DOM structure of the card.
// Each card contains the name, location, tagline, price, and portrait of the photographer.
export function createUserCard(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  // Redirects to the photographer page when the card is clicked
  function redirectToPhotographerPage() {
    const url = `photographer.html?id=${id}`;
    window.location.href = url;
  }

  // Generates the DOM structure for the photographer card
  function getUserCardDOM() {
    // Create the card container
    const article = document.createElement("article");
    article.classList.add("photographer");
    article.addEventListener("click", redirectToPhotographerPage);

    // Photo of the photographer
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Portrait de " + name);
    img.setAttribute("aria-label", "Portrait de " + name);
    img.classList.add("photographer__image");

    // Link to the photographer page
    const idElement = document.createElement("a");
    idElement.setAttribute("href", `photographer.html?id=${id}`);
    idElement.setAttribute("aria-label", "Voir la page de " + name);
    idElement.classList.add("photographer__link");

    // Name of the photographer
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographer__name");
    h2.setAttribute("aria-label", name);

    // Description of the photographer
    const description = document.createElement("div");
    description.classList.add("photographer__description");
    description.setAttribute("tabindex", "0");

    // Location of the photographer
    const location = document.createElement("h3");
    location.textContent = city + ", " + country;
    location.classList.add("photographer__location");

    // Tagline of the photographer
    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.classList.add("photographer__tagline");
    taglineElement.setAttribute("aria-label", "Slogan de " + name + ":" + tagline);

    // Price of the photographer
    const priceElement = document.createElement("p");
    priceElement.textContent = price + "€/jour";
    priceElement.classList.add("photographer__price");
    priceElement.setAttribute("aria-label", "Tarif de " + name + ":" + price + "€ par jour");

    // Add the elements to the card
    idElement.appendChild(img);
    idElement.appendChild(h2);
    article.appendChild(idElement);
    article.appendChild(description);
    description.appendChild(location);
    description.appendChild(taglineElement);
    description.appendChild(priceElement);

    return article;
  }
  // Returns the data of the photographer
  return { name, id, picture, city, country, tagline, price, getUserCardDOM };
}
