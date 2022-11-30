const content = document.querySelector('.content');
const profileButton = content.querySelector('.profile__button');
const newCardButton = content.querySelector('.profile__button-add');

//переменные для вставки в pop-up при открытии
const userName = content.querySelector('.profile__name');
const userJob = content.querySelector('.profile__job');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
const popupUser = document.querySelector('.popup_type_user');
const popupUserForm = popupUser.querySelector('.popup__form');
const userButtonSubmit = '.popup__button-submit_type_user';
const nameInput = popupUser.querySelector('.popup__input_type_name');
const jobInput = popupUser.querySelector('.popup__input_type_job');

//определение переменных для pop-up, который добавляет картинки
const popupAddCard = document.querySelector('.popup_type_card-editor');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_type_cards');
const cardButtonSubmit = '.popup__button-submit_type_cards';
const imageDescription = popupAddCard.querySelector('.popup__input_type_description');
const imageLink = popupAddCard.querySelector('.popup__input_type_link');

//определение переменных для popup, который открывает карточки
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__figcaption');

//функция закрытия формы по кнопке esc
const closeEscHandler = (evt) => {
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
const openPopup = (item) => {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscHandler);
  item.addEventListener('click', closePopupOverlay);
  hideError(item);
  resetValidation(item);
};

const closePopup = (item) => {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscHandler);
  item.removeEventListener('click', closePopupOverlay);
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

    openPopup(popupOpenImage);
  };

  cardImage.addEventListener('click', openImageFormHandler);

  return newCard;
}

const renderCard = (cardData) => {
  photoGridList.prepend(generateCard(cardData));
}

initialCards.forEach(renderCard);

function openProfileFormHandler() {
  openPopup(popupUser);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function openAddCardFormHandler() {
  openPopup(popupAddCard);
  imageDescription.value = '';
  imageLink.value = '';
}

const submitEnterKeyHandler = (evt) => {
  if (evt.key === 'Enter') {
    switch(evt.target) {
      case popupUser:
        submitPopupUserFormHandler(evt);
        closePopupUserFormHandler();
        break;
      case popupAddCard:
        submitAddCardFormHandler(evt);
        closeAddCardFormHandler();
        break;
    }
  }
};

const submitAddCardFormHandler = (evt) => {
  evt.preventDefault();
  renderCard({ 
    name: imageDescription.value,
    link: imageLink.value
  })
  closeAddCardFormHandler();
};
  
function submitPopupUserFormHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopupUserFormHandler();
}

//определение переменных для кнопок закрытия
const buttonClose = popupUser.querySelector('.popup__button-close');
const popupCloseImage = popupOpenImage.querySelector('.popup__button-close');
const buttonCardsClose = popupAddCard.querySelector('.popup__button-close');

function closeAddCardFormHandler() {
  closePopup(popupAddCard);
}

function closePopupUserFormHandler() {
  closePopup(popupUser);
}

const сloseImageHandler = () => {
  closePopup(popupOpenImage);
}

//привязка функций к кнопкам
profileButton.addEventListener('click', openProfileFormHandler);
popupUserForm.addEventListener('submit', submitPopupUserFormHandler);
popupUserForm.addEventListener('keydown', submitEnterKeyHandler);

newCardButton.addEventListener('click', openAddCardFormHandler);
popupAddCardForm.addEventListener('submit', submitAddCardFormHandler);
popupAddCardForm.addEventListener('keydown', submitEnterKeyHandler);

popupCloseImage.addEventListener('click', сloseImageHandler);
buttonClose.addEventListener('click', closePopupUserFormHandler);
buttonCardsClose.addEventListener('click', closeAddCardFormHandler);