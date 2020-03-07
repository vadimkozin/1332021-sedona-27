// ТЗ:
// проверка на обязательные поля (форма не должна отправляться с пустыми полями);
// появление формы должно быть анимировано.
// Форма с заказом отеля появляется при нажатии на кнопку «Поиск гостиницы в Седоне».
// Вы можете использовать localStorage для хранения количества взрослых и детей.

function init() {
  let form = $(".form-search");
  let submit = $(".form-search button[type='submit']");
  let button = $(".invitation-button");
  let dateArrival = $("input[name='date-arrival']");
  let dateDeparture = $("input[name='date-departure']");
  let numberAdults = $("input[name='number-adults']");
  let numberChildren = $("input[name='number-children']");
  let btnAdultsAdd = $(".people-adults .plus-btn");
  let btnAdultsSubtract = $(".people-adults .minus-btn");
  let btnChildrenAdd = $(".people-children .plus-btn");
  let btnChildrenSubtract = $(".people-children .minus-btn");

  let isStorageSupport = true;
  let storageAdults = "";
  let storageChildren = "";

  // по ТЗ можно в локалсторадж хранить кол-во взрослых и детей
  try {
    storageAdults = localStorage.getItem("adults");
    storageChildren = localStorage.getItem("children");
  } catch (err) {
    isStorageSupport = false;
  }

  if (form) {
    form.classList.add("form-hide");
    if (storageAdults) {
      numberAdults.value = storageAdults
    }
    if (storageChildren) {
      numberChildren.value = storageChildren
    }
  }

  // проверка и отправка данных по поиску гостиницы на сервер
  submit.addEventListener("click", function(e) {
    let ok = isDate(dateArrival) && isDate(dateDeparture) && greaterThanZero(numberAdults) && isNumeric(numberChildren);
    console.log(`ok:${ok}`);

    if (!ok) {
      e.preventDefault();
      form.classList.remove("form-error");
      form.offsetWidth = form.offsetWidth;
      form.classList.add("form-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("adults", numberAdults.value);
        localStorage.setItem("children", numberChildren.value);
      }
    }
  });

  // переключатель открытия/закрытия формы
  button.addEventListener("click", function(e) {
    e.preventDefault();
    form.classList.toggle("form-show");
    form.classList.remove("form-error");
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
    let result = /^\d+$/.test(element.value);
    toggleError(element, result);
    return result;
  }

  // проверка числа на > 0
  function greaterThanZero(element) {
    let result =  (/^\d+$/.test(element.value) && parseInt(element.value) > 0) ? true : false ;
    toggleError(element, result);
    return result;
  }

  // проверка даты ( формат: 14 Апреля 2014 )
  function isDate(element) {
    let result =  /^\d{1,}\s[A-Za-zА-Яа-яЁё]{3,}\s\d{4}$/.test(trimSpace(element.value));
    toggleError(element, result);
    return result;
  }

  // лишние пробелы в строке не нужны
  function trimSpace(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  // сигнал об ошибке - обводка поля красным цветом
  function toggleError(element, ok) {
    element.style.outline = (!ok) ? "1px solid red" : "none";
    setTimeout(() => element.style.outline = "none", 1350);
  }
}

window.addEventListener("load", init, false);
