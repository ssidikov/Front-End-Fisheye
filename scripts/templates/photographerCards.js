// Generates the user card content for a photographer
export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    // Redirects to the photographer's page when clicking on their card
    function redirectToPhotographerPage() {
        const url = `photographer.html?photographer_id=${id}`;
        console.log(url);
        window.location.href = url;
    }

    // Generates the DOM of the user card
    function getUserCardDOM() {
        // Create photographer card
        const article = document.createElement('article');
        article.classList.add('photographer__section--article');
        article.setAttribute('tabindex', 0);
        article.setAttribute('role', 'article');
        article.addEventListener('click', redirectToPhotographerPage)
        article.focus()
        
        // Recover image
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de " + name);
        img.setAttribute("aria-label", "Portrait de " + name)
        img.classList.add('photographer__section--article--img');
        
        // Recover name
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("aria-label", name)
        h2.classList.add('photographer__section--article--name');

        // Recover ID (for identification purposes, hidden)
        const idElement = document.createElement('span');
        idElement.textContent = id;
        idElement.style.display = "none";
        idElement.classList.add('photographer__section--article--id')
        
        // Recover location
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        h3.setAttribute("aria-label", "Localisation de " + name + ":" + city + ", " + country)
        h3.classList.add('photographer__section--article--loc');
        
        // Recover tagline
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.setAttribute("aria-label", "Slogan de " + name + ":" + tagline)
        h4.classList.add('photographer__section--article--tagline');
        
        // Recover price
        const p = document.createElement('p');
        p.textContent = price + "€/jour";
        p.setAttribute("aria-label", "Prix journalier de " + name+ ":" + price)
        p.classList.add('photographer__section--article--price');

        // Create DOM elements
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(idElement); // Renamed to avoid confusion with the previous "id" variable
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);

        return (article);
    }
    return { name, id, picture, city, country, tagline, price, getUserCardDOM }
}