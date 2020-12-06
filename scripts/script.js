
let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-icon');
let formElement = popup.querySelector('.popup__input-container');
let jobInput = formElement.querySelector('.popup__item_job');
let nameInput = formElement.querySelector('.popup__item_name');
let profileName = main.querySelector('.profile__name');
let profileJob = main.querySelector('.profile__text');
let saveButton = popup.querySelector('.popup__save');
let formElements = popup.querySelector('.popup__main-container');

function popupOpened() {
  popup.classList.add('popup_opened');
  defaultData();
}


function popupClosed() {
  popup.classList.remove('popup_opened');
}


function defaultData() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  popupClosed();
}


editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
formElements.addEventListener('submit', formSubmitHandler);
