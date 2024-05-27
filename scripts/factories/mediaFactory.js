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

    // const mediaItem = document.createElement('div')
    // mediaItem.classList.add('card_link')
    // mediaItem.addEventListener('click', () => launchLightbox(index));
    // mediaItem.setAttribute('href', '#')

    let imageOrVideo
    if (video) {
      imageOrVideo = document.createElement('video')
      imageOrVideo.setAttribute('src', videoImg)
      imageOrVideo.setAttribute('poster', posterImg)
      imageOrVideo.classList.add('card__video')
      imageOrVideo.setAttribute('alt', title)
      imageOrVideo.addEventListener('click', () => launchLightbox(index))
    } else {
      imageOrVideo = document.createElement('img')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.classList.add('card__image')
      imageOrVideo.setAttribute('alt', `${title}, vue rapprochée`)
      imageOrVideo.addEventListener('click', () => launchLightbox(index))
    }

    const cardDescription = document.createElement('div')
    cardDescription.classList.add('card__description')

    const cardTitle = document.createElement('h3')
    cardTitle.textContent = title
    cardTitle.classList.add('card__title')

    const cardLike = document.createElement('div')
    cardLike.classList.add('card__like')
    cardLike.setAttribute('tabindex', '0')

    const likeNumber = document.createElement('div')
    likeNumber.classList.add('like__number')
    likeNumber.textContent = likes
    likeNumber.setAttribute('tabindex', '0')

    const cardLikeIcon = document.createElement('i')
    cardLikeIcon.classList.add('like__icon', 'fa-solid', 'fa-heart')
    cardLikeIcon.setAttribute('alt', 'likes')
    cardLikeIcon.setAttribute('aria-label', 'likes')
    cardLikeIcon.setAttribute('tabindex', '0')
    cardLikeIcon.setAttribute('aria-hidden', 'true')
    cardLikeIcon.addEventListener('click', () => addLikes(index))

    // article.appendChild(a)
    // a.appendChild(imageOrVideo)
    article.appendChild(imageOrVideo)
    article.appendChild(cardDescription)
    cardDescription.appendChild(cardTitle)
    cardDescription.appendChild(cardLike)
    cardLike.appendChild(likeNumber)
    cardLike.appendChild(cardLikeIcon)

    return article
  }

  return { getMediaCardDOM }

}