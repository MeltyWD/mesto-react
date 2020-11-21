class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _apiResultReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._headers
      }
    }).then((res) => this._apiResultReturn(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._headers
      }
    }).then((res) => this._apiResultReturn(res))
  }

  patchProfileEdit(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => this._apiResultReturn(res))
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._apiResultReturn(res))
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers
      }
    }).then((res) => this._apiResultReturn(res))
  }

  changeLikeCardStatus(card, isLikes) {
    if (isLikes) {
      return this.likeCard(card)
    } else {
      return this.deleteCardLike(card)
    }
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers
      }
    }).then((res) => this._apiResultReturn(res))
  }

  deleteCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers
      }
    }).then((res) => this._apiResultReturn(res))
  }

  avatarEdit(data) {
    return fetch(`${this._baseUrl}users/me/avatar` , {
      method: 'PATCH',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => this._apiResultReturn(res))
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16/",
  headers: "91120ba6-b1f5-4198-9100-ce071631590f",
});
export default api;
