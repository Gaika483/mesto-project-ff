import './pages/index.css';
import { openPopup, closePopup, initModal } from './components/modal.js';
import { createCard, handleLikeClick, addCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';

// Инициализация модальных окон
initModal();

// ===== DOM элементы =====
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;

// ===== Редактирование профиля =====
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
});

// ===== Добавление карточек =====
addButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  addCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    placesList,
    handleLikeClick,
    handleDeleteCard,
    handleImageClick,
    cardTemplate,
    true
  );
  
  closePopup(newCardPopup);
});

// ===== Функции для карточек =====
function handleDeleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
}

function handleImageClick(cardData) {
  const imagePopupImg = imagePopup.querySelector('.popup__image');
  const imagePopupCaption = imagePopup.querySelector('.popup__caption');
  
  imagePopupImg.src = cardData.link;
  imagePopupImg.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

// ===== Рендер начальных карточек =====
initialCards.forEach(cardData => {
  addCard(
    cardData,
    placesList,
    handleLikeClick,
    handleDeleteCard,
    handleImageClick,
    cardTemplate
  );
});