let content = document.querySelector('.content');

let profile = content.querySelector('.profile');
let profile__button = profile.querySelector('.profile__button');

//переменные для вставки в pop-up при открытии
let UserName = profile.querySelector('.profile__name');
let UserJob = profile.querySelector('.profile__job');

//определение переменных для кнопки лайка
let photo_grid = content.querySelector('.photo-grid');
let photo_grid_list = photo_grid.querySelector('.photo-grid__list');
let card = photo_grid_list.querySelector('.card');
let button_like = card.querySelector('.card__button-like');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
let popup = document.querySelector('.popup');
let button_submit = popup.querySelector('.popup__button-submit');
let button_close = popup.querySelector('.popup__button-close');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');

function btnLikeClick(evt) {
    button_like.classList.toggle('card__button-like_enabled');
}

//при нажатии открывает форму и подаставляет имя пользователя и работу в поля ввода
function formOpenHandler() {
  popup.classList.add('popup_opened');
  nameInput.value = UserName.textContent;
  jobInput.value = UserJob.textContent;
}

function formCloseHandler() {
  popup.classList.remove('popup_opened');
}
  
function formSubmitHandler(evt) {
  evt.preventDefault();

  UserName.textContent = nameInput.value;
  UserJob.textContent = jobInput.value;
}

//привязка функций к кнопкам
button_like.addEventListener('click', btnLikeClick);
profile__button.addEventListener('click', formOpenHandler);
button_submit.addEventListener('click', formSubmitHandler);
button_close.addEventListener('click', formCloseHandler);