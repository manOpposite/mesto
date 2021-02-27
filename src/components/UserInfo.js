export class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userImageSelector) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
    this._userImageSelector = userImageSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userDescription = document.querySelector(
      this._userDescriptionSelector
    );
    this._userImage = document.querySelector(this._userImageSelector);
    this._about = "";
    this._name = "";
    this._avatar = "";
    this._id = "";
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }

  setUserInfo(data) {
    this._about = data.about;
    this._name = data.name;
    this._avatar = data.avatar;
    this._id = data._id;
  }

  updateUserInfo() {
    this._userName.textContent = this._name;
    this._userDescription.textContent = this._about;
    this._userImage.src = this._avatar;
  }

  getMyId() {
    return this._id;
  }

  editAvatar(data) {
    this._avatar = data.avatar;
    this._userImage.src = this._avatar;
  }
}
