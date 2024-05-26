function lightboxFactory(data) {

  const { image, video, title } = data;

  const picture = `assets/media/${image}`;
  const videoImg = `assets/media/${video}`;

  function getLightboxDOM() {
    
    const body = document.querySelector('body')
    body.style.overflow = 'hidden';

    const lightbox = document.getElementById('lightbox')
    lightbox.style.display = 'block'
    lightbox.setAttribute('aria-hidden', 'false')
    lightbox.focus();

    const lightboxViewer = document.createElement('div')
    lightboxViewer.classList.add('lightbox__viewer')
    lightboxViewer.setAttribute('aria-selected', 'true')
    lightboxViewer.setAttribute('aria-label', 'Vue rapprochée de l\'image')

    // Close the lightbox
    const lightboxClose = document.createElement('button')
    lightboxClose.classList.add('lightbox__close', 'lightbox__control')
    lightboxClose.setAttribute('aria-label', 'Fermer la visionneuse')
    lightboxClose.addEventListener('click', () => closeLightbox())

    const btnCloseLightbox = document.createElement('i')
    btnCloseLightbox.classList.add('lightbox__control--icon','fa-solid', 'fa-xmark')
    btnCloseLightbox.setAttribute('tabindex', '0')
    btnCloseLightbox.setAttribute('aria-hidden', 'true')
    btnCloseLightbox.setAttribute('aria-label', 'Fermer la visionneuse')

    // Left arrow to navigate to the previous media
    const navigateLeft = document.createElement('button')
    navigateLeft.classList.add('lightbox__control')
    navigateLeft.setAttribute('aria-label', 'Photo précédente')
    navigateLeft.addEventListener('click', () => previous())
    
    const btnLeftArrow = document.createElement('i')
    btnLeftArrow.classList.add('lightbox__control--icon', 'fa-solid', 'fa-angle-left')
    btnLeftArrow.setAttribute('alt', 'Photo précédente')
    btnLeftArrow.setAttribute('tabindex', '0')

    // Right arrow to navigate to the next media
    const navigateRight = document.createElement('button')
    navigateRight.classList.add('lightbox__control')
    navigateRight.setAttribute('aria-label', 'Photo suivante')
    navigateRight.addEventListener('click', () => next())

    const rightArrow = document.createElement('i')
    rightArrow.classList.add('lightbox__control--icon', 'fa-solid', 'fa-angle-right')
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
      imageOrVideo.classList.add('lightbox__media')
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
      imageOrVideo.classList.add('lightbox__media')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.setAttribute('alt', title)
    }

    // Description of the media
    const lightboxDescription = document.createElement('h3')
    lightboxDescription.classList.add('lightbox__description')
    lightboxDescription.textContent = title

    // Add the elements to the lightbox
    navigateLeft.appendChild(btnLeftArrow)
    navigateRight.appendChild(rightArrow)
    lightboxClose.appendChild(btnCloseLightbox)
    lightboxMediaContainer.appendChild(imageOrVideo)
    lightboxMediaContainer.appendChild(lightboxDescription)
    lightboxViewer.appendChild(lightboxClose)
    lightboxViewer.appendChild(navigateLeft)
    lightboxViewer.appendChild(lightboxMediaContainer)
    lightboxViewer.appendChild(navigateRight)
    lightbox.appendChild(lightboxViewer)
    
    // lightbox.appendChild(lightboxViewer)
    // lightboxViewer.appendChild(btnCloseLightbox)
    // lightboxViewer.appendChild(leftArrow)
    // lightboxViewer.appendChild(lightboxMediaContainer)
    // lightboxMediaContainer.appendChild(imageOrVideo)
    // lightboxMediaContainer.appendChild(lightboxDescription)
    // lightboxViewer.appendChild(rightArrow)

    return lightboxViewer

  }

  return { getLightboxDOM }

}