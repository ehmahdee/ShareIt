var button = document.getElementById('sup-link')
var modal = document.getElementById('page-modal')
var close = document.getElementsByClassName('modal-close')[0]


button.onclick = function() {
  modal.style.display = 'block'
}

close.onclick = function() {
  modal.style.display = 'none'
}

window.onclick = function(event) {
if (event.target.className === 'modal-background') {
  modal.style.display = 'none'
}
}