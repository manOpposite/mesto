const main = document.querySelector(".main");
const handleEditButton = main.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const formElement = popupProfile.querySelector(".popup__input-container");
const jobInput = formElement.querySelector(".popup__input_job");
const nameInput = formElement.querySelector(".popup__input_name");
const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__text");
const handleSaveProfile = popupProfile.querySelector(".popup__form");
const popups = document.querySelector(".popups");
const pictureFullSize = popups.querySelector(".popup_picture");
const handleClosePicture = pictureFullSize.querySelector(".popup__close-icon");
const handleCloseProfile = popupProfile.querySelector(".popup__close-icon");
const popupImage = document.querySelector(".popup_image");
const handleAddImage = document.querySelector(".profile__add-button");
const handleCloseImage = popupImage.querySelector(".popup__close-icon");
const handleCreateCard = popupImage.querySelector(".popup__form");
const cards = document.querySelector(".cards");
const imageTemplate = document.querySelector(".image-template");
const pictureName = pictureFullSize.querySelector(".popup__picture-name");
const pictureLink = pictureFullSize.querySelector(".popup__picture-item");
const cardName = popupImage.querySelector(".popup__input_image");
const cardLink = popupImage.querySelector(".popup__input_link");

function popupOpened(modal) {
  modal.classList.add("popup_opened");
}

function popupClosed(modal) {
  modal.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClosed(popupProfile);
}

function getDefaultImage(item) {
  const imageElement = imageTemplate.content.cloneNode(true);
  const handlePreviewPicture = imageElement.querySelector(".card__image");
  const handleLikeCard= imageElement.querySelector(".card__like");
  const handleDeleteCard = imageElement.querySelector(".card__remove-button");
  const pictureNameTemplate = imageElement.querySelector(".card__name");
  handlePreviewPicture.src = item.link;
  handlePreviewPicture.alt = `Изображение ${item.name}`;
  pictureNameTemplate.textContent = item.name;
  handleLikeCard.addEventListener("click", getLike);
  handlePreviewPicture.addEventListener("click", () => popupPictureOpened(item));
  handleDeleteCard.addEventListener("click", removeCard);
  return imageElement;
}

function renderImage(arr) {
  const imageItems = arr.map(getDefaultImage);
  cards.append(...imageItems);
}

function addCard() {
  const newCard = getDefaultImage({
    name: cardName.value,
    link: cardLink.value,
  });
  cards.prepend(newCard);
}

function setDefaultDataImage() {
  cardName.value = "";
  cardLink.value = "";
}

function formSubmitHandlerImage(evt) {
  evt.preventDefault();
  addCard();
  setDefaultDataImage();
  popupClosed(popupImage);
}

function getLike(evt) {
  evt.target.classList.toggle("card__like_active");
}

function popupPictureOpened(item) {
  pictureLink.src = item.link;
  pictureName.textContent = item.name;
  popupOpened(pictureFullSize);
}

function removeCard(evt) {
  evt.target.closest(".card").remove();
}

handleCloseProfile.addEventListener("click", () => {
  popupClosed(popupProfile);
  hideErrorDefault(popupProfile);
});

handleEditButton.addEventListener("click", () => {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  setButtonActive(popupProfile);
  popupOpened(popupProfile);
});

handleSaveProfile.addEventListener("submit", formSubmitHandler);

handleClosePicture.addEventListener("click", () =>
  popupClosed(pictureFullSize)
);

handleCreateCard.addEventListener("submit", formSubmitHandlerImage);

handleCloseImage.addEventListener("click", () => popupClosed(popupImage));

handleAddImage.addEventListener("click", () => popupOpened(popupImage));

renderImage(initialCards);
