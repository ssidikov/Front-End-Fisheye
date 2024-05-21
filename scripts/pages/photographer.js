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
  const fees = photographer.price
  feesHTML.textContent = `${fees}€ / jour`
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
    `<i class="fa-solid fa-chevron-down"></i>`;
  // get the data from the browser
  const media = JSON.parse(localStorage.getItem('medias'));
  const photographer = localStorage.getItem('photographer');
  const mediaSection = document.querySelector('.section-media');
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

// lightbox functions
function openLightbox (index) {
  // open lightbox
  const lightbox = document.querySelector('#lightbox')
  lightbox.style.display = 'block'
  lightbox.setAttribute('aria-hidden', 'false')
  lightbox.focus()
  // get the right media with the index given by the display function
  const media = JSON.parse(localStorage.getItem('medias'))
  const photographer = localStorage.getItem('photographer')
  const mediaLightBox = media[index]
  // save the index
  localStorage.setItem('currentIndex', index)
  // clean the lightbox then display the right media with the right title
  lightbox.replaceChildren()
  /* eslint-disable-next-line */
  const lbModel = LBFactory(mediaLightBox, photographer)
  const lbCardDOM = lbModel.getLBCardDOM()
  lightbox.appendChild(lbCardDOM)
  // Left and Right navigation
}

document.onkeydown = function (e) {
  const modal = document.getElementById('contact_modal')
  const lightbox = document.querySelector('#lightbox')
  const likeFocus = document.querySelectorAll('.heart')
  if (lightbox.style.display === 'block') {
    switch (e.code) {
      case 'ArrowLeft':
        previous()
        break
      case 'ArrowRight':
        next()
        break
      // add escape
      case 'Escape':
        closeLightbox()
        break
    }
  }
  likeFocus.forEach((el) => {
    // if the element is focused
    if (el === document.activeElement) {
      // get the index of the photo from the onclick event
      let index = document.activeElement.getAttribute('onclick')
      // get rid of the text and get only the number
      index = parseInt(index.replace(/[^\d.]/g, ''))
      switch (e.code) {
        case 'Enter':
          addLikes(index)
      }
    }
  })
  if (modal.style.display === 'block') {
    if (e.code === 'Escape') {
      /* eslint-disable-next-line */
        closeModal()
    }
  }
  document.querySelector('.closeModal').addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
      if (e.code === 'Enter') {
        /* eslint-disable-next-line */
        closeModal()
      }
    }
  })
  document.querySelector('.viewer_left').addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.code === 'Enter') {
        /* eslint-disable-next-line */
        previous()
      }
    }
  })
  document.querySelector('.viewer_right').addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.code === 'Enter') {
        /* eslint-disable-next-line */
        next()
      }
    }
  })
  document.querySelector('.close').addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.code === 'Enter') {
        /* eslint-disable-next-line */
        closeLightbox()
      }
    }
  })
}

// lightbox right arrow
function next () {
  let nextPhoto = parseInt(localStorage.getItem('currentIndex')) + 1
  localStorage.setItem('currentIndex', nextPhoto)
  const media = JSON.parse(localStorage.getItem('medias'))
  if (nextPhoto >= media.length) {
    nextPhoto = 0
  }
  openLightbox(nextPhoto)
}
// lightbox left arrow
function previous () {
  let previousPhoto = parseInt(localStorage.getItem('currentIndex')) - 1
  localStorage.setItem('currentIndex', previousPhoto)
  const medias = JSON.parse(localStorage.getItem('medias'))
  if (previousPhoto < 0) {
    previousPhoto = medias.length - 1
  }
  openLightbox(previousPhoto)
}

function closeLightbox () {
  const lightbox = document.querySelector('#lightbox')
  lightbox.style.display = 'none'
  lightbox.setAttribute('aria-hidden', 'true')
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
