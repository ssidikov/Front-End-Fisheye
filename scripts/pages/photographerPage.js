// Description: This file contains the code to display the photographer page.
// The function getData() fetches the data of the photographers from the JSON file.
async function getData() {
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('fetch error: ', error);
    throw error;
  }
};

// Get the id of the photographer from the URL
async function getPhotographerId() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
 
  let photographerData;

  if (photographerId) {
    const { media } = await getData();
    const { photographers } = await getData();

    const photographerSorted = photographers.find(
      (a) => parseInt(a.id) === parseInt(photographerId)
    )

    displayPhotographersData(photographerSorted)

    photographerData = photographerSorted.name
    photographerData = photographerData.split('')
    localStorage.setItem('photographerData', photographerData)

    const mediaSorted = media.filter(
      (photos) => parseInt(photos.photographerId) === parseInt(photographerId)
    )
    localStorage.setItem('medias', JSON.stringify(mediaSorted))
    displayMediaData(mediaSorted, photographerData)
    sortBy('Popularité')
  } else {
      alert('No photographer ID provided');
  }
}

// Display information about the photographer in header
async function displayPhotographersData(photographerData) {
  const header = document.querySelector('.photograph-header')
  const headerModel = photographerHeader(photographerData)
  const getUserCardDOM = headerModel.getHeaderCardDOM()
  header.appendChild(getUserCardDOM)
  photographerFees(photographerData);
}

// Display the photographer's fees
async function photographerFees(photographerData) {
  const feesHTML = document.querySelector('.fees__right')
  const fees = photographerData.price
  feesHTML.textContent = `${fees}€ / jour`
}

async function displayMediaData(media) {
  const mediaContainer = document.querySelector('.media')
  media.forEach((media, index) => {
    const mediaModel = mediaFactory(media)
    const getMediaCardDOM = mediaModel.getMediaCardDOM(index)
    mediaContainer.appendChild(getMediaCardDOM)
  })
  totalLikes()
}

function addLikes(index) {
  const media = JSON.parse(localStorage.getItem('medias'))
  const mediasBase = JSON.parse(localStorage.getItem('mediasBase'))
  const photo = document.getElementById(`${media[index].id}`)
  let result = media[index].likes + 1

  if (result > mediasBase[index].likes + 1) {
    result = media[index].likes - 1
  }
  
  media[index].likes = result
  localStorage.setItem('medias', JSON.stringify(media))
  photo.querySelector('.like__number').textContent = result
  totalLikes()
  return media[index].likes
}

// Total number of likes
function totalLikes() {
  // Get the media data from local storage
  const media = JSON.parse(localStorage.getItem('medias'))
  // Calculate the total number of likes
  const totalLikes = media.reduce((sum, mediaItem) => sum + mediaItem.likes, 0)
  // Display the total number of likes
  document.getElementById('totalLikes').textContent = totalLikes
}

// Sort media by popularity, date, or title

function sortBy(type) {
  // get the dropdown icon
  const dropdownIcon = `<i class="dropdown__icon fa-solid fa-chevron-down"></i>`;
  // get the media data from the local storage
  const media = JSON.parse(localStorage.getItem('medias'));
  const mediaContainer = document.querySelector('.media');
  const photographerData = localStorage.getItem('photographerData');
  let mediaSorted;
  // remove all photos of the media container
  mediaContainer.replaceChildren();
  // sort the media by the type
  if (type === 'Popularité') {
    mediaSorted = media.sort((a, b) => b.likes - a.likes)
  } else if (type === 'Date') {
    mediaSorted = media.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (type === 'Titre') {
    mediaSorted = media.sort((a, b) => a.title.localeCompare(b.title))
  };
  // save the sorted media in the local storage
  localStorage.setItem('medias', JSON.stringify(mediaSorted));
  localStorage.setItem('mediasBase', JSON.stringify(mediaSorted));
  displayMediaData(mediaSorted, photographerData);
  // display the type of sorting
  document.querySelector('.sorting__dropdown').classList.remove('active');
  document.querySelector('.dropdown__button').textContent = type;
  document.querySelector('.dropdown__button').innerHTML += dropdownIcon;
};

// Lightbox for media
function lunchLightbox(index) {
  const media = JSON.parse(localStorage.getItem('medias'));
  const photographerData = localStorage.getItem('photographerData');
  const mediaLightBox = media[index];

  localStorage.setItem('currentMedia', index)

  lightbox.replaceChildren();
  
  const lightboxModel = lightboxFactory(mediaLightBox, photographerData)
  const getLightboxDOM = lightboxModel.getLightboxDOM()
  // const lightboxModel = lightboxModel(mediaLightBox, photographerData)
  // const getLightboxDOM = lightboxModel.getLightboxDOM()
  lightbox.appendChild(getLightboxDOM);
};

// lightbox right arrow
function next() {
  let currentIndex = parseInt(localStorage.getItem('currentIndex'));
  const medias = JSON.parse(localStorage.getItem('medias'));

  // Calculate the next photo index and wrap around if necessary
  const nextPhoto = (currentIndex + 1) % medias.length;
  
  // Update the currentIndex in localStorage
  localStorage.setItem('currentIndex', nextPhoto);

  // Open the lightbox with the next photo
  lunchLightbox(nextPhoto);
}

// lightbox left arrow
function previous() {
  let currentIndex = parseInt(localStorage.getItem('currentIndex'));
  const medias = JSON.parse(localStorage.getItem('medias'));

  // Calculate the previous photo index and wrap around if necessary
  const previousPhoto = (currentIndex - 1 + medias.length) % medias.length;
  
  // Update the currentIndex in localStorage
  localStorage.setItem('currentIndex', previousPhoto);

  // Open the lightbox with the previous photo
  lunchLightbox(previousPhoto);
}

function closeLightbox() {
  const body = document.querySelector('body')
  body.style.overflow = 'auto'
  const lightbox = document.querySelector('#lightbox')
  lightbox.style.display = 'none'
  lightbox.setAttribute('aria-hidden', 'true')
}

function dropdown() {
  const dropdown = document.querySelector('.sorting__dropdown')
  dropdown.classList.toggle('active')
  if (dropdown.classList.contains('active')) {
    document.querySelector('.dropdown__button').setAttribute('aria-expanded', 'true')
  }
}


getPhotographerId()