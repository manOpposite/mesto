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
const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__text");
const saveProfile = popupProfile.querySelector(".popup__form");
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");

export {
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
  nameInput
};
