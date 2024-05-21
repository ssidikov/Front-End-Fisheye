function LBFactory(data, name) {
  // catch data
  const { image, video, title } = data
  // structure data for use in html
  const picture = `assets/media/${image}`
  const videoImg = `assets/media/${video}`
  function getLBCardDOM () {
    let imageOrVideo
    // container
    const imgViewer = document.createElement('div')
    imgViewer.setAttribute('class', 'img_viewer')
    imgViewer.setAttribute('aria-selected', 'true')

    // left arrow
    const left = document.createElement('i')
    left.setAttribute('class', 'fa-solid fa-angle-left viewer_left')
    left.setAttribute('onclick', 'previous()')
    left.setAttribute('alt', 'Photo precedente')
    left.setAttribute('tabindex', '0')
    // img container
    const imgContainer = document.createElement('div')
    imgContainer.setAttribute('class', 'img_container')

    if (video) {
      imageOrVideo = document.createElement('video')
      imageOrVideo.setAttribute('id', 'lightbox_photo')
      imageOrVideo.setAttribute('src', videoImg)
      imageOrVideo.setAttribute('alt', ' ')
      imageOrVideo.setAttribute('controls', 'controls')
      imageOrVideo.setAttribute('autoplay', 'autoplay')
      imageOrVideo.setAttribute('loop', 'loop')
      imageOrVideo.setAttribute('muted', 'muted')
      imageOrVideo.setAttribute('playsinline', 'playsinline')
      imageOrVideo.setAttribute('type', 'video/mp4');
    } else {
      imageOrVideo = document.createElement('img')
      imageOrVideo.setAttribute('id', 'lightbox_photo')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.setAttribute('alt', ' ')
    }
    // description
    const imgDescription = document.createElement('div')
    imgDescription.setAttribute('class', 'img_description')
    imgDescription.textContent = title
    // right arrow
    const right = document.createElement('i')
    right.setAttribute('class', 'fa-solid fa-angle-right viewer_right')
    right.setAttribute('onclick', 'next()')
    right.setAttribute('alt', '')
    right.setAttribute('tabindex', '0')
    right.setAttribute('aria-hidden', 'true')
    right.setAttribute('aria-label', 'Photo suivante')
    // close
    const close = document.createElement('i')
    close.setAttribute('class', 'fa-solid fa-xmark close')
    close.setAttribute('onclick', 'closeLightbox()')
    close.setAttribute('tabindex', '0')
    close.setAttribute('aria-hidden', 'true')
    close.setAttribute('aria-label', 'Fermer la visionneuse')


    // LB structure
    imgViewer.appendChild(left)
    imgViewer.appendChild(imgContainer)
    imgContainer.appendChild(imageOrVideo)
    imgContainer.appendChild(imgDescription)
    imgViewer.appendChild(right)
    imgViewer.appendChild(close)

    return imgViewer
  }
  return { getLBCardDOM }
}
