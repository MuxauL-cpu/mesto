const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
}; 

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.classList.remove(enableValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement)
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function isValid(popupForm) {
  const formList = Array.from(document.querySelectorAll(popupForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  }
}

const hideError = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

const resetValidation = (item) => {
  if (item === popupUser) {
    const formSubmit = document.querySelector(userButtonSubmit);
    formSubmit.classList.remove(enableValidation.inactiveButtonClass);
  } else {
    const formSubmit = document.querySelector(cardButtonSubmit);
    formSubmit.classList.add(enableValidation.inactiveButtonClass);
  }
};

isValid(enableValidation);