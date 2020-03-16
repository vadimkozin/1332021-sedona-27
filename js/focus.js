// Firefox & Safari после выбора мышкой элементов формы (checkbox) не показывают окантовку элемента
// то есть явно не видно (нет окантовки outline) где находится фокус на форме
// этот код явно устанавливает фокус и окантовка появляется
function focus() {
  var elements = document.querySelectorAll(".hotel input[type=checkbox]");

  elements.forEach(function(el) {
    el.addEventListener('click', function(event) {
      el.focus();
    });
  })
}

window.addEventListener("load", focus, false);
