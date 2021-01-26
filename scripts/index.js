import {initialCards} from "./initial-cards.js";
import {Card} from "./card.js";
import {Validate} from "./validate.js";

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const formElement = popupProfile.querySelector(".popup__input-container");
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");
const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__text");
const saveProfile = popupProfile.querySelector(".popup__form");
const popupImage = document.querySelector(".popup_picture");
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
const cardList = document.querySelector(".cards");
const popupFormAdd = ".popup__form_add";
const popupFormProfile = ".popup__form_profile";
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const validationFormAdd = new Validate(validationConfig, popupFormAdd);
const validationProfile = new Validate(validationConfig, popupFormProfile);

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

function openPicturePopup() {
  pictureLink.alt = `Изображение ${this._data.name}`;
  pictureLink.src = this._data.link;
  pictureName.textContent = this._data.name;
  openPopup(popupImage);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function createCard(data) {
  const card = new Card(data, '.image-template', openPicturePopup);
  const cardElement = card.render();
  return cardElement;
}

function renderCards(arr) {
  arr.forEach(item => {
    cardList.append(createCard(item));
   })
 }

function addCard() {
  cardList.prepend(createCard({name: cardName.value, link: cardLink.value}));
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
  cardLink.value = "";
  cardName.value = "";
}

function formSubmitHandlerImage(evt) {
  evt.preventDefault();
  addCard();
  validationFormAdd.setButtonDisabled();
  closePopup(addCardPopup);
}

iconCloseProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

profileButton.addEventListener("click", () => {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  validationProfile.setButtonActive();
  validationProfile.hideErrorDefault();
  openPopup(popupProfile);
});

saveProfile.addEventListener("submit", formSubmitHandler);

iconClosePicture.addEventListener("click", () =>
  closePopup(popupImage)
);

formCreateCard.addEventListener("submit", formSubmitHandlerImage);

iconCloseImage.addEventListener("click", () => closePopup(addCardPopup));

buttonAddImage.addEventListener("click", () => {
  validationFormAdd.hideErrorDefault();
  validationFormAdd.setButtonDisabled();
  setDefaultDataImage();
  openPopup(addCardPopup);
})

renderCards(initialCards);

validationFormAdd.enableValidation();

validationProfile.enableValidation();
