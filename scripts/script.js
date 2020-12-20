
let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('.popup_profile');
let formElement = popupProfile.querySelector('.popup__input-container');
let jobInput = formElement.querySelector('.popup__item_job');
let nameInput = formElement.querySelector('.popup__item_name');
let profileName = main.querySelector('.profile__name');
let profileJob = main.querySelector('.profile__text');
let saveButton = popupProfile.querySelector('.popup__main-container');
let popups = document.querySelector('.popups');
let pictureFullsize = popups.querySelector('.popup_picture');//
let closePicButton = pictureFullsize.querySelector('.popup__close-icon');//
let closeButtonProfile = popupProfile.querySelector('.popup__close-icon');
let popupImage = document.querySelector('.popup_image');
let addButton = document.querySelector('.profile__add-button');
let closeButtonImage = popupImage.querySelector('.popup__close-icon');//
let createButton = popupImage.querySelector('.popup__main-container');
let cards = document.querySelector('.cards');

function popupOpened(modal) {
  modal.classList.add('popup_opened');
  defaultDataProfile();
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


function defaultDataProfile() {
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  popupClosed(popupProfile);
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


function defaultImage(item) {
  const imageTemplate = document.querySelector('.image-template');
  const imageElement = imageTemplate.content.cloneNode(true);
  imageElement.querySelector('.card__image').src = item.link;
  imageElement.querySelector('.card__name').textContent = item.name;
  
  const cardLikeButton = imageElement.querySelector('.card__like');
  cardLikeButton.addEventListener('click', getLike);
  
  const pic = imageElement.querySelector('.card__image');
  pic.addEventListener('click', function() {
    popupPictureOpened(item)
  });
  
  
  const removeButton = imageElement.querySelector('.card__remove-button');
  removeButton.addEventListener('click', removeCard);
  return imageElement;
}


function renderImage(arr){
  const imageItems = arr.map(defaultImage);
  cards.append(...imageItems);
};

renderImage(initialCards);


// Добавление карточки


function addCard() {
  const cardName = popupImage.querySelector('.popup__item_image').value;
  const cardLink = popupImage.querySelector('.popup__item_link').value;
  const newCard = defaultImage({name: cardName, link: cardLink});
  cards.prepend(newCard);
}

function defaultDataImage() {
  popupImage.querySelector('.popup__item_image').value = "";
  popupImage.querySelector('.popup__item_link').value = "";

}


function formSubmitHandlerImage (evt) {
  evt.preventDefault();
  addCard();
  popupClosed(popupImage);
}


// Лайк карточки


function getLike(evt) {
  evt.target.classList.toggle('card__like_active')
}


// Открытие попапа-картинки

function popupPictureOpened(item) {
  const pictureLink = pictureFullsize.querySelector('.popup__picture-item');
  pictureLink.src = item.link;
  const pictureName = pictureFullsize.querySelector('.popup__picture-name');
  pictureName.textContent = item.name;
  popupOpened(pictureFullsize);
  
}
 

// Закрытие попапа-картинки

function closePic(evt) {
  const closePic = evt.target;
  closePic.closest('.popup').classList.remove('popup_opened');
}


// Удаление карточки

function removeCard(evt) {
  const targetElement = evt.target;
  const targetItem = targetElement.closest('.card');
  targetItem.remove();
}



closeButtonProfile.addEventListener('click', function() {
  popupClosed(popupProfile);
});

editButton.addEventListener('click', function () {
  popupOpened(popupProfile);
});

saveButton.addEventListener('submit', formSubmitHandler);

closePicButton.addEventListener('click', closePic);

createButton.addEventListener('submit', formSubmitHandlerImage);

closeButtonImage.addEventListener('click', function() {
  popupClosed(popupImage);
});

// Форма добавления карточки
addButton.addEventListener('click', function() {
  popupOpened(popupImage)
});