let content = document.querySelector('.content');

<<<<<<< Updated upstream
let profile = content.querySelector('.profile');
let profile__button = profile.querySelector('.profile__button');
=======
//переменные для вставки в pop-up при открытии
const userName = content.querySelector('.profile__name');
const userJob = content.querySelector('.profile__job');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
const popupUser = document.querySelector('.popup_type_user');
const popupUserForm = popupUser.querySelector('.popup__form');
const nameInput = popupUser.querySelector('.popup__input_type_name');
const jobInput = popupUser.querySelector('.popup__input_type_job');

//определение переменных для pop-up, который добавляет картинки
const popupAddCard = document.querySelector('.popup_type_card-editor');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_type_cards');
const imageDescription = popupAddCard.querySelector('.popup__input_type_description');
const imageLink = popupAddCard.querySelector('.popup__input_type_link');

//определение переменных для popup, который открывает карточки
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__figcaption');

function closeKeyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

//при нажатии открывает форму и подаставляет имя пользователя и работу в поля ввода
const openPopup = (item) => {
  item.classList.add('popup_opened');
};

const closePopup = (item) => {
  item.classList.remove('popup_opened');
};

const photoGridList = content.querySelector('.photo-grid__list');

const cardTemplate = document.querySelector('#elements').content.querySelector('.elements__card');

const generateCard = (cardData) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardDescription = newCard.querySelector('.elements__description-container');

  const cardTitle = newCard.querySelector('.elements__description-title');
  cardTitle.textContent = cardData.name;

  newCard.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
    newCard.remove();
  });

  newCard.querySelector('.elements__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button-like_enabled');
  });

  const openImageFormHandler = () => {
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardTitle.textContent;
>>>>>>> Stashed changes

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
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_job');

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

//функция закрытия формы по клику на оверлей
const closeModal = (event) => {
  const target = event.target;

  if ((target === popupUser) || (target === popupAddCard) || (target === popupOpenImage)) {
    closePopup(target);
  }
}

//привязка функций к кнопкам
<<<<<<< Updated upstream
button_like.addEventListener('click', btnLikeClick);
profile__button.addEventListener('click', formOpenHandler);
button_submit.addEventListener('click', formSubmitHandler);
button_close.addEventListener('click', formCloseHandler);
=======
popupUser.addEventListener('click', closeModal);
popupAddCard.addEventListener('click', closeModal);
popupOpenImage.addEventListener('click', closeModal);

profileButton.addEventListener('click', openProfileFormHandler);
popupUserForm.addEventListener('submit', submitPopupUserFormHandler);

newCardButton.addEventListener('click', openAddCardFormHandler);
popupAddCardForm.addEventListener('submit', submitAddCardFormHandler);

popupCloseImage.addEventListener('click', сloseImageHandler);
buttonClose.addEventListener('click', closePopupUserFormHandler);
buttonCardsClose.addEventListener('click', closeAddCardFormHandler);
>>>>>>> Stashed changes
