export class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
    this._job = "";
    this._name ="";
  }

  getUserInfo = () => {
    return {
      name: this._name,
      job: this._job
    }
  }

  setUserInfo(newName, newJob) {
    this._name = newName;
    this._job = newJob;
  }

  updateUserInfo = () => {
    this._userName.textContent = this._name;
    this._userJob.textContent = this._job;
  }
}
