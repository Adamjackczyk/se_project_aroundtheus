export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // A generic method for making _requests and checking responses
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Other methods using the _request method
  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  setUserInfo(data) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  unlikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateUserAvatar(avatarUrl) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
