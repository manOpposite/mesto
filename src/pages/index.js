import "./index.css";

import { initialCards } from "../components/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  profileButton,
  buttonAddImage,
  profilePopupSelector,
  addPopupSelector,
  popupFormAdd,
  picturePopupSelector,
  cardListSelector,
  popupFormProfile,
  validationConfig,
  profileName,
  profileJob,
  saveProfile,
  jobInput,
  nameInput,
} from "../utils/constants.js";

const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);
const validationProfile = new FormValidator(validationConfig, popupFormProfile);
const picturePopup = new PopupWithImage(picturePopupSelector);
const userInfo = new UserInfo(".profile__name", ".profile__text");

const addNewCardPopup = new PopupWithForm(addPopupSelector, (data) => {
  const cardElement = createCard(data);
  cardList.prependItem(cardElement);
});

const createCard = (data) => {
  const card = new Card(data, openImageCard, ".image-template");
  const cardElement = card.render();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
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
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
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
