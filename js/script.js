let form = document.querySelector('.form-search');
let button = document.querySelector('.invitation-button');

button.addEventListener("click", function(e) {
  e.preventDefault();
  form.classList.toggle('form-search-show');
});

