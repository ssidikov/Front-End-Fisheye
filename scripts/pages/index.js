async function getPhotographers () {
  return await fetch('./data/photographers.json').then((response) =>
    response.json()
  )
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // Photographer data
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()

