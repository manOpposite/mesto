export class Api {
  constructor({ url, headers, groupId }) {
    this._url = url;
    this._headers = headers;
    this._groupId = groupId;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка на сервере ${res.status}`);
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  getCards() {
    return fetch(`${this._url}/${this._groupId}/cards/`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(data) {
    return fetch(`${this._url}/${this._groupId}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addLike(data) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  removeLike(data) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}
