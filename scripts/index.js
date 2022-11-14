const content = document.querySelector('.content');
const profileButton = content.querySelector('.profile__button');
const newCardButton = content.querySelector('.profile__button-add');

//переменные для вставки в pop-up при открытии
const UserName = content.querySelector('.profile__name');
const UserJob = content.querySelector('.profile__job');

//определение переменных pop-up, кнопки сохранения, закрыть. Переменные для изменения имени и работы пользователя
const popup = document.querySelector('.popup_type_user');
const popupForm = popup.querySelector('.popup__form');
const buttonClose = popup.querySelector('.popup__button-close');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');

//определение переменных для pop-up, который добавляет картинки
const popupCards = document.querySelector('.popup_type_card-editor');
const popupCardsForm = popupCards.querySelector('.popup__form_type_cards');
const buttonCardsClose = popupCards.querySelector('.popup__button-close');
const imageDescription = popupCards.querySelector('.popup__input_type_description');
const imageLink = popupCards.querySelector('.popup__input_type_link');

//определение переменных для popup, который открывает карточки
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__figcaption');
const popupCloseImage = popupOpenImage.querySelector('.popup__button-close');

//при нажатии открывает форму и подаставляет имя пользователя и работу в поля ввода
const popupOpen = (item) => {
  item.classList.add('popup_opened');
};

const popupClose = (item) => {
  item.classList.remove('popup_opened');
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const PhotoGridList = content.querySelector('.photo-grid__list');

const cardTemplate = document.querySelector('#elements').content.querySelector('.elements__card');

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = dataCard.link;

  const cardDescription = newCard.querySelector('.elements__description-container');

  const cardTitle = newCard.querySelector('.elements__description-title');
  cardTitle.textContent = dataCard.name;

  const cardDelete = newCard.querySelector('.elements__delete-button').addEventListener('click', function(evt) {
    evt.currentTarget.closest('.elements__card').remove();
  });

  const cardLike = newCard.querySelector('.elements__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__button-like_enabled');
  });

  const imageFormOpenHandler = () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardTitle.textContent;
    popupCaption.textContent = cardTitle.textContent;

    popupOpen(popupOpenImage);
  };

  const imageCloseHandler = () => {
    popupClose(popupOpenImage);
  }

  cardImage.addEventListener('click', imageFormOpenHandler);
  popupCloseImage.addEventListener('click', imageCloseHandler);

  return newCard;
}

const cardRender = (dataCard) => {
  PhotoGridList.prepend(generateCard(dataCard));
}

initialCards.forEach((dataCard) => {
  cardRender(dataCard);
});

function profileFormOpenHandler() {
  popupOpen(popup);
  nameInput.value = UserName.textContent;
  jobInput.value = UserJob.textContent;
}

function cardsFormOpenHandler() {
  popupOpen(popupCards);
  imageDescription.value = 'Название';
  imageLink.value = 'Ссылка на картинку';
}

function cardsFormCloseHandler() {
  popupClose(popupCards);
}

const cardsFormSubmitHandler = (evt) => {
  evt.preventDefault();
  cardRender({ 
    name: imageDescription.value,
    link: imageLink.value
  })
  cardsFormCloseHandler();
};

function formCloseHandler() {
  popupClose(popup);
}
  
function formSubmitHandler(evt) {
  evt.preventDefault();

  UserName.textContent = nameInput.value;
  UserJob.textContent = jobInput.value;

  formCloseHandler();
}

//привязка функций к кнопкам
profileButton.addEventListener('click', profileFormOpenHandler);
popupForm.addEventListener('submit', formSubmitHandler);
buttonClose.addEventListener('click', formCloseHandler);

newCardButton.addEventListener('click', cardsFormOpenHandler);
popupCardsForm.addEventListener('submit', cardsFormSubmitHandler);
buttonCardsClose.addEventListener('click', cardsFormCloseHandler);