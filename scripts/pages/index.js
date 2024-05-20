// Description: This file contains the code to display the list of photographers on the homepage.
import { photographerFactory } from '../factories/indexPhotographer.js'

// The code is responsible for fetching the data from the JSON file and displaying it in the HTML.
async function getPhotographers() {
  return await fetch('./data/photographers.json').then((response) => response.json())
}

// The code is responsible for displaying the data in the HTML.
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section')
    photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const getUserCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(getUserCardDOM)
  })
}

// The code is responsible for initializing the page by fetching the data and displaying it.
async function init() {
  try {
    const { photographers } = await getPhotographers();
    displayData(photographers);
  } catch (error) {
     document.querySelector('.photographer_section').innerHTML = '<h3>Erreur 404 : fichier introuvable</h3>';
  }
}

init();