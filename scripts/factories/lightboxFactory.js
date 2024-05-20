/* eslint-disable-next-line */
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
    const left = document.createElement('img')
    left.setAttribute('class', 'viewer_left')
    left.setAttribute('src', './assets/icons/left.svg')
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
    // left arrow
    const right = document.createElement('img')
    right.setAttribute('class', 'viewer_right')
    right.setAttribute('src', './assets/icons/right.svg')
    right.setAttribute('onclick', 'next()')
    right.setAttribute('alt', '')
    right.setAttribute('tabindex', '0')
    // close
    const close = document.createElement('img')
    close.setAttribute('class', 'close')
    close.setAttribute('src', './assets/icons/close.svg')
    close.setAttribute('onclick', 'closeLightbox()')
    close.setAttribute('alt', 'Photo suivante')
    close.setAttribute('tabindex', '0')

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
