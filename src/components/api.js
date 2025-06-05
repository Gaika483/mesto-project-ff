const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "13226006-d53d-4088-9a19-8e1fd9ffbdf8",
  },
};

// Обработка ответа от сервера
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// Получение данных пользователя
export const getUserDataApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
};

// Получение начального списка карточек
export const getInitialsCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponse);
};

// Добавление новой карточки
export const addNewCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponse);
};

// Редактирование данных пользователя
export const editUserDataApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponse);
};

// Установка/снятие лайка с карточки
export const setLikeApi = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";

  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  }).then(getResponse);
};

// Удаление карточки
export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponse);
};

// Обновление аватара пользователя
export const updateAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(getResponse);
};
