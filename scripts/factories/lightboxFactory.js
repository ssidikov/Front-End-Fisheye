// Description: Factory function to create the lightbox for the media

import { closeLightbox, next, previous } from '../pages/photographerPage.js';

export function lightboxFactory(data) {
  // Destructuring the data
  const { image, video, title } = data;
  // Path to the media
  const mediaSrc = `assets/media/${image || video}`;

  function getLightboxDOM() {
   // Prevent scrolling when the lightbox is open 
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    // Create the lightbox
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'block';
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.focus();
    
    const lightboxViewer = document.createElement('div');
    lightboxViewer.classList.add('lightbox__viewer');
    lightboxViewer.setAttribute('aria-selected', 'true');
    lightboxViewer.setAttribute('aria-label', 'Vue rapprochée de l\'image');

    // Close the lightbox
    const lightboxClose = document.createElement('button');
    lightboxClose.classList.add('lightbox__close', 'lightbox__control');
    lightboxClose.setAttribute('id', 'close-lightbox')
    lightboxClose.setAttribute('aria-label', 'Fermer la visionneuse');
    lightboxClose.setAttribute('tabindex', '0');
    lightboxClose.addEventListener('click', closeLightbox);

    const btnCloseLightbox = document.createElement('i');
    btnCloseLightbox.classList.add('lightbox__control--icon', 'fa-solid', 'fa-xmark');
    btnCloseLightbox.setAttribute('aria-hidden', 'true');
    btnCloseLightbox.setAttribute('aria-label', 'Fermer la visionneuse');

    // Left arrow to navigate to the previous media
    const navigateLeft = document.createElement('button');
    navigateLeft.classList.add('lightbox__control');
    navigateLeft.setAttribute('aria-label', 'Photo précédente');
    navigateLeft.setAttribute('tabindex', '0');
    navigateLeft.addEventListener('click', previous);
    
    const btnLeftArrow = document.createElement('i');
    btnLeftArrow.classList.add('lightbox__control--icon', 'fa-solid', 'fa-angle-left');
    btnLeftArrow.setAttribute('aria-hidden', 'true');
    btnLeftArrow.setAttribute('aria-label', 'Photo précédente');

    // Right arrow to navigate to the next media
    const navigateRight = document.createElement('button');
    navigateRight.classList.add('lightbox__control');
    navigateRight.setAttribute('id', 'navigate-right')
    navigateRight.setAttribute('aria-label', 'Photo suivante');
    navigateRight.setAttribute('tabindex', '0');
    navigateRight.addEventListener('click', next);

    const rightArrow = document.createElement('i');
    rightArrow.classList.add('lightbox__control--icon', 'fa-solid', 'fa-angle-right');
    rightArrow.setAttribute('aria-hidden', 'true');
    rightArrow.setAttribute('aria-label', 'Photo suivante');

    // Container for the media
    const lightboxMediaContainer = document.createElement('div');
    lightboxMediaContainer.classList.add('lightbox__media-container');

    const mediaElement = video ? document.createElement('video') : document.createElement('img');
      mediaElement.setAttribute('src', mediaSrc);
      mediaElement.classList.add('lightbox__media');
      mediaElement.setAttribute('alt', title);
      mediaElement.setAttribute('tabindex', '0');
      if (video) {
        mediaElement.setAttribute('controls', 'controls');
        mediaElement.setAttribute('autoplay', 'autoplay');
        mediaElement.setAttribute('loop', 'loop');
      }

    // Description of the media
    const lightboxDescription = document.createElement('h3');
    lightboxDescription.classList.add('lightbox__description');
    lightboxDescription.textContent = title;

    // Add the elements to the lightbox
    navigateLeft.appendChild(btnLeftArrow);
    navigateRight.appendChild(rightArrow);
    lightboxClose.appendChild(btnCloseLightbox);
    lightboxMediaContainer.appendChild(mediaElement);
    lightboxMediaContainer.appendChild(lightboxDescription);
    lightboxViewer.appendChild(lightboxClose);
    lightboxViewer.appendChild(navigateLeft);
    lightboxViewer.appendChild(lightboxMediaContainer);
    lightboxViewer.appendChild(navigateRight);
    lightbox.appendChild(lightboxViewer);

    return lightboxViewer;

  }

  return { getLightboxDOM };

}