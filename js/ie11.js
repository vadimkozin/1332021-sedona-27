// IE11 & Edge "нервно" реагируют на номер телефона в тексте, делают из него ссылку
// <p x-ms-format-detection="none">..</p> решает проблему, но валидатор HTML ругается, поэтому использую JS
function init() {
  var e = document.querySelector(".main-footer-visit");
  if (e) {
    e.setAttribute("x-ms-format-detection", "none");
  }
}

window.addEventListener("load", init, false);
