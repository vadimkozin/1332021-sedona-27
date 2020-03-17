// ТЗ:
// проверка на обязательные поля (форма не должна отправляться с пустыми полями);
// появление формы должно быть анимировано.
// Форма с заказом отеля появляется при нажатии на кнопку «Поиск гостиницы в Седоне».
// Вы можете использовать localStorage для хранения количества взрослых и детей.

function init() {
  var popup = $(".form-search");
  var buttonSearch = $(".invitation-button");
  var submitSearch = $(".form-search button[type='submit']");
  var dateArrival = $("input[name='date-arrival']");
  var dateDeparture = $("input[name='date-departure']");
  var numberAdults = $("input[name='number-adults']");
  var numberChildren = $("input[name='number-children']");
  var btnAdultsAdd = $(".people-adults .plus-btn");
  var btnAdultsSubtract = $(".people-adults .minus-btn");
  var btnChildrenAdd = $(".people-children .plus-btn");
  var btnChildrenSubtract = $(".people-children .minus-btn");
  var mapInteractive = $(".map-interactive");

  var isStorageSupport = true;
  var storageAdults = "";
  var storageChildren = "";

  mapInteractive.style.display = "block";

  // по ТЗ можно в локалсторадж хранить кол-во взрослых и детей
  try {
    storageAdults = localStorage.getItem("adults");
    storageChildren = localStorage.getItem("children");
  } catch (err) {
    isStorageSupport = false;
  }

  if (popup) {
    popup.classList.add("form-hide");
    if (storageAdults) {
      numberAdults.value = storageAdults
    }
    if (storageChildren) {
      numberChildren.value = storageChildren
    }
  }

  // проверка и отправка данных по поиску гостиницы на сервер
  submitSearch.addEventListener("click", function(e) {
    var ok = isDate(dateArrival) && isDate(dateDeparture) && greaterThanZero(numberAdults) && isNumeric(numberChildren);
    if (!ok) {
      e.preventDefault();
      popup.classList.remove("form-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("form-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("adults", numberAdults.value);
        localStorage.setItem("children", numberChildren.value);
      }
    }
  });

  // переключатель открытия/закрытия формы поиска гостиницы
  buttonSearch.addEventListener("click", function(e) {
    e.preventDefault();
    popup.classList.toggle("form-show");
    popup.classList.remove("form-error");
  });

  // взрослые.кнопка +
  btnAdultsAdd.addEventListener("click", function(e) {
    e.preventDefault();
    numberAdults.value = parseInt(numberAdults.value) + 1;
  });

  // взрослые.кнопка -
  btnAdultsSubtract.addEventListener("click", function(e) {
    e.preventDefault();
    numberAdults.value = parseInt(numberAdults.value) - 1;
    if (numberAdults.value < 1) {
      numberAdults.value = 1;
    }
  });

  // дети.кнопка +
  btnChildrenAdd.addEventListener("click", function(e) {
    e.preventDefault();
    numberChildren.value = parseInt(numberChildren.value) + 1;
  });

  // дети.кнопка -
  btnChildrenSubtract.addEventListener("click", function(e) {
    e.preventDefault();
    numberChildren.value = parseInt(numberChildren.value) - 1;
    if (numberChildren.value < 0) {
      numberChildren.value = 0;
    }
  });

  function $(selector) {
    return document.querySelector(selector);
  }

  // интересуют только положительные целые числа
  function isNumeric(element) {
    var result = /^\d+$/.test(element.value);
    toggleStatus(element, result);
    return result;
  }

  // проверка числа на > 0
  function greaterThanZero(element) {
    var result =  (/^\d+$/.test(element.value) && parseInt(element.value) > 0) ? true : false ;
    toggleStatus(element, result);
    return result;
  }

  // проверка даты ( формат: 14 Апреля 2014 )
  function isDate(element) {
    var months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
                  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
                  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    var value = trimSpace(element.value);
    var result =  /^\d{1,}\s[A-Za-zА-Яа-яЁё]{3,}\s\d{4}$/.test(value);
    var ok = false;
    if (result) {
      var month = value.split(' ')[1].toLowerCase();
      ok = months.indexOf(month) != -1;
    }
    toggleStatus(element, ok);
    return ok;
  }

  // лишние пробелы в строке не нужны
  function trimSpace(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  // переключение статуса поля, если ошибка - обводка поля красным цветом
  function toggleStatus(element, ok) {
    if (!ok) {
      element.style.outline = "1px solid red";
      setTimeout(function() { element.style.outline = "none" }, 1350);
      element.focus();
    } else {
      element.style.outline = "none";
    }
  }

  // для Firefox & Safari после выбора мышкой кнопок '+' или '-' не устанавливается фокус на выбранную кнопку
  // приходится устанавливать фокус
  function setFocus() {

    var elements = document.querySelectorAll(".people-data button[type=button]");

    elements.forEach(function(el) {
      el.addEventListener('click', function(event) {
        el.focus();
      });
    })
  }

  setFocus();

}

window.addEventListener("load", init, false);
