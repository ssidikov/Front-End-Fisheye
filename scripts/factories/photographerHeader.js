// Description: Factory function to create a header for the photographer page

function headerFactory(data) {
  // Destructuring the data object
  const { name, city, country, tagline, portrait } = data
  // Creating the picture path
  const picture = `./assets/photographers/${portrait}`
  // Creating the location string
  const location = `${city}, ${country}`

  // Creating the photographer-header card DOM
  function getHeaderCardDom() {
    // description article
    const article = document.createElement('article')
    article.setAttribute('class', 'description')
    // full name of the photographer
    const h2 = document.createElement('h2')
    h2.textContent = name
    // location of the photographer
    const divLocation = document.createElement('div')
    divLocation.setAttribute('class', 'location')
    divLocation.textContent = location
    // tagline of the photographer
    const pTagLine = document.createElement('p')
    pTagLine.setAttribute('class', 'tagline')
    pTagLine.textContent = tagline
    // contact button
    const button = document.createElement('button')
    button.setAttribute('class', 'contact')
    button.setAttribute('aria-label', 'Contactez-moi')
    button.setAttribute('onclick', 'displayModal()')
    button.textContent = 'Contactez-moi'
    // portrait of the photographer
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    // appending the elements to the DOM
    document.querySelector('.photograph-header').appendChild(article)
    article.appendChild(h2)
    article.appendChild(divLocation)
    article.appendChild(pTagLine)
    document.querySelector('.photograph-header').appendChild(button)
    document.querySelector('.photograph-header').appendChild(img)
    return article
  }
  return { name, location, tagline, picture, getHeaderCardDom}
}