export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // A generic method for making requests and checking responses
  request(url, options) {
    return fetch(url, options).then(this.checkResponse);
  }

  // Other methods using the request method
  getInitialCards() {
    return this.request(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    });
  }

  getUserInfo() {
    return this.request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
  }

  setUserInfo(data) {
    return this.request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this.request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this.request(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  likeCard(cardId) {
    return this.request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  unlikeCard(cardId) {
    return this.request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  updateUserAvatar(avatarUrl) {
    return this.request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
