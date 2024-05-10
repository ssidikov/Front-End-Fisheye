function photographerFactory (data) {
  // catch data
  const { id, name, portrait, city, country, tagline, price } = data
  // structure data for use in html
  const picture = `assets/photographers/${portrait}`
  const location = `${city}, ${country}`
  const fees = `${price}€/jour`

  function getUserCardDOM () {
    const article = document.createElement('article')
    // image
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    // link
    const a = document.createElement('a')
    a.setAttribute('href', './photographer.html' + `?id=${id}`)
    // title
    const h2 = document.createElement('h2')
    h2.textContent = name
    // description
    const divDescription = document.createElement('div')
    divDescription.setAttribute('class', 'description')
    // city
    const divLocation = document.createElement('div')
    divLocation.setAttribute('class', 'location')
    divLocation.textContent = location
    // tagline
    const divTagline = document.createElement('div')
    divTagline.setAttribute('class', 'tagline')
    divTagline.textContent = tagline
    // fees
    const divFees = document.createElement('div')
    divFees.setAttribute('class', 'fees')
    divFees.textContent = fees

    // article structure
    article.appendChild(a)
    a.appendChild(img)
    a.appendChild(h2)
    a.appendChild(divDescription)
    divDescription.appendChild(divLocation)
    divDescription.appendChild(divTagline)
    divDescription.appendChild(divFees)
    return article
  }
  return { name, picture, location, tagline, fees, getUserCardDOM }
}
