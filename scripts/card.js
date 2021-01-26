
export class Card {
  constructor(data, cardSelector, openPicturePopup) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._card = null;
    this._openPicturePopup = openPicturePopup;
  }
    
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _getLike() {
    this._cardLikeButton.classList.toggle("card__like_active");
  }
  
  _removeCard() {
    this._card.closest(".card").remove();
    this._removeEventListeners();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._getLike()
    });

    this._cardImage.addEventListener("click", () => {
      this._openPicturePopup()
    });
  
    this._cardRemoveButton.addEventListener("click", () => {
      this._removeCard()
    })
  }

  _removeEventListeners() {
    this._cardLikeButton.removeEventListener("click", () => {
      this._getLike()
    });
  
    this._cardImage.removeEventListener("click", () => {
      this._openPicturePopup()
    });
    
    this._cardRemoveButton.removeEventListener("click", () => {
      this._removeCard()
    })
  }
  
  render() {
    this._card = this._getTemplate();
    this._cardLikeButton = this._card.querySelector(".card__like");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardRemoveButton = this._card.querySelector(".card__remove-button");
    this._cardName = this._card.querySelector(".card__name");
    this._cardImage.src = this._data.link;
    this._cardImage.alt = `Изображение ${this._data.name}`;
    this._cardName.textContent = this._data.name;
    this._setEventListeners();
    return this._card;
  }
}
