import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./cards.js";
import { validationConfig } from "./validationConfig.js";

const content = document.querySelector('.content');
const profileButton = content.querySelector('.profile__button');
const newCardButton = content.querySelector('.profile__button-add');
const cardsContainer = content.querySelector('.photo-grid__list');

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
const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

//экземпляры классов валидации форм
const cardValidation = new FormValidator(validationConfig, popupAddCard);
const userValidation = new FormValidator(validationConfig, popupUser);

//вызов валидации для форм с полями
cardValidation.enableValidation();
userValidation.enableValidation();

//функция закрытия формы по кнопке esc
const handleEscClick = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//функция закрытия формы по клику на оверлей
const closePopupOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.target);
}

//при нажатии открывает форму и подаставляет имя пользователя и работу в поля ввода
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClick);
  popup.addEventListener('click', closePopupOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClick);
  popup.removeEventListener('click', closePopupOverlay);
};


function handleOpenProfileForm() {
  openPopup(popupUser);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  userValidation.hideErrors();
}

function handleOpenAddCardForm() {
  openPopup(popupAddCard);
  popupAddCardForm.reset();
  cardValidation.hideErrors();
  cardValidation.disableSubmitButton();
}

function renderCard(object, template, handleCardClick) {
  const card = new Card(object, template, handleCardClick);
  return card.generateCard();
}

const handleSubmitAddCardForm = (evt) => {
  evt.preventDefault();

  cardsContainer.prepend(renderCard({ 
    name: imageDescription.value,
    link: imageLink.value
  }, '#elements', handleCardClick));
  
  handleCloseAddCardForm();
};
  
function handleSubmitPopupUserForm(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  handlerClosePopupUserForm();
}

function handleCloseAddCardForm() {
  closePopup(popupAddCard);
}

function handlerClosePopupUserForm() {
  closePopup(popupUser);
  userValidation.disableSubmitButton();
}

//привязка функций к кнопкам
profileButton.addEventListener('click', handleOpenProfileForm);
popupUserForm.addEventListener('submit', handleSubmitPopupUserForm);

newCardButton.addEventListener('click', handleOpenAddCardForm);
popupAddCardForm.addEventListener('submit', handleSubmitAddCardForm);

const closeButtons = document.querySelectorAll('.popup__button-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupFigcaption.textContent = name;

  openPopup(popupOpenImage);
}

initialCards.forEach((item) => {
  cardsContainer.prepend(renderCard(item, '#elements', handleCardClick));
});