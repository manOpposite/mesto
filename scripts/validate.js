
function showError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  error.classList.add('popup__error_visible');
  input.classList.add('popup__input_type_error');
}

function hideError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = "";
  error.classList.remove('popup__error_visible');
  input.classList.remove('popup__input_type_error');
}

function checkInputValidity(form, input) {
  if(input.validity.valid) {
    hideError(form, input);
  }else{
    showError(form, input);
  }
}

function setButtonState(button, isActive) {
  if(isActive) {
    button.classList.remove('popup__button_disabled');
    button.disabled = false;
  }else {
    button.classList.add('popup__button_disabled');
    button.disabled = true;
  }
}

function setEventListener(form) {
  const inputList = form.querySelectorAll('.popup__input');
  const submitButton = form.querySelector('.popup__button');

  inputList.forEach(input => {
    input.addEventListener('input', (evt) => { 
      checkInputValidity(form, input);
      setButtonState(submitButton, form.checkValidity());
    }); 
  });
}

function hideErrorDefault(form) {
  const inputList = form.querySelectorAll('.popup__input');

  inputList.forEach(input => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove('popup__input_type_error');
  });
}

function setButtonActive(form) {
  const button = form.querySelector('.popup__button');
  button.classList.remove('popup__button_disabled');
  button.disabled = false;
}

function setButtonDisabled(form) {
  const button = form.querySelector('.popup__button');
  button.classList.add('popup__button_disabled');
  button.disabled = true;
}

function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    const submitButton = form.querySelector('.popup__button');
    setEventListener(form);
    setButtonState(submitButton, form.checkValidity());

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log("форма отправлена");
    });
  });
}

enableValidation();

//enableValidation({
  //formSelector: '.popup__form',
  //inputSelector: '.popup__input',
  //submitButtonSelector: '.popup__button',
  //inactiveButtonClass: 'popup__button_disabled',
  //inputErrorClass: 'popup__input_type_error',
  //errorClass: 'popup__error_visible'
//});

