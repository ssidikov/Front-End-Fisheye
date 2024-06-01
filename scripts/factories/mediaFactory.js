// Description: Factory function to create media elements (image or video) for the gallery.

import { launchLightbox, addLikes } from '../pages/photographerPage.js';

// Add event listener to the media card to open the lightbox when the user presses the Enter key
function addEnterKeyListener(e) {
  if(e.key === 'Enter') {
    e.target.click();
  }
}

// Factory function to create media elements (image or video) for the gallery
export function mediaFactory(data) {
  // Destructure the data object
  const { id, image, video, poster, likes, title } = data;
  // Create the path to the media files
  const mediaSrc = `assets/media/${image || video}`;
  const posterImg = `assets/media/${poster}`;
  // Create the media card DOM element
  function getMediaCardDOM(index) {

    const article = document.createElement('article');
    article.classList.add('media__card');
    article.setAttribute('id', `${id}`);

    const mediaItem = document.createElement('div');
    mediaItem.classList.add('card_link');
    mediaItem.setAttribute('tabindex', '0');
    mediaItem.setAttribute('role', 'button');
    mediaItem.setAttribute('aria-label', 'Ouvrir lightbox');
    mediaItem.setAttribute('aria-haspopup', 'dialog');
    mediaItem.addEventListener('click', () => launchLightbox(index));
    mediaItem.addEventListener('keydown', addEnterKeyListener);

    // Create the media element (image or video)
    const mediaElement = video ? document.createElement('video') : document.createElement('img');
    mediaElement.setAttribute('src', mediaSrc);
    mediaElement.classList.add('card__media');
    mediaElement.setAttribute('alt', `${title}, vue rapprochée`);
    if (video) {
      mediaElement.setAttribute('poster', posterImg);
      mediaElement.setAttribute('preload', 'metadata');
    };

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card__description');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = title;

    const cardLike = document.createElement('div');
    cardLike.classList.add('card__like');

    const likeNumber = document.createElement('span');
    likeNumber.classList.add('like__number');
    likeNumber.textContent = likes;

    const cardLikeSpan = document.createElement('span');
    cardLikeSpan.setAttribute('tabindex', '0');
    cardLikeSpan.addEventListener('click', () => addLikes(index));
    cardLikeSpan.setAttribute('aria-label', 'nombre de likes');
    cardLikeSpan.setAttribute('role', 'button');
    cardLikeSpan.addEventListener('keydown', addEnterKeyListener);

    const cardLikeIcon = document.createElement('i');
    cardLikeIcon.classList.add('like__icon', 'fa-solid', 'fa-heart');
    cardLikeIcon.setAttribute('aria-label', 'likes');
    cardLikeIcon.setAttribute('aria-hidden', 'true');

  //  Append the elements to the article
    article.appendChild(mediaItem);
    mediaItem.appendChild(mediaElement);
    article.appendChild(cardDescription);
    cardDescription.appendChild(cardTitle);
    cardDescription.appendChild(cardLike);
    cardLike.appendChild(likeNumber);
    cardLike.appendChild(cardLikeSpan);
    cardLikeSpan.appendChild(cardLikeIcon);

    return article;
  }

  return { getMediaCardDOM };

}