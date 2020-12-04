
let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup'); 
let closeButton = popup.querySelector('.popup__close-icon')


function popupOpened() {
  popup.classList.add('popup_opened');
  defaultData();
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);


let formElement = popup.querySelector('.popup__input-container');

function defaultData() {
  let jobInput = formElement.querySelector('.popup__job');
  let nameInput = formElement.querySelector('.popup__name');

  let profileName = main.querySelector('.profile__name');
  let profileJob = main.querySelector('.profile__text');

  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  let jobInput = formElement.querySelector('.popup__job');
  let nameInput = formElement.querySelector('.popup__name');
    
  let profileName = main.querySelector('.profile__name');
  let profileJob = main.querySelector('.profile__text');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

let saveButton = popup.querySelector('.popup__save');
saveButton.addEventListener('click', formSubmitHandler);
saveButton.addEventListener('click', popupClosed);
