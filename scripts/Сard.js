export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__card')
    .cloneNode(true);

    return cardElement;
  } 

  //публичный метод для генерации карточек
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardDescription = this._element.querySelector('.elements__description-title');
    this._cardDescription.textContent = this._name;

    return this._element;
  }

  //функция для кнопки лайка
  _handleLikeClick() {
    this._cardLikeButton.classList.toggle('elements__button-like_enabled');
  }

  //функция для кнопки удаления карточки
  _handleDeleteClick() {
    this._element.closest('.elements__card').remove();
  }

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.elements__button-like');
    this._cardDeleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImage = this._element.querySelector('.elements__image');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }
}