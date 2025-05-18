import './pages/index.css';
import { openPopup, closePopup, initModal } from './components/modal.js';
import { createCard, handleLikeClick, addCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';

// Инициализация модальных окон
initModal();

// ===== Редактирование профиля =====
const editPopup = document.querySelector('.popup_type_edit');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
});

// ===== Добавление карточек =====
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', () => {
  cardForm.reset();
  openPopup(newCardPopup);
});

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  addCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    placesList,
    true // Добавляем в начало
  );
  
  closePopup(newCardPopup);
  cardForm.reset();
});

// ===== Рендер начальных карточек =====
if (window.initialCards) {
  window.initialCards.forEach(cardData => {
    addCard(cardData, placesList);
  });
}