/* eslint-disable-next-line */
function mediaFactory(data) {
  // catch data
  const { id, image, video, likes, title } = data
  // structure data for use in html
  const picture = `assets/media/${image}`
  const videoImg = `assets/media/${video}`

  function getMediaCardDOM (index) {
    const article = document.createElement('article')
    article.setAttribute('class', 'card')
    article.setAttribute('id', `${id}`)
    // link
    const a = document.createElement('a')
    a.setAttribute('class', 'card_link')
    a.setAttribute('href', '#')
    // image
    let imageOrVideo
    if (video) {
      imageOrVideo = document.createElement('video')
      imageOrVideo.setAttribute('src', videoImg)
      imageOrVideo.setAttribute('alt', title)
    } else {
      imageOrVideo = document.createElement('img')
      imageOrVideo.setAttribute('src', picture)
      imageOrVideo.setAttribute('alt', title)
    }
    // description
    const divDescription = document.createElement('div')
    divDescription.setAttribute('class', 'card_description')
    // title
    const p = document.createElement('p')
    p.textContent = title
    // like
    const divLike = document.createElement('div')
    divLike.setAttribute('class', 'like')
    divLike.setAttribute('tabindex', '0')
    // like number
    const divLikeNbr = document.createElement('div')
    divLikeNbr.setAttribute('class', 'likeNbr')
    divLikeNbr.textContent = likes
    divLikeNbr.setAttribute('tabindex', '0')
    // heart
    const heart = document.createElement('i')
    heart.setAttribute('class', 'heart fa-solid fa-heart')
    heart.setAttribute('alt', 'like')
    heart.setAttribute('tabindex', '0')

    // article structure
    article.appendChild(a)
    a.appendChild(imageOrVideo)
    article.appendChild(divDescription)
    divDescription.appendChild(p)
    divDescription.appendChild(divLike)
    divLike.appendChild(divLikeNbr)
    divLike.appendChild(heart)

    return article
  }
  return { getMediaCardDOM }
}
