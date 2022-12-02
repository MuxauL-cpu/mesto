const content = document.querySelector('.content');
const profileButton = content.querySelector('.profile__button');
const newCardButton = content.querySelector('.profile__button-add');

//переменные для вставки в pop-up при открытии
const userName = content.querySelector('.profile__name');
const userJob = content.querySelector('.profile__job');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
const popupUser = document.querySelector('.popup_type_user');
const popupUserForm = popupUser.querySelector('.popup__form');
const userButtonSubmit = popupUser.querySelector('.popup__button-submit_type_user');
const nameInput = popupUser.querySelector('.popup__input_type_name');
const jobInput = popupUser.querySelector('.popup__input_type_job');

//определение переменных для pop-up, который добавляет картинки
const popupAddCard = document.querySelector('.popup_type_card-editor');
const popupAddCardForm = popupAddCard.querySelector('.popup__form_type_cards');
const cardButtonSubmit = popupAddCard.querySelector('.popup__button-submit_type_cards');
const imageDescription = popupAddCard.querySelector('.popup__input_type_description');
const imageLink = popupAddCard.querySelector('.popup__input_type_link');

//определение переменных для popup, который открывает карточки
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__figcaption');

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

const cardsContainer = content.querySelector('.photo-grid__list');

const cardTemplate = document.querySelector('#elements').content.querySelector('.elements__card');

const generateCard = (cardData) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = newCard.querySelector('.elements__description-title');
  cardTitle.textContent = cardData.name;

  const likeButton = newCard.querySelector('.elements__button-like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__button-like_enabled');
  });

  newCard.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
    newCard.remove();
  });

  const handleOpenImageForm = () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    openPopup(popupOpenImage);
  };

  cardImage.addEventListener('click', handleOpenImageForm);

  return newCard;
}

const renderCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
}

initialCards.forEach(renderCard);

function handleOpenProfileForm() {
  openPopup(popupUser);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  hideErrors(popupUser, validationConfig);
}

function handleOpenAddCardForm() {
  openPopup(popupAddCard);
  popupAddCardForm.reset();
  hideErrors(popupAddCard, validationConfig);
  disableSubmitButton(cardButtonSubmit, validationConfig.inactiveButtonClass);
}

const handleSubmitAddCardForm = (evt) => {
  evt.preventDefault();
  renderCard({ 
    name: imageDescription.value,
    link: imageLink.value
  });
  handleCloseAddCardForm();
};
  
function handleSubmitPopupUserForm(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  handlerClosePopupUserForm();
}

//определение переменных для кнопок закрытия
const buttonClose = popupUser.querySelector('.popup__button-close');
const popupCloseImage = popupOpenImage.querySelector('.popup__button-close');
const buttonCardsClose = popupAddCard.querySelector('.popup__button-close');

function handleCloseAddCardForm() {
  closePopup(popupAddCard);
}

function handlerClosePopupUserForm() {
  closePopup(popupUser);
  disableSubmitButton(userButtonSubmit, validationConfig.inactiveButtonClass);
}

const handleCloseImage = () => {
  closePopup(popupOpenImage);
}

//привязка функций к кнопкам
profileButton.addEventListener('click', handleOpenProfileForm);
popupUserForm.addEventListener('submit', handleSubmitPopupUserForm);

newCardButton.addEventListener('click', handleOpenAddCardForm);
popupAddCardForm.addEventListener('submit', handleSubmitAddCardForm);

popupCloseImage.addEventListener('click', handleCloseImage);
buttonClose.addEventListener('click', handlerClosePopupUserForm);
buttonCardsClose.addEventListener('click', handleCloseAddCardForm);