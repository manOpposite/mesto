
let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('.popup__profile');
let formElement = popupProfile.querySelector('.popup__input-container');
let jobInput = formElement.querySelector('.popup__item_job');
let nameInput = formElement.querySelector('.popup__item_name');
let profileName = main.querySelector('.profile__name');
let profileJob = main.querySelector('.profile__text');
let saveButton = popupProfile.querySelector('.popup__main-container');
let popups = document.querySelector('.popups');
console.log(popups);
//let closeButton = popups.querySelector('.popup__close-icon');

function popupOpened(modal) {
  modal.classList.add('popup_opened');
  defaultDataProfile();
}
////////////////////////
////////////////////////
function popupPicClosed(evt) {
  closeButton = evt.target;
  if(closeButton.classList.contains('popup__close-icon')){
    closeButton.closest('.popup__picture').classList.remove('popup_opened');
  }
}
//////////////////////////////
//////////////////////////////
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

let closeButtonProfile = popupProfile.querySelector('.popup__close-icon');

closeButtonProfile.addEventListener('click', function() {
  popupClosed(popupProfile);
});

editButton.addEventListener('click', function () {
  popupOpened(popupProfile);
});



//popups.addEventListener('click', popupClosed);
saveButton.addEventListener('submit', formSubmitHandler);


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
////////////////////////////////////////////////
  let cardLikeButton = imageElement.querySelector('.card__like');
  cardLikeButton.addEventListener('click', getLike);
///////////////////////////////////////////////////
let pic = imageElement.querySelector('.card__image');
console.log(pic);
pic.addEventListener('click', function() {
  popupOpened(pictureFullsize);
  popupPictureOpened(pictureFullsize);

});

  return imageElement;
}




let cards = document.querySelector('.cards');

function renderImage(arr){
  const imageItems = arr.map(defaultImage);
  cards.append(...imageItems);
};

renderImage(initialCards);


// Форма добавления карточки


let popupImage = document.querySelector('.popup__image');
let addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', function() {
  popupOpened(popupImage);
  defaultDataImage();
});


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

let closeButtonImage = popupImage.querySelector('.popup__close-icon');
closeButtonImage.addEventListener('click', function() {
  popupClosed(popupImage);
});


function formSubmitHandlerImage (evt) {
  evt.preventDefault();
  addCard();
  popupClosed(popupImage);
}


let createButton = popupImage.querySelector('.popup__main-container');
createButton.addEventListener('submit', formSubmitHandlerImage);



// Лайк карточки

function getLike(evt) {
  evt.target.classList.toggle('card__like_active')
}




// Открытие картинки

let pictureFullsize = popups.querySelector('.popup__picture');
//card.addEventListener('click', function() {
 // popupOpened(pictureFullsize);
//});

function popupPictureOpened(pic) {
  const pictureLink = pictureFullsize.querySelector('.popup__picture-item');
  pictureLink.src = pic.link;
  const pictureName = pictureFullsize.querySelector('.popup__picture-name');
   pictureName.textContent = pic.name;
  
}