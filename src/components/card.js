import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Функция удаления карточки
function handleDeleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
}

// Функция создания карточки
export function createCard(cardData, handleLikeClick, handleDeleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Добавляем обработчики
  cardElement.querySelector('.card__like-button')
    .addEventListener('click', handleLikeClick);
  
  deleteButton.addEventListener('click', handleDeleteCard);
  
  cardImage.addEventListener('click', () => handleImageClick(cardData));
  
  return cardElement;
}

// Обработчик лайка
export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function renderCards(cardsArray, container) {
  cardsArray.forEach(cardData => {
    const cardElement = createCard(cardData, handleLikeClick);
    container.append(cardElement);
  });
}

// Обработчик открытия изображения
function handleImageClick(cardData) {
  imagePopupImg.src = cardData.link;
  imagePopupImg.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// Добавление карточки в DOM
export function addCard(cardData, container, prepend = false) {
  const card = createCard(cardData, handleLikeClick, handleDeleteCard);
  prepend ? container.prepend(card) : container.append(card);
}

