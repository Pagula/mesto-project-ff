const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '30881569-0332-4247-a5e6-46c17f20945c',
    'Content-Type': 'application/json'
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const checkImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD',
  }).then(({ok, headers, status}) => {
    if (ok) {
      if (headers.get('Content-Type').includes('image')) {
        return Promise.resolve();
      }
      return Promise.reject('Ошибка: URL ссылается на не изображение');
    }
    return Promise.reject(`Ошибка: ${status}`);
  });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {headers:  config.headers})
  .then(handleResponse);
};

const createCard = ({ name, link }) => {
  return checkImageUrl(link).then (() =>
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      }),
    }).then(handleResponse)
  );
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  }).then(handleResponse);
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  }).then(handleResponse);
};

const unLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  }).then(handleResponse);
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(handleResponse);
};

const updateUserInfo = ({ name, description }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about: description
    }),
  }).then(handleResponse);
};

const updateUserAvatar = (url) => {
  return checkImageUrl(url).then(() =>
    fetch(`${config.baseUrl}/users/me/avatar`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url
      }),
    }).then(handleResponse)
  );
};

export {
  getInitialCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
}
