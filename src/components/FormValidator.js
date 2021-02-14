export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
    this._form = document.querySelector(this._formSelector);
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }
  
  hideErrorDefault() {
    this._inputList.forEach(input => {
      const error = this._form.querySelector(`#${input.id}-error`);
      error.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    });
  }
  
  setButtonActive() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  }
  
  setButtonDisabled() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    error.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if(input.validity.valid) {
      this._hideError(input);
    }else{
      this._showError(input);
    }
  }

  _setButtonState(isActive) {
    if(isActive) {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }else {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    }
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', (evt) => { 
        this._checkInputValidity(input);
        this._setButtonState(this._form.checkValidity());
      }); 
    });
  }

  enableValidation() {
    this._setEventListener(this._form);
    this._setButtonState(this._submitButton, this._form.checkValidity());

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}
