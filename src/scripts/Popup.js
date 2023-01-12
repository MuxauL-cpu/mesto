export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClick(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClick(evt));
    this._popupSelector.addEventListener('click', _closePopupOverlay(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClick(evt));
    this._popupSelector.removeEventListener('click', _closePopupOverlay(evt));
  }
}