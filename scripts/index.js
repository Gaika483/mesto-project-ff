// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Функция создания карточки
function createCard(cardData, deleteCallback) {
    // Клонируем шаблон карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    // Находим элементы внутри карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    // Устанавливаем значения из данных карточки
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    // Добавляем обработчик удаления
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardElement);
    });
    
    return cardElement;
  }
  
  // Функция для удаления карточки
  function handleDeleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Получаем контейнер для карточек
  const placesList = document.querySelector('.places__list');
  
  // Перебираем массив карточек и добавляем их на страницу
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, handleDeleteCard);
    placesList.appendChild(cardElement);
  });