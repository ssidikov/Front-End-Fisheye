// Description: This file contains the function that generates the DOM structure for the photographer header in the photographer page.
// The function photographerHeader(data) takes the data of a photographer as an argument and returns the DOM structure of the header.
function photographerHeader(data) {
  // Destructuring the data
  const { name, portrait, city, country, tagline, price } = data;
  // Path to the photographer's portrait
  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  // Generates the DOM structure for the photographer header
  function getHeaderCardDOM() {

    // Create the photographer header description
    const article = document.createElement('article');
    article.classList.add('photograph-header__description');

    // Name of the photographer
    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.classList.add('description__name');
    h2.setAttribute('aria-label', name);

    // Location of the photographer
    const locationElement = document.createElement('h3');
    locationElement.textContent = location;
    locationElement.classList.add('description__location');

    // Tagline of the photographer
    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;
    taglineElement.classList.add('description__tagline');
    taglineElement.setAttribute('aria-label', 'Slogan de ' + name + ':' + tagline);

    // Contact button
    const contactButton = document.createElement('button');
    contactButton.textContent = 'Contactez-moi';
    contactButton.classList.add('photograph-header__contact-button');
    contactButton.setAttribute('aria-label', 'Contactez ' + name);
    contactButton.setAttribute('role', 'button');
    contactButton.setAttribute('onclick', 'openContactForm()');

    // Portrait of the photographer
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', 'Portrait de ' + name);
    img.setAttribute('aria-label', 'Portrait de ' + name);
    img.classList.add('photograph-header__image');

    // Add the elements to the article
    const sectionPhotographHeader = document.querySelector('.photograph-header');
    sectionPhotographHeader.appendChild(article);
    article.appendChild(h2);
    article.appendChild(locationElement);
    article.appendChild(taglineElement);
    sectionPhotographHeader.appendChild(contactButton);
    sectionPhotographHeader.appendChild(img);
    
    return article;

  }
  return { name, picture, location, tagline, price, getHeaderCardDOM };

}