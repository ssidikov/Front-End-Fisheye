// Description: This file contains the code to display the photographer page.

import { photographerHeader } from '../factories/photographerHeader.js';
import { mediaFactory } from '../factories/mediaFactory.js';
import { lightboxFactory } from '../factories/lightboxFactory.js';

const lightbox = document.querySelector('#lightbox')

// Get the photographer ID from the URL
function getPhotographerId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function getPhotographerData(photographerId) {
  try {
    const response = await fetch('./data/photographers.json');
    const { photographers } = await response.json();
    return photographers.find(photographer => photographer.id == photographerId);
  } catch (error) {
    console.error('Error fetching photographer data: ', error);
    throw error;
  }
};

async function getMediaData(photographerId) {
  try {
    const response = await fetch('./data/photographers.json');
    const { media } = await response.json();
    return media.filter(media => media.photographerId == photographerId);
  }
  catch (error) {
    console.error('Error fetching media data: ', error);
    throw error;
  }
};

async function init() {
  const photographerData = await getPhotographerData(getPhotographerId());
  if (photographerData) {
    localStorage.setItem('photographerData', JSON.stringify(photographerData));
    displayPhotographersData(photographerData);
  }

  const mediaData = await getMediaData(getPhotographerId());
  if (mediaData) {
    localStorage.setItem('medias', JSON.stringify(mediaData));
    displayMediaData(mediaData);
    sortBy('Popularité');
  } else {
    alert('No photographer ID provided');
  }
}

init();


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

export function addLikes(index) {
  const media = JSON.parse(localStorage.getItem('medias'));
  const mediaBase = JSON.parse(localStorage.getItem('mediasBase'));
  const photo = document.getElementById(`${media[index].id}`);
  let result = media[index].likes + 1

  if (result > mediaBase[index].likes + 1) {
    result = media[index].likes - 1
  }
  
  media[index].likes = result
  localStorage.setItem('medias', JSON.stringify(media));
  photo.querySelector('.like__number').textContent = result;
  totalLikes();
  return media[index].likes;
}

// Total number of likes
function totalLikes() {
  // get the media data from local storage
  const media = JSON.parse(localStorage.getItem('medias'))
  // calculate the total number of likes
  const totalLikes = media.reduce((sum, mediaItem) => sum + mediaItem.likes, 0)
  // display the total number of likes
  document.getElementById('totalLikes').textContent = totalLikes
}

// Sort media by popularity, date, or title

function sortBy(type) {
  // get the dropdown icon
  const dropdownIcon = `<i class="dropdown__icon fa-solid fa-chevron-down" aria-hidden="true"></i>`;
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
  const dropdownButton = document.querySelector('#dropdownButton');
  dropdownButton.innerHTML = type + dropdownIcon;
  dropdownButton.addEventListener('click', dropdown);
  dropdownButton.addEventListener('keydown', handleDropdownKey);
  dropdownButton.setAttribute('aria-expanded', 'false');
  

  // get all the dropdown items and add the click event handler
  const dropdownItems = document.querySelectorAll('.dropdown__item');
  // pass on each element and add the Click event handler
  dropdownItems.forEach(item => {
    item.addEventListener('click', function(event) {
      // get the text content of the clicked element
      const sortByValue = event.currentTarget.textContent.trim();
      // sort the media by the clicked element
      sortBy(sortByValue);
      // document.querySelector('.sorting__dropdown').classList.remove('active');
    });
  });
  // get the dropdown items and add the key event handler
  dropdownItems.forEach(item => {
    item.addEventListener('keydown', handleDropdownKey);
  });
};

function handleDropdownKey(event) {
  const sortByValue = event.currentTarget.textContent.trim();
  const dropdown = document.querySelector('.sorting__dropdown');
  // const dropdownButton = document.querySelector('#dropdownButton');
  if (event.key === 'Enter') {
    sortBy(sortByValue);
    dropdown.classList.remove('active')
    dropdown.focus();
  }
}

let lastFocusedElement;

// Lightbox for media
export function launchLightbox(index) {
  const media = JSON.parse(localStorage.getItem('medias'));
  const photographerData = localStorage.getItem('photographerData');
  const mediaLightBox = media[index];

  // Save the currently focused element
  lastFocusedElement = document.activeElement;

  localStorage.setItem('currentMedia', index)

  lightbox.replaceChildren();
  
  const lightboxModel = lightboxFactory(mediaLightBox, photographerData)
  const getLightboxDOM = lightboxModel.getLightboxDOM()
  lightbox.appendChild(getLightboxDOM);
  // document.querySelector('lightbox__viewer').focus()
  document.addEventListener('keydown', handleLightboxKeyNavigation);

  // Set focus to the lightbox
  // lightbox.querySelector('.lightbox-content').focus();
};

export function next () {
  let nextPhoto = parseInt(localStorage.getItem('currentMedia')) + 1
  localStorage.setItem('currentMedia', nextPhoto)
  const media = JSON.parse(localStorage.getItem('medias'))
  if (nextPhoto >= media.length) {
    nextPhoto = 0
  }
  launchLightbox(nextPhoto)
}
// lightbox left arrow
export function previous () {
  let previousPhoto = parseInt(localStorage.getItem('currentMedia')) - 1
  localStorage.setItem('currentMedia', previousPhoto)
  const medias = JSON.parse(localStorage.getItem('medias'))
  if (previousPhoto < 0) {
    previousPhoto = medias.length - 1
  }
  launchLightbox(previousPhoto)
}


export function closeLightbox() {
  const body = document.querySelector('body')
  body.style.overflow = 'auto'
  lightbox.style.display = 'none'
  lightbox.setAttribute('aria-hidden', 'true')

  document.removeEventListener('keydown', handleLightboxKeyNavigation);
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

export function dropdown() {
  const dropdown = document.querySelector('.sorting__dropdown');
  const dropdownButton = document.querySelector('.dropdown__button');
  const dropdownItems = document.querySelectorAll('.dropdown__item');

  dropdown.classList.toggle('active');

  if (dropdown.classList.contains('active')) {
    dropdownButton.setAttribute('aria-expanded', 'true');
    dropdown.setAttribute('aria-hidden', 'false');

    dropdownItems.forEach(item => {
      item.setAttribute('tabindex', '0');
    });

    dropdown.addEventListener('focusout', handlerDropdownFocusOut);
  } else {
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');

    dropdownItems.forEach(item => {
      item.setAttribute('tabindex', '-1');
    });
    dropdown.removeEventListener('focusout', handlerDropdownFocusOut);
  }
}

function handlerDropdownFocusOut(event) {
  const dropdown = document.querySelector('.sorting__dropdown');
  const dropdownButton = document.querySelector('.dropdown__button');

  if (!dropdown.contains(event.relatedTarget)) {
    dropdown.classList.remove('active');
    dropdown.setAttribute('aria-hidden', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
  }
}


// Lightbox navigation with the keyboard
function handleLightboxKeyNavigation(event) {
  if (event.key === 'ArrowLeft') {
    previous();
  } else if (event.key === 'ArrowRight') {
    next();
  } else if (event.key === 'Escape') {
    closeLightbox();

  }
}




getPhotographerId()