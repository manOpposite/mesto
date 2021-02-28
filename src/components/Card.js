export class Card {
  constructor(
    { name, link, owner, likes, _id, userId },
    handleCardClick,
    handleRemoveButtonClick,
    addLike,
    removeLike,
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._card = null;
    this._handleCardClick = handleCardClick;
    this._ownerId = owner._id;
    this._imageId = _id;
    this._likes = likes;
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _getLike() {
    if (!this._cardLikeButton.classList.contains("card__like_active")) {
      this._cardLikeButton.classList.add("card__like_active");
      this._addLike();
    } else {
      this._cardLikeButton.classList.remove("card__like_active");
      this._removeLike();
    }
  }

  deleteCard() {
    this._card.closest(".card").remove();
    this._card = null;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => this._getLike());

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

    this._cardRemoveButton.addEventListener("click", () =>
      this._handleRemoveButtonClick(this._imageId)
    );
  }

  _checkId() {
    if (this._ownerId !== this._userId) {
      this._cardRemoveButton.remove();
    }
  }

  getCardId() {
    return this._imageId;
  }

  _checkLikeCardId() {
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._cardLikeButton.classList.add("card__like_active");
      }
    });
  }

  setLikeCounter(counter) {
    this._cardLikeCounter.textContent = counter;
  }

  render() {
    this._card = this._getTemplate();
    this._cardLikeButton = this._card.querySelector(".card__like");
    this._cardImage = this._card.querySelector(".card__image");
    this._cardRemoveButton = this._card.querySelector(".card__remove-button");
    this._checkId();
    this._cardLikeCounter = this._card.querySelector(".card__counter");
    this._cardName = this._card.querySelector(".card__name");
    this._cardImage.src = this._link;
    this._cardImage.alt = `Изображение ${this._name}`;
    this._cardName.textContent = this._name;
    this._setEventListeners();
    this._checkLikeCardId();
    this.setLikeCounter(this._likes.length);
    return this._card;
  }
}
