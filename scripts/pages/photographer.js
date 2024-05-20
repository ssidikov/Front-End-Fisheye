// Description: This file contains the code to display the photographer's information and their photos
// import { headerFactory } from '../factories/photographerHeader.js'
// import { mediaFactory } from '../factories/photographerMedia.js'
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
    sortBy('Popularité')
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
  totalLikes()
}

function addLikes(index) {
  // getting the list of media
  const media = JSON.parse(localStorage.getItem('medias'))
  // get the untouched list of media
  const mediaBase = JSON.parse(localStorage.getItem('mediasBase'))
  // get the right photo by getting the id
  const photo = document.getElementById(`${media[index].id}`)
  let result = media[index].likes + 1
  // block adding more than one like
  if (result > mediaBase[index].likes + 1) {
    result = media[index].likes - 1
  }
  // replace the number of like by the result
  media[index].likes = result
  localStorage.setItem('medias', JSON.stringify(media))
  photo.querySelector('.likeNbr').textContent = result
  totalLikes()
  return media[index].likes
}

function totalLikes () {
  const media = JSON.parse(localStorage.getItem('medias'))
  let totalLikes = 0
  media.forEach((media) => {
    totalLikes = totalLikes += media.likes
  })
  // display total count of likes
  document.getElementById('totalLikes').textContent = totalLikes
}

// sorting the media by parameters
// sorting
function sortBy(type) {
  const menuSVG =
    "<img src='assets/icons/arrow-down.svg' width='18' height='17' alt='' />";
  // get the data from the browser
  const media = JSON.parse(localStorage.getItem('medias'));
  const photographer = localStorage.getItem('photographer');
  const mediaSection = document.querySelector('.media_section');
  let mediaSorted;
  // wipe all the HTML
  mediaSection.replaceChildren();
  // sort by type
  if (type === 'Popularité') {
    mediaSorted = media.sort((a, b) =>
      a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0
    );
  }
  if (type === 'Date') {
    mediaSorted = media.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    );
  }
  if (type === 'Titre') {
    mediaSorted = media.sort((a, b) =>
      b.title < a.title ? 1 : b.title > a.title ? -1 : 0
    );
  }
  // save the new order
  localStorage.setItem('medias', JSON.stringify(mediaSorted));
  localStorage.setItem('mediasBase', JSON.stringify(mediaSorted));
  displayMediaData(mediaSorted, photographer);
  // display the type of filter
  document.querySelector('.dropdown').classList.remove('active');
  document.querySelector('.dropbtn').innerHTML = type + menuSVG;
}


function dropdown() {
  const dropdown = document.querySelector('.dropdown')
  dropdown.classList.toggle('active')
  if (dropdown.className === 'dropdown active') {
    document.querySelector('.dropbtn').setAttribute('aria-expanded', 'true')
  } else {
    document.querySelector('.dropbtn').setAttribute('aria-expanded', 'false')
  }
}



getPhotographersId()
