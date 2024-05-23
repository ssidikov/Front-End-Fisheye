function lightboxFactory(data) {

  const { image, video, title } = data;

  const picture = `assets/media/${image}`;
  const videoImg = `assets/media/${video}`;

  function getLightboxDOM() {
    
    const body = document.querySelector('body')
    body.style.overflow = 'hidden';

    const lightbox = document.querySelector('#lightbox')
    lightbox.style.display = 'flex'
    lightbox.setAttribute('aria-hidden', 'false')
    lightbox.focus();

    const lightboxViewer = document.createElement('div')
    lightboxViewer.classList.add('lightbox__viewer')
    lightboxViewer.setAttribute('aria-selected', 'true')

    // Left arrow to navigate to the previous media
    const leftArrow = document.createElement('i')
    leftArrow.classList.add('lightbox__control', 'lightbox__control--left', 'fa-solid', 'fa-angle-left')
    leftArrow.addEventListener('click', () => previous())
    leftArrow.setAttribute('alt', 'Photo précédente')
    leftArrow.setAttribute('tabindex', '0')

    // Right arrow to navigate to the next media
    const rightArrow = document.createElement('i')
    rightArrow.classList.add('lightbox__control', 'lightbox__control--right', 'fa-solid', 'fa-angle-right')
    rightArrow.addEventListener('click', () => next())
    rightArrow.setAttribute('alt', 'Photo suivante')
    rightArrow.setAttribute('tabindex', '0')
    rightArrow.setAttribute('aria-hidden', 'true')
    rightArrow.setAttribute('aria-label', 'Photo suivante')

    // Container for the media
    const lightboxMediaContainer = document.createElement('div')
    lightboxMediaContainer.classList.add('lightbox__media-container')

    let imageOrVideo
    if (video) {
      imageOrVideo = document.createElement('video')
      imageOrVideo.setAttribute('id', 'lightbox_video')
      imageOrVideo.classList.add('lightbox__video')
      imageOrVideo.setAttribute('src', videoImg)
      imageOrVideo.setAttribute('alt', title)
      imageOrVideo.setAttribute('controls', 'controls')
      imageOrVideo.setAttribute('autoplay', 'autoplay')
      imageOrVideo.setAttribute('loop', 'loop')
      imageOrVideo.setAttribute('muted', 'muted')
      imageOrVideo.setAttribute('playsinline', 'playsinline')
      imageOrVideo.setAttribute('type', 'video/mp4');
    } else {
      imageOrVideo = document.createElement('img')
      imageOrVideo.setAttribute('id', 'lightbox_photo')
      imageOrVideo.classList.add('lightbox__image')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.setAttribute('alt', title)
    }

    // Description of the media
    const lightboxDescription = document.createElement('div')
    lightboxDescription.classList.add('lightbox__description')
    lightboxDescription.textContent = title

    // Close the lightbox
    const btnCloseLightbox = document.createElement('i')
    btnCloseLightbox.classList.add('lightbox__close', 'fa-solid', 'fa-xmark')
    btnCloseLightbox.addEventListener('click', () => closeLightbox())
    btnCloseLightbox.setAttribute('tabindex', '0')
    btnCloseLightbox.setAttribute('aria-hidden', 'true')
    btnCloseLightbox.setAttribute('aria-label', 'Fermer la visionneuse')

    // Add the elements to the lightbox
    lightbox.appendChild(lightboxViewer)
    lightboxViewer.appendChild(leftArrow)
    lightboxViewer.appendChild(lightboxMediaContainer)
    lightboxMediaContainer.appendChild(imageOrVideo)
    lightboxMediaContainer.appendChild(lightboxDescription)
    lightboxViewer.appendChild(rightArrow)
    lightboxViewer.appendChild(closeLightbox)

    return lightboxViewer

  }

  return { getLightboxDOM }

}