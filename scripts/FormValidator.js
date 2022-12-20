export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  disableSubmitButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
  }

  _enableSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
  }

  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {  
    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      }.bind(this));
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
}