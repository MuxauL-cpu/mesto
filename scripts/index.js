let content = document.querySelector('.content');
let profileButton = content.querySelector('.profile__button');

//переменные для вставки в pop-up при открытии
let UserName = content.querySelector('.profile__name');
let UserJob = content.querySelector('.profile__job');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let buttonClose = popup.querySelector('.popup__button-close');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

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

  popup.classList.remove('popup_opened');
}

//привязка функций к кнопкам
profileButton.addEventListener('click', formOpenHandler);
popupForm.addEventListener('submit', formSubmitHandler);
buttonClose.addEventListener('click', formCloseHandler);