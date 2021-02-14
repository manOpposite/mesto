import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._data = {};
    this._inputList.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
