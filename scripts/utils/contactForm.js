const modal = document.getElementById('contact_modal')

function displayModal () {
  modal.style.display = 'flex'
  modal.setAttribute('aria-hidden', 'false')
  modal.focus()
}
function closeModal () {
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
}

modal.addEventListener('submit', (e) => {
  e.preventDefault()
  closeModal()
})
