import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__picture-item");
    this._popupImageName = this._popup.querySelector(".popup__picture-name");
  }

  open(data) {
    this._popupImage.alt = `Изображение ${data.name}`;
    this._popupImage.src = data.link;
    this._popupImageName.textContent = data.name;
    super.open();
  }
}
