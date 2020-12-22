const main = document.querySelector('.main');
const handleEditButton = main.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const formElement = popupProfile.querySelector('.popup__input-container');
const jobInput = formElement.querySelector('.popup__item_job');
const nameInput = formElement.querySelector('.popup__item_name');
const profileName = main.querySelector('.profile__name');
const profileJob = main.querySelector('.profile__text');
const handleSaveButton = popupProfile.querySelector('.popup__main-container');
const popups = document.querySelector('.popups');
const pictureFullSize = popups.querySelector('.popup_picture');
const handleClosePicButton = pictureFullSize.querySelector('.popup__close-icon');
const handleCloseButtonProfile = popupProfile.querySelector('.popup__close-icon');
const popupImage = document.querySelector('.popup_image');
const handleAddButton = document.querySelector('.profile__add-button');
const handleCloseButtonImage = popupImage.querySelector('.popup__close-icon');
const handleCreateButton = popupImage.querySelector('.popup__main-container');
const cards = document.querySelector('.cards');
const imageTemplate = document.querySelector('.image-template');
const pictureName = pictureFullSize.querySelector('.popup__picture-name');
const pictureLink = pictureFullSize.querySelector('.popup__picture-item');
const cardName = popupImage.querySelector('.popup__item_image');
const cardLink = popupImage.querySelector('.popup__item_link');


function popupOpened(modal) {
  modal.classList.add('popup_opened');
}


function popupPicClosed(evt) {
  closeButton = evt.target;
  if(closeButton.classList.contains('popup__close-icon')){
    closeButton.closest('.popup__picture').classList.remove('popup_opened');
  }
}


function popupClosed(modal) {
  modal.classList.remove('popup_opened');
}


function getDefaultDataProfile() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  popupClosed();
}


// 6 картинок из коробки

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function getDefaultImage(item) {
  const imageElement = imageTemplate.content.cloneNode(true);
  const handlePicture = imageElement.querySelector('.card__image');
  const handleCardLikeButton = imageElement.querySelector('.card__like');
  const removeButton = imageElement.querySelector('.card__remove-button');
  const pictureNameTemplate = imageElement.querySelector('.card__name');
  handlePicture.src = item.link;
  handlePicture.alt = item.alt;
  pictureNameTemplate.textContent = item.name;

  handleCardLikeButton.addEventListener('click', getLike);
  
  handlePicture.addEventListener('click', () => popupPictureOpened(item));
  
  removeButton.addEventListener('click', removeCard);
  return imageElement;
}


function renderImage(arr){
  const imageItems = arr.map(getDefaultImage);
  cards.append(...imageItems);
};


renderImage(initialCards);


// Добавление карточки


function addCard() {
  const newCard = getDefaultImage({name: cardName.value, link: cardLink.value});
  cards.prepend(newCard);
}


function getDefaultDataImage() {
  cardName.value = "";
  cardLink.value = "";
}


function formSubmitHandlerImage(evt) {
  evt.preventDefault();
  addCard();
  getDefaultDataImage();
  popupClosed();
}


// Лайк карточки


function getLike(evt) {
  evt.target.classList.toggle('card__like_active')
}


// Открытие попапа-картинки

function popupPictureOpened(item) {
  pictureLink.src = item.link;
  pictureLink.alt = item.alt;
  pictureName.textContent = item.name;
  popupOpened(pictureFullSize);
}
 

// Закрытие попапа-картинки

function closePicturePopup(evt) {
  if(evt.target.closest('.popup')) {
    popupClosed(pictureFullSize); 
  }
}


// Удаление карточки

function removeCard(evt) {
  const targetElement = evt.target;
  const targetItem = targetElement.closest('.card');
  targetItem.remove();
}



handleCloseButtonProfile.addEventListener('click', () =>  popupClosed(popupProfile));



handleEditButton.addEventListener('click', () => {
  getDefaultDataProfile();
  popupOpened(popupProfile);
});


handleSaveButton.addEventListener('submit', formSubmitHandler);
 

handleClosePicButton.addEventListener('click', closePicturePopup);


handleCreateButton.addEventListener('submit', formSubmitHandlerImage);


handleCloseButtonImage.addEventListener('click', () => popupClosed(popupImage));


// Форма добавления карточки

handleAddButton.addEventListener('click', () => popupOpened(popupImage));
