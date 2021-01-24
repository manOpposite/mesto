import {initialCards} from "./initial-cards.js";
import {Card} from "./card.js";
import {Validate} from "./validate.js";
export {pictureName, pictureLink, openPopup, popupImage};

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const formElement = popupProfile.querySelector(".popup__input-container");
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");
const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__text");
const saveProfile = popupProfile.querySelector(".popup__form");
const popups = document.querySelector(".popups");
const popupImage = popups.querySelector(".popup_picture");
const iconClosePicture = popupImage.querySelector(".popup__close-icon");
const iconCloseProfile = popupProfile.querySelector(".popup__close-icon");
const addCardPopup = document.querySelector(".popup_image");
const buttonAddImage = document.querySelector(".profile__add-button");
const iconCloseImage = addCardPopup.querySelector(".popup__close-icon");
const formCreateCard = addCardPopup.querySelector(".popup__form");
const pictureName = popupImage.querySelector(".popup__picture-name");
const pictureLink = popupImage.querySelector(".popup__picture-item");
const cardName = addCardPopup.querySelector(".popup__input_image");
const cardLink = addCardPopup.querySelector(".popup__input_link");
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("click", closePopupOverlay); 
}

function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("click", closePopupOverlay); 
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function renderCards(arr) {
  arr.forEach(item => {
      const card = new Card(item, '.image-template');
      const cardElement = card.createCard();
     document.querySelector(".cards").append(cardElement);
   })
 }

function addCard() {
  const card = new Card({name: cardName.value, link: cardLink.value}, '.image-template');
  const newCard = card.createCard();
  document.querySelector(".cards").prepend(newCard);
}

function closePopupEsc(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupOverlay(evt) {
  if(evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function setDefaultDataImage() {
  cardName.value = "";
  cardLink.value = "";
}

function formSubmitHandlerImage(evt) {
  evt.preventDefault();
  addCard();
  setDefaultDataImage();
  setButtonDisabled(addCardPopup);
  closePopup(addCardPopup);
}

function hideErrorDefault(form) {
  const inputList = form.querySelectorAll(".popup__input");
  inputList.forEach(input => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove("popup__input_type_error");
  });
}

function setButtonActive(form) {
  const button = form.querySelector(".popup__button");
  button.classList.remove("popup__button_disabled");
  button.disabled = false;
}

function setButtonDisabled(form) {
  const button = form.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.disabled = true;
}

iconCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

profileButton.addEventListener("click", () => {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  setButtonActive(popupProfile);
  hideErrorDefault(popupProfile);
  openPopup(popupProfile);
});

saveProfile.addEventListener("submit", formSubmitHandler);

iconClosePicture.addEventListener("click", () =>
  closePopup(popupImage)
);

formCreateCard.addEventListener("submit", formSubmitHandlerImage);

iconCloseImage.addEventListener("click", () => closePopup(addCardPopup));

buttonAddImage.addEventListener("click", () => openPopup(addCardPopup));

renderCards(initialCards);

const validationFormAdd = new Validate(validationConfig, '.popup__form_add').enableValidation();

const validationProfile = new Validate(validationConfig, '.popup__form_profile').enableValidation();
