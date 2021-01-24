import {openPopup, pictureLink, pictureName, popupImage} from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._card = null;
  }
    
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _getLike() {
    this._card.querySelector(".card__like").classList.toggle("card__like_active");
  }
  
  _openPicturePopup() {
    pictureLink.src = this._data.link;
    pictureName.textContent = this._data.name;
    openPopup(popupImage);
  }

  _removeCard() {
    this._card.closest(".card").remove();
    this._removeEventListeners();
  }

  _setEventListeners() {
    this._card.querySelector(".card__like").addEventListener("click", () => {
      this._getLike()
    });

    this._card.querySelector(".card__image").addEventListener("click", () => {
      this._openPicturePopup()
    });
  
    this._card.querySelector(".card__remove-button").addEventListener("click", () => {
      this._removeCard()
    })
  }

  _removeEventListeners() {
    this._card.querySelector(".card__like").removeEventListener("click", () => {
      this._getLike()
    });
  
    this._card.querySelector(".card__image").removeEventListener("click", () => {
      this._openPicturePopup()
    });
    
    this._card.querySelector(".card__remove-button").removeEventListener("click", () => {
      this._removeCard()
    })
  }
  
  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".card__image").src = this._data.link;
    this._card.querySelector(".card__image").alt = `Изображение ${this._data.name}`;
    this._card.querySelector(".card__name").textContent = this._data.name;
    this._setEventListeners();
    return this._card;
  }
}
