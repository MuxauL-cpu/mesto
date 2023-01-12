import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ imageSelector, descriptionSelector }, popupSelector) {
    super(popupSelector);
    this._imageSelector = document.querySelector(imageSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }

  open({ link, title  }) {
    this._imageSelector.src = link;
    this._imageSelector.alt = title;
    this._descriptionSelector.textContent = title;

    super.open();
  }
}