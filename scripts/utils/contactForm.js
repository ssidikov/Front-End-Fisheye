const modal = document.getElementById('contact_modal')
const body = document.querySelector('body')

// function displayName () {
//   const photographerName = localStorage.getItem('photographer')
//   const nameDiv = document.createAttribute('div')
//   nameDid = setAttribute('class', 'photographer__name')
//   nameDiv.textContent = photographerName
// }

function displayModal() {
  body.style.overflow = 'hidden'
  modal.style.display = 'flex'
  modal.setAttribute('aria-hidden', 'false')
  modal.focus()
}
function closeModal() {
  body.style.overflow = 'auto'
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
}

modal.addEventListener('submit', (e) => {
  e.preventDefault()
  closeModal()
})
