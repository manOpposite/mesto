import './index.css';

import { initialCards } from "../components/initial-cards.js";
import { Card } from "../components/card.js";
import { FormValidator } from "../components/validate.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const formElement = popupProfile.querySelector(".popup__input-container");
const buttonAddImage = document.querySelector(".profile__add-button");
const profilePopupSelector = ".popup_profile";
const addPopupSelector = ".popup_image";
const popupFormAdd = ".popup__form_add";
const picturePopupSelector = ".popup_picture";
const cardListSelector = ".cards";
const popupFormProfile = ".popup__form_profile";
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);
const validationProfile = new FormValidator(validationConfig, popupFormProfile);
const picturePopup = new PopupWithImage(picturePopupSelector);
const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__text");
const saveProfile = popupProfile.querySelector(".popup__form");
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");
const userInfo = new UserInfo(".profile__name", ".profile__text");

const addNewCardPopup = new PopupWithForm(addPopupSelector, (data) =>
  createCard(data)
);

const createCard = (data) => {
  const card = new Card(data, openImageCard, ".image-template");
  const cardElement = card.render();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => createCard(data),
  },
  cardListSelector
);

const editProfilePopup = new PopupWithForm(profilePopupSelector, () => {
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  userInfo.updateUserInfo();
});

function openImageCard(data) {
  picturePopup.open(data);
}

userInfo.setUserInfo(profileName.textContent, profileJob.textContent);

cardList.renderItems();

saveProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  userInfo.updateUserInfo();

});

addNewCardPopup.setEventListeners();

picturePopup.setEventListeners();

editProfilePopup.setEventListeners();

profileButton.addEventListener("click", () => { 
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  jobInput.value = userData.job
  validationProfile.setButtonActive();
  validationProfile.hideErrorDefault();
  editProfilePopup.open();
});

buttonAddImage.addEventListener("click", () => {
  validationFormAdd.hideErrorDefault();
  validationFormAdd.setButtonDisabled();
  addNewCardPopup.open();
});

validationFormAdd.enableValidation();

validationProfile.enableValidation();
