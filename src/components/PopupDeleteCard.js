import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDeleteButton = document.querySelector(".popup__delete-button");
  }

  setSubmitHandler(callback) {
    this._handleButtonDelete = callback;
  }

  setEventListeners(removeCard) {
    this._handleButtonDelete = removeCard;
    this._popupDeleteButton.addEventListener("click", () => {
      this._handleButtonDelete();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
