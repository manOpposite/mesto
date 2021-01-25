export class Validate {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }

  hideErrorDefault() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach(input => {
      const error = this._form.querySelector(`#${input.id}-error`);
      error.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    });
  }
  
  setButtonActive() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    button.classList.remove(this._config.inactiveButtonClass);
    button.disabled = false;
  }
  
  setButtonDisabled() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    button.classList.add(this._config.inactiveButtonClass);
    button.disabled = true;
  }

  _showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    error.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(form, input) {
    if(input.validity.valid) {
      this._hideError(form, input);
    }else{
      this._showError(form, input);
    }
  }

  _setButtonState(button, isActive) {
    if(isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    }else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    }
  }

  _setEventListener(form) {
    const inputList = form.querySelectorAll(this._config.inputSelector);
    const submitButton = form.querySelector(this._config.submitButtonSelector);

    inputList.forEach(input => {
      input.addEventListener('input', (evt) => { 
        this._checkInputValidity(form, input);
        this._setButtonState(submitButton, this._form.checkValidity());
      }); 
    });
  }

  enableValidation() {
    this._form = document.querySelector(this._formSelector);
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._setEventListener(this._form);
    this._setButtonState(submitButton, this._form.checkValidity());

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}
