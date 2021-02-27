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
const popupFormAvatar = ".popup__form_update-avatar";
const deletePopupSelector = ".popup_delete-card";
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const avatarPopupSelector = ".popup_update-avatar";
const config = {
  url: "https://mesto.nomoreparties.co/v1/",
  groupId: "cohort-20",
  headers: {
    authorization: "cb8d60fb-9fb1-4e9f-abd5-61a063c00708",
    'Content-Type': 'application/json'
  }
};

export {
  popupFormAvatar,
  avatarPopupSelector,
  avatarEditButton,
  deletePopupSelector,
  profileButton,
  buttonAddImage,
  profilePopupSelector,
  addPopupSelector,
  popupFormAdd,
  picturePopupSelector,
  cardListSelector,
  popupFormProfile,
  validationConfig,
  jobInput,
  nameInput,
  config
};
