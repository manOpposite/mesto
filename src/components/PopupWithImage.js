import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__picture-item");
    this._popupImageName = this._popup.querySelector(".popup__picture-name");
  }

  open(name, link) {
    this._popupImage.alt = `Изображение ${name}`;
    this._popupImage.src = link;
    this._popupImageName.textContent = name;
    super.open();
  }
}
