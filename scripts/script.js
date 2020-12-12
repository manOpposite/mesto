
let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('.popup__profile');
let closeButton = popupProfile.querySelector('.popup__close-icon');
let formElement = popupProfile.querySelector('.popup__input-container');
let jobInput = formElement.querySelector('.popup__item_job');
let nameInput = formElement.querySelector('.popup__item_name');
let profileName = main.querySelector('.profile__name');
let profileJob = main.querySelector('.profile__text');
let saveButton = popupProfile.querySelector('.popup__main-container');

function popupProfileOpened() {
  popupProfile.classList.add('popup__profile_opened');
  defaultDataProfile();
}


function popupProfileClosed() {
  popupProfile.classList.remove('popup__profile_opened');
}


function defaultDataProfile() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  popupProfileClosed();
}


editButton.addEventListener('click', popupProfileOpened);
closeButton.addEventListener('click', popupProfileClosed);
saveButton.addEventListener('submit', formSubmitHandler);
