import { launchLightbox, addLikes } from '../pages/photographerPage.js';

export function mediaFactory(data) {

  const { id, image, video, poster, likes, title } = data;

  const picture = `assets/media/${image}`;
  const videoImg = `assets/media/${video}`;
  const posterImg = `assets/media/${poster}`;

  function getMediaCardDOM(index) {
    const article = document.createElement('article')
    article.classList.add('media__card')
    article.setAttribute('id', `${id}`);

    const mediaItem = document.createElement('div')
    mediaItem.classList.add('card_link')
    mediaItem.addEventListener('click', () => launchLightbox(index));
    mediaItem.setAttribute('tabindex', '0')
    mediaItem.setAttribute('role', 'button')
    mediaItem.setAttribute('aria-haspopup', 'dialog');
    mediaItem.setAttribute('aria-label', 'Ouvrir lightbox');
    // mediaItem.addEventListener('keydown', (e) => {
    //   if (e.key === 'Enter') {
    //     launchLightbox(index)
    //   }
    // })

    let imageOrVideo
    if (video) {
      imageOrVideo = document.createElement('video')
      imageOrVideo.setAttribute('src', videoImg)
      imageOrVideo.setAttribute('poster', posterImg)
      imageOrVideo.classList.add('card__video')
      imageOrVideo.setAttribute('alt', `${title}, vue rapprochée`)
    } else {
      imageOrVideo = document.createElement('img')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.classList.add('card__image')
      imageOrVideo.setAttribute('alt', `${title}, vue rapprochée`)
    }

    const cardDescription = document.createElement('div')
    cardDescription.classList.add('card__description')

    const cardTitle = document.createElement('h3')
    cardTitle.textContent = title
    cardTitle.classList.add('card__title')

    const cardLike = document.createElement('div')
    cardLike.classList.add('card__like')

    const likeNumber = document.createElement('div')
    likeNumber.classList.add('like__number')
    likeNumber.textContent = likes

    const cardLikeSpan = document.createElement('span')
    cardLikeSpan.setAttribute('tabindex', '0')
    cardLikeSpan.addEventListener('click', () => addLikes(index))
    cardLikeSpan.setAttribute('aria-label', 'like')
    cardLikeSpan.setAttribute('role', 'button')
    cardLikeSpan.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addLikes(index)
      }
    })

    const cardLikeIcon = document.createElement('i')
    cardLikeIcon.classList.add('like__icon', 'fa-solid', 'fa-heart')
    cardLikeIcon.setAttribute('aria-label', 'likes')
    cardLikeIcon.setAttribute('aria-hidden', 'true')
    cardLikeIcon.setAttribute('role', 'icon')

    // article.appendChild(imageOrVideo)
    
    article.appendChild(mediaItem)
    mediaItem.appendChild(imageOrVideo)
    article.appendChild(cardDescription)
    cardDescription.appendChild(cardTitle)
    cardDescription.appendChild(cardLike)
    cardLike.appendChild(likeNumber)
    cardLike.appendChild(cardLikeSpan)
    cardLikeSpan.appendChild(cardLikeIcon)

    return article
  }

  return { getMediaCardDOM }

}