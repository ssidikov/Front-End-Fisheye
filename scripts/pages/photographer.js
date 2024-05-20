// Description: This file contains the code to display the photographer's information and their photos
import { headerFactory } from '../factories/photographerHeader.js'
import { mediaFactory } from '../factories/photographerMedia.js'
// Fetch the data from the JSON file
async function getData() {
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
// Get the photographer's id from the URL
async function getPhotographersId() {
  // get the id from the URL
  const searchParams = new URLSearchParams(window.location.search)
  const photographerId = searchParams.get('id')
  let photographer
  if (photographerId) {
    // get the media and the specific photographer
    const { media } = await getData()
    const { photographers } = await getData()
    // filter the photographer
    const photographerSorted = photographers.find(
      (a) => parseInt(a.id) === parseInt(photographerId)
    )
    // get their info for the header
    displayPhotographersData(photographerSorted)
    // saving just their first name
    photographer = photographerSorted.name
    photographer = photographer.split(' ')
    localStorage.setItem('photographer', photographer)
    // filtering media by photographers
    const mediaSorted = media.filter(
      (photos) => parseInt(photos.photographerId) === parseInt(photographerId)
    )
    localStorage.setItem('medias', JSON.stringify(mediaSorted))
    displayMediaData(mediaSorted, photographer)
  } else {
    alert('Pas de media liés a ce photographe')
  }
}
// call the factory to display the photographer information in the header
async function displayPhotographersData (photographer) {
  const header = document.querySelector('.photograph-header')
  const feesHTML = document.querySelector('.right')
  const headerModel = headerFactory(photographer)
  const userCardDOM = headerModel.getheaderCardDOM()
  header.appendChild(userCardDOM)
}

// call the factory to display photos of the photographer
async function displayMediaData (media, photographer) {
  const mediaSection = document.querySelector('.section-media')
  media.forEach((media, index) => {
    const mediaModel = mediaFactory(media)
    const mediaCardDOM = mediaModel.getMediaCardDOM(index)
    mediaSection.appendChild(mediaCardDOM)
  })
}

getPhotographersId()
